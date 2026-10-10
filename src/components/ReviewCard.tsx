import React from 'react';
import { GameReview } from '../types';
import { Star, Bookmark, ArrowRight } from 'lucide-react';
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
  return (
    <article
      onClick={() => onSelect(review)}
      className="group flex flex-col bg-[#0c0c0c] border-3 border-[#333333] hover:border-[#ffe600] transition-all duration-200 hover:-translate-y-1 hover:shadow-[5px_5px_0px_#ffe600] cursor-pointer text-left font-aptos"
    >
      {/* Image Container */}
      <div className="relative w-full aspect-[16/9] overflow-hidden bg-[#000000] border-b-2 border-[#222222] group-hover:border-[#ffe600]">
        <img
          src={review.image}
          alt={review.imageAlt || `${review.title} review cover artwork`}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          referrerPolicy="no-referrer"
          onError={(e) => {
            const target = e.currentTarget;
            target.onerror = null;
            target.src = getGameCoverFallback(review.title, review.genre);
          }}
        />

        {/* Top Badges */}
        <div className="absolute top-2.5 left-2.5 right-2.5 flex items-center justify-between pointer-events-none">
          {/* Rating Badge */}
          <div className="pointer-events-auto flex items-center gap-1 px-2.5 py-1 bg-[#000000] border-2 border-[#ffe600] text-[#ffe600] font-bold text-xs shadow-[2px_2px_0px_#ffe600]">
            <Star className="w-3.5 h-3.5 fill-current" />
            <span>{Number(review.rating).toFixed(1)}</span>
            <span className="text-[10px] text-[#888888] font-normal">/10</span>
          </div>

          {/* Bookmark Button */}
          <button
            onClick={(e) => onToggleBookmark(review.id, e)}
            className={`pointer-events-auto p-1.5 border-2 transition-colors cursor-pointer ${
              isBookmarked
                ? 'bg-[#ffe600] text-black border-[#ffe600]'
                : 'bg-[#000000]/80 text-[#ffe600] border-[#333333] hover:border-[#ffe600]'
            }`}
            title={isBookmarked ? 'Remove bookmark' : 'Bookmark review'}
          >
            <Bookmark className="w-3.5 h-3.5 fill-current" />
          </button>
        </div>
      </div>

      {/* Content Body in Aptos font */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
        <div>
          {/* Genre Tag */}
          <div className="flex items-center justify-between text-xs mb-2.5 font-bold">
            <span className="text-[#ffe600] bg-[#1a1a1a] px-2 py-0.5 border border-[#333333] uppercase">
              {review.genre}
            </span>
            <span className="text-[#888888] text-xs font-medium">
              {review.platform}
            </span>
          </div>

          {/* ONLY Title is in 8-bit font */}
          <h2 className="text-base sm:text-lg font-8bit text-white group-hover:text-[#ffe600] transition-colors leading-snug mb-3">
            {review.title}
          </h2>

          {/* Summary snippet */}
          <p className="text-sm text-[#a3a3a3] line-clamp-3 leading-relaxed mb-4 font-normal">
            {review.summary}
          </p>
        </div>

        {/* Card Footer in Aptos font */}
        <div className="pt-3 border-t-2 border-[#1c1c1c] flex items-center justify-between text-xs">
          <span className="text-[#777777] font-medium">
            {review.author} · {review.date}
          </span>
          <span className="font-bold text-xs text-[#ffe600] flex items-center gap-1 group-hover:underline">
            Read Review <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </span>
        </div>
      </div>
    </article>
  );
};
