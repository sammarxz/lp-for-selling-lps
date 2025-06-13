import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "../globals.css";
import { getSiteConfig } from "@/lib/constants";
import Script from "next/script";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const config = getSiteConfig(locale);

  // URLs baseadas no locale
  const baseUrl = "https://landing24h.marxz.me";
  const currentUrl = locale === "en" ? `${baseUrl}/en` : baseUrl;

  return {
    title: {
      default: config.name,
      template: `%s | ${config.name}`,
    },
    description: config.description,
    keywords:
      locale === "en"
        ? [
            "landing page",
            "web development",
            "design",
            "24 hours",
            "website",
            "high conversion",
            "fast delivery",
            "responsive design",
          ]
        : [
            "landing page",
            "desenvolvimento web",
            "design",
            "24 horas",
            "site responsivo",
            "alta conversão",
            "entrega rápida",
          ],
    authors: [
      {
        name: config.author.name,
        url: config.contact.email,
      },
    ],
    creator: config.author.name,
    publisher: config.author.name,

    // Open Graph otimizado
    openGraph: {
      type: "website",
      locale: locale === "en" ? "en_US" : "pt_BR",
      url: currentUrl,
      title: config.name,
      description: config.description,
      siteName: config.name,
      images: [
        {
          url: `${baseUrl}/og-image-${locale}.jpg`, // Imagem específica do locale
          width: 1200,
          height: 630,
          alt: config.description,
        },
      ],
    },

    // Twitter Card otimizado
    twitter: {
      card: "summary_large_image",
      title: config.name,
      description: config.description,
      creator: "@sammarxz", // Adicione seu Twitter
      images: [`${baseUrl}/og-image-${locale}.jpg`],
    },

    // Robots otimizado
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },

    // Schema.org structured data
    other: {
      "business:contact_data:street_address": "Recife, PE",
      "business:contact_data:locality": "Recife",
      "business:contact_data:region": "PE",
      "business:contact_data:postal_code": "50000-000",
      "business:contact_data:country_name": "Brazil",
      "business:contact_data:email": config.contact.email,
      "business:contact_data:phone_number": "+5581992480658",
      "business:contact_data:website": baseUrl,
    },

    // Alternates com URLs completas
    alternates: {
      canonical: currentUrl,
      languages: {
        "pt-BR": baseUrl,
        pt: baseUrl,
        en: `${baseUrl}/en`,
        "x-default": baseUrl,
      },
    },

    // Verificação e manifesto
    verification: {
      google: process.env.GOOGLE_SITE_VERIFICATION, // Adicione no .env
    },

    // App links para PWA (futuro)
    manifest: "/manifest.json",

    // Geo location
    category:
      locale === "en"
        ? "Web Development Services"
        : "Serviços de Desenvolvimento Web",
  };
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;

  // Verificar se o locale é válido
  if (!routing.locales.includes(locale as any)) {
    notFound();
  }

  // Obter configuração e mensagens
  const config = getSiteConfig(locale);
  const messages = await getMessages();
  const pixelId = process.env.NEXT_PUBLIC_FACEBOOK_PIXEL_ID;

  // URLs para hreflang
  const baseUrl = "https://landing24h.marxz.me";

  return (
    <html lang={locale} className="scroll-smooth">
      <head>
        {/* DNS Prefetch para performance */}
        <link rel="dns-prefetch" href="//fonts.googleapis.com" />
        <link rel="dns-prefetch" href="//get.geojs.io" />
        <link rel="dns-prefetch" href="//ipapi.co" />

        {/* Preconnect para recursos críticos */}
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin=""
        />

        {/* Meta viewport otimizado */}
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no, viewport-fit=cover"
        />

        {/* Theme color baseado no design */}
        <meta name="theme-color" content="#000000" />
        <meta name="msapplication-TileColor" content="#000000" />

        {/* Apple touch icon */}
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />

        {/* Favicon */}
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />

        {/* Schema.org JSON-LD */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "ProfessionalService",
              name: config.name,
              description: config.description,
              url: baseUrl,
              logo: `${baseUrl}/logo.png`,
              image: `${baseUrl}/og-image-${locale}.jpg`,
              founder: {
                "@type": "Person",
                name: config.author.name,
                jobTitle: config.author.role,
                image: `${baseUrl}${config.author.image}`,
                email: config.contact.email,
                sameAs: [
                  "https://github.com/sammarxz",
                  "https://linkedin.com/in/sammarxz",
                ],
              },
              address: {
                "@type": "PostalAddress",
                addressLocality: "Recife",
                addressRegion: "PE",
                addressCountry: "BR",
              },
              contactPoint: {
                "@type": "ContactPoint",
                telephone: "+5581992480658",
                contactType: "customer service",
                availableLanguage: ["Portuguese", "English"],
              },
              offers: {
                "@type": "Offer",
                name:
                  locale === "en"
                    ? "Landing Page Development"
                    : "Desenvolvimento de Landing Page",
                description: config.description,
                price: config.pricing.price,
                priceCurrency: locale === "en" ? "USD" : "BRL",
                availability: "https://schema.org/InStock",
                deliveryLeadTime: {
                  "@type": "QuantitativeValue",
                  value: 1,
                  unitCode: "DAY",
                },
              },
              aggregateRating: {
                "@type": "AggregateRating",
                ratingValue: config.social.rating,
                reviewCount: config.social.userCount,
                bestRating: 5,
                worstRating: 1,
              },
              serviceType:
                locale === "en" ? "Web Development" : "Desenvolvimento Web",
              areaServed: locale === "en" ? "Worldwide" : "Mundial",
              hasOfferCatalog: {
                "@type": "OfferCatalog",
                name:
                  locale === "en"
                    ? "Landing Page Services"
                    : "Serviços de Landing Page",
                itemListElement: [
                  {
                    "@type": "Offer",
                    itemOffered: {
                      "@type": "Service",
                      name:
                        locale === "en"
                          ? "24h Landing Page"
                          : "Landing Page 24h",
                    },
                  },
                ],
              },
            }),
          }}
        />

        {/* Facebook Pixel */}
        {pixelId && (
          <>
            <Script
              id="facebook-pixel"
              strategy="afterInteractive"
              dangerouslySetInnerHTML={{
                __html: `
                  !function(f,b,e,v,n,t,s)
                  {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
                  n.callMethod.apply(n,arguments):n.queue.push(arguments)};
                  if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
                  n.queue=[];t=b.createElement(e);t.async=!0;
                  t.src=v;s=b.getElementsByTagName(e)[0];
                  s.parentNode.insertBefore(t,s)}(window, document,'script',
                  'https://connect.facebook.net/en_US/fbevents.js');
                  fbq('init', '${pixelId}');
                  fbq('track', 'PageView');
                `,
              }}
            />
            <noscript>
              <img
                height="1"
                width="1"
                style={{ display: "none" }}
                src={`https://www.facebook.com/tr?id=${pixelId}&ev=PageView&noscript=1`}
                alt=""
              />
            </noscript>
          </>
        )}

        {/* Google Analytics (opcional) */}
        {process.env.NEXT_PUBLIC_GA_ID && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}
              strategy="afterInteractive"
            />
            <Script id="google-analytics" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}');
              `}
            </Script>
          </>
        )}

        {/* Hreflang tags para SEO internacional */}
        <link rel="alternate" hrefLang="pt-BR" href={baseUrl} />
        <link rel="alternate" hrefLang="pt" href={baseUrl} />
        <link rel="alternate" hrefLang="en" href={`${baseUrl}/en`} />
        <link rel="alternate" hrefLang="x-default" href={baseUrl} />
      </head>

      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        suppressHydrationWarning={true}
      >
        <NextIntlClientProvider messages={messages} locale={locale}>
          {children}
        </NextIntlClientProvider>

        {/* Service Worker para PWA (futuro) */}
        {process.env.NODE_ENV === "production" && (
          <Script id="register-sw" strategy="afterInteractive">
            {`
              if ('serviceWorker' in navigator) {
                navigator.serviceWorker.register('/sw.js');
              }
            `}
          </Script>
        )}
      </body>
    </html>
  );
}
