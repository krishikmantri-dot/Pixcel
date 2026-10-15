import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { SEO_PRESETS } from '../src/data/seoPresets';
import { INITIAL_BLOGS } from '../src/data/defaultReviews';

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
  // Combined short-tail and long-tail keywords
  const allKeywords = [
    ...(seo.shortTailKeywords || []),
    ...(seo.secondaryKeywords || []),
    seo.primaryKeyword
  ];
  const keywordsString = Array.from(new Set(allKeywords)).join(', ');

  // Replace title
  updated = updated.replace(/<title>.*?<\/title>/i, `<title>${seo.metaTitle}</title>`);
  // Replace meta description
  updated = updated.replace(/<meta\s+name="description"\s+content=".*?"\s*\/?>/i, `<meta name="description" content="${seo.metaDescription}" />`);
  // Replace meta keywords with short-tail and long-tail keywords
  updated = updated.replace(/<meta\s+name="keywords"\s+content=".*?"\s*\/?>/i, `<meta name="keywords" content="${keywordsString}" />`);
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
          'image': `/games/${reviewId.replace(/-/g, '_')}.jpg`,
          'keywords': keywordsString
        },
        'headline': seo.metaTitle,
        'description': seo.metaDescription,
        'keywords': keywordsString,
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

  const reviewData = INITIAL_BLOGS.find((b) => b.id === reviewId) || {
    id: reviewId,
    title: reviewId.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase()),
    genre: 'Action RPG',
    rating: 9.5,
    summary: seo.metaDescription,
    fullReview: seo.metaDescription,
    author: 'Elena Rostova',
    platform: 'PC · PS5 · Xbox Series X',
    date: 'Oct 2024',
    playtime: '40 hours logged',
    pros: ['Immersive gameplay depth', 'Stunning audiovisual design', 'Compelling worldbuilding'],
    cons: ['Challenging learning curve'],
    breakdown: { gameplay: 9.5, graphics: 9.5, sound: 9.5, story: 9.5 }
  };

  // Other reviews for contextual internal links with descriptive anchor text (All 9 other reviews)
  const otherReviewsList = Object.entries(SEO_PRESETS)
    .filter(([id]) => id !== reviewId)
    .map(
      ([otherId, otherSeo]) =>
        `<li style="margin-bottom: 8px;"><a href="https://pixcel.gg/review/${otherId}" style="color: #ffe600; text-decoration: underline; font-weight: 600;">Read Full Review: ${otherSeo.headings.h1}</a></li>`
    )
    .join('\n            ');

  // Review editorial paragraphs formatted for crawler accessibility
  const paragraphsHtml = (reviewData.fullReview || reviewData.summary)
    .split('\n\n')
    .filter((p: string) => p.trim().length > 0)
    .map((p: string) => `<p style="font-size: 16px; line-height: 1.8; color: #d4d4d4; margin: 0 0 18px 0; background: #0d0d0d; padding: 18px; border-left: 4px solid #ffe600;">${p.trim()}</p>`)
    .join('\n          ');

  // Breakdown metrics HTML
  const breakdownHtml = reviewData.breakdown
    ? `
        <div style="background: #0d0d0d; border: 2px solid #2b2b2b; padding: 20px; margin-bottom: 30px;">
          <h3 style="font-size: 16px; color: #ffe600; margin: 0 0 16px 0; text-transform: uppercase;">
            Performance &amp; Component Breakdown Ratings
          </h3>
          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); gap: 12px; font-size: 14px;">
            <div style="background: #141414; padding: 12px; border: 1px solid #333;"><strong>Gameplay Mechanics:</strong> <span style="color: #ffe600;">${reviewData.breakdown.gameplay.toFixed(1)} / 10</span></div>
            <div style="background: #141414; padding: 12px; border: 1px solid #333;"><strong>Graphics &amp; Visuals:</strong> <span style="color: #ffe600;">${reviewData.breakdown.graphics.toFixed(1)} / 10</span></div>
            <div style="background: #141414; padding: 12px; border: 1px solid #333;"><strong>Soundtrack &amp; Audio:</strong> <span style="color: #ffe600;">${reviewData.breakdown.sound.toFixed(1)} / 10</span></div>
            <div style="background: #141414; padding: 12px; border: 1px solid #333;"><strong>Narrative &amp; Lore:</strong> <span style="color: #ffe600;">${reviewData.breakdown.story.toFixed(1)} / 10</span></div>
          </div>
        </div>
      `
    : '';

  // Pros & Cons HTML
  const prosConsHtml = `
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 16px; margin-bottom: 30px;">
        <div style="background: #0e140e; border: 2px solid #38a169; padding: 16px;">
          <h4 style="color: #48bb78; margin: 0 0 10px 0; font-size: 15px;">[+] Key Strengths &amp; Highlights</h4>
          <ul style="margin: 0; padding-left: 20px; font-size: 14px; color: #e2e8f0; line-height: 1.6;">
            ${(reviewData.pros || []).map((pro: string) => `<li>${pro}</li>`).join('')}
          </ul>
        </div>
        <div style="background: #170e0e; border: 2px solid #e53e3e; padding: 16px;">
          <h4 style="color: #f56565; margin: 0 0 10px 0; font-size: 15px;">[-] Drawbacks &amp; Shortcomings</h4>
          <ul style="margin: 0; padding-left: 20px; font-size: 14px; color: #e2e8f0; line-height: 1.6;">
            ${(reviewData.cons || []).map((con: string) => `<li>${con}</li>`).join('')}
          </ul>
        </div>
      </div>
  `;

  const gameSourceHtml = `
      <main id="seo-aeo-raw-source" style="max-width: 900px; margin: 0 auto; padding: 24px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; color: #f5f5f5;">
        {/* Breadcrumb Navigation - Internal Link with Descriptive Anchor Text */}
        <nav aria-label="Review Breadcrumbs" style="margin-bottom: 20px; font-size: 14px; font-weight: 600;">
          <a href="https://pixcel.gg/" style="color: #ffe600; text-decoration: underline;">Return to All Video Game Reviews Catalogue</a>
          <span style="color: #666; margin: 0 8px;">/</span>
          <a href="https://pixcel.gg/#reviews-section" style="color: #ffe600; text-decoration: underline;">${reviewData.genre} Reviews</a>
          <span style="color: #666; margin: 0 8px;">/</span>
          <span style="color: #fff;">${reviewData.title}</span>
        </nav>

        <header style="border-bottom: 4px solid #ffe600; padding-bottom: 16px; margin-bottom: 24px;">
          {/* Main H1 Heading containing target keywords */}
          <h1 style="font-size: 28px; line-height: 1.3; color: #ffe600; margin: 0 0 8px 0; font-family: 'Press Start 2P', monospace;">
            ${seo.headings.h1}
          </h1>

          {/* Subtitle ensuring all words from H1 heading exist in primary body content */}
          <p style="font-size: 15px; color: #ffffff; line-height: 1.6; margin: 0 0 16px 0;">
            Welcome to our definitive <strong>${reviewData.title} review and complete campaign verdict</strong>. In this comprehensive critique, we provide an in-depth score breakdown, technical performance evaluation, and honest gameplay impressions for PC and console gamers.
          </p>

          <p style="font-size: 14px; color: #a3a3a3; margin: 0 0 16px 0;">
            ${seo.metaDescription}
          </p>

          <div style="border: 4px solid #ffe600; background: #000; overflow: hidden; margin-top: 16px;">
            <img 
              src="https://pixcel.gg/games/${reviewId.replace(/-/g, '_')}.jpg" 
              alt="${seo.imageAlt}" 
              style="width: 100%; max-height: 440px; object-fit: cover; display: block;" 
            />
          </div>
        </header>

        {/* Executive Verdict Section */}
        <section aria-label="Executive Verdict" style="margin-bottom: 28px; background: #121210; border-left: 4px solid #ffe600; padding: 18px;">
          <h2 style="font-size: 18px; color: #ffe600; margin: 0 0 8px 0; text-transform: uppercase;">
            Executive Verdict (${reviewData.rating.toFixed(1)} / 10 Score)
          </h2>
          <p style="font-size: 13px; color: #ffe600; margin: 0 0 8px 0; font-weight: bold; text-transform: uppercase;">
            In-Depth ${reviewData.title} Review &amp; Complete Campaign Verdict
          </p>
          <p style="font-size: 16px; line-height: 1.6; color: #ffffff; font-style: italic; margin: 0;">
            "${reviewData.summary}"
          </p>
        </section>

        ${breakdownHtml}

        {/* Editorial Critique Body with H2 and H3 Headings */}
        <section aria-label="Editorial Critique" style="margin-bottom: 28px;">
          <h2 style="font-size: 22px; color: #ffffff; margin: 0 0 16px 0;">
            ${seo.headings.h2}
          </h2>

          ${paragraphsHtml}
          
          <div style="border-left: 4px solid #ffe600; background: #121212; padding: 14px 18px; margin: 24px 0 18px 0;">
            <h3 style="font-size: 18px; color: #ffffff; margin: 0;">
              ${seo.headings.h3}
            </h3>
          </div>
        </section>

        ${prosConsHtml}

        {/* AEO Frequently Asked Questions */}
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

        {/* Comprehensive Related Game Reviews & Internal Links Structure (20+ Internal Links) */}
        <section aria-label="Related Game Reviews" style="border-top: 2px solid #2b2b2b; padding-top: 24px; margin-top: 24px;">
          <h3 style="font-size: 18px; color: #ffe600; margin: 0 0 14px 0;">
            Explore All Video Game Reviews &amp; Critiques in Catalogue
          </h3>
          <ul style="list-style: none; padding: 0; margin: 0 0 24px 0; display: grid; gap: 10px; font-size: 14px;">
            ${otherReviewsList}
          </ul>

          <div style="padding: 16px; background: #111111; border: 1px solid #262626; margin-bottom: 20px;">
            <strong style="color: #ffe600; font-size: 13px; text-transform: uppercase; display: block; margin-bottom: 10px;">
              Browse Reviews by Video Game Genre
            </strong>
            <div style="display: flex; flex-wrap: wrap; gap: 8px; font-size: 13px;">
              <a href="https://pixcel.gg/#reviews-section" style="color: #cccccc; text-decoration: underline;">Action RPG Reviews</a> ·
              <a href="https://pixcel.gg/#reviews-section" style="color: #cccccc; text-decoration: underline;">Sci-Fi RPG Reviews</a> ·
              <a href="https://pixcel.gg/#reviews-section" style="color: #cccccc; text-decoration: underline;">Action Adventure Reviews</a> ·
              <a href="https://pixcel.gg/#reviews-section" style="color: #cccccc; text-decoration: underline;">Metroidvania Reviews</a> ·
              <a href="https://pixcel.gg/#reviews-section" style="color: #cccccc; text-decoration: underline;">Western RPG Reviews</a> ·
              <a href="https://pixcel.gg/#reviews-section" style="color: #cccccc; text-decoration: underline;">Tactical FPS Reviews</a> ·
              <a href="https://pixcel.gg/#reviews-section" style="color: #cccccc; text-decoration: underline;">Open-World Racing Reviews</a> ·
              <a href="https://pixcel.gg/#reviews-section" style="color: #cccccc; text-decoration: underline;">Cozy Farming Sims</a>
            </div>
          </div>

          <div style="font-size: 13px; color: #888; border-top: 1px solid #222; padding-top: 14px;">
            <a href="https://pixcel.gg/" style="color: #ffe600; text-decoration: underline;">Pixcel.gg Homepage</a>
            <span style="margin: 0 8px;">·</span>
            <a href="https://pixcel.gg/#hall-of-fame" style="color: #ffe600; text-decoration: underline;">Hall of Fame Masterpieces</a>
            <span style="margin: 0 8px;">·</span>
            <a href="https://pixcel.gg/sitemap.xml" style="color: #a3a3a3; text-decoration: underline;">Google Search Console XML Sitemap</a>
            <span style="margin: 0 8px;">·</span>
            <a href="https://pixcel.gg/robots.txt" style="color: #a3a3a3; text-decoration: underline;">Robots.txt Crawler Directives</a>
          </div>
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
