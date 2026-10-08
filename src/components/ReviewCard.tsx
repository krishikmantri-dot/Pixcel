import React from 'react';
import { GameReview } from '../types';
import { Star, Bookmark, MessageSquare, ArrowUpRight } from 'lucide-react';
import { getGameCoverFallback } from '../utils/imageFallback';

interface ReviewCardProps {
  review: GameReview;
  onSelect: (review: GameReview) => void;
  isBookmarked: boolean;
  onToggleBookmark: (id: string, e: React.MouseEvent) => void;
}

export const ReviewCard: React.FC<ReviewCardProps> = ({
  review,
  onSelect,
  isBookmarked,
  onToggleBookmark,
}) => {
  // Score color helper
  const getRatingColor = (rating: number) => {
    if (rating >= 9.5) return 'text-amber-400 bg-amber-400/10 border-amber-400/20';
    if (rating >= 9.0) return 'text-emerald-400 bg-emerald-400/10 border-emerald-400/20';
    if (rating >= 8.0) return 'text-blue-400 bg-blue-400/10 border-blue-400/20';
    return 'text-[#ff4655] bg-[#ff4655]/10 border-[#ff4655]/20';
  };

  return (
    <article
      onClick={() => onSelect(review)}
      className="group flex flex-col bg-[#1a1d2e] border border-[#2b3048] hover:border-[#ff4655]/60 rounded-xl overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-black/40 cursor-pointer text-left"
    >
      {/* Image Container */}
      <div className="relative w-full aspect-[16/9] overflow-hidden bg-[#111320]">
        <img
          src={review.image}
          alt={review.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          referrerPolicy="no-referrer"
          onError={(e) => {
            const target = e.currentTarget;
            target.onerror = null;
            target.src = getGameCoverFallback(review.title, review.genre);
          }}
        />

        {/* Gradient scrim for contrast */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#1a1d2e] via-transparent to-transparent opacity-80" />

        {/* Top Floating Controls: Rating & Bookmark */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none">
          {/* Rating Badge */}
          <div
            className={`pointer-events-auto flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-bold border backdrop-blur-md ${getRatingColor(
              review.rating
            )}`}
          >
            <Star className="w-3.5 h-3.5 fill-current" />
            <span className="tabular-nums font-mono">{Number(review.rating).toFixed(1)}</span>
            <span className="text-[10px] opacity-75">/10</span>
          </div>

          {/* Bookmark Button */}
          <button
            onClick={(e) => onToggleBookmark(review.id, e)}
            aria-label={isBookmarked ? 'Remove bookmark' : 'Bookmark review'}
            className={`pointer-events-auto w-8 h-8 rounded-md flex items-center justify-center border transition-all ${
              isBookmarked
                ? 'bg-[#ff4655] border-[#ff4655] text-white shadow-sm'
                : 'bg-[#141724]/80 backdrop-blur-md border-[#2b3048] text-[#9da3af] hover:text-white hover:border-[#ff4655]'
            }`}
          >
            <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-current' : ''}`} />
          </button>
        </div>
      </div>

      {/* Card Content Body */}
      <div className="p-5 flex flex-col flex-1 justify-between">
        <div>
          {/* Zero-Pill Unboxed Metadata: Genre · Platform */}
          <div className="flex items-center gap-2 text-xs text-[#9da3af] mb-2 font-medium">
            <span className="text-[#ff4655] font-semibold">{review.genre}</span>
            <span aria-hidden="true" className="text-[#2b3048]">·</span>
            <span className="truncate max-w-[150px]">{review.platform}</span>
          </div>

          {/* Title */}
          <h3 className="text-lg font-bold text-white group-hover:text-[#ff4655] transition-colors line-clamp-1 mb-2.5">
            <a
              href={`/review/${review.id}`}
              onClick={(e) => {
                e.preventDefault();
                onSelect(review);
              }}
              className="hover:underline"
            >
              {review.title}
            </a>
          </h3>

          {/* Summary */}
          <p className="text-xs sm:text-sm text-[#9da3af] line-clamp-3 leading-relaxed mb-4">
            {review.summary}
          </p>
        </div>

        {/* Card Footer */}
        <div className="pt-3 border-t border-[#2b3048] flex items-center justify-between text-xs text-[#7b8096]">
          <div className="flex items-center gap-2">
            <span>By {review.author}</span>
            <span aria-hidden="true">·</span>
            <span>{review.date}</span>
          </div>

          <div className="flex items-center gap-3">
            {review.comments && review.comments.length > 0 && (
              <span className="flex items-center gap-1 text-[#9da3af]">
                <MessageSquare className="w-3.5 h-3.5" />
                <span className="tabular-nums font-mono">{review.comments.length}</span>
              </span>
            )}
            <a
              href={`/review/${review.id}`}
              onClick={(e) => {
                e.preventDefault();
                onSelect(review);
              }}
              className="text-[#ff4655] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform flex items-center gap-0.5 font-semibold text-xs"
            >
              Read
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </div>
    </article>
  );
};
