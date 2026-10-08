import React from 'react';
import { GameReview } from '../types';
import { Award, Star, ArrowRight, Clock, UserCheck } from 'lucide-react';
import { getGameCoverFallback } from '../utils/imageFallback';

interface HeroFeaturedProps {
  review: GameReview;
  onReadReview: (review: GameReview) => void;
}

export const HeroFeatured: React.FC<HeroFeaturedProps> = ({ review, onReadReview }) => {
  return (
    <section id="featured-spotlight" className="relative overflow-hidden rounded-2xl border border-[#2b3048] bg-[#141724] mb-12">
      {/* Background ambient glow */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#ff4655]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 items-stretch">
        {/* Left Column: Editorial Information */}
        <div className="lg:col-span-7 p-6 sm:p-8 md:p-10 flex flex-col justify-between z-10">
          <div>
            {/* Header strip: Editorial Kicker */}
            <div className="flex items-center gap-2 text-xs font-semibold text-[#ff4655] uppercase tracking-wider mb-4">
              <Award className="w-4 h-4" />
              <span>Editor's Choice · Lead Review</span>
            </div>

            {/* Title */}
            <h1 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight mb-4 text-balance">
              {review.title}
            </h1>

            {/* Unboxed Metadata (Zero-Pill Discipline) */}
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs sm:text-sm text-[#9da3af] mb-6">
              <span className="font-semibold text-white">{review.genre}</span>
              <span aria-hidden="true" className="text-[#2b3048]">·</span>
              <span>{review.platform}</span>
              <span aria-hidden="true" className="text-[#2b3048]">·</span>
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 inline text-[#7b8096]" />
                {review.playtime || 'Logged in review'}
              </span>
              <span aria-hidden="true" className="text-[#2b3048]">·</span>
              <span>{review.date}</span>
            </div>

            {/* Summary */}
            <p className="text-sm sm:text-base text-[#9da3af] leading-relaxed mb-6 max-w-2xl">
              {review.summary}
            </p>

            {/* Quick Score Category Breakdown */}
            {review.breakdown && (
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 py-4 border-y border-[#2b3048]/70 mb-6 max-w-xl">
                <div>
                  <div className="text-[11px] text-[#7b8096] uppercase tracking-wider font-semibold">Gameplay</div>
                  <div className="text-base font-bold text-white tabular-nums">{review.breakdown.gameplay}</div>
                </div>
                <div>
                  <div className="text-[11px] text-[#7b8096] uppercase tracking-wider font-semibold">Visuals</div>
                  <div className="text-base font-bold text-white tabular-nums">{review.breakdown.graphics}</div>
                </div>
                <div>
                  <div className="text-[11px] text-[#7b8096] uppercase tracking-wider font-semibold">Audio</div>
                  <div className="text-base font-bold text-white tabular-nums">{review.breakdown.sound}</div>
                </div>
                <div>
                  <div className="text-[11px] text-[#7b8096] uppercase tracking-wider font-semibold">Narrative</div>
                  <div className="text-base font-bold text-white tabular-nums">{review.breakdown.story}</div>
                </div>
              </div>
            )}
          </div>

          {/* Bottom Bar: Score Badge + Author + CTA */}
          <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
            <div className="flex items-center gap-3">
              <div className="flex items-baseline gap-1 bg-[#1a1d2e] border border-[#2b3048] px-3.5 py-1.5 rounded-lg">
                <Star className="w-4 h-4 text-amber-400 fill-amber-400 self-center" />
                <span className="text-xl font-black text-white tabular-nums">{review.rating}</span>
                <span className="text-xs text-[#7b8096]">/10</span>
              </div>
              <div className="text-xs text-[#7b8096] flex items-center gap-1.5">
                <UserCheck className="w-3.5 h-3.5" />
                <span>Reviewed by <span className="text-white font-medium">{review.author}</span></span>
              </div>
            </div>

            <a
              href={`/review/${review.id}`}
              onClick={(e) => {
                e.preventDefault();
                onReadReview(review);
              }}
              className="inline-flex items-center gap-2 bg-[#ff4655] hover:bg-[#ff2d3f] text-white px-5 py-2.5 rounded-lg text-sm font-bold transition-all shadow-md group"
            >
              <span>Read Full Breakdown</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </a>
          </div>
        </div>

        {/* Right Column: Hero Visual Cover */}
        <div className="lg:col-span-5 relative min-h-[280px] lg:min-h-full overflow-hidden bg-[#111320] border-t lg:border-t-0 lg:border-l border-[#2b3048]">
          <img
            src={review.image}
            alt={review.title}
            className="w-full h-full object-cover object-center transition-transform duration-700 hover:scale-105"
            referrerPolicy="no-referrer"
            onError={(e) => {
              const target = e.currentTarget;
              target.onerror = null;
              target.src = getGameCoverFallback(review.title, review.genre);
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#141724] via-transparent to-transparent lg:hidden" />
          
          {/* Subtle bottom-right badge */}
          <div className="absolute bottom-4 right-4 bg-[#141724]/90 backdrop-blur-md border border-[#2b3048] px-3 py-1.5 rounded-md text-xs font-semibold text-[#9da3af]">
            Land of Shadow · 2024
          </div>
        </div>
      </div>
    </section>
  );
};
