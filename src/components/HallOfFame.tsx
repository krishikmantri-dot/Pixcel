import React from 'react';
import { GameReview } from '../types';
import { Trophy, Star, ArrowUpRight } from 'lucide-react';
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
    <section id="hall-of-fame" className="mb-14">
      <div className="flex items-center justify-between mb-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-amber-400 uppercase tracking-wider mb-1">
            <Trophy className="w-4 h-4" />
            <span>The Pixcel.gg Pantheon</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
            Hall of Fame Masterpieces
          </h2>
        </div>
        <p className="text-xs text-[#9da3af] hidden sm:block max-w-xs text-right">
          Titles awarded a 9.5+ score representing technical achievement and storytelling excellence.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5">
        {masterpieces.map((game, index) => (
          <div
            key={game.id}
            onClick={() => onSelectReview(game)}
            className="group relative bg-[#141724] border border-[#2b3048] hover:border-amber-400/60 rounded-xl overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-lg cursor-pointer flex flex-col justify-between"
          >
            {/* Image banner with overlay */}
            <div className="relative aspect-[16/10] overflow-hidden bg-[#111320]">
              <img
                src={game.image}
                alt={game.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                referrerPolicy="no-referrer"
                onError={(e) => {
                  const target = e.currentTarget;
                  target.onerror = null;
                  target.src = getGameCoverFallback(game.title, game.genre);
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#141724] via-transparent to-transparent" />

              {/* Rank Badge */}
              <div className="absolute top-2.5 left-2.5 w-6 h-6 rounded-md bg-[#0f111a]/90 backdrop-blur-md border border-[#2b3048] flex items-center justify-center text-xs font-mono font-bold text-amber-400">
                #{index + 1}
              </div>

              {/* Rating */}
              <div className="absolute top-2.5 right-2.5 flex items-center gap-1 px-2 py-0.5 rounded-md bg-amber-400/20 border border-amber-400/40 text-amber-300 text-xs font-bold font-mono">
                <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                {game.rating}
              </div>
            </div>

            {/* Content */}
            <div className="p-3.5 flex flex-col flex-1 justify-between">
              <div>
                <span className="text-[11px] text-[#ff4655] font-semibold block mb-1">
                  {game.genre}
                </span>
                <h3 className="text-sm font-bold text-white group-hover:text-amber-400 transition-colors line-clamp-1 mb-1">
                  {game.title}
                </h3>
              </div>

              <div className="pt-2 mt-2 border-t border-[#2b3048] flex items-center justify-between text-[11px] text-[#7b8096]">
                <span className="truncate max-w-[110px]">{game.platform.split('·')[0]}</span>
                <span className="text-[#ff4655] font-semibold flex items-center gap-0.5 group-hover:translate-x-0.5 transition-transform">
                  View
                  <ArrowUpRight className="w-3 h-3" />
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
