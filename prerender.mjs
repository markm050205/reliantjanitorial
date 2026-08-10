import fs from 'node:fs';
import path from 'node:path';
import { render } from './dist-ssr/entry-server.js';
import {
  ROUTES, BIZ, TOWNS, INDUSTRIES, SERVICE_TYPES, FAQS, TOWN_PAGES, SOCIAL_PROFILES, SPOKES,
} from './src/data.js';

const DIST = path.resolve('./dist');
const template = fs.readFileSync(path.join(DIST, 'index.html'), 'utf8');
const BIZ_ID = `${BIZ.url}/#business`;

const businessLd = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  '@id': BIZ_ID,
  name: BIZ.name,
  url: BIZ.url,
  ...(BIZ.phone ? { telephone: BIZ.phone } : {}),
  email: BIZ.email,
  image: `${BIZ.url}/favicon.svg`,
  logo: `${BIZ.url}/favicon.svg`,
  description:
    'Commercial cleaning and janitorial services for offices, medical practices, daycares, gyms, banks, and churches in Camden County, NJ.',
  address: { '@type': 'PostalAddress', addressRegion: 'NJ', addressCountry: 'US' },
  areaServed: TOWNS.map((t) => ({ '@type': 'City', name: `${t}, NJ` })),
  priceRange: '$$',
  ...(SOCIAL_PROFILES.length ? { sameAs: SOCIAL_PROFILES } : {}),
};

function extraLdFor(routePath) {
  // Industry pages: Service schema
  const ind = INDUSTRIES.find((i) => routePath === `/industries/${i.slug}`);
  if (ind) {
    return {
      '@context': 'https://schema.org',
      '@type': 'Service',
      name: ind.h1,
      serviceType: SERVICE_TYPES[ind.slug],
      provider: { '@id': BIZ_ID },
      areaServed: { '@type': 'AdministrativeArea', name: 'Camden County, NJ' },
      description: ind.metaDesc,
    };
  }
  // Town pages: Service schema localized to that town
  const town = TOWN_PAGES.find((t) => routePath === `/service-areas/${t.slug}`);
  if (town) {
    return {
      '@context': 'https://schema.org',
      '@type': 'Service',
      name: town.h1,
      serviceType: 'Commercial cleaning and janitorial service',
      provider: { '@id': BIZ_ID },
      areaServed: { '@type': 'City', name: `${town.town}, NJ` },
      description: town.metaDesc,
    };
  }
  // Resource guides: Article schema with honest dates
  const spoke = SPOKES.find((s) => routePath === `/resources/${s.slug}`);
  if (spoke) {
    return {
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: spoke.h1,
      description: spoke.metaDesc,
      datePublished: '2026-08-10',
      dateModified: '2026-08-10',
      author: { '@type': 'Organization', name: BIZ.name, url: BIZ.url },
      publisher: { '@id': BIZ_ID },
      mainEntityOfPage: `${BIZ.url}${routePath}/`,
    };
  }
  // Homepage: FAQPage matching the visible FAQ section
  if (routePath === '/') {
    return {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: FAQS.map((f) => ({
        '@type': 'Question',
        name: f.q,
        acceptedAnswer: { '@type': 'Answer', text: f.a },
      })),
    };
  }
  return null;
}

function headBlock({ title, metaDesc, canonical, noindex = false, extraLd = null }) {
  return [
    `<title>${title}</title>`,
    `<meta name="description" content="${metaDesc}" />`,
    noindex ? '<meta name="robots" content="noindex" />' : '',
    `<link rel="canonical" href="${canonical}" />`,
    `<meta property="og:site_name" content="${BIZ.name}" />`,
    `<meta property="og:type" content="website" />`,
    `<meta property="og:title" content="${title}" />`,
    `<meta property="og:description" content="${metaDesc}" />`,
    `<meta property="og:url" content="${canonical}" />`,
    `<meta name="twitter:card" content="summary" />`,
    `<script type="application/ld+json">${JSON.stringify(businessLd)}</script>`,
    extraLd ? `<script type="application/ld+json">${JSON.stringify(extraLd)}</script>` : '',
  ]
    .filter(Boolean)
    .join('\n    ');
}

function writePage(route, html, head) {
  const outDir = route === '/' ? DIST : path.join(DIST, route);
  fs.mkdirSync(outDir, { recursive: true });
  let page = template.replace(
    /<!--seo-head-->[\s\S]*?<!--\/seo-head-->/,
    `<!--seo-head-->\n    ${head}\n    <!--/seo-head-->`
  );
  page = page.replace('<!--app-html-->', html);
  fs.writeFileSync(path.join(outDir, 'index.html'), page);
}

for (const route of ROUTES) {
  const canonical = `${BIZ.url}${route.path === '/' ? '/' : route.path + '/'}`;
  const html = render(route.path);
  writePage(route.path, html, headBlock({ ...route, canonical, extraLd: extraLdFor(route.path) }));
  console.log(`prerendered ${route.path}`);
}

// 404 page for Cloudflare Pages
const nfHtml = render('/__not_found__');
const nfHead = headBlock({
  title: 'Page Not Found | Reliant Janitorial',
  metaDesc: 'That page does not exist.',
  canonical: `${BIZ.url}/`,
  noindex: true,
});
let nfPage = template.replace(
  /<!--seo-head-->[\s\S]*?<!--\/seo-head-->/,
  `<!--seo-head-->\n    ${nfHead}\n    <!--/seo-head-->`
);
nfPage = nfPage.replace('<!--app-html-->', nfHtml);
fs.writeFileSync(path.join(DIST, '404.html'), nfPage);
console.log('prerendered 404.html');

// sitemap.xml
const today = new Date().toISOString().slice(0, 10);
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${ROUTES.map(
  (r) => `  <url>
    <loc>${BIZ.url}${r.path === '/' ? '/' : r.path + '/'}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${r.path === '/' ? 'weekly' : 'monthly'}</changefreq>
    <priority>${r.path === '/' ? '1.0' : '0.8'}</priority>
  </url>`
).join('\n')}
</urlset>
`;
fs.writeFileSync(path.join(DIST, 'sitemap.xml'), sitemap);
console.log(`wrote sitemap.xml (${ROUTES.length} urls)`);
