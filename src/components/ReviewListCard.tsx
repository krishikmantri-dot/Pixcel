import React from 'react';
import { GameReview } from '../types';
import { Star, Bookmark, ArrowRight } from 'lucide-react';
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
      className="group bg-[#0c0c0c] border-3 border-[#333333] hover:border-[#ffe600] transition-all duration-200 hover:shadow-[5px_5px_0px_#ffe600] cursor-pointer flex flex-col sm:flex-row items-stretch font-aptos"
    >
      {/* Image Container */}
      <div className="relative sm:w-64 md:w-80 shrink-0 aspect-[16/9] sm:aspect-auto overflow-hidden bg-[#000000] border-b-2 sm:border-b-0 sm:border-r-3 border-[#333333] group-hover:border-[#ffe600]">
        <img
          src={review.image}
          alt={review.title}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          referrerPolicy="no-referrer"
          onError={(e) => {
            const target = e.currentTarget;
            target.onerror = null;
            target.src = getGameCoverFallback(review.title, review.genre);
          }}
        />
      </div>

      {/* Content in Aptos font */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          {/* Header row: Genre · Platform · Rating */}
          <div className="flex items-center justify-between gap-2 mb-2">
            <div className="flex flex-wrap items-center gap-2 text-xs font-semibold text-[#888888]">
              <span className="text-black bg-[#ffe600] px-2 py-0.5 font-bold uppercase">{review.genre}</span>
              <span>·</span>
              <span className="text-[#cccccc]">{review.platform}</span>
              {review.playtime && (
                <>
                  <span>·</span>
                  <span className="text-[#ffe600]">{review.playtime}</span>
                </>
              )}
            </div>

            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1 px-2.5 py-1 bg-[#000000] border-2 border-[#ffe600] text-[#ffe600] text-xs font-bold shadow-[2px_2px_0px_#ffe600]">
                <Star className="w-3.5 h-3.5 fill-current" />
                <span>{Number(review.rating).toFixed(1)}</span>
              </div>

              <button
                onClick={(e) => onToggleBookmark(review.id, e)}
                className={`p-1.5 border-2 transition-colors cursor-pointer ${
                  isBookmarked
                    ? 'bg-[#ffe600] text-black border-[#ffe600]'
                    : 'bg-[#141414] text-[#ffe600] border-[#333333] hover:border-[#ffe600]'
                }`}
                title={isBookmarked ? 'Remove bookmark' : 'Bookmark review'}
              >
                <Bookmark className="w-3.5 h-3.5 fill-current" />
              </button>
            </div>
          </div>

          {/* ONLY Title is in 8-bit font */}
          <h2 className="text-lg sm:text-xl font-8bit text-white group-hover:text-[#ffe600] transition-colors leading-snug mb-3">
            {review.title}
          </h2>

          {/* Summary */}
          <p className="text-sm sm:text-base text-[#a3a3a3] line-clamp-2 leading-relaxed mb-4 font-normal">
            {review.summary}
          </p>
        </div>

        {/* Footer */}
        <div className="pt-3 border-t-2 border-[#1f1f1f] flex items-center justify-between text-xs">
          <span className="text-[#777777] font-medium">
            By <strong className="text-white font-bold">{review.author}</strong> · {review.date}
          </span>

          <span className="font-bold text-xs text-[#ffe600] flex items-center gap-1 group-hover:underline">
            Read Review <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </span>
        </div>
      </div>
    </article>
  );
};
