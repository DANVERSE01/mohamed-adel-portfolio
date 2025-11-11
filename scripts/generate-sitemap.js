#!/usr/bin/env node

/**
 * DANVERSE Sitemap Generator
 * Generates sitemap.xml for better SEO
 */

import { writeFileSync } from 'fs';
import { join } from 'path';

const BASE_URL = 'https://danverse.ai';

const routes = [
  { path: '/', priority: 1.0, changefreq: 'weekly' },
  { path: '/work', priority: 0.9, changefreq: 'weekly' },
  { path: '/services', priority: 0.8, changefreq: 'monthly' },
  { path: '/about', priority: 0.7, changefreq: 'monthly' },
  { path: '/awards', priority: 0.6, changefreq: 'monthly' },
  { path: '/contact', priority: 0.8, changefreq: 'monthly' },
];

function generateSitemap() {
  const now = new Date().toISOString();
  
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${routes
  .map(
    (route) => `  <url>
    <loc>${BASE_URL}${route.path}</loc>
    <lastmod>${now}</lastmod>
    <changefreq>${route.changefreq}</changefreq>
    <priority>${route.priority}</priority>
  </url>`
  )
  .join('\n')}
</urlset>`;

  const outputPath = join(process.cwd(), 'client', 'public', 'sitemap.xml');
  writeFileSync(outputPath, xml, 'utf8');
  
  console.log('✅ Sitemap generated successfully at:', outputPath);
}

generateSitemap();
