import React, { useState } from 'react';
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

  // Primary heading texts closely related to keywords
  const heading1Text = review.seoHeadings?.h1 || `${review.title} Review & Complete Breakdown`;
  const heading2Text = review.seoHeadings?.h2 || `${review.title} Gameplay Impressions, Open-World Exploration & Boss Battles`;
  const heading3Text = review.seoHeadings?.h3 || `${review.title} Difficulty Curve, Technical Performance & Final Score Verdict`;

  // Default AEO questions if not pre-populated
  const aeoList = review.aeoQuestions && review.aeoQuestions.length > 0 
    ? review.aeoQuestions 
    : [
        {
          question: `Is ${review.title} worth playing in 2024?`,
          answer: `Yes. Based on our in-depth evaluation and rating of ${review.rating.toFixed(1)}/10, ${review.title} delivers a standout ${review.genre} experience on ${review.platform} with memorable gameplay, impressive presentation, and high replay value.`
        },
        {
          question: `What are the standout features and critical strengths of ${review.title}?`,
          answer: `${review.summary}`
        }
      ];

  const imageAltText = review.imageAlt || `${review.title} official game review cover art and gameplay capture`;

  return (
    <article 
      className="min-h-screen bg-[#000000] text-[#f5f5f5] pb-24 font-aptos selection:bg-[#ffe600] selection:text-black"
      itemScope
      itemType="https://schema.org/Review"
    >
      {/* Top sticky navigation bar */}
      <header className="sticky top-0 z-40 bg-[#0a0a0a]/95 backdrop-blur-md border-b-4 border-[#ffe600] px-4 py-3">
        <div className="max-w-6xl mx-auto flex items-center justify-between gap-4">
          <button
            onClick={onBack}
            className="retro-btn-yellow inline-flex items-center gap-2 px-3.5 py-2 text-xs md:text-sm font-bold cursor-pointer"
            aria-label="Back to all game reviews"
          >
            <ArrowLeft className="w-4 h-4 stroke-[3]" />
            <span>Back to Reviews</span>
          </button>

          <a 
            href="/"
            onClick={(e) => { e.preventDefault(); onBack(); }}
            className="flex items-center gap-2 text-white hover:text-[#ffe600] transition-colors"
            title="Return to pixcel.gg homepage"
          >
            {/* Title / Brand in 8-bit font */}
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
              title="Share Review link"
              aria-label="Share Review link"
            >
              {copiedUrl ? <Check className="w-3.5 h-3.5 text-[#ffe600]" /> : <Share2 className="w-3.5 h-3.5" />}
              <span className="hidden sm:inline">{copiedUrl ? 'Copied!' : 'Share'}</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="max-w-5xl mx-auto px-4 pt-8">
        {/* Breadcrumb Navigation in Aptos font */}
        <nav aria-label="Breadcrumb navigation" className="mb-6 flex items-center gap-2 text-xs md:text-sm text-[#888888] font-semibold">
          <button onClick={onBack} className="hover:text-[#ffe600] transition-colors cursor-pointer">
            Reviews
          </button>
          <span>/</span>
          <span className="text-[#ffe600] font-bold">{review.genre}</span>
          <span>/</span>
          <span className="text-white truncate max-w-[200px] md:max-w-md font-medium">{review.title}</span>
        </nav>

        {/* Title & SEO Headline Block */}
        <div className="mb-8">
          <div className="flex flex-wrap items-center gap-2.5 mb-4">
            <span className="bg-[#ffe600] text-black text-xs px-2.5 py-1 font-bold border-2 border-black uppercase tracking-wide">
              {review.genre}
            </span>
            <span className="border-2 border-[#ffe600] text-[#ffe600] text-xs px-2.5 py-1 font-bold">
              ★ {review.rating.toFixed(1)} / 10
            </span>
            <span className="text-xs text-[#888888] font-semibold border border-[#333333] px-2 py-0.5">
              Organic Editorial
            </span>
          </div>

          {/* Heading 1: ONLY the Title is in 8-bit font, closely related to keywords */}
          <h1 
            itemProp="name" 
            className="text-2xl sm:text-3xl md:text-4xl font-8bit text-[#ffe600] tracking-wide leading-relaxed md:leading-snug mb-6"
          >
            {heading1Text}
          </h1>

          {/* Metadata Row in Aptos font with bold highlights */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-[#0d0d0d] p-4 border-2 border-[#333333]">
            <div>
              <span className="block text-xs font-bold text-[#888888] uppercase tracking-wider mb-0.5">Critic Author</span>
              <span itemProp="author" className="text-base text-white font-bold flex items-center gap-1.5">
                <UserCheck className="w-4 h-4 text-[#ffe600]" />
                {review.author}
              </span>
            </div>
            <div>
              <span className="block text-xs font-bold text-[#888888] uppercase tracking-wider mb-0.5">Target Platform</span>
              <span className="text-base text-white font-semibold flex items-center gap-1.5">
                <Gamepad2 className="w-4 h-4 text-[#ffe600]" />
                {review.platform}
              </span>
            </div>
            <div>
              <span className="block text-xs font-bold text-[#888888] uppercase tracking-wider mb-0.5">Verified Playtime</span>
              <span className="text-base text-white font-semibold flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-[#ffe600]" />
                {review.playtime || '40+ hours logged'}
              </span>
            </div>
            <div>
              <span className="block text-xs font-bold text-[#888888] uppercase tracking-wider mb-0.5">Published Date</span>
              <span className="text-base text-[#ffe600] font-bold">
                {review.date}
              </span>
            </div>
          </div>
        </div>

        {/* Featured Artwork Display with SEO Alt Text */}
        <div className="mb-10 relative">
          <div className="border-4 border-[#ffe600] shadow-[6px_6px_0px_#ffe600] overflow-hidden bg-[#111111]">
            <img
              src={review.image}
              alt={imageAltText}
              onError={(e) => {
                const target = e.currentTarget;
                target.onerror = null;
                target.src = getGameCoverFallback(review.title, review.genre);
              }}
              className="w-full max-h-[500px] object-cover object-center"
            />
            <div className="bg-[#0a0a0a] px-4 py-2 border-t-2 border-[#ffe600] flex justify-between items-center text-xs text-[#a3a3a3] font-medium">
              <span className="text-[#ffe600] font-bold">
                Direct Capture
              </span>
              <span>Official Gameplay & Visuals</span>
            </div>
          </div>
        </div>

        {/* Executive Verdict Block in Aptos font */}
        <section aria-label="Executive verdict" className="mb-10 bg-[#121210] border-3 border-[#ffe600] p-6 shadow-[5px_5px_0px_#ffe600]">
          <div className="flex items-center gap-2 mb-3">
            <Award className="w-5 h-5 text-[#ffe600]" />
            <h2 className="text-base sm:text-lg text-[#ffe600] font-bold uppercase tracking-wide">
              Executive Verdict ({review.rating.toFixed(1)} / 10)
            </h2>
          </div>
          <p itemProp="reviewBody" className="text-base sm:text-lg text-white font-medium leading-relaxed">
            "{review.summary}"
          </p>
        </section>

        {/* Heading 2: Second Keyword-Focused Heading */}
        <div className="mb-4 pt-2">
          <h2 className="text-xl sm:text-2xl text-[#ffe600] font-bold tracking-wide flex items-center gap-2.5 uppercase border-b-2 border-[#ffe600] pb-2">
            <Gamepad2 className="w-6 h-6 shrink-0" />
            <span>{heading2Text}</span>
          </h2>
        </div>

        {/* Full Editorial Essay in Aptos font */}
        <section aria-label="Editorial critique" className="mb-12">
          <div className="space-y-6 text-base sm:text-lg leading-relaxed text-[#e5e5e5]">
            {paragraphs.map((paragraph, idx) => (
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
        </section>

        {/* Heading 3: Third Keyword-Focused Heading */}
        <div className="mb-6 pt-2">
          <h3 className="text-lg sm:text-xl text-[#ffe600] font-bold tracking-wide flex items-center gap-2 uppercase border-b-2 border-[#333333] pb-2">
            <Star className="w-5 h-5 fill-[#ffe600]" />
            <span>{heading3Text}</span>
          </h3>
        </div>

        {/* Score Breakdown in Aptos font */}
        {review.breakdown && (
          <section aria-label="Performance scores" className="mb-12 bg-[#0c0c0c] border-2 border-[#2b2b2b] p-6">
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

        {/* Two Q&A Articles/Paragraphs for AEO (Answer Engine Optimization) */}
        <section 
          aria-label="Frequently asked questions and quick answers" 
          className="mb-14 bg-[#0e0e0c] border-2 border-[#ffe600] p-6 sm:p-8 shadow-[5px_5px_0px_#ffe600]"
          itemScope
          itemType="https://schema.org/FAQPage"
        >
          <div className="flex items-center gap-2.5 mb-6 pb-3 border-b-2 border-[#262624]">
            <HelpCircle className="w-6 h-6 text-[#ffe600]" />
            <div>
              <h3 className="text-base sm:text-lg text-[#ffe600] font-bold uppercase tracking-wide">
                Critical Q&A & Search Insights (AEO Optimized)
              </h3>
              <p className="text-xs text-[#999999] mt-0.5 font-medium">
                Direct question-and-answer format designed for fast answering, featured snippets, and AI search engines.
              </p>
            </div>
          </div>

          <div className="space-y-6">
            {aeoList.map((qa, qIdx) => (
              <article 
                key={qIdx} 
                className="bg-[#141412] p-5 sm:p-6 border-l-4 border-[#ffe600]"
                itemScope
                itemProp="mainEntity"
                itemType="https://schema.org/Question"
              >
                <h4 itemProp="name" className="text-base sm:text-lg text-white font-bold mb-3 flex items-start gap-2.5">
                  <span className="text-[#ffe600] font-black text-lg">Q{qIdx + 1}:</span>
                  <span>{qa.question}</span>
                </h4>
                <div 
                  itemScope 
                  itemProp="acceptedAnswer" 
                  itemType="https://schema.org/Answer"
                  className="pl-7"
                >
                  <p itemProp="text" className="text-sm sm:text-base text-[#d6d6d6] leading-relaxed font-normal">
                    <strong className="text-[#ffe600] font-bold">Answer: </strong>
                    {qa.answer}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* Pros and Cons Boxes in Aptos font */}
        {Boolean((review.pros && review.pros.length > 0) || (review.cons && review.cons.length > 0)) && (
          <section aria-label="Pros and cons" className="mb-14 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-[#0e140e] border-2 border-[#38a169] p-6 shadow-[4px_4px_0px_#38a169]">
              <h2 className="text-sm sm:text-base text-[#48bb78] font-bold mb-4 flex items-center gap-2 uppercase tracking-wide">
                <span>[+]</span> Key Highlights & Strengths
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

            <div className="bg-[#170e0e] border-2 border-[#e53e3e] p-6 shadow-[4px_4px_0px_#e53e3e]">
              <h2 className="text-sm sm:text-base text-[#f56565] font-bold mb-4 flex items-center gap-2 uppercase tracking-wide">
                <span>[-]</span> Drawbacks & Shortcomings
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

        {/* Previous / Next Review Navigation in Aptos font with anchor text */}
        <section aria-label="Review pagination" className="mb-16 border-t-2 border-b-2 border-[#333333] py-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {prevReview ? (
              <button
                onClick={() => onNavigateToReview(prevReview)}
                className="bg-[#111111] hover:bg-[#1a1a1a] p-4 border-2 border-[#2b2b2b] hover:border-[#ffe600] text-left transition-colors flex items-center gap-3 cursor-pointer group"
                aria-label={`Read previous review: ${prevReview.title}`}
              >
                <ChevronLeft className="w-6 h-6 text-[#ffe600] shrink-0 group-hover:-translate-x-1 transition-transform" />
                <div className="truncate">
                  <span className="block text-xs font-bold text-[#888888] uppercase tracking-wider">Previous Review</span>
                  <span className="font-8bit text-xs text-white group-hover:text-[#ffe600] truncate block mt-1">
                    {prevReview.title}
                  </span>
                </div>
              </button>
            ) : <div />}

            {nextReview ? (
              <button
                onClick={() => onNavigateToReview(nextReview)}
                className="bg-[#111111] hover:bg-[#1a1a1a] p-4 border-2 border-[#2b2b2b] hover:border-[#ffe600] text-right transition-colors flex items-center justify-end gap-3 cursor-pointer group sm:col-start-2"
                aria-label={`Read next review: ${nextReview.title}`}
              >
                <div className="truncate">
                  <span className="block text-xs font-bold text-[#888888] uppercase tracking-wider">Next Review</span>
                  <span className="font-8bit text-xs text-white group-hover:text-[#ffe600] truncate block mt-1">
                    {nextReview.title}
                  </span>
                </div>
                <ChevronRight className="w-6 h-6 text-[#ffe600] shrink-0 group-hover:translate-x-1 transition-transform" />
              </button>
            ) : <div />}
          </div>
        </section>

        {/* Community Discussion / Comments in Aptos font */}
        <section aria-label="Community discussion" className="bg-[#0e0e0e] border-2 border-[#333333] p-6 sm:p-8">
          <div className="flex items-center justify-between mb-6 border-b border-[#222222] pb-4">
            <h2 className="text-base sm:text-lg text-[#ffe600] font-bold flex items-center gap-2 uppercase tracking-wide">
              <MessageSquare className="w-5 h-5" />
              Community Discussion ({review.comments?.length || 0})
            </h2>
            <span className="text-xs text-[#888888] font-semibold">Moderated Discussion</span>
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
                <span>Post Comment</span>
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

        {/* Back button at bottom with clear anchor text */}
        <div className="mt-12 text-center">
          <button
            onClick={onBack}
            className="retro-btn-yellow px-6 py-3 text-sm font-bold cursor-pointer inline-flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4 stroke-[3]" />
            <span>Return to All Reviews</span>
          </button>
        </div>
      </main>
    </article>
  );
};
