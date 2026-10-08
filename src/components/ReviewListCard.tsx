import React from 'react';
import { GameReview } from '../types';
import { Star, Bookmark, ArrowUpRight, MessageSquare, Clock } from 'lucide-react';
import { getGameCoverFallback } from '../utils/imageFallback';

interface ReviewListCardProps {
  review: GameReview;
  onSelect: (review: GameReview) => void;
  isBookmarked: boolean;
  onToggleBookmark: (id: string, e: React.MouseEvent) => void;
}

export const ReviewListCard: React.FC<ReviewListCardProps> = ({
  review,
  onSelect,
  isBookmarked,
  onToggleBookmark,
}) => {
  return (
    <article
      onClick={() => onSelect(review)}
      className="group bg-[#1a1d2e] border border-[#2b3048] hover:border-[#ff4655]/60 rounded-xl overflow-hidden transition-all duration-300 hover:shadow-xl cursor-pointer flex flex-col sm:flex-row items-stretch"
    >
      {/* Image Container */}
      <div className="relative sm:w-64 md:w-72 shrink-0 aspect-[16/9] sm:aspect-auto overflow-hidden bg-[#111320]">
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
        <div className="absolute inset-0 bg-gradient-to-t from-[#1a1d2e] via-transparent to-transparent sm:hidden" />
      </div>

      {/* Content */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          {/* Header row: Genre · Platform · Rating */}
          <div className="flex items-center justify-between gap-2 mb-2">
            <div className="flex items-center gap-2 text-xs text-[#9da3af] font-medium">
              <span className="text-[#ff4655] font-semibold">{review.genre}</span>
              <span aria-hidden="true" className="text-[#2b3048]">·</span>
              <span>{review.platform}</span>
              {review.playtime && (
                <>
                  <span aria-hidden="true" className="text-[#2b3048]">·</span>
                  <span className="flex items-center gap-1 text-[#7b8096]">
                    <Clock className="w-3 h-3" />
                    {review.playtime}
                  </span>
                </>
              )}
            </div>

            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[#111320] border border-[#2b3048] text-amber-400 text-xs font-bold font-mono">
              <Star className="w-3.5 h-3.5 fill-amber-400" />
              <span>{Number(review.rating).toFixed(1)}</span>
              <span className="text-[#7b8096] text-[10px]">/10</span>
            </div>
          </div>

          <h3 className="text-xl font-bold text-white group-hover:text-[#ff4655] transition-colors mb-2">
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

          <p className="text-xs sm:text-sm text-[#9da3af] line-clamp-2 leading-relaxed mb-4">
            {review.summary}
          </p>
        </div>

        {/* Footer info */}
        <div className="pt-3 border-t border-[#2b3048] flex items-center justify-between text-xs text-[#7b8096]">
          <div className="flex items-center gap-2">
            <span>By <strong className="text-white font-medium">{review.author}</strong></span>
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

            <button
              onClick={(e) => onToggleBookmark(review.id, e)}
              aria-label="Bookmark review"
              className={`p-1.5 rounded border transition-colors ${
                isBookmarked
                  ? 'bg-[#ff4655] border-[#ff4655] text-white'
                  : 'bg-[#111320] border-[#2b3048] text-[#9da3af] hover:text-white hover:border-[#ff4655]'
              }`}
            >
              <Bookmark className={`w-3.5 h-3.5 ${isBookmarked ? 'fill-current' : ''}`} />
            </button>

            <a
              href={`/review/${review.id}`}
              onClick={(e) => {
                e.preventDefault();
                onSelect(review);
              }}
              className="text-[#ff4655] group-hover:translate-x-0.5 transition-transform flex items-center gap-0.5 font-semibold"
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
