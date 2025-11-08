
export const metadata = {
  title: "CrownWorksNL — Business Consulting & Growth Services in Newfoundland & Labrador",
  description: "Expert business consulting, strategy, and AI solutions in Corner Brook, NL. Founded by Glen Pollard of Qalipu First Nation. Mobile apps available for Android and iOS. Get your free consultation today.",
  keywords: "business consulting NL, business growth Newfoundland, Qalipu First Nation, Corner Brook business services, AI business solutions, strategic planning, mobile app, Android app, iOS app, CrownWorksNL app, iLawyer, ProVet",
  authors: [{ name: "Glen Pollard" }],
  openGraph: {
    title: "CrownWorksNL — Business Consulting & Growth Services",
    description: "Expert business consulting and growth services in Newfoundland & Labrador",
    url: "https://www.crownworksnl.com",
    siteName: "CrownWorksNL",
    locale: "en_CA",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "CrownWorksNL — Business Consulting & Growth Services",
    description: "Expert business consulting and growth services in Newfoundland & Labrador",
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
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5.0, user-scalable=yes, viewport-fit=cover, shrink-to-fit=no, interactive-widget=resizes-content" />
        <meta name="theme-color" content="#4f46e5" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="CrownWorksNL" />
        <link rel="canonical" href="https://www.crownworksnl.com" />
        <link rel="manifest" href="/manifest.json" />
        <link rel="apple-touch-icon" href="/icon-192.png" />
        {/* Google Search Console Verification - Add your verification code here */}
        {/* <meta name="google-site-verification" content="YOUR_VERIFICATION_CODE_HERE" /> */}
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
              "description": "Business consulting and growth services in Newfoundland & Labrador",
              "url": "https://www.crownworksnl.com",
              "telephone": "+1-709-721-0340",
              "email": "crownworksnl@gmail.com",
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
              "serviceType": ["Business Consulting", "AI Solutions", "Brand Development", "Strategic Planning", "Legal Services", "Veterinary Practice Management"],
              "priceRange": "$$",
              "paymentAccepted": "Cash, Credit Card, Bank Transfer (USD)",
              "applicationCategory": "BusinessApplication",
              "operatingSystem": ["Android", "iOS"],
              "softwareVersion": "1.0.0",
              "softwareRequirements": "Android 5.0+ or iOS 12.0+",
              "downloadUrl": [
                "https://play.google.com/store/apps/details?id=com.crownworksnl.app",
                "https://apps.apple.com/app/crownworksnl/id1234567890"
              ],
              "screenshot": "https://www.crownworksnl.com/app-screenshot.png",
              "offers": [
                {
                  "@type": "Offer",
                  "price": "0",
                  "priceCurrency": "USD",
                  "availability": "https://schema.org/InStock",
                  "url": "https://play.google.com/store/apps/details?id=com.crownworksnl.app"
                },
                {
                  "@type": "Offer",
                  "price": "0",
                  "priceCurrency": "USD",
                  "availability": "https://schema.org/InStock",
                  "url": "https://apps.apple.com/app/crownworksnl/id1234567890"
                }
              ]
            })
          }}
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              // Prevent scroll on page load - runs before React hydration
              (function() {
                if (typeof window !== 'undefined') {
                  // Disable scroll restoration immediately
                  if ('scrollRestoration' in history) {
                    history.scrollRestoration = 'manual';
                  }
                  
                  // Force scroll to top immediately and repeatedly
                  function forceTop() {
                    window.scrollTo(0, 0);
                    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
                    if (document.documentElement) {
                      document.documentElement.scrollTop = 0;
                      document.documentElement.scrollLeft = 0;
                    }
                    if (document.body) {
                      document.body.scrollTop = 0;
                      document.body.scrollLeft = 0;
                    }
                    if (document.scrollingElement) {
                      document.scrollingElement.scrollTop = 0;
                      document.scrollingElement.scrollLeft = 0;
                    }
                  }
                  
                  // Force immediately
                  forceTop();
                  
                  // Keep at top during page load - more aggressive
                  var scrollCheck = setInterval(function() {
                    if (window.scrollY > 0 || window.pageYOffset > 0 || 
                        document.documentElement.scrollTop > 0 || 
                        document.body.scrollTop > 0) {
                      forceTop();
                    }
                  }, 5); // Check every 5ms
                  
                  // Also use requestAnimationFrame for smoother enforcement
                  var rafId = null;
                  function enforceTopRAF() {
                    if (window.scrollY > 0 || document.documentElement.scrollTop > 0) {
                      forceTop();
                    }
                    rafId = requestAnimationFrame(enforceTopRAF);
                  }
                  rafId = requestAnimationFrame(enforceTopRAF);
                  
                  // Stop checking after page fully loads
                  var stopTime = Date.now() + 2000; // Run for 2 seconds
                  function checkStop() {
                    if (Date.now() >= stopTime) {
                      clearInterval(scrollCheck);
                      if (rafId) {
                        cancelAnimationFrame(rafId);
                      }
                      // Re-enable scrolling in CSS
                      if (document.documentElement) {
                        document.documentElement.classList.add('scrolled');
                      }
                    } else {
                      setTimeout(checkStop, 100);
                    }
                  }
                  checkStop();
                  
                  // Also stop on load events
                  window.addEventListener('load', function() {
                    setTimeout(function() {
                      clearInterval(scrollCheck);
                      if (rafId) {
                        cancelAnimationFrame(rafId);
                      }
                      // Re-enable scrolling in CSS
                      if (document.documentElement) {
                        document.documentElement.classList.add('scrolled');
                      }
                    }, 2000);
                  }, { once: true });
                  
                  // Stop on DOM ready
                  if (document.readyState === 'loading') {
                    document.addEventListener('DOMContentLoaded', function() {
                      setTimeout(function() {
                        clearInterval(scrollCheck);
                        if (rafId) {
                          cancelAnimationFrame(rafId);
                        }
                      }, 2000);
                    }, { once: true });
                  } else {
                    setTimeout(function() {
                      clearInterval(scrollCheck);
                      if (rafId) {
                        cancelAnimationFrame(rafId);
                      }
                    }, 2000);
                  }
                }
              })();
            `,
          }}
        />
      </head>
      <body className="min-h-screen">{children}</body>
    </html>
  );
}
