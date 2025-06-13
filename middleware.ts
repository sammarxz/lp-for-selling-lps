import { NextRequest, NextResponse } from 'next/server';
import createIntlMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';

const intlMiddleware = createIntlMiddleware(routing);

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  console.log(`🔍 Middleware processing: ${pathname}`);
  
  const hasLocale = routing.locales.some(locale => 
    pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );
  
  if (hasLocale) {
    console.log(`✅ Locale found in path, using intl middleware`);
    return intlMiddleware(request);
  }
  
  if (pathname === '/') {
    console.log(`🌍 Root path detected, checking geolocation...`);
    
    const savedLocale = request.cookies.get('user-locale')?.value;
    if (savedLocale && routing.locales.includes(savedLocale as any)) {
      console.log(`👤 User preference found: ${savedLocale}`);
      const url = request.nextUrl.clone();
      url.pathname = `/${savedLocale}`;
      return NextResponse.redirect(url);
    }
    
    const country = await detectCountryFromRequest(request);
    const locale = getLocaleByCountry(country);
    
    console.log(`🗺️ Detected country: ${country} → locale: ${locale}`);
    
    const url = request.nextUrl.clone();
    url.pathname = `/${locale}`;
    
    const response = NextResponse.redirect(url);
    response.cookies.set('user-locale', locale, {
      maxAge: 60 * 60 * 24 * 365, // 1 ano
      httpOnly: true,
      sameSite: 'lax',
      path: '/'
    });
    
    console.log(`🚀 Redirecting to: ${url.pathname}`);
    return response;
  }
  
  return intlMiddleware(request);
}

async function detectCountryFromRequest(request: NextRequest): Promise<string> {
  const clientIP = getClientIP(request);
  const isLocal = isLocalIP(clientIP);
  
  console.log(`🔍 Client IP: ${clientIP}, Local: ${isLocal}`);
  
  if (isLocal) {
    const testCountry = request.nextUrl.searchParams.get('testCountry');
    if (testCountry) {
      console.log(`🧪 Test country override: ${testCountry}`);
      return testCountry.toUpperCase();
    }
    
    console.log(`🏠 Development environment, defaulting to BR`);
    return 'BR';
  }
  
  const vercelCountry = getCountryFromVercelHeaders(request);
  if (vercelCountry) {
    console.log(`🚀 Country from Vercel headers: ${vercelCountry}`);
    return vercelCountry;
  }
  
  try {
    const country = await detectCountryByIP(clientIP);
    console.log(`🌐 Country from external API: ${country}`);
    return country;
  } catch (error) {
    console.warn(`❌ External API failed, defaulting to BR:`, error);
    return 'BR';
  }
}

function getClientIP(request: NextRequest): string {
  const vercelIP = request.headers.get('x-vercel-forwarded-for');
  if (vercelIP) return vercelIP.split(',')[0].trim();
  
  const forwardedFor = request.headers.get('x-forwarded-for');
  if (forwardedFor) return forwardedFor.split(',')[0].trim();
  
  const realIP = request.headers.get('x-real-ip');
  if (realIP) return realIP;
  
  const cfConnectingIP = request.headers.get('cf-connecting-ip');
  if (cfConnectingIP) return cfConnectingIP;
  
  return '::1'; // Fallback para localhost
}

function isLocalIP(ip: string): boolean {
  const localIPs = ['127.0.0.1', '::1', 'localhost'];
  
  return localIPs.includes(ip) || 
         ip.startsWith('192.168.') || 
         ip.startsWith('10.') || 
         ip.startsWith('172.16.');
}

function getCountryFromVercelHeaders(request: NextRequest): string | null {
  const vercelCountry = request.headers.get('x-vercel-ip-country');
  
  if (vercelCountry && vercelCountry.length === 2) {
    return vercelCountry.toUpperCase();
  }
  
  return null;
}

async function detectCountryByIP(ip: string): Promise<string> {
  const apis = [
    {
      name: 'geojs',
      url: `https://get.geojs.io/v1/ip/country/${ip}.json`,
      timeout: 1500, // Mais rápido no middleware
      parser: (data: any) => data.country
    },
    {
      name: 'ip-api',
      url: `http://ip-api.com/json/${ip}?fields=countryCode`,
      timeout: 2000,
      parser: (data: any) => data.countryCode
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
          'User-Agent': 'Mozilla/5.0 (compatible; MiddlewareGeoDetector/1.0)',
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
  
  return portugueseCountries.includes(country.toUpperCase()) ? 'pt' : 'en';
}

export const config = {
  // Aplicar middleware em todas as rotas relevantes
  matcher: [
    '/',
    '/(pt|en)/:path*',
    // Excluir arquivos estáticos e API routes
    '/((?!api|_next/static|_next/image|favicon.ico|.*\\.png$|.*\\.jpg$|.*\\.jpeg$|.*\\.gif$|.*\\.webp$).*)'
  ]
};