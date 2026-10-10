import React from 'react';
import { GameReview } from '../types';
import { Trophy, Star, ArrowRight } from 'lucide-react';
import { getGameCoverFallback } from '../utils/imageFallback';

interface HallOfFameProps {
  reviews: GameReview[];
  onSelectReview: (review: GameReview) => void;
}

export const HallOfFame: React.FC<HallOfFameProps> = ({ reviews, onSelectReview }) => {
  // Top masterpieces with rating >= 9.5
  const masterpieces = [...reviews]
    .filter((r) => r.rating >= 9.5)
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 5);

  if (masterpieces.length === 0) return null;

  return (
    <section id="hall-of-fame" className="mb-14 font-aptos">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 pb-2 border-b-2 border-[#ffe600] gap-2">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-[#ffe600] uppercase tracking-wider mb-1">
            <Trophy className="w-4 h-4 text-[#ffe600]" />
            <span>Pixcel.gg Pantheon</span>
          </div>
          {/* Section title in 8-bit font */}
          <h2 className="text-xl sm:text-2xl font-8bit text-white tracking-wide">
            ★ HALL OF FAME MASTERPIECES (9.5+ RATINGS) ★
          </h2>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5">
        {masterpieces.map((game, index) => (
          <div
            key={game.id}
            onClick={() => onSelectReview(game)}
            className="group relative bg-[#0d0d0d] border-2 border-[#333333] hover:border-[#ffe600] overflow-hidden transition-all duration-200 hover:-translate-y-1 hover:shadow-[4px_4px_0px_#ffe600] cursor-pointer flex flex-col justify-between"
          >
            {/* Image banner with overlay */}
            <div className="relative aspect-[16/10] overflow-hidden bg-[#000000] border-b-2 border-[#222222]">
              <img
                src={game.image}
                alt={game.imageAlt || `${game.title} Hall of Fame masterpiece cover artwork`}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                referrerPolicy="no-referrer"
                onError={(e) => {
                  const target = e.currentTarget;
                  target.onerror = null;
                  target.src = getGameCoverFallback(game.title, game.genre);
                }}
              />

              {/* Rank Badge in Aptos Bold */}
              <div className="absolute top-2 left-2 w-7 h-7 bg-[#000000] border-2 border-[#ffe600] flex items-center justify-center text-xs font-bold text-[#ffe600] shadow-[2px_2px_0px_#ffe600]">
                #{index + 1}
              </div>

              {/* Score pill */}
              <div className="absolute bottom-2 right-2 bg-[#000000] border border-[#ffe600] px-2 py-0.5 text-xs font-bold text-[#ffe600] flex items-center gap-1">
                <Star className="w-3 h-3 fill-current" />
                <span>{game.rating.toFixed(1)}</span>
              </div>
            </div>

            {/* Information */}
            <div className="p-3.5 flex-1 flex flex-col justify-between">
              <div>
                <span className="block text-xs font-bold text-[#888888] uppercase tracking-wider mb-1">
                  {game.genre}
                </span>
                {/* Game Title in 8-bit font */}
                <h3 className="font-8bit text-xs text-white group-hover:text-[#ffe600] transition-colors line-clamp-2 leading-snug mb-2">
                  {game.title}
                </h3>
              </div>

              <div className="pt-2 border-t border-[#222222] flex items-center justify-between text-xs font-bold text-[#ffe600]">
                <span>Read Review</span>
                <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
