#!/usr/bin/env node

/**
 * Auto Submit CrownWorksNL to World Wide Web
 * Opens all submission pages automatically
 */

const { exec } = require('child_process');
const { spawn } = require('child_process');

const siteUrl = 'https://crownworksnl.com';
const siteName = 'CrownWorksNL';
const email = 'crownworksnl@gmail.com';
const phone = '+1 (709) 721-0340';
const location = 'Corner Brook, Newfoundland & Labrador';

const platforms = [
  // Search Engines
  {
    name: 'Google Search Console',
    url: `https://search.google.com/search-console/submit?url=${siteUrl}`,
    category: 'Search Engine'
  },
  {
    name: 'Bing Webmaster Tools',
    url: `https://www.bing.com/webmasters/about?urls=${siteUrl}`,
    category: 'Search Engine'
  },
  {
    name: 'Yandex Webmaster',
    url: `https://webmaster.yandex.com/site/add/?hostName=${siteUrl}`,
    category: 'Search Engine'
  },
  {
    name: 'DuckDuckGo',
    url: `https://duckduckgo.com/?q=${encodeURIComponent(siteName)}`,
    category: 'Search Engine'
  },
  
  // Business Directories
  {
    name: 'Google My Business',
    url: 'https://www.google.com/business/',
    category: 'Business Directory'
  },
  {
    name: 'Bing Places',
    url: 'https://www.bingplaces.com/',
    category: 'Business Directory'
  },
  {
    name: 'Yelp for Business',
    url: 'https://biz.yelp.com/',
    category: 'Business Directory'
  },
  {
    name: 'Yellow Pages',
    url: 'https://www.yellowpages.ca/',
    category: 'Business Directory'
  },
  {
    name: 'Foursquare',
    url: 'https://foursquare.com/',
    category: 'Business Directory'
  },
  {
    name: 'Canada411',
    url: 'https://www.canada411.ca/',
    category: 'Business Directory'
  },
  
  // Social Media
  {
    name: 'Facebook Business',
    url: 'https://www.facebook.com/business/',
    category: 'Social Media'
  },
  {
    name: 'LinkedIn Company Page',
    url: 'https://www.linkedin.com/company/setup/new/',
    category: 'Social Media'
  },
  {
    name: 'Twitter Business',
    url: 'https://business.twitter.com/',
    category: 'Social Media'
  },
  {
    name: 'Instagram Business',
    url: 'https://business.instagram.com/',
    category: 'Social Media'
  },
  
  // Sitemaps
  {
    name: 'Google Sitemap',
    url: `https://search.google.com/search-console/sitemaps?resource_id=sc-domain%3A${siteUrl}`,
    category: 'Sitemap'
  },
  {
    name: 'Bing Sitemap',
    url: `https://www.bing.com/webmasters/sitemaps?url=${siteUrl}`,
    category: 'Sitemap'
  },
  
  // App Stores
  {
    name: 'Google Play Console',
    url: 'https://play.google.com/console/',
    category: 'App Store'
  },
  {
    name: 'App Store Connect',
    url: 'https://appstoreconnect.apple.com/',
    category: 'App Store'
  },
  
  // Analytics
  {
    name: 'Google Analytics',
    url: 'https://analytics.google.com/',
    category: 'Analytics'
  },
  {
    name: 'Google Tag Manager',
    url: 'https://tagmanager.google.com/',
    category: 'Analytics'
  },
  
  // Additional Platforms
  {
    name: 'Reddit Submit',
    url: `https://www.reddit.com/submit?url=${siteUrl}&title=${siteName}`,
    category: 'Social Platform'
  },
  {
    name: 'Pinterest',
    url: `https://www.pinterest.com/pin/create/button/?url=${siteUrl}`,
    category: 'Social Platform'
  }
];

function openUrl(url) {
  return new Promise((resolve) => {
    const platform = process.platform;
    let command;
    
    if (platform === 'win32') {
      command = `start "" "${url}"`;
    } else if (platform === 'darwin') {
      command = `open "${url}"`;
    } else {
      command = `xdg-open "${url}"`;
    }
    
    exec(command, (error) => {
      if (error) {
        console.error(`Error opening ${url}:`, error.message);
      }
      resolve();
    });
  });
}

async function main() {
  console.log('========================================');
  console.log('  AUTO SUBMIT TO WORLD WIDE WEB');
  console.log('========================================');
  console.log('');
  console.log(`Site: ${siteName}`);
  console.log(`URL: ${siteUrl}`);
  console.log('');
  
  const categories = [...new Set(platforms.map(p => p.category))];
  
  for (let i = 0; i < categories.length; i++) {
    const category = categories[i];
    const categoryPlatforms = platforms.filter(p => p.category === category);
    
    console.log(`[${i + 1}/${categories.length}] Opening ${category}...`);
    
    for (const platform of categoryPlatforms) {
      console.log(`  - ${platform.name}...`);
      await openUrl(platform.url);
      await new Promise(resolve => setTimeout(resolve, 2000));
    }
    
    console.log('');
  }
  
  console.log('========================================');
  console.log('  SUBMISSION PAGES OPENED!');
  console.log('========================================');
  console.log('');
  console.log('All submission pages have been opened.');
  console.log('Please complete the forms with:');
  console.log('');
  console.log(`Website URL: ${siteUrl}`);
  console.log(`Business Name: ${siteName}`);
  console.log(`Email: ${email}`);
  console.log(`Phone: ${phone}`);
  console.log(`Location: ${location}`);
  console.log(`Sitemap: ${siteUrl}/sitemap.xml`);
  console.log('');
}

main().catch(console.error);

