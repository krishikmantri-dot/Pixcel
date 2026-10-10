import React from 'react';
import { GameReview } from '../types';
import { Award, ArrowRight, Clock, UserCheck, Star } from 'lucide-react';
import { getGameCoverFallback } from '../utils/imageFallback';

interface HeroFeaturedProps {
  review: GameReview;
  onReadReview: (review: GameReview) => void;
}

export const HeroFeatured: React.FC<HeroFeaturedProps> = ({ review, onReadReview }) => {
  return (
    <section 
      id="featured-spotlight" 
      className="relative overflow-hidden border-4 border-[#ffe600] bg-[#0c0c0c] mb-12 shadow-[6px_6px_0px_#ffe600] font-aptos"
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 items-stretch">
        {/* Left Column: Editorial Information */}
        <div className="lg:col-span-7 p-6 sm:p-8 md:p-10 flex flex-col justify-between z-10">
          <div>
            {/* Header strip: Editorial Kicker in Aptos Bold */}
            <div className="flex items-center gap-2 text-xs font-bold text-[#ffe600] uppercase tracking-wider mb-4">
              <Award className="w-4 h-4 text-[#ffe600]" />
              <span>★ Lead Review Spotlight · Editor's Choice ★</span>
            </div>

            {/* ONLY the Title is in 8-bit font */}
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-8bit text-white tracking-wide leading-tight mb-4 text-balance">
              {review.title}
            </h1>

            {/* Metadata Bar in Aptos font */}
            <div className="flex flex-wrap items-center gap-2.5 text-xs sm:text-sm text-[#a3a3a3] font-semibold mb-6">
              <span className="bg-[#ffe600] text-black px-2 py-0.5 font-bold uppercase">
                {review.genre}
              </span>
              <span>·</span>
              <span className="text-white">{review.platform}</span>
              <span>·</span>
              <span className="text-[#ffe600] flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-[#ffe600]" />
                {review.playtime}
              </span>
            </div>

            {/* Summary in Aptos font */}
            <p className="text-base sm:text-lg text-[#d4d4d4] leading-relaxed mb-6 font-normal">
              "{review.summary}"
            </p>

            {/* Score Breakdown in Aptos font */}
            {review.breakdown && (
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 py-4 border-y-2 border-[#333333] mb-6 max-w-xl">
                <div className="bg-[#141414] p-2.5 border border-[#262626]">
                  <div className="text-[11px] font-bold text-[#888888] uppercase tracking-wider">Gameplay</div>
                  <div className="text-base font-bold text-[#ffe600]">{review.breakdown.gameplay}</div>
                </div>
                <div className="bg-[#141414] p-2.5 border border-[#262626]">
                  <div className="text-[11px] font-bold text-[#888888] uppercase tracking-wider">Visuals</div>
                  <div className="text-base font-bold text-[#ffe600]">{review.breakdown.graphics}</div>
                </div>
                <div className="bg-[#141414] p-2.5 border border-[#262626]">
                  <div className="text-[11px] font-bold text-[#888888] uppercase tracking-wider">Audio</div>
                  <div className="text-base font-bold text-[#ffe600]">{review.breakdown.sound}</div>
                </div>
                <div className="bg-[#141414] p-2.5 border border-[#262626]">
                  <div className="text-[11px] font-bold text-[#888888] uppercase tracking-wider">Story</div>
                  <div className="text-base font-bold text-[#ffe600]">{review.breakdown.story}</div>
                </div>
              </div>
            )}
          </div>

          {/* Action Button & Author Byline in Aptos font */}
          <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t-2 border-[#222222]">
            <button
              onClick={() => onReadReview(review)}
              className="retro-btn-yellow inline-flex items-center gap-2 px-5 py-3 text-sm font-bold cursor-pointer"
            >
              <span>Read Full Review</span>
              <ArrowRight className="w-4 h-4 stroke-[3]" />
            </button>

            <div className="text-xs text-[#888888] flex items-center gap-2 font-medium">
              <UserCheck className="w-4 h-4 text-[#ffe600]" />
              <span>By <strong className="text-white font-bold">{review.author}</strong> · {review.date}</span>
            </div>
          </div>
        </div>

        {/* Right Column: Hero Cover Artwork */}
        <div className="lg:col-span-5 relative bg-[#000000] border-t-4 lg:border-t-0 lg:border-l-4 border-[#ffe600] min-h-[320px] lg:min-h-full overflow-hidden flex items-center justify-center">
          <img
            src={review.image}
            alt={review.imageAlt || `${review.title} official game review cover artwork and rating`}
            onError={(e) => {
              const target = e.currentTarget;
              target.onerror = null;
              target.src = getGameCoverFallback(review.title, review.genre);
            }}
            className="w-full h-full object-cover object-center transform hover:scale-105 transition-transform duration-500"
          />

          {/* Overall Rating Score Box in Aptos font */}
          <div className="absolute bottom-4 right-4 bg-[#000000] border-3 border-[#ffe600] p-3 text-right shadow-[3px_3px_0px_#ffe600]">
            <div className="text-xs font-bold text-[#a3a3a3] uppercase tracking-wider">Score</div>
            <div className="text-2xl sm:text-3xl font-bold text-[#ffe600]">
              {review.rating.toFixed(1)}
              <span className="text-xs text-[#888888] font-normal"> / 10</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
