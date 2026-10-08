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
    <header className="sticky top-0 z-50 bg-[#141724]/95 backdrop-blur-md border-b border-[#2b3048]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between gap-4">
        {/* Zone 1: Brand title wordmark */}
        <a
          href="#"
          className="flex items-center gap-2.5 text-xl sm:text-2xl font-bold tracking-tight text-white hover:text-[#ff4655] transition-colors shrink-0"
        >
          <span className="w-8 h-8 rounded-lg bg-[#ff4655]/15 border border-[#ff4655]/30 flex items-center justify-center text-[#ff4655]">
            <Gamepad2 className="w-5 h-5" />
          </span>
          <span className="font-heading font-extrabold uppercase tracking-wider">
            Pixcel<span className="text-[#ff4655]">.gg</span>
          </span>
        </a>

        {/* Zone 2: Nav Links (Clean typography, single line) */}
        <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-[#9da3af]">
          <a
            href="#reviews-section"
            className="hover:text-white transition-colors hover:underline underline-offset-8 decoration-[#ff4655]"
          >
            Reviews
          </a>
          <a
            href="#featured-spotlight"
            className="hover:text-white transition-colors hover:underline underline-offset-8 decoration-[#ff4655]"
          >
            Spotlight
          </a>
          <a
            href="#hall-of-fame"
            className="hover:text-white transition-colors hover:underline underline-offset-8 decoration-[#ff4655]"
          >
            Hall of Fame
          </a>
          <a
            href="#editorial-ethics"
            className="hover:text-white transition-colors hover:underline underline-offset-8 decoration-[#ff4655]"
          >
            Editorial Ethics
          </a>
        </nav>

        {/* Zone 3: Primary Actions */}
        <div className="flex items-center gap-3">
          {/* Quick Search */}
          <div className="relative hidden sm:block w-44 lg:w-56">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#9da3af]" />
            <input
              type="text"
              placeholder="Search games..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full bg-[#111320] border border-[#2b3048] rounded-lg pl-9 pr-3 py-1.5 text-xs text-white placeholder-[#7b8096] focus:outline-none focus:border-[#ff4655] transition-colors"
            />
          </div>

          {/* Bookmarks toggle button */}
          <button
            onClick={onFilterBookmarked}
            aria-label="View saved reviews"
            className={`p-2 rounded-lg border text-xs font-semibold flex items-center gap-1.5 transition-colors ${
              isFilteringBookmarked
                ? 'bg-[#ff4655] border-[#ff4655] text-white'
                : 'bg-[#1a1d2e] border-[#2b3048] text-[#9da3af] hover:text-white hover:border-[#ff4655]/50'
            }`}
            title="Saved reading list"
          >
            <Bookmark className="w-4 h-4 fill-current" />
            <span className="tabular-nums font-mono text-xs">{bookmarksCount}</span>
          </button>

          {/* Publish Action Button */}
          <button
            onClick={onOpenPublish}
            className="flex items-center gap-2 bg-[#ff4655] hover:bg-[#ff2d3f] active:scale-98 text-white px-3.5 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all whitespace-nowrap shadow-sm"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Post Review</span>
          </button>
        </div>
      </div>
    </header>
  );
};
