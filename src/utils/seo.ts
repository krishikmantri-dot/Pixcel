import { GameReview, GameReviewSEO } from '../types';

export const SITE_NAME = 'pixcel.gg';
export const DEFAULT_SITE_TITLE = 'Pixcel.gg: Honest Game Reviews & Video Game Ratings';
export const DEFAULT_SITE_DESCRIPTION = 'Read honest, unsponsored video game reviews, 10-point score breakdowns, and critique essays across all platforms. Explore top-rated titles now!';

/**
 * Generates optimal, compliant SEO & AEO metadata for any review
 * - Meta Title: strictly <= 60 chars with main keyword near start & compelling hook
 * - Meta Description: strictly <= 160 chars with keyword and reason to click
 * - 3 Headings (H1, H2, H3) closely related to keywords
 * - 2 Q&A sections for Answer Engine Optimization (AEO)
 */
export function generateSEOForReview(review: {
  title: string;
  genre: string;
  rating: number;
  summary: string;
}): GameReviewSEO {
  const keyword = `${review.title} Review`;

  // Craft title <= 60 chars with keyword at start and high click appeal
  let metaTitle = `${keyword}: Worth Playing? | pixcel`;
  if (metaTitle.length > 60) {
    metaTitle = `${keyword} | pixcel.gg`;
  }
  if (metaTitle.length > 60) {
    metaTitle = metaTitle.slice(0, 57) + '...';
  }

  // Craft description <= 160 chars naturally including keyword and ending with reason to click
  const cta = 'Read our full score verdict now!';
  let snippet = review.summary ? review.summary.replace(/"/g, '').trim() : '';
  if (snippet.length > 85) {
    snippet = snippet.slice(0, 85).trim() + '...';
  }
  let metaDescription = `Honest ${keyword} analyzing gameplay and story. ${snippet} ${cta}`;
  if (metaDescription.length > 160) {
    metaDescription = `Honest ${keyword} with gameplay score and verdict. ${cta}`.slice(0, 160);
  }

  return {
    primaryKeyword: keyword,
    secondaryKeywords: [`${review.title} gameplay`, `${review.title} score`, `${review.genre} games`],
    metaTitle,
    metaDescription,
    imageAlt: `${review.title} gameplay screenshot and official game art`,
    headings: {
      h1: `${review.title} Review: Complete Campaign & Performance Verdict`,
      h2: `How Does ${review.title} Compare in the ${review.genre} Genre?`,
      h3: `Core Mechanics, Progression Depth & Final Score Breakdown`
    },
    aeoQuestions: [
      {
        question: `Is ${review.title} worth playing for ${review.genre} fans?`,
        answer: `Yes, ${review.title} delivers a high-quality ${review.genre} experience featuring responsive controls, tactical mechanics, and a polished audio-visual presentation that rewards dedicated playthroughs.`
      },
      {
        question: `What makes ${review.title} stand out in modern gaming?`,
        answer: `The title stands out through its cohesive gameplay loop, expressive player buildcrafting, and deep environmental storytelling that avoids intrusive hand-holding.`
      }
    ]
  };
}

/**
 * Injects Schema.org JSON-LD Structured Data with Review and FAQPage graphs for AEO
 */
export function generateReviewJsonLd(review: GameReview, url: string) {
  const seo = review.seo;
  const aeoEntities = (seo?.aeoQuestions || []).map((qa) => ({
    '@type': 'Question',
    'name': qa.question,
    'acceptedAnswer': {
      '@type': 'Answer',
      'text': qa.answer
    }
  }));

  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Review',
        'itemReviewed': {
          '@type': 'VideoGame',
          'name': review.title,
          'genre': review.genre,
          'gamePlatform': review.platform,
          'image': review.image
        },
        'reviewRating': {
          '@type': 'Rating',
          'ratingValue': review.rating,
          'bestRating': '10',
          'worstRating': '1'
        },
        'author': {
          '@type': 'Person',
          'name': review.author
        },
        'publisher': {
          '@type': 'Organization',
          'name': 'pixcel.gg',
          'url': typeof window !== 'undefined' ? window.location.origin : 'https://pixcel.gg'
        },
        'datePublished': review.date,
        'headline': review.seo?.metaTitle || review.title,
        'description': review.seo?.metaDescription || review.summary,
        'url': url
      },
      {
        '@type': 'FAQPage',
        'mainEntity': aeoEntities
      }
    ]
  };
}

/**
 * Dynamically updates document head metadata for search engines and social cards
 */
export function applyPageSEO(options: {
  title: string;
  description: string;
  url?: string;
  image?: string;
  type?: string;
  jsonLd?: object;
}) {
  if (typeof document === 'undefined') return;

  // 1. Page Title
  document.title = options.title;

  // 2. Helper to set or create meta tags
  const setMetaTag = (attribute: 'name' | 'property', key: string, content: string) => {
    let tag = document.querySelector(`meta[${attribute}="${key}"]`);
    if (!tag) {
      tag = document.createElement('meta');
      tag.setAttribute(attribute, key);
      document.head.appendChild(tag);
    }
    tag.setAttribute('content', content);
  };

  // Standard Meta Description & Robots Directives
  setMetaTag('name', 'description', options.description);
  setMetaTag('name', 'robots', 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1');

  // Canonical Link
  const canonicalUrl = options.url || (typeof window !== 'undefined' ? window.location.href : 'https://pixcel.gg/');
  let canonicalLink = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
  if (!canonicalLink) {
    canonicalLink = document.createElement('link');
    canonicalLink.setAttribute('rel', 'canonical');
    document.head.appendChild(canonicalLink);
  }
  canonicalLink.setAttribute('href', canonicalUrl);

  // OpenGraph Tags
  setMetaTag('property', 'og:title', options.title);
  setMetaTag('property', 'og:description', options.description);
  setMetaTag('property', 'og:type', options.type || 'website');
  setMetaTag('property', 'og:url', canonicalUrl);
  setMetaTag('property', 'og:site_name', SITE_NAME);
  if (options.image) {
    const fullImageUrl = options.image.startsWith('http') 
      ? options.image 
      : `${typeof window !== 'undefined' ? window.location.origin : 'https://pixcel.gg'}${options.image}`;
    setMetaTag('property', 'og:image', fullImageUrl);
    setMetaTag('property', 'og:image:width', '1200');
    setMetaTag('property', 'og:image:height', '630');
    setMetaTag('property', 'og:image:alt', options.title);
  }

  // Twitter Cards
  setMetaTag('name', 'twitter:card', 'summary_large_image');
  setMetaTag('name', 'twitter:site', '@pixcelgg');
  setMetaTag('name', 'twitter:creator', '@pixcelgg');
  setMetaTag('name', 'twitter:title', options.title);
  setMetaTag('name', 'twitter:description', options.description);
  if (options.image) {
    const fullImageUrl = options.image.startsWith('http') 
      ? options.image 
      : `${typeof window !== 'undefined' ? window.location.origin : 'https://pixcel.gg'}${options.image}`;
    setMetaTag('name', 'twitter:image', fullImageUrl);
    setMetaTag('name', 'twitter:image:alt', options.title);
  }

  // JSON-LD Structured Data
  let jsonLdScript = document.querySelector('script#seo-jsonld') as HTMLScriptElement | null;
  if (!jsonLdScript) {
    jsonLdScript = document.createElement('script');
    jsonLdScript.id = 'seo-jsonld';
    jsonLdScript.type = 'application/ld+json';
    document.head.appendChild(jsonLdScript);
  }
  if (options.jsonLd) {
    jsonLdScript.textContent = JSON.stringify(options.jsonLd, null, 2);
  } else {
    // Default WebSite schema
    jsonLdScript.textContent = JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      'name': 'pixcel.gg',
      'url': typeof window !== 'undefined' ? window.location.origin : 'https://pixcel.gg',
      'description': options.description
    }, null, 2);
  }
}
