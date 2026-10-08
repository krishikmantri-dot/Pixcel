import React from 'react';
import { Gamepad2, Bookmark, PlusCircle, Search } from 'lucide-react';

interface NavbarProps {
  onOpenPublish: () => void;
  bookmarksCount: number;
  onFilterBookmarked: () => void;
  isFilteringBookmarked: boolean;
  searchQuery: string;
  onSearchChange: (q: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenPublish,
  bookmarksCount,
  onFilterBookmarked,
  isFilteringBookmarked,
  searchQuery,
  onSearchChange,
}) => {
  return (
    <header className="sticky top-0 z-50 bg-[#0a0a0a]/95 backdrop-blur-md border-b-4 border-[#ffe600] font-aptos">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between gap-4">
        {/* Brand title wordmark with 8-bit font ONLY */}
        <a
          href="/"
          className="flex items-center gap-2.5 text-white hover:text-[#ffe600] transition-colors shrink-0 group"
        >
          <span className="w-9 h-9 bg-[#ffe600] border-2 border-black flex items-center justify-center text-black shadow-[2px_2px_0px_#ffffff] group-hover:scale-105 transition-transform">
            <Gamepad2 className="w-5 h-5 stroke-[2.5]" />
          </span>
          <span className="font-8bit text-base sm:text-xl text-[#ffe600] tracking-wider">
            PIXCEL<span className="text-white">.GG</span>
          </span>
        </a>

        {/* Nav Links in Aptos with bold weights */}
        <nav className="hidden md:flex items-center gap-7 text-sm font-semibold text-[#a3a3a3]">
          <a
            href="#reviews-section"
            className="hover:text-[#ffe600] transition-colors hover:underline underline-offset-8 decoration-[#ffe600]"
          >
            Reviews
          </a>
          <a
            href="#featured-spotlight"
            className="hover:text-[#ffe600] transition-colors hover:underline underline-offset-8 decoration-[#ffe600]"
          >
            Spotlight
          </a>
          <a
            href="#hall-of-fame"
            className="hover:text-[#ffe600] transition-colors hover:underline underline-offset-8 decoration-[#ffe600]"
          >
            Hall of Fame
          </a>
          <a
            href="#editorial-ethics"
            className="hover:text-[#ffe600] transition-colors hover:underline underline-offset-8 decoration-[#ffe600]"
          >
            Ethics
          </a>
        </nav>

        {/* Primary Actions in Aptos font */}
        <div className="flex items-center gap-3">
          {/* Quick Search */}
          <div className="relative hidden sm:block w-44 lg:w-56">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#ffe600]" />
            <input
              type="text"
              placeholder="Search reviews..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full bg-[#111111] border-2 border-[#333333] pl-9 pr-3 py-1.5 text-sm text-white placeholder-[#777777] focus:outline-none focus:border-[#ffe600] transition-colors font-medium"
            />
          </div>

          {/* Bookmarks toggle button */}
          <button
            onClick={onFilterBookmarked}
            aria-label="View saved reviews"
            className={`p-2 border-2 text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer ${
              isFilteringBookmarked
                ? 'bg-[#ffe600] border-[#ffe600] text-black shadow-[2px_2px_0px_#ffffff]'
                : 'bg-[#141414] border-[#333333] text-[#ffe600] hover:border-[#ffe600]'
            }`}
            title="Saved reading list"
          >
            <Bookmark className="w-4 h-4 fill-current" />
            <span className="tabular-nums font-bold text-xs">{bookmarksCount}</span>
          </button>

          {/* Publish Action Button */}
          <button
            onClick={onOpenPublish}
            className="retro-btn-yellow flex items-center gap-2 px-3.5 py-2 text-xs sm:text-sm font-bold whitespace-nowrap cursor-pointer"
          >
            <PlusCircle className="w-4 h-4 stroke-[3]" />
            <span>Post Review</span>
          </button>
        </div>
      </div>
    </header>
  );
};
