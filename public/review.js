/**
 * ============================================================================
 * pixcel.gg — Standalone Review Page Controller
 * Handles URL parsing, localStorage hydration, SEO metadata injection,
 * dynamic DOM rendering, and Schema.org JSON-LD generation.
 * ============================================================================
 */

(function initReviewPage() {
  // 1. Parse target review ID from URL query parameters (?id=... or ?review=...)
  const urlParams = new URLSearchParams(window.location.search);
  const targetReviewId = urlParams.get('id') || urlParams.get('review') || 'elden-ring-shadow-erdtree';

  // 2. Hydrate reviews from localStorage
  let storedReviews = [];
  try {
    const rawData = localStorage.getItem('pixcel_gg_reviews_v5') || localStorage.getItem('pixcel_gg_reviews_v4');
    if (rawData) {
      storedReviews = JSON.parse(rawData);
    }
  } catch (error) {
    console.warn('[pixcel.gg] Could not parse stored reviews from localStorage:', error);
  }

  // 3. Fallback review definition if not found in storage
  const defaultFallbackReview = {
    id: 'elden-ring-shadow-erdtree',
    title: 'Elden Ring: Shadow of the Erdtree',
    genre: 'Action RPG',
    rating: 9.8,
    image: '/games/elden_ring.jpg',
    imageAlt: 'Elden Ring Shadow of the Erdtree official gameplay artwork and review score',
    metaTitle: 'Elden Ring Erdtree Review: Masterpiece or Too Hard?',
    metaDescription: "Honest Elden Ring Erdtree review covering boss fights, weapons, and world design. Discover whether FromSoftware's dark DLC is worth playing today.",
    seoHeadings: {
      h1: 'Elden Ring: Shadow of the Erdtree Review & Complete Breakdown',
      h2: 'Gameplay Impressions, Open-World Exploration & Boss Battles',
      h3: 'Scadutree Fragment Scaling, Difficulty Curve & Final Score Verdict'
    },
    aeoQuestions: [
      {
        question: 'Is Elden Ring: Shadow of the Erdtree worth playing for returning players?',
        answer: 'Yes, Elden Ring: Shadow of the Erdtree is widely considered a masterpiece that delivers over 40 hours of rich dark-fantasy exploration, 8 new weapon classes, and breathtaking multi-tiered level architecture that rivals the base game.'
      },
      {
        question: 'How does the Scadutree Fragment difficulty system work in the DLC?',
        answer: 'The DLC introduces Scadutree Fragments and Revered Spirit Ashes, an isolated realm-scaling mechanic that increases damage output and defense within the Land of Shadow, ensuring fair challenge regardless of your base game character level.'
      }
    ],
    author: 'Elena Rostova',
    platform: 'PC · PS5 · Xbox Series X',
    playtime: '52 hours logged',
    date: 'Oct 12, 2024',
    summary: "FromSoftware has achieved what few developers in gaming history could dream of: matching, and in many respects surpassing, the monumental standard established by the 2022 Game of the Year. Shadow of the Erdtree delivers fifty hours of breathless dark fantasy exploration across the Land of Shadow, uniting peerless vertical level architecture, eight inventive weapon classes, and unforgettable boss battles into a certified 8-bit retro arcade masterpiece.",
    fullReview: "FromSoftware has achieved what few developers in gaming history could dream of: matching, and in many respects surpassing, the monumental standard established by the 2022 Game of the Year. Shadow of the Erdtree transports the Tarnished across the ethereal veil directly into the Land of Shadow—a densely layered, labyrinthine continent that elevates vertical map architecture into high art. Rather than simply expanding outward like conventional open-world sequels, director Hidetaka Miyazaki folded the geography upon itself. Vast chasms plunge thousands of feet down to forgotten cerulean coastlines, while crumbling gothic citadels like the Belurat Tower Settlement and the Shadow Keep interlock seamlessly with subterranean tombs, hidden spiritsprings, and towering golden spires.\n\nEvery winding ravine, jagged cliffside, and shadowed catacomb holds secrets that challenge even the most hardened Souls veterans. The expansion introduces eight completely new weapon categories that fundamentally revitalize buildcrafting and experimental loadouts. Players can ditch heavy broadswords to master kinetic hand-to-hand martial arts, execute lightning-fast combos with reverse-grip blades, launch devastating thrusting shields, or throw spinning throwing daggers across crowded arenas. Crucially, the addition of the Scadutree Blessing progression mechanic prevents over-leveled characters from steamrolling the campaign. By tying attack power and physical damage negation directly to collectible fragments scattered across the world, FromSoftware ingeniously incentivizes thorough environmental exploration before forcing players to step into the fog gates of monumental demigods.\n\nThe boss encounters themselves rank among the most spectacular and punishing ever designed. Battles against Messmer the Impaler, the Divine Beast Dancing Lion, and Rellana, Twin Moon Knight combine staggering visual pageantry with ruthless mechanical precision. Bosses execute intricate multi-phase dance-like attack patterns accompanied by operatic orchestral crescendos that demand total rhythmic mastery, tight dodge timings, and disciplined stamina management. Learning the telegraphs for Messmer's fiery serpentine onslaughts or navigating the blinding lunar magic of Castle Ensis transforms every duel into an unforgettable trial of patience, reflexes, and tactical adaptation.\n\nBeyond its relentless combat challenge lies an evocative, tragedy-laden narrative that finally unravels the enigmatic motivations of Kind Miquella. Watching the young demigod divest himself of his royal blood, his divine golden flesh, and his loving heart to create a gentle age of compassion carries palpable heartbreak, especially as you uncover St. Trina's mournful warnings buried deep in stone fissures. Backed by jaw-dropping art direction, exceptional musical composition, and sixty hours of peerless dark fantasy atmosphere, Shadow of the Erdtree stands as an undisputed landmark that redefines what a video game expansion can achieve. From the haunting glow of the Scadutree to the solemn beauty of the Shaman Village, this expansion represents a crowning achievement in modern action role-playing game design that will be celebrated for decades to come.",
    pros: [
      'Peerless vertical level architecture and hidden zones',
      'Eight versatile and inventive new weapon categories',
      'Memorable boss fights with unmatched cinematic scoring'
    ],
    cons: [
      'Punishing late-game difficulty spike for casual builds',
      'Frame pacing dips in complex particle-heavy arenas'
    ]
  };

  const activeReview = storedReviews.find((item) => item.id === targetReviewId) || defaultFallbackReview;

  // 4. Render Head & SEO Meta Tags
  renderSeoMeta(activeReview);

  // 5. Render DOM Content
  renderReviewContent(activeReview);

  // 6. Inject Schema.org JSON-LD Structured Data
  injectStructuredData(activeReview);

  /**
   * Updates document title and meta tags (Search Engine Optimization)
   */
  function renderSeoMeta(review) {
    const seoTitle = review.metaTitle || (review.title.length > 40 ? `${review.title.slice(0, 36)}... Review` : `${review.title} Review: Score Breakdown`);
    const seoDescription = review.metaDescription || `In-depth ${review.title} review covering gameplay mechanics, graphics, and performance. Read our full score breakdown now.`;

    // Title tag (Max 60 chars)
    document.title = seoTitle;
    const docTitleEl = document.getElementById('docTitle');
    if (docTitleEl) docTitleEl.textContent = seoTitle;

    // Meta description (Max 160 chars)
    const metaDescEl = document.getElementById('metaDescription');
    if (metaDescEl) metaDescEl.setAttribute('content', seoDescription);

    // OpenGraph & Twitter tags
    const ogTitleEl = document.getElementById('ogTitle');
    if (ogTitleEl) ogTitleEl.setAttribute('content', seoTitle);

    const ogDescEl = document.getElementById('ogDescription');
    if (ogDescEl) ogDescEl.setAttribute('content', seoDescription);
  }

  /**
   * Injects dynamic text, images, and HTML elements into the page
   */
  function renderReviewContent(review) {
    // 3 Headings closely related to primary keywords
    const h1Text = (review.seoHeadings && review.seoHeadings.h1) ? review.seoHeadings.h1 : review.title;
    const h2Text = (review.seoHeadings && review.seoHeadings.h2) ? review.seoHeadings.h2 : `${review.title} Gameplay Impressions, Open-World Exploration & Boss Battles`;
    const h3Text = (review.seoHeadings && review.seoHeadings.h3) ? review.seoHeadings.h3 : `${review.title} Difficulty Curve, Technical Performance & Final Score Verdict`;

    const blogTitleEl = document.getElementById('blogTitle');
    if (blogTitleEl) blogTitleEl.textContent = h1Text;

    const headingTwoEl = document.getElementById('headingTwo');
    if (headingTwoEl) headingTwoEl.textContent = h2Text;

    const headingThreeEl = document.getElementById('headingThree');
    if (headingThreeEl) headingThreeEl.textContent = h3Text;

    // Badges & metadata
    const genreEl = document.getElementById('genreBadge');
    if (genreEl) genreEl.textContent = review.genre.toUpperCase();

    const ratingEl = document.getElementById('ratingBadge');
    if (ratingEl) ratingEl.textContent = `★ ${Number(review.rating).toFixed(1)} / 10`;

    const authorEl = document.getElementById('metaAuthor');
    if (authorEl) authorEl.textContent = review.author || 'pixcel Editorial';

    const platformEl = document.getElementById('metaPlatform');
    if (platformEl) platformEl.textContent = review.platform || 'Multiplatform';

    const playtimeEl = document.getElementById('metaPlaytime');
    if (playtimeEl) playtimeEl.textContent = review.playtime || '40+ hours logged';

    const dateEl = document.getElementById('metaDate');
    if (dateEl) dateEl.textContent = review.date || 'Recent';

    // Hero image with descriptive alt text
    const heroImgEl = document.getElementById('heroImage');
    if (heroImgEl) {
      heroImgEl.src = review.image;
      heroImgEl.alt = review.imageAlt || `${review.title} official game review cover art and gameplay capture`;
    }

    // Executive summary verdict
    const verdictEl = document.getElementById('verdictSummary');
    if (verdictEl) verdictEl.textContent = `"${review.summary}"`;

    // Article body paragraphs
    const paragraphs = (review.fullReview || review.summary).split('\n\n').filter((p) => p.trim().length > 0);
    const critiqueDiv = document.getElementById('critiqueContent');
    if (critiqueDiv) {
      critiqueDiv.innerHTML = '';
      paragraphs.forEach((paragraphText) => {
        const paragraphEl = document.createElement('p');
        paragraphEl.className = 'critique-p';
        paragraphEl.textContent = paragraphText;
        critiqueDiv.appendChild(paragraphEl);
      });
    }

    // 2 Q&A Questions for Answer Engine Optimization (AEO)
    const aeoDiv = document.getElementById('aeoContainer');
    if (aeoDiv) {
      aeoDiv.innerHTML = '';
      const qaList = (review.aeoQuestions && review.aeoQuestions.length > 0) ? review.aeoQuestions : [
        {
          question: `Is ${review.title} worth playing in 2024?`,
          answer: `Yes. Based on our comprehensive evaluation and score of ${Number(review.rating).toFixed(1)}/10, ${review.title} delivers an outstanding experience with engaging mechanics and high replay value.`
        },
        {
          question: `What are the critical strengths of ${review.title}?`,
          answer: review.summary
        }
      ];

      qaList.forEach((qa, idx) => {
        const article = document.createElement('article');
        article.className = 'aeo-item';
        article.setAttribute('itemscope', '');
        article.setAttribute('itemprop', 'mainEntity');
        article.setAttribute('itemtype', 'https://schema.org/Question');

        const questionEl = document.createElement('div');
        questionEl.className = 'aeo-question';
        questionEl.setAttribute('itemprop', 'name');
        questionEl.innerHTML = `<span style="color: var(--accent-yellow); font-weight: 900;">Q${idx + 1}: </span>${escapeHtml(qa.question)}`;

        const answerWrap = document.createElement('div');
        answerWrap.setAttribute('itemscope', '');
        answerWrap.setAttribute('itemprop', 'acceptedAnswer');
        answerWrap.setAttribute('itemtype', 'https://schema.org/Answer');

        const answerEl = document.createElement('p');
        answerEl.className = 'aeo-answer';
        answerEl.setAttribute('itemprop', 'text');
        answerEl.innerHTML = `<strong style="color: var(--accent-yellow);">Answer: </strong>${escapeHtml(qa.answer)}`;

        answerWrap.appendChild(answerEl);
        article.appendChild(questionEl);
        article.appendChild(answerWrap);
        aeoDiv.appendChild(article);
      });
    }

    // Key Highlights (Pros)
    const prosList = document.getElementById('prosList');
    if (prosList) {
      prosList.innerHTML = '';
      (review.pros || []).forEach((proText) => {
        const li = document.createElement('li');
        li.textContent = `✔ ${proText}`;
        prosList.appendChild(li);
      });
    }

    // Drawbacks (Cons)
    const consList = document.getElementById('consList');
    if (consList) {
      consList.innerHTML = '';
      (review.cons || []).forEach((conText) => {
        const li = document.createElement('li');
        li.textContent = `✖ ${conText}`;
        consList.appendChild(li);
      });
    }
  }

  /**
   * Injects Schema.org JSON-LD structured data for Review + FAQPage
   */
  function injectStructuredData(review) {
    const existingScript = document.getElementById('review-schema-jsonld');
    if (existingScript) existingScript.remove();

    const qaList = (review.aeoQuestions && review.aeoQuestions.length > 0) ? review.aeoQuestions : [
      {
        question: `Is ${review.title} worth playing in 2024?`,
        answer: `Yes. Based on our evaluation and rating of ${Number(review.rating).toFixed(1)}/10, ${review.title} delivers a standout experience.`
      },
      {
        question: `What are the standout features of ${review.title}?`,
        answer: review.summary
      }
    ];

    const structuredData = {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "Review",
          "itemReviewed": {
            "@type": "VideoGame",
            "name": review.title,
            "genre": review.genre,
            "gamePlatform": review.platform
          },
          "author": {
            "@type": "Person",
            "name": review.author
          },
          "reviewRating": {
            "@type": "Rating",
            "ratingValue": review.rating,
            "bestRating": "10",
            "worstRating": "1"
          },
          "reviewBody": review.summary
        },
        {
          "@type": "FAQPage",
          "mainEntity": qaList.map((qa) => ({
            "@type": "Question",
            "name": qa.question,
            "acceptedAnswer": {
              "@type": "Answer",
              "text": qa.answer
            }
          }))
        }
      ]
    };

    const script = document.createElement('script');
    script.id = 'review-schema-jsonld';
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify(structuredData, null, 2);
    document.head.appendChild(script);
  }

  function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }
})();
