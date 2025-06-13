import { NextRequest, NextResponse } from 'next/server';

interface GeoResponse {
  country: string;
  locale: 'pt' | 'en';
  ip: string;
  redirectUrl: string;
  success: boolean;
  source: string;
  environment: 'development' | 'production';
  city?: string;
  region?: string;
}

export async function GET(request: NextRequest) {
  try {
    const clientIP = getClientIP(request);
    const isLocal = isLocalIP(clientIP);
    const environment = isLocal ? 'development' : 'production';
    
    console.log(`🔍 Environment: ${environment}, IP: ${clientIP}`);
    
    let country = '';
    let source = '';
    
    if (isLocal) {
      const testIP = request.nextUrl.searchParams.get('testIP');
      const testCountry = request.nextUrl.searchParams.get('testCountry');
      
      if (testCountry) {
        country = testCountry.toUpperCase();
        source = 'manual-override';
        console.log(`🧪 Manual override: ${country}`);
      } else if (testIP) {
        country = await detectCountryByIP(testIP);
        source = 'test-ip';
        console.log(`🧪 Testing with IP: ${testIP} → ${country}`);
      } else {
        country = 'BR';
        source = 'development-default';
        console.log(`🏠 Development default: ${country}`);
      }
    } else {
      const vercelCountry = getCountryFromVercelHeaders(request);
      
      if (vercelCountry) {
        country = vercelCountry;
        source = 'vercel-headers';
        console.log(`🚀 Vercel headers: ${country}`);
      } else {
        country = await detectCountryByIP(clientIP);
        source = 'external-api';
        console.log(`🌐 External API: ${country}`);
      }
    }
    
    const locale = getLocaleByCountry(country);
    
    const city = request.headers.get('x-vercel-ip-city');
    const region = request.headers.get('x-vercel-ip-country-region');
    
    const origin = request.headers.get('origin') || 
                   request.headers.get('referer')?.split('/').slice(0, 3).join('/') || 
                   'http://localhost:3000';
    
    const redirectUrl = `${origin}/${locale}`;
    
    console.log(`✅ Final: ${country} (${source}) → ${locale}, Environment: ${environment}`);
    
    const response: GeoResponse = {
      country,
      locale,
      ip: clientIP,
      redirectUrl,
      success: true,
      source,
      environment,
      city: city || undefined,
      region: region || undefined
    };
    
    // Cache apenas em produção
    const res = NextResponse.json(response);
    if (!isLocal) {
      res.headers.set('Cache-Control', 'public, max-age=3600, stale-while-revalidate=1800');
    }
    
    return res;
    
  } catch (error) {
    console.error('❌ Error in location detection:', error);
    
    const origin = request.headers.get('origin') || 'http://localhost:3000';
    const fallbackResponse: GeoResponse = {
      country: 'BR',
      locale: 'pt',
      ip: 'unknown',
      redirectUrl: `${origin}/pt`,
      success: false,
      source: 'fallback',
      environment: 'development'
    };
    
    return NextResponse.json(fallbackResponse, { status: 200 });
  }
}

function getClientIP(request: NextRequest): string {
  const vercelIP = request.headers.get('x-vercel-forwarded-for');
  if (vercelIP) return vercelIP.split(',')[0].trim();
  
  const forwardedFor = request.headers.get('x-forwarded-for');
  if (forwardedFor) return forwardedFor.split(',')[0].trim();
  
  const realIP = request.headers.get('x-real-ip');
  if (realIP) return realIP;
  
  return '::1';
}

function isLocalIP(ip: string): boolean {
  const localIPs = [
    '127.0.0.1',
    '::1',
    'localhost'
  ];
  
  return localIPs.includes(ip) || 
         ip.startsWith('192.168.') || 
         ip.startsWith('10.') || 
         ip.startsWith('172.');
}

function getCountryFromVercelHeaders(request: NextRequest): string | null {
  const vercelCountry = request.headers.get('x-vercel-ip-country');
  
  if (vercelCountry && vercelCountry.length === 2) {
    console.log(`🚀 Country from Vercel headers: ${vercelCountry}`);
    return vercelCountry.toUpperCase();
  }
  
  return null;
}

async function detectCountryByIP(ip: string): Promise<string> {
  const apis = [
    {
      name: 'geojs',
      url: `https://get.geojs.io/v1/ip/country/${ip}.json`,
      timeout: 2000,
      parser: (data: any) => data.country
    },
    {
      name: 'ip-api',
      url: `http://ip-api.com/json/${ip}?fields=countryCode`,
      timeout: 2500,
      parser: (data: any) => data.countryCode
    },
    {
      name: 'ipapi',
      url: `https://ipapi.co/${ip}/country_code/`,
      timeout: 3000,
      parser: (data: any) => typeof data === 'string' ? data.trim() : data
    }
  ];
  
  for (const api of apis) {
    try {
      console.log(`🌐 Trying ${api.name} for IP ${ip}...`);
      
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), api.timeout);
      
      const response = await fetch(api.url, {
        signal: controller.signal,
        headers: {
          'User-Agent': 'Mozilla/5.0 (compatible; LocationDetector/1.0)',
          'Accept': 'application/json'
        }
      });
      
      clearTimeout(timeoutId);
      
      if (response.ok) {
        const rawData = await response.text();
        let data;
        
        try {
          data = JSON.parse(rawData);
        } catch {
          data = rawData;
        }
        
        const country = api.parser(data);
        
        if (country && typeof country === 'string' && country.length === 2) {
          console.log(`✅ ${api.name} detected: ${country}`);
          return country.toUpperCase();
        }
      }
      
    } catch (error) {
      console.warn(`❌ ${api.name} failed:`, error instanceof Error ? error.message : 'Unknown error');
      continue;
    }
  }
  
  console.log('⚠️ All APIs failed, defaulting to Brazil');
  return 'BR';
}

function getLocaleByCountry(country: string): 'pt' | 'en' {
  const portugueseCountries = [
    'BR', // Brazil
    'PT', // Portugal
    'AO', // Angola
    'MZ', // Mozambique
    'GW', // Guinea-Bissau
    'CV', // Cape Verde
    'ST', // São Tomé and Príncipe
    'TL'  // East Timor
  ];
  
  const isPortuguese = portugueseCountries.includes(country.toUpperCase());
  console.log(`🗺️ Country ${country} → Locale: ${isPortuguese ? 'pt' : 'en'}`);
  
  return isPortuguese ? 'pt' : 'en';
}

export const runtime = 'edge';