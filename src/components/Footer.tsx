import React from 'react';
import { Gamepad2, ShieldCheck, Scale, Terminal } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="mt-20 border-t border-[#2b3048] bg-[#141724] text-xs text-[#7b8096]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
          {/* Col 1: Wordmark & Mission */}
          <div className="md:col-span-2 space-y-3">
            <div className="flex items-center gap-2.5 text-lg font-bold text-white">
              <span className="w-7 h-7 rounded-lg bg-[#ff4655]/15 border border-[#ff4655]/30 flex items-center justify-center text-[#ff4655]">
                <Gamepad2 className="w-4 h-4" />
              </span>
              <span className="font-heading font-extrabold tracking-wider uppercase">
                Pixcel<span className="text-[#ff4655]">.gg</span>
              </span>
            </div>
            <p className="text-[#9da3af] max-w-md leading-relaxed text-xs sm:text-sm">
              Honest game reviews, technical performance breakdowns, and gaming journalism.
              Independent critiques written by passionate players for players at pixcel.gg.
            </p>
            <div className="flex items-center gap-3 pt-2 text-[11px] text-[#7b8096]">
              <span className="flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-[#ff4655]" />
                100% Unsponsored Reviews
              </span>
              <span aria-hidden="true">·</span>
              <span className="flex items-center gap-1">
                <Scale className="w-3.5 h-3.5 text-[#ff4655]" />
                Standardized 10-Point Scale
              </span>
            </div>
          </div>

          {/* Col 2: Editorial Coverage */}
          <div>
            <h4 className="font-bold text-white uppercase tracking-wider text-xs mb-3">
              Editorial Coverage
            </h4>
            <ul className="space-y-2">
              <li>
                <a href="#reviews-section" className="hover:text-white transition-colors">
                  Action & RPGs
                </a>
              </li>
              <li>
                <a href="#reviews-section" className="hover:text-white transition-colors">
                  Open World Epics
                </a>
              </li>
              <li>
                <a href="#reviews-section" className="hover:text-white transition-colors">
                  Competitive & Tactical Shooters
                </a>
              </li>
              <li>
                <a href="#reviews-section" className="hover:text-white transition-colors">
                  Indie & Metroidvanias
                </a>
              </li>
              <li>
                <a href="#hall-of-fame" className="hover:text-white transition-colors">
                  Hall of Fame (9.5+)
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3: Review Guidelines & Ethics */}
          <div id="editorial-ethics">
            <h4 className="font-bold text-white uppercase tracking-wider text-xs mb-3">
              Review Guidelines
            </h4>
            <p className="text-[11px] text-[#9da3af] leading-relaxed mb-3">
              We complete campaign playthroughs or log competitive benchmarks before rendering final scores.
              Game codes provided by publishers never influence editorial scoring.
            </p>
            <div className="text-[11px] text-[#7b8096]">
              Scoring rubric: 10 (Masterpiece) · 9 (Essential) · 8 (Great) · 7 (Good)
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-[#2b3048]/70 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-[11px]">
            © {new Date().getFullYear()} pixcel.gg. All rights reserved. Game titles and artwork belong to their respective publishers.
          </p>
          <div className="flex items-center gap-4 text-[11px]">
            <a href="#" className="hover:text-white transition-colors">Review Policy</a>
            <span aria-hidden="true">·</span>
            <a href="#" className="hover:text-white transition-colors">Ethics Statement</a>
            <span aria-hidden="true">·</span>
            <a href="#" className="hover:text-white transition-colors">Archive</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
