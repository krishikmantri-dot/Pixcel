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
  // Replace og:title & og:description
  updated = updated.replace(/<meta\s+property="og:title"\s+content=".*?"\s*\/?>/i, `<meta property="og:title" content="${seo.metaTitle}" />`);
  updated = updated.replace(/<meta\s+property="og:description"\s+content=".*?"\s*\/?>/i, `<meta property="og:description" content="${seo.metaDescription}" />`);

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
        <!-- SECTION 1: PRIMARY H1 PAGE HEADING -->
        <header style="border-bottom: 4px solid #ffe600; padding-bottom: 16px; margin-bottom: 24px;">
          <div style="font-size: 11px; font-weight: 800; color: #ffe600; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 4px;">
            [PAGE HEADING &lt;h1&gt; &middot; Primary Keyword: "${seo.primaryKeyword}"]
          </div>
          <h1 style="font-size: 28px; line-height: 1.3; color: #ffe600; margin: 0 0 8px 0; font-family: 'Press Start 2P', monospace;">
            ${seo.headings.h1}
          </h1>
          <p style="font-size: 14px; color: #a3a3a3; margin: 0;">
            ${seo.metaDescription}
          </p>
        </header>

        <!-- SECTION 2: SECTION H2 HEADING -->
        <section style="margin-bottom: 28px;">
          <div style="font-size: 11px; font-weight: 800; color: #ffe600; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 4px;">
            [SECTION HEADING &lt;h2&gt; &middot; Secondary Keyword Related]
          </div>
          <h2 style="font-size: 22px; color: #ffffff; margin: 0 0 12px 0;">
            ${seo.headings.h2}
          </h2>
          
          <!-- SECTION 3: SUBSECTION H3 HEADING -->
          <div style="border-left: 4px solid #ffe600; background: #121212; padding: 12px 16px; margin-bottom: 24px;">
            <div style="font-size: 11px; font-weight: 800; color: #ffe600; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 4px;">
              [SUBSECTION HEADING &lt;h3&gt; &middot; Mechanics &amp; Score Critique]
            </div>
            <h3 style="font-size: 18px; color: #ffffff; margin: 0;">
              ${seo.headings.h3}
            </h3>
          </div>
        </section>

        <!-- SECTION 4: 2 ARTICLES IN QUESTION-ANSWER FORMAT FOR AEO -->
        <section id="aeo-qa-articles" style="border: 2px solid #2b593f; background: #0c140f; padding: 20px; margin-bottom: 30px;">
          <div style="font-size: 11px; font-weight: 800; color: #48bb78; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 6px;">
            [AEO ARTICLES &middot; Answer Engine Optimization &middot; 2 Articles in Question-Answer Format for AI Search]
          </div>
          <h3 style="font-size: 18px; color: #ffffff; margin: 0 0 16px 0;">
            Frequently Asked Questions &amp; Direct Answers for AI Search &amp; Players
          </h3>

          <!-- AEO Article 1 -->
          <article style="background: #080d0a; border-left: 4px solid #48bb78; padding: 14px 16px; margin-bottom: 16px;">
            <div style="font-size: 11px; font-weight: 700; color: #48bb78; text-transform: uppercase; margin-bottom: 4px;">
              AEO Question 1 (Conversational User Search Query)
            </div>
            <h4 style="font-size: 15px; font-weight: 700; color: #ffffff; margin: 0 0 8px 0;">
              Q: ${seo.aeoQuestions[0].question}
            </h4>
            <div style="font-size: 14px; line-height: 1.6; color: #d1fae5;">
              <strong style="color: #48bb78; display: block; margin-bottom: 4px; text-transform: uppercase; font-size: 11px;">
                Direct Authoritative Answer for AI Overviews:
              </strong>
              <p style="margin: 0;">
                ${seo.aeoQuestions[0].answer}
              </p>
            </div>
          </article>

          <!-- AEO Article 2 -->
          <article style="background: #080d0a; border-left: 4px solid #48bb78; padding: 14px 16px;">
            <div style="font-size: 11px; font-weight: 700; color: #48bb78; text-transform: uppercase; margin-bottom: 4px;">
              AEO Question 2 (Conversational User Search Query)
            </div>
            <h4 style="font-size: 15px; font-weight: 700; color: #ffffff; margin: 0 0 8px 0;">
              Q: ${seo.aeoQuestions[1].question}
            </h4>
            <div style="font-size: 14px; line-height: 1.6; color: #d1fae5;">
              <strong style="color: #48bb78; display: block; margin-bottom: 4px; text-transform: uppercase; font-size: 11px;">
                Direct Authoritative Answer for AI Overviews:
              </strong>
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
}

// Ensure robots.txt and sitemap.xml are in dist
const publicRobots = path.resolve(__dirname, '../public/robots.txt');
const publicSitemap = path.resolve(__dirname, '../public/sitemap.xml');
if (fs.existsSync(publicRobots)) {
  fs.copyFileSync(publicRobots, path.join(distDir, 'robots.txt'));
}
if (fs.existsSync(publicSitemap)) {
  fs.copyFileSync(publicSitemap, path.join(distDir, 'sitemap.xml'));
}

console.log('Successfully generated pre-rendered static HTML, robots.txt, and sitemap.xml for all reviews!');
