export default function robots() {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: [],
    },
    sitemap: 'https://glenp-websitenl.vercel.app/sitemap.xml',
  };
}

