const fs = require('fs');
const path = require('path');

// Read constants.ts to extract prompt IDs
const constantsPath = path.join(__dirname, '..', 'constants.ts');
const constantsContent = fs.readFileSync(constantsPath, 'utf8');

// Extract all IDs from the constants file
const idMatches = constantsContent.match(/id:\s*(\d+)/g);
const promptIds = idMatches ? idMatches.map(match => parseInt(match.replace(/id:\s*/, ''))) : [];

// Base URL for the site
const BASE_URL = 'https://adorably.online';

// Generate sitemap XML
function generateSitemap() {
  const today = new Date().toISOString().split('T')[0];

  let xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <!-- Homepage -->
  <url>
    <loc>${BASE_URL}/</loc>
    <lastmod>${today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
`;

  // Add each prompt detail page
  promptIds.forEach(id => {
    xml += `  <url>
    <loc>${BASE_URL}/prompt/${id}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
`;
  });

  xml += `</urlset>`;

  return xml;
}

// Write sitemap to public directory
const publicDir = path.join(__dirname, '..', 'public');
if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir, { recursive: true });
}

const sitemapPath = path.join(publicDir, 'sitemap.xml');
const sitemap = generateSitemap();
fs.writeFileSync(sitemapPath, sitemap);

console.log(`Sitemap generated successfully at ${sitemapPath}`);
console.log(`Total URLs: ${promptIds.length + 1} (1 homepage + ${promptIds.length} prompt pages)`);
