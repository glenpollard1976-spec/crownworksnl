
export const metadata = {
  title: "CrownWorksNL — Crown Land & Business Services in Newfoundland & Labrador",
  description: "Expert Crown Land acquisition, business consulting, and AI solutions in Corner Brook, NL. Founded by Glen Pollard of Qalipu First Nation. Get your free consultation today.",
  keywords: "Crown Land Newfoundland, Crown Land Labrador, business consulting NL, Qalipu First Nation, Corner Brook business services, Crown Land application, AI business solutions",
  authors: [{ name: "Glen Pollard" }],
  openGraph: {
    title: "CrownWorksNL — Crown Land & Business Services",
    description: "Expert Crown Land acquisition and business consulting in Newfoundland & Labrador",
    url: "https://crownworksnl.com",
    siteName: "CrownWorksNL",
    locale: "en_CA",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "CrownWorksNL — Crown Land & Business Services",
    description: "Expert Crown Land acquisition and business consulting in Newfoundland & Labrador",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5.0, user-scalable=yes, viewport-fit=cover, shrink-to-fit=no" />
        <meta name="theme-color" content="#4f46e5" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="CrownWorksNL" />
        <link rel="canonical" href="https://crownworksnl.com" />
        <link rel="manifest" href="/manifest.json" />
        <link rel="apple-touch-icon" href="/icon-192.png" />
        {/* Google Analytics - Replace G-XXXXXXXXXX with your actual Google Analytics ID */}
        {/* <script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-XXXXXXXXXX');
            `,
          }}
        /> */}
        {/* Facebook Pixel - Replace YOUR_PIXEL_ID with your actual Pixel ID */}
        {/* <script
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
              fbq('init', 'YOUR_PIXEL_ID');
              fbq('track', 'PageView');
            `,
          }}
        /> */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "ProfessionalService",
              "name": "CrownWorksNL",
              "description": "Crown Land acquisition and business consulting services in Newfoundland & Labrador",
              "url": "https://crownworksnl.com",
              "telephone": "+1-709-721-0340",
              "email": "info@crownworksnl.com",
              "address": {
                "@type": "PostalAddress",
                "addressLocality": "Corner Brook",
                "addressRegion": "NL",
                "addressCountry": "CA"
              },
              "founder": {
                "@type": "Person",
                "name": "Glen Pollard"
              },
              "areaServed": {
                "@type": "State",
                "name": "Newfoundland and Labrador"
              },
              "serviceType": ["Crown Land Services", "Business Consulting", "AI Solutions", "Brand Development"],
              "priceRange": "$$",
              "paymentAccepted": "Cash, Credit Card, Bank Transfer"
            })
          }}
        />
      </head>
      <body className="min-h-screen">{children}</body>
    </html>
  );
}
