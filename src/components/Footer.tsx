import React from 'react';
import { Gamepad2, ShieldCheck, Scale } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="mt-20 border-t-4 border-[#ffe600] bg-[#0c0c0c] text-xs text-[#888888] font-aptos">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
          {/* Col 1: Wordmark & Mission */}
          <div className="md:col-span-2 space-y-3">
            <div className="flex items-center gap-2.5 text-lg font-bold text-white">
              <span className="w-8 h-8 bg-[#ffe600] border-2 border-black flex items-center justify-center text-black">
                <Gamepad2 className="w-5 h-5 stroke-[2.5]" />
              </span>
              {/* Brand Title in 8-bit font */}
              <span className="font-8bit text-base text-[#ffe600] tracking-wider">
                PIXCEL<span className="text-white">.GG</span>
              </span>
            </div>
            <p className="text-[#a3a3a3] max-w-md leading-relaxed text-sm">
              Honest game reviews, technical score breakdowns, and independent gaming journalism.
              Critiques written by passionate players, for players.
            </p>
            <div className="flex flex-wrap items-center gap-3 pt-2 text-xs text-[#ffe600] font-bold">
              <span className="flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5" />
                100% Unsponsored
              </span>
              <span>·</span>
              <span className="flex items-center gap-1">
                <Scale className="w-3.5 h-3.5" />
                Standardized 10.0 Scale
              </span>
            </div>
          </div>

          {/* Col 2: Editorial Coverage */}
          <div>
            <h4 className="text-xs font-bold text-[#ffe600] uppercase tracking-wider mb-3">
              Editorial Coverage
            </h4>
            <ul className="space-y-2 text-sm font-medium">
              <li>
                <a href="#reviews-section" className="hover:text-[#ffe600] transition-colors">
                  Action & RPGs
                </a>
              </li>
              <li>
                <a href="#reviews-section" className="hover:text-[#ffe600] transition-colors">
                  Open World Epics
                </a>
              </li>
              <li>
                <a href="#reviews-section" className="hover:text-[#ffe600] transition-colors">
                  Tactical Shooters & Esports
                </a>
              </li>
              <li>
                <a href="#reviews-section" className="hover:text-[#ffe600] transition-colors">
                  Indie & Metroidvanias
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3: Scoring Ethics */}
          <div id="editorial-ethics">
            <h4 className="text-xs font-bold text-[#ffe600] uppercase tracking-wider mb-3">
              Scoring Ethics
            </h4>
            <p className="text-xs sm:text-sm text-[#888888] leading-relaxed mb-3">
              We never accept sponsored review scores. Every game is evaluated by our senior critics through thorough campaign playthroughs.
            </p>
            <div className="p-2.5 bg-[#141414] border border-[#333333] text-xs font-bold text-[#ffe600]">
              <span className="text-white">Independent Editorial Standard</span>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-[#222222] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-medium">
          <p className="text-[#666666]">
            © {new Date().getFullYear()} PIXCEL.GG · ALL RIGHTS RESERVED
          </p>
          <div className="flex items-center gap-6 text-[#888888] font-bold">
            <a href="#reviews-section" className="hover:text-[#ffe600]">Top of Page</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
