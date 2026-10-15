import React, { useState, useEffect } from 'react';
import { GameReview, ReviewComment } from '../types';
import { 
  ArrowLeft, 
  Share2, 
  Star, 
  Bookmark, 
  ThumbsUp, 
  MessageSquare, 
  Send, 
  Check, 
  ChevronLeft, 
  ChevronRight, 
  Clock, 
  Gamepad2, 
  UserCheck, 
  Award,
  HelpCircle
} from 'lucide-react';
import { getGameCoverFallback } from '../utils/imageFallback';
import { applyPageSEO, generateSEOForReview, generateReviewJsonLd } from '../utils/seo';

interface ReviewDetailPageProps {
  review: GameReview;
  allReviews: GameReview[];
  onBack: () => void;
  onNavigateToReview: (review: GameReview) => void;
  isBookmarked: boolean;
  onToggleBookmark: (id: string) => void;
  onAddComment: (reviewId: string, comment: Omit<ReviewComment, 'id' | 'likes'>) => void;
  onLikeComment: (reviewId: string, commentId: string) => void;
}

export const ReviewDetailPage: React.FC<ReviewDetailPageProps> = ({
  review,
  allReviews,
  onBack,
  onNavigateToReview,
  isBookmarked,
  onToggleBookmark,
  onAddComment,
  onLikeComment
}) => {
  const [copiedUrl, setCopiedUrl] = useState(false);
  const [newAuthor, setNewAuthor] = useState('');
  const [newComment, setNewComment] = useState('');

  // SEO computation
  const seo = review.seo || generateSEOForReview(review);

  // Apply Document Head SEO dynamically for search engine bots, scrapers & AI overviews
  useEffect(() => {
    const url = typeof window !== 'undefined' ? `${window.location.origin}/review/${review.id}` : '';
    const allKeywords = [
      ...(seo.shortTailKeywords || []),
      ...(seo.secondaryKeywords || []),
      seo.primaryKeyword
    ];

    applyPageSEO({
      title: seo.metaTitle,
      description: seo.metaDescription,
      url: url,
      image: review.image,
      type: 'article',
      keywords: allKeywords,
      jsonLd: generateReviewJsonLd(review, url)
    });
  }, [review, seo]);

  // Previous and next review in list
  const currentIndex = allReviews.findIndex((r) => r.id === review.id);
  const prevReview = currentIndex > 0 ? allReviews[currentIndex - 1] : null;
  const nextReview = currentIndex < allReviews.length - 1 ? allReviews[currentIndex + 1] : null;

  const handleShare = () => {
    if (typeof window !== 'undefined' && navigator.clipboard) {
      const url = `${window.location.origin}/review/${review.id}`;
      navigator.clipboard.writeText(url);
      setCopiedUrl(true);
      setTimeout(() => setCopiedUrl(false), 2500);
    }
  };

  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAuthor.trim() || !newComment.trim()) return;

    onAddComment(review.id, {
      author: newAuthor.trim(),
      text: newComment.trim(),
      date: 'Just now'
    });

    setNewAuthor('');
    setNewComment('');
  };

  const paragraphs = review.fullReview
    ? review.fullReview.split('\n\n').filter((p) => p.trim().length > 0)
    : [review.summary];

  return (
    <article className="min-h-screen bg-[#000000] text-[#f5f5f5] pb-24 font-aptos selection:bg-[#ffe600] selection:text-black">
      {/* Top sticky navigation bar */}
      <header className="sticky top-0 z-40 bg-[#0a0a0a]/95 backdrop-blur-md border-b-4 border-[#ffe600] px-4 py-3">
        <div className="max-w-6xl mx-auto flex items-center justify-between gap-4">
          <button
            onClick={onBack}
            className="retro-btn-yellow inline-flex items-center gap-2 px-3.5 py-2 text-xs md:text-sm font-bold cursor-pointer"
            aria-label="Back to all reviews"
          >
            <ArrowLeft className="w-4 h-4 stroke-[3]" />
            <span>Back to Reviews</span>
          </button>

          <a 
            href="/"
            onClick={(e) => { e.preventDefault(); onBack(); }}
            className="flex items-center gap-2 text-white hover:text-[#ffe600] transition-colors"
            title="Go to Pixcel.gg Home"
          >
            {/* Title / Brand in 8-bit font with anchor text */}
            <span className="font-8bit text-base md:text-lg text-[#ffe600] tracking-wider">
              PIXCEL<span className="text-white">.GG</span>
            </span>
          </a>

          <div className="flex items-center gap-2">
            <button
              onClick={() => onToggleBookmark(review.id)}
              className={`p-2 border-2 ${
                isBookmarked 
                  ? 'bg-[#ffe600] text-black border-[#ffe600]' 
                  : 'bg-[#141414] text-[#ffe600] border-[#333333] hover:border-[#ffe600]'
              } transition-colors cursor-pointer`}
              title={isBookmarked ? 'Remove bookmark' : 'Bookmark this review'}
              aria-label={isBookmarked ? 'Remove bookmark' : 'Bookmark this review'}
            >
              <Bookmark className="w-4 h-4 stroke-[2.5]" />
            </button>

            <button
              onClick={handleShare}
              className="retro-btn-dark px-3.5 py-2 text-xs font-bold inline-flex items-center gap-1.5 cursor-pointer"
              title="Share Review Link"
              aria-label="Share Review Link"
            >
              {copiedUrl ? <Check className="w-3.5 h-3.5 text-[#ffe600]" /> : <Share2 className="w-3.5 h-3.5" />}
              <span className="hidden sm:inline">{copiedUrl ? 'Copied!' : 'Share'}</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="max-w-5xl mx-auto px-4 pt-8">
        {/* Breadcrumbs in Aptos font with descriptive anchor text linking to unique URLs */}
        <nav aria-label="Breadcrumbs" className="mb-6 flex items-center gap-2 text-xs md:text-sm text-[#888888] font-semibold">
          <a
            href="/"
            onClick={(e) => {
              e.preventDefault();
              onBack();
            }}
            className="hover:text-[#ffe600] transition-colors cursor-pointer hover:underline"
            aria-label="Return to All Game Reviews Catalogue"
          >
            All Reviews
          </a>
          <span>/</span>
          <a
            href="/#reviews-section"
            className="text-[#ffe600] hover:underline"
            aria-label={`Browse all ${review.genre} video game reviews`}
          >
            {review.genre}
          </a>
          <span>/</span>
          <span className="text-white truncate max-w-[200px] md:max-w-md">{review.title}</span>
        </nav>

        {/* Title & Headline Section */}
        <div className="mb-8">
          <div className="flex flex-wrap items-center gap-2.5 mb-3">
            <span className="bg-[#ffe600] text-black text-xs px-2.5 py-1 font-bold border-2 border-black uppercase tracking-wide">
              {review.genre}
            </span>
            <span className="border-2 border-[#ffe600] text-[#ffe600] text-xs px-2.5 py-1 font-bold">
              ★ {review.rating.toFixed(1)} / 10
            </span>
          </div>

          {/* ONLY the Game Title is in 8-bit font as the H1 */}
          <h1 className="text-2xl sm:text-4xl md:text-5xl font-8bit text-[#ffe600] tracking-wide leading-tight md:leading-snug mb-3">
            {review.title}
          </h1>

          {/* Subtitle explicitly echoing H1 words for search crawlers & readers */}
          <p className="text-sm sm:text-base text-[#e5e5e5] font-semibold mb-6 flex items-center gap-2">
            <span className="w-2.5 h-2.5 bg-[#ffe600] shrink-0 inline-block" />
            <span>{seo.headings?.h1 || `${review.title} Review & Complete Campaign Verdict`}</span>
          </p>

          {/* Metadata Row in Aptos font */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-[#0d0d0d] p-4 border-2 border-[#333333]">
            <div>
              <span className="block text-xs font-bold text-[#888888] uppercase tracking-wider mb-0.5">Critic</span>
              <span className="text-base text-white font-bold flex items-center gap-1.5">
                <UserCheck className="w-4 h-4 text-[#ffe600]" />
                {review.author}
              </span>
            </div>
            <div>
              <span className="block text-xs font-bold text-[#888888] uppercase tracking-wider mb-0.5">Platform</span>
              <span className="text-base text-white font-semibold flex items-center gap-1.5">
                <Gamepad2 className="w-4 h-4 text-[#ffe600]" />
                {review.platform}
              </span>
            </div>
            <div>
              <span className="block text-xs font-bold text-[#888888] uppercase tracking-wider mb-0.5">Playtime</span>
              <span className="text-base text-white font-semibold flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-[#ffe600]" />
                {review.playtime}
              </span>
            </div>
            <div>
              <span className="block text-xs font-bold text-[#888888] uppercase tracking-wider mb-0.5">Date Published</span>
              <span className="text-base text-[#ffe600] font-bold">
                {review.date}
              </span>
            </div>
          </div>
        </div>

        {/* Featured Artwork Display with Keyword-Rich Alt Text */}
        <div className="mb-10 relative">
          <div className="border-4 border-[#ffe600] shadow-[6px_6px_0px_#ffe600] overflow-hidden bg-[#111111]">
            <img
              src={review.image}
              alt={seo.imageAlt || `${review.title} official video game gameplay screenshot, cover artwork, and ${review.genre} critique illustration`}
              onError={(e) => {
                const target = e.currentTarget;
                target.onerror = null;
                target.src = getGameCoverFallback(review.title, review.genre);
              }}
              className="w-full max-h-[500px] object-cover object-center"
            />
          </div>
        </div>

        {/* Executive Verdict Block in Aptos font with Words from H1 Heading */}
        <section aria-label="Executive verdict" className="mb-10 bg-[#121210] border-3 border-[#ffe600] p-6 shadow-[5px_5px_0px_#ffe600]">
          <div className="flex items-center gap-2 mb-3">
            <Award className="w-5 h-5 text-[#ffe600]" />
            <h2 className="text-base sm:text-lg text-[#ffe600] font-bold uppercase tracking-wide">
              Executive Verdict ({review.rating.toFixed(1)} / 10)
            </h2>
          </div>
          <p className="text-xs uppercase tracking-wider text-[#ffe600] font-bold mb-2">
            In-Depth {review.title} Review &amp; Complete Campaign Verdict
          </p>
          <p className="text-base sm:text-lg text-white font-medium leading-relaxed">
            "{review.summary}"
          </p>
        </section>

        {/* Score Breakdown in Aptos font */}
        {review.breakdown && (
          <section aria-label="Performance scores" className="mb-12 bg-[#0c0c0c] border-2 border-[#2b2b2b] p-6">
            <div className="flex items-center gap-2 mb-6">
              <Star className="w-4 h-4 fill-[#ffe600]" />
              <h2 className="text-sm sm:text-base text-[#ffe600] font-bold uppercase tracking-wide">
                Performance &amp; Component Breakdown
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {[
                { label: 'Gameplay Mechanics', value: review.breakdown.gameplay },
                { label: 'Graphics & Art Direction', value: review.breakdown.graphics },
                { label: 'Audio & Soundtrack', value: review.breakdown.sound },
                { label: 'Narrative & Worldbuilding', value: review.breakdown.story },
              ].map((item) => (
                <div key={item.label} className="bg-[#141414] p-3.5 border border-[#333333]">
                  <div className="flex justify-between items-center text-xs mb-2">
                    <span className="text-[#a3a3a3] font-semibold">{item.label}</span>
                    <span className="text-[#ffe600] font-bold text-sm">{item.value.toFixed(1)} / 10</span>
                  </div>
                  <div className="w-full bg-[#000000] h-2.5 border border-[#444444] overflow-hidden">
                    <div
                      className="bg-[#ffe600] h-full transition-all duration-500"
                      style={{ width: `${(item.value / 10) * 100}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Full Editorial Essay with H2 and H3 Headings */}
        <section aria-label="Editorial critique" className="mb-14">
          {/* Section Heading H2 closely related to keywords */}
          <div className="border-b-2 border-[#ffe600] pb-3 mb-6">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-[#ffe600] flex items-center gap-2.5">
              <Gamepad2 className="w-6 h-6 shrink-0" />
              <span>{seo.headings?.h2 || `How Does ${review.title} Compare in the ${review.genre} Genre?`}</span>
            </h2>
          </div>

          {/* Lead Paragraph */}
          <div className="space-y-6 text-base sm:text-lg leading-relaxed text-[#e5e5e5] mb-8">
            {paragraphs.slice(0, 2).map((paragraph, idx) => (
              <p 
                key={idx} 
                className={`bg-[#0d0d0d] p-6 border-l-4 border-[#ffe600] shadow-sm ${
                  idx === 0 ? 'text-[#ffffff] font-normal text-lg sm:text-xl' : ''
                }`}
              >
                {paragraph}
              </p>
            ))}
          </div>

          {/* Subsection Heading H3 closely related to keywords */}
          <div className="border-l-4 border-[#ffe600] pl-4 py-2 mb-6 bg-[#0f0f0f]">
            <h3 className="text-lg sm:text-xl font-bold text-white tracking-wide">
              {seo.headings?.h3 || `Key Boss Fights, Progression Depth & Score Breakdown`}
            </h3>
          </div>

          {/* Remaining Paragraphs */}
          <div className="space-y-6 text-base sm:text-lg leading-relaxed text-[#e5e5e5]">
            {paragraphs.slice(2).map((paragraph, idx) => (
              <p key={idx} className="bg-[#0d0d0d] p-6 border-l-4 border-[#ffe600] shadow-sm">
                {paragraph}
              </p>
            ))}
          </div>
        </section>

        {/* Frequently Asked Questions (Structured for AI/Search Engine Answer Extraction & Readers) */}
        {seo.aeoQuestions && seo.aeoQuestions.length >= 2 && (
          <section aria-label="Frequently Asked Questions" className="mb-14">
            <div className="border-b-2 border-[#ffe600] pb-3 mb-6 flex items-center justify-between">
              <h3 className="text-lg sm:text-xl font-bold text-[#ffe600] flex items-center gap-2">
                <HelpCircle className="w-5 h-5 text-[#ffe600]" />
                <span>Frequently Asked Questions</span>
              </h3>
            </div>

            <div className="space-y-4">
              {seo.aeoQuestions.map((qa, index) => (
                <article key={index} className="bg-[#0d0d0d] border-2 border-[#2b2b2b] p-6 shadow-sm">
                  <h4 className="text-base sm:text-lg font-bold text-white mb-2.5">
                    {qa.question}
                  </h4>
                  <p className="text-sm sm:text-base text-[#cccccc] leading-relaxed">
                    {qa.answer}
                  </p>
                </article>
              ))}
            </div>
          </section>
        )}

        {/* Pros and Cons Boxes in Aptos font */}
        {Boolean((review.pros && review.pros.length > 0) || (review.cons && review.cons.length > 0)) && (
          <section aria-label="Pros and cons" className="mb-14 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-[#0e140e] border-2 border-[#38a169] p-6 shadow-[4px_4px_0px_#38a169]">
              <h2 className="text-sm sm:text-base text-[#48bb78] font-bold mb-4 flex items-center gap-2 uppercase tracking-wide">
                <span>[+]</span> Key Highlights &amp; Strengths
              </h2>
              <ul className="space-y-2.5">
                {(review.pros || []).map((pro, index) => (
                  <li key={index} className="flex items-start gap-2.5 text-sm sm:text-base text-[#e2e8f0]">
                    <span className="text-[#48bb78] font-bold text-sm mt-0.5">✔</span>
                    <span className="font-medium">{pro}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-[#170e0e] border-2 border-[#333333] p-6 shadow-[4px_4px_0px_#e53e3e]">
              <h2 className="text-sm sm:text-base text-[#f56565] font-bold mb-4 flex items-center gap-2 uppercase tracking-wide">
                <span>[-]</span> Drawbacks &amp; Shortcomings
              </h2>
              <ul className="space-y-2.5">
                {(review.cons || []).map((con, index) => (
                  <li key={index} className="flex items-start gap-2.5 text-sm sm:text-base text-[#e2e8f0]">
                    <span className="text-[#f56565] font-bold text-sm mt-0.5">✖</span>
                    <span className="font-medium">{con}</span>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        )}

        {/* Previous / Next Review Navigation with explicit Anchor Text to Unique Review URLs */}
        <section aria-label="Review pagination" className="mb-16 border-t-2 border-b-2 border-[#333333] py-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {prevReview ? (
              <a
                href={`/review/${prevReview.id}`}
                onClick={(e) => {
                  e.preventDefault();
                  onNavigateToReview(prevReview);
                }}
                className="bg-[#111111] hover:bg-[#1a1a1a] p-4 border-2 border-[#2b2b2b] hover:border-[#ffe600] text-left transition-colors flex items-center gap-3 cursor-pointer group"
                aria-label={`Read previous review: ${prevReview.title} (${prevReview.genre})`}
              >
                <ChevronLeft className="w-6 h-6 text-[#ffe600] shrink-0 group-hover:-translate-x-1 transition-transform" />
                <div className="truncate">
                  <span className="block text-xs font-bold text-[#888888] uppercase tracking-wider">Previous Review</span>
                  <span className="font-8bit text-xs text-white group-hover:text-[#ffe600] truncate block mt-1">
                    {prevReview.title}
                  </span>
                </div>
              </a>
            ) : <div />}

            {nextReview ? (
              <a
                href={`/review/${nextReview.id}`}
                onClick={(e) => {
                  e.preventDefault();
                  onNavigateToReview(nextReview);
                }}
                className="bg-[#111111] hover:bg-[#1a1a1a] p-4 border-2 border-[#2b2b2b] hover:border-[#ffe600] text-right transition-colors flex items-center justify-end gap-3 cursor-pointer group sm:col-start-2"
                aria-label={`Read next review: ${nextReview.title} (${nextReview.genre})`}
              >
                <div className="truncate">
                  <span className="block text-xs font-bold text-[#888888] uppercase tracking-wider">Next Review</span>
                  <span className="font-8bit text-xs text-white group-hover:text-[#ffe600] truncate block mt-1">
                    {nextReview.title}
                  </span>
                </div>
                <ChevronRight className="w-6 h-6 text-[#ffe600] shrink-0 group-hover:translate-x-1 transition-transform" />
              </a>
            ) : <div />}
          </div>
        </section>

        {/* Explore More Video Game Reviews from Catalogue - Rich Internal Linking for Crawlers & Readers */}
        <section aria-label="Explore More Video Game Reviews" className="mb-16 bg-[#0c0c0c] border-2 border-[#2b2b2b] p-6 sm:p-8">
          <div className="flex items-center justify-between border-b-2 border-[#ffe600] pb-3 mb-6">
            <div className="flex items-center gap-2">
              <Gamepad2 className="w-5 h-5 text-[#ffe600]" />
              <h2 className="text-base sm:text-lg text-[#ffe600] font-bold uppercase tracking-wide">
                More Video Game Reviews &amp; Critiques
              </h2>
            </div>
            <span className="text-xs text-[#888888] font-bold">
              Explore 10 Curated Titles
            </span>
          </div>

          {/* Grid of Other Reviews with Descriptive Anchor Text linking to unique review URLs */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
            {allReviews
              .filter((r) => r.id !== review.id)
              .slice(0, 6)
              .map((other) => (
                <a
                  key={other.id}
                  href={`/review/${other.id}`}
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigateToReview(other);
                  }}
                  className="bg-[#141414] hover:bg-[#1a1a1a] border border-[#333333] hover:border-[#ffe600] p-4 transition-colors group flex flex-col justify-between"
                  aria-label={`Read complete video game review: ${other.title} (${other.genre})`}
                >
                  <div>
                    <div className="flex items-center justify-between text-[11px] mb-2">
                      <span className="text-[#ffe600] font-bold uppercase tracking-wider">{other.genre}</span>
                      <span className="text-white font-bold bg-[#222222] px-2 py-0.5 border border-[#444444]">
                        ★ {other.rating.toFixed(1)} / 10
                      </span>
                    </div>
                    <h3 className="font-8bit text-xs text-white group-hover:text-[#ffe600] line-clamp-2 leading-relaxed mb-2">
                      {other.title}
                    </h3>
                    <p className="text-xs text-[#a3a3a3] line-clamp-2 leading-relaxed">
                      {other.summary}
                    </p>
                  </div>
                  <div className="pt-3 mt-3 border-t border-[#262626] flex items-center justify-between text-xs font-semibold text-[#888888] group-hover:text-[#ffe600]">
                    <span>Read Full Review &amp; Verdict</span>
                    <span>&rarr;</span>
                  </div>
                </a>
              ))}
          </div>

          {/* Genre Category Internal Links */}
          <div className="pt-6 border-t border-[#222222]">
            <span className="block text-xs font-bold text-[#888888] uppercase tracking-wider mb-3">
              Browse Reviews by Video Game Genre
            </span>
            <div className="flex flex-wrap gap-2 text-xs">
              {[
                { label: 'Action RPG', slug: 'action-rpg' },
                { label: 'Sci-Fi RPG', slug: 'sci-fi-rpg' },
                { label: 'Action Adventure', slug: 'action-adventure' },
                { label: 'Metroidvania', slug: 'metroidvania' },
                { label: 'Open World', slug: 'open-world' },
                { label: 'Tactical FPS', slug: 'tactical-fps' },
                { label: 'Racing Games', slug: 'racing' },
                { label: 'Cozy Farming Sims', slug: 'cozy-sim' }
              ].map((cat) => (
                <a
                  key={cat.slug}
                  href="/#reviews-section"
                  onClick={(e) => {
                    e.preventDefault();
                    onBack();
                  }}
                  className="px-3 py-1.5 bg-[#141414] hover:bg-[#ffe600] text-[#cccccc] hover:text-black border border-[#333333] hover:border-[#ffe600] font-bold transition-colors cursor-pointer"
                  aria-label={`Browse all ${cat.label} game reviews in catalogue`}
                >
                  {cat.label} Reviews
                </a>
              ))}
            </div>
          </div>

          {/* Crawlable Internal Links Bar for Googlebot & GSC */}
          <nav aria-label="Site Navigation Links" className="mt-6 pt-4 border-t border-[#1c1c1c] flex flex-wrap items-center gap-3 text-xs text-[#888888]">
            <a 
              href="/" 
              onClick={(e) => { e.preventDefault(); onBack(); }}
              className="text-[#a3a3a3] hover:text-[#ffe600] hover:underline font-semibold"
              aria-label="Return to Pixcel.gg Homepage"
            >
              Pixcel.gg Homepage
            </a>
            <span>&middot;</span>
            <a 
              href="/#reviews-section" 
              onClick={(e) => { e.preventDefault(); onBack(); }}
              className="text-[#a3a3a3] hover:text-[#ffe600] hover:underline font-semibold"
              aria-label="Browse Complete 10 Video Game Reviews Catalogue"
            >
              All 10 Curated Reviews
            </a>
            <span>&middot;</span>
            <a 
              href="/#hall-of-fame" 
              onClick={(e) => { e.preventDefault(); onBack(); }}
              className="text-[#a3a3a3] hover:text-[#ffe600] hover:underline font-semibold"
              aria-label="View Hall of Fame Video Game Masterpieces"
            >
              Hall of Fame Masterpieces
            </a>
            <span>&middot;</span>
            <a 
              href="/sitemap.xml" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-[#a3a3a3] hover:text-[#ffe600] hover:underline font-semibold"
              aria-label="View Google Search Console XML Sitemap"
            >
              Google XML Sitemap
            </a>
            <span>&middot;</span>
            <a 
              href="/robots.txt" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-[#a3a3a3] hover:text-[#ffe600] hover:underline font-semibold"
              aria-label="View Search Engine Crawler Directives in robots.txt"
            >
              Robots.txt Directives
            </a>
          </nav>
        </section>

        {/* Community Discussion / Comments in Aptos font */}
        <section aria-label="Community discussion" className="bg-[#0e0e0e] border-2 border-[#333333] p-6 sm:p-8">
          <div className="flex items-center justify-between mb-6 border-b border-[#222222] pb-4">
            <h2 className="text-base sm:text-lg text-[#ffe600] font-bold flex items-center gap-2 uppercase tracking-wide">
              <MessageSquare className="w-5 h-5" />
              Community Discussion ({review.comments?.length || 0})
            </h2>
            <span className="text-xs text-[#888888] font-semibold">Moderated Comments</span>
          </div>

          {/* Comment Form */}
          <form onSubmit={handleCommentSubmit} className="mb-8 bg-[#141414] p-4 border border-[#2b2b2b]">
            <h3 className="text-xs font-bold text-white uppercase tracking-wider mb-3">Leave a Reaction or Comment</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-3">
              <input
                type="text"
                placeholder="Your Gamertag..."
                value={newAuthor}
                onChange={(e) => setNewAuthor(e.target.value)}
                required
                className="bg-[#000000] border border-[#333333] px-3 py-2 text-white text-sm focus:border-[#ffe600] focus:outline-none"
              />
              <div className="sm:col-span-2">
                <input
                  type="text"
                  placeholder="Share your thoughts on this game..."
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  required
                  className="w-full bg-[#000000] border border-[#333333] px-3 py-2 text-white text-sm focus:border-[#ffe600] focus:outline-none"
                />
              </div>
            </div>
            <div className="flex justify-end">
              <button
                type="submit"
                className="retro-btn-yellow px-4 py-2 text-xs font-bold inline-flex items-center gap-2 cursor-pointer"
              >
                <Send className="w-3.5 h-3.5" />
                Post Comment
              </button>
            </div>
          </form>

          {/* Comment List */}
          <div className="space-y-4">
            {review.comments && review.comments.length > 0 ? (
              review.comments.map((comment) => (
                <div key={comment.id} className="bg-[#121212] p-4 border-l-4 border-[#ffe600]">
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-sm font-bold text-[#ffe600]">{comment.author}</span>
                    <span className="text-xs text-[#888888]">{comment.date}</span>
                  </div>
                  <p className="text-sm sm:text-base text-[#cccccc] mb-2 leading-relaxed">
                    {comment.text}
                  </p>
                  <button
                    onClick={() => onLikeComment(review.id, comment.id)}
                    className="text-xs font-semibold text-[#888888] hover:text-[#ffe600] flex items-center gap-1.5 cursor-pointer transition-colors"
                    aria-label={`Agree with ${comment.author}'s comment`}
                  >
                    <ThumbsUp className="w-3.5 h-3.5" />
                    <span>{comment.likes} Agree</span>
                  </button>
                </div>
              ))
            ) : (
              <div className="text-center py-8 text-[#666666] text-sm">
                No comments yet on this review. Be the first player to share your thoughts!
              </div>
            )}
          </div>
        </section>

        {/* Back button at bottom with clear anchor text to unique home URL */}
        <div className="mt-12 text-center">
          <a
            href="/"
            onClick={(e) => {
              e.preventDefault();
              onBack();
            }}
            className="retro-btn-yellow px-6 py-3 text-sm font-bold cursor-pointer inline-flex items-center gap-2"
            aria-label="Return to All Video Game Reviews Catalogue"
          >
            <ArrowLeft className="w-4 h-4 stroke-[3]" />
            Return to All Video Game Reviews Catalogue
          </a>
        </div>
      </main>
    </article>
  );
};
