import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { SEO_PRESETS } from '../src/data/seoPresets';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const distDir = path.resolve(__dirname, '../dist');
const indexHtmlPath = path.join(distDir, 'index.html');

if (!fs.existsSync(indexHtmlPath)) {
  console.log('index.html not found in dist, skipping prerender.');
  process.exit(0);
}

const baseHtml = fs.readFileSync(indexHtmlPath, 'utf-8');

for (const [reviewId, seo] of Object.entries(SEO_PRESETS)) {
  const reviewDir = path.join(distDir, 'review', reviewId);
  fs.mkdirSync(reviewDir, { recursive: true });

  let updated = baseHtml;
  // Replace title
  updated = updated.replace(/<title>.*?<\/title>/i, `<title>${seo.metaTitle}</title>`);
  // Replace meta description
  updated = updated.replace(/<meta\s+name="description"\s+content=".*?"\s*\/?>/i, `<meta name="description" content="${seo.metaDescription}" />`);
  // Replace canonical link
  updated = updated.replace(/<link\s+rel="canonical"\s+href=".*?"\s*\/?>/i, `<link rel="canonical" href="https://pixcel.gg/review/${reviewId}" />`);
  // Replace og:title & og:description & og:image
  updated = updated.replace(/<meta\s+property="og:title"\s+content=".*?"\s*\/?>/i, `<meta property="og:title" content="${seo.metaTitle}" />`);
  updated = updated.replace(/<meta\s+property="og:description"\s+content=".*?"\s*\/?>/i, `<meta property="og:description" content="${seo.metaDescription}" />`);
  updated = updated.replace(/<meta\s+property="og:url"\s+content=".*?"\s*\/?>/i, `<meta property="og:url" content="https://pixcel.gg/review/${reviewId}" />`);
  updated = updated.replace(/<meta\s+property="og:image"\s+content=".*?"\s*\/?>/i, `<meta property="og:image" content="https://pixcel.gg/games/${reviewId.replace(/-/g, '_')}.jpg" />`);

  // Replace twitter:title, twitter:description, twitter:image
  updated = updated.replace(/<meta\s+name="twitter:title"\s+content=".*?"\s*\/?>/i, `<meta name="twitter:title" content="${seo.metaTitle}" />`);
  updated = updated.replace(/<meta\s+name="twitter:description"\s+content=".*?"\s*\/?>/i, `<meta name="twitter:description" content="${seo.metaDescription}" />`);
  updated = updated.replace(/<meta\s+name="twitter:image"\s+content=".*?"\s*\/?>/i, `<meta name="twitter:image" content="https://pixcel.gg/games/${reviewId.replace(/-/g, '_')}.jpg" />`);

  // Replace JSON-LD schema
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Review',
        'itemReviewed': {
          '@type': 'VideoGame',
          'name': seo.headings.h1,
          'image': `/games/${reviewId.replace(/-/g, '_')}.jpg`
        },
        'headline': seo.metaTitle,
        'description': seo.metaDescription,
        'url': `https://pixcel.gg/review/${reviewId}`
      },
      {
        '@type': 'FAQPage',
        'mainEntity': seo.aeoQuestions.map((q) => ({
          '@type': 'Question',
          'name': q.question,
          'acceptedAnswer': {
            '@type': 'Answer',
            'text': q.answer
          }
        }))
      }
    ]
  };

  updated = updated.replace(
    /<script\s+type="application\/ld\+json"\s+id="seo-jsonld">[\s\S]*?<\/script>/i,
    `<script type="application/ld+json" id="seo-jsonld">\n${JSON.stringify(jsonLd, null, 2)}\n</script>`
  );

  const gameSourceHtml = `
      <main id="seo-aeo-raw-source" style="max-width: 900px; margin: 0 auto; padding: 24px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; color: #f5f5f5;">
        <header style="border-bottom: 4px solid #ffe600; padding-bottom: 16px; margin-bottom: 24px;">
          <h1 style="font-size: 28px; line-height: 1.3; color: #ffe600; margin: 0 0 8px 0; font-family: 'Press Start 2P', monospace;">
            ${seo.headings.h1}
          </h1>
          <p style="font-size: 14px; color: #a3a3a3; margin: 0;">
            ${seo.metaDescription}
          </p>
        </header>

        <section style="margin-bottom: 28px;">
          <h2 style="font-size: 22px; color: #ffffff; margin: 0 0 12px 0;">
            ${seo.headings.h2}
          </h2>
          
          <div style="border-left: 4px solid #ffe600; background: #121212; padding: 12px 16px; margin-bottom: 24px;">
            <h3 style="font-size: 18px; color: #ffffff; margin: 0;">
              ${seo.headings.h3}
            </h3>
          </div>
        </section>

        <section id="faq-articles" style="border: 2px solid #2b2b2b; background: #0c0c0c; padding: 20px; margin-bottom: 30px;">
          <h3 style="font-size: 18px; color: #ffe600; margin: 0 0 16px 0;">
            Frequently Asked Questions
          </h3>

          <article style="background: #141414; border-left: 4px solid #ffe600; padding: 14px 16px; margin-bottom: 16px;">
            <h4 style="font-size: 15px; font-weight: 700; color: #ffffff; margin: 0 0 8px 0;">
              ${seo.aeoQuestions[0].question}
            </h4>
            <div style="font-size: 14px; line-height: 1.6; color: #d4d4d4;">
              <p style="margin: 0;">
                ${seo.aeoQuestions[0].answer}
              </p>
            </div>
          </article>

          <article style="background: #141414; border-left: 4px solid #ffe600; padding: 14px 16px;">
            <h4 style="font-size: 15px; font-weight: 700; color: #ffffff; margin: 0 0 8px 0;">
              ${seo.aeoQuestions[1].question}
            </h4>
            <div style="font-size: 14px; line-height: 1.6; color: #d4d4d4;">
              <p style="margin: 0;">
                ${seo.aeoQuestions[1].answer}
              </p>
            </div>
          </article>
        </section>
      </main>
  `.trim();

  updated = updated.replace(/<main\s+id="seo-aeo-raw-source"[\s\S]*?<\/main>/i, gameSourceHtml);

  fs.writeFileSync(path.join(reviewDir, 'index.html'), updated, 'utf-8');
  // Also write [id].html directly inside dist/review for Vercel cleanUrls: true
  fs.writeFileSync(path.join(distDir, 'review', `${reviewId}.html`), updated, 'utf-8');
}

// Ensure robots.txt, sitemap.xml, and google verification are in dist
const publicRobots = path.resolve(__dirname, '../public/robots.txt');
const publicSitemap = path.resolve(__dirname, '../public/sitemap.xml');
const publicGoogle = path.resolve(__dirname, '../public/google0ecb177c8b5f9ca2.html');
if (fs.existsSync(publicRobots)) {
  fs.copyFileSync(publicRobots, path.join(distDir, 'robots.txt'));
}
if (fs.existsSync(publicSitemap)) {
  fs.copyFileSync(publicSitemap, path.join(distDir, 'sitemap.xml'));
}
if (fs.existsSync(publicGoogle)) {
  fs.copyFileSync(publicGoogle, path.join(distDir, 'google0ecb177c8b5f9ca2.html'));
}

console.log('Successfully generated pre-rendered static HTML (.html & /index.html), robots.txt, and sitemap.xml for all reviews!');
