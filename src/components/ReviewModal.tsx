import React, { useState } from 'react';
import { GameReview, ReviewComment } from '../types';
import { X, Star, Bookmark, ThumbsUp, Send, CheckCircle2, AlertCircle, Share2, Clock, UserCheck } from 'lucide-react';
import { getGameCoverFallback } from '../utils/imageFallback';

interface ReviewModalProps {
  review: GameReview | null;
  onClose: () => void;
  isBookmarked: boolean;
  onToggleBookmark: (id: string) => void;
  onAddComment: (reviewId: string, comment: Omit<ReviewComment, 'id' | 'likes' | 'date'>) => void;
  onToast: (msg: string) => void;
}

export const ReviewModal: React.FC<ReviewModalProps> = ({
  review,
  onClose,
  isBookmarked,
  onToggleBookmark,
  onAddComment,
  onToast,
}) => {
  const [commentAuthor, setCommentAuthor] = useState('');
  const [commentText, setCommentText] = useState('');
  const [isSubmittingComment, setIsSubmittingComment] = useState(false);

  if (!review) return null;

  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentText.trim()) return;

    setIsSubmittingComment(true);
    onAddComment(review.id, {
      author: commentAuthor.trim() || 'Gamer Guest',
      text: commentText.trim(),
    });
    setCommentText('');
    setCommentAuthor('');
    setIsSubmittingComment(false);
    onToast('Comment published to review discussion');
  };

  const uniqueUrl = typeof window !== 'undefined'
    ? `${window.location.origin}/review/${review.id}`
    : `/review/${review.id}`;

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(uniqueUrl);
      onToast(`Unique URL copied: /review/${review.id}`);
    }
  };

  // Generate breakdown if missing
  const breakdown = review.breakdown || {
    gameplay: review.rating,
    graphics: Math.min(10, Math.round((review.rating - 0.2 + Math.random() * 0.4) * 10) / 10),
    sound: Math.min(10, Math.round((review.rating - 0.1 + Math.random() * 0.3) * 10) / 10),
    story: Math.min(10, Math.round((review.rating - 0.3 + Math.random() * 0.5) * 10) / 10),
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-fadeIn"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-4xl bg-[#141724] border border-[#2b3048] rounded-2xl overflow-hidden shadow-2xl my-8 text-left"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          aria-label="Close review dialog"
          className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-[#0f111a]/80 hover:bg-[#ff4655] text-white flex items-center justify-center border border-[#2b3048] hover:border-transparent transition-all"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header Banner */}
        <div className="relative w-full h-64 sm:h-80 md:h-96 overflow-hidden bg-[#111320]">
          <img
            src={review.image}
            alt={review.title}
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
            onError={(e) => {
              const target = e.currentTarget;
              target.onerror = null;
              target.src = getGameCoverFallback(review.title, review.genre);
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#141724] via-[#141724]/60 to-transparent" />

          {/* Banner Meta Overlay */}
          <div className="absolute bottom-6 left-6 right-6 flex flex-col justify-end">
            <div className="flex items-center gap-2 text-xs font-semibold text-[#ff4655] uppercase tracking-wider mb-2">
              <span>{review.genre}</span>
              <span aria-hidden="true" className="text-[#9da3af]">·</span>
              <span className="text-[#9da3af] normal-case">{review.platform}</span>
            </div>

            <h2 className="text-2xl sm:text-4xl md:text-5xl font-black text-white tracking-tight leading-tight mb-3">
              {review.title}
            </h2>

            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-3 text-xs sm:text-sm text-[#9da3af]">
                <span className="flex items-center gap-1.5 text-white font-medium">
                  <UserCheck className="w-4 h-4 text-[#ff4655]" />
                  {review.author}
                </span>
                <span aria-hidden="true" className="text-[#2b3048]">·</span>
                <span>{review.date}</span>
                {review.playtime && (
                  <>
                    <span aria-hidden="true" className="text-[#2b3048]">·</span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      {review.playtime}
                    </span>
                  </>
                )}
              </div>

              {/* Action buttons */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => onToggleBookmark(review.id)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all ${
                    isBookmarked
                      ? 'bg-[#ff4655] border-[#ff4655] text-white'
                      : 'bg-[#1a1d2e] border-[#2b3048] text-[#9da3af] hover:text-white'
                  }`}
                >
                  <Bookmark className={`w-3.5 h-3.5 ${isBookmarked ? 'fill-current' : ''}`} />
                  <span>{isBookmarked ? 'Saved' : 'Save'}</span>
                </button>
                <button
                  onClick={handleShare}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-[#1a1d2e] border border-[#2b3048] text-[#9da3af] hover:text-white transition-all"
                >
                  <Share2 className="w-3.5 h-3.5" />
                  <span>Share</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Modal Main Content Container */}
        <div className="p-6 sm:p-8 space-y-8 max-h-[calc(85vh-20rem)] overflow-y-auto">
          {/* Executive Verdict Callout */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 p-5 rounded-xl bg-[#1a1d2e] border border-[#2b3048]">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1.5">
                <span className="text-xs font-bold text-[#ff4655] uppercase tracking-wider">
                  pixcel.gg Verdict
                </span>
                <span aria-hidden="true" className="text-[#2b3048]">·</span>
                <button
                  type="button"
                  onClick={handleShare}
                  className="text-[11px] font-mono text-[#9da3af] hover:text-[#ff4655] transition-colors flex items-center gap-1 cursor-pointer bg-[#111320] px-2 py-0.5 rounded border border-[#2b3048]"
                  title="Click to copy unique review URL"
                >
                  <span>pixcel.gg/review/{review.id}</span>
                  <Share2 className="w-3 h-3 text-[#ff4655]" />
                </button>
              </div>
              <p className="text-sm sm:text-base text-white font-medium italic">
                "{review.summary}"
              </p>
            </div>
            <div className="flex items-center gap-3 shrink-0">
              <div className="text-center px-4 py-2 bg-[#111320] border border-[#2b3048] rounded-xl">
                <div className="text-2xl sm:text-3xl font-black text-amber-400 tabular-nums font-mono flex items-center justify-center gap-1">
                  <Star className="w-5 h-5 fill-amber-400 text-amber-400" />
                  {review.rating}
                </div>
                <div className="text-[10px] text-[#7b8096] uppercase font-bold tracking-wider mt-0.5">Overall Score</div>
              </div>
            </div>
          </div>

          {/* Full Review Prose */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <span className="w-1.5 h-4 bg-[#ff4655] rounded-full" />
              Full Editorial Assessment
            </h3>
            <div className="text-sm sm:text-base text-[#d1d5db] leading-relaxed space-y-4">
              {(review.fullReview || review.summary).split('\n\n').map((paragraph, idx) => (
                <p key={idx}>{paragraph}</p>
              ))}
            </div>
          </div>

          {/* Score Breakdown Bars */}
          <div className="p-5 rounded-xl bg-[#1a1d2e] border border-[#2b3048] space-y-4">
            <h4 className="text-xs font-bold text-[#9da3af] uppercase tracking-wider">
              Categorical Performance Metrics
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { label: 'Mechanics & Gameplay', score: breakdown.gameplay },
                { label: 'Art Direction & Visuals', score: breakdown.graphics },
                { label: 'Audio & Music Composition', score: breakdown.sound },
                { label: 'Worldbuilding & Narrative', score: breakdown.story },
              ].map((metric) => (
                <div key={metric.label} className="space-y-1.5">
                  <div className="flex justify-between text-xs">
                    <span className="text-[#9da3af] font-medium">{metric.label}</span>
                    <span className="font-bold text-white tabular-nums font-mono">{metric.score} / 10</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-[#111320] overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-[#ff4655] to-amber-400 rounded-full transition-all duration-1000"
                      style={{ width: `${Math.min(100, (metric.score / 10) * 100)}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Pros & Cons Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Pros */}
            <div className="p-5 rounded-xl bg-[#111f18] border border-emerald-900/50">
              <h4 className="text-xs font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-2 mb-3">
                <CheckCircle2 className="w-4 h-4" />
                The Highlights
              </h4>
              <ul className="space-y-2 text-xs sm:text-sm text-emerald-100/90">
                {(review.pros || ['Refined game design and mechanical polish', 'Compelling presentation']).map(
                  (pro, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-emerald-400 font-bold">✓</span>
                      <span>{pro}</span>
                    </li>
                  )
                )}
              </ul>
            </div>

            {/* Cons */}
            <div className="p-5 rounded-xl bg-[#261619] border border-rose-900/50">
              <h4 className="text-xs font-bold text-rose-400 uppercase tracking-wider flex items-center gap-2 mb-3">
                <AlertCircle className="w-4 h-4" />
                The Drawbacks
              </h4>
              <ul className="space-y-2 text-xs sm:text-sm text-rose-100/90">
                {(review.cons || ['Minor performance hiccups on launch', 'Steep learning curve']).map((con, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-rose-400 font-bold">✕</span>
                    <span>{con}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Community Discussion & Comments */}
          <div className="pt-6 border-t border-[#2b3048]">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <span>Community Discussion</span>
                <span className="text-xs text-[#7b8096] font-mono tabular-nums">
                  ({(review.comments || []).length})
                </span>
              </h3>
            </div>

            {/* Existing Comments */}
            <div className="space-y-3 mb-6">
              {(review.comments && review.comments.length > 0) ? (
                review.comments.map((comment) => (
                  <div
                    key={comment.id}
                    className="p-4 rounded-xl bg-[#1a1d2e] border border-[#2b3048] text-xs sm:text-sm"
                  >
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="font-bold text-white">{comment.author}</span>
                      <span className="text-[11px] text-[#7b8096]">{comment.date}</span>
                    </div>
                    <p className="text-[#9da3af] leading-relaxed mb-2">{comment.text}</p>
                    <div className="flex items-center gap-1.5 text-[11px] text-[#7b8096]">
                      <ThumbsUp className="w-3 h-3" />
                      <span className="tabular-nums font-mono">{comment.likes} agree</span>
                    </div>
                  </div>
                ))
              ) : (
                <div className="p-4 rounded-xl bg-[#1a1d2e]/50 border border-[#2b3048]/60 text-xs text-[#7b8096] text-center">
                  No community comments yet. Share your thoughts below!
                </div>
              )}
            </div>

            {/* Add Comment Form */}
            <form onSubmit={handleCommentSubmit} className="space-y-3">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <input
                  type="text"
                  placeholder="Your Gamer Tag / Name"
                  value={commentAuthor}
                  onChange={(e) => setCommentAuthor(e.target.value)}
                  className="bg-[#111320] border border-[#2b3048] rounded-lg px-3.5 py-2 text-xs text-white placeholder-[#7b8096] focus:border-[#ff4655] focus:outline-none"
                />
                <input
                  type="text"
                  required
                  placeholder="Join the discussion on this review..."
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                  className="sm:col-span-2 bg-[#111320] border border-[#2b3048] rounded-lg px-3.5 py-2 text-xs text-white placeholder-[#7b8096] focus:border-[#ff4655] focus:outline-none"
                />
              </div>
              <div className="flex justify-end">
                <button
                  type="submit"
                  disabled={isSubmittingComment || !commentText.trim()}
                  className="inline-flex items-center gap-2 bg-[#ff4655] hover:bg-[#ff2d3f] disabled:opacity-50 text-white px-4 py-2 rounded-lg text-xs font-bold transition-all"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Post Comment</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
