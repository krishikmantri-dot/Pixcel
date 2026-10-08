import React from 'react';
import { SortOption, RatingFilterOption } from '../types';
import { LayoutGrid, List, SlidersHorizontal, X } from 'lucide-react';

interface FilterBarProps {
  genres: string[];
  selectedGenre: string;
  onSelectGenre: (genre: string) => void;
  selectedSort: SortOption;
  onSelectSort: (sort: SortOption) => void;
  selectedRatingFilter: RatingFilterOption;
  onSelectRatingFilter: (filter: RatingFilterOption) => void;
  viewMode: 'grid' | 'list';
  onToggleViewMode: (mode: 'grid' | 'list') => void;
  totalCount: number;
  filteredCount: number;
  searchQuery: string;
  onClearSearch: () => void;
  isBookmarkedOnly: boolean;
  onResetAllFilters: () => void;
}

export const FilterBar: React.FC<FilterBarProps> = ({
  genres,
  selectedGenre,
  onSelectGenre,
  selectedSort,
  onSelectSort,
  selectedRatingFilter,
  onSelectRatingFilter,
  viewMode,
  onToggleViewMode,
  filteredCount,
  searchQuery,
  onClearSearch,
  isBookmarkedOnly,
  onResetAllFilters,
}) => {
  const isFiltered =
    selectedGenre !== 'all' ||
    selectedRatingFilter !== 'all' ||
    searchQuery.trim().length > 0 ||
    isBookmarkedOnly;

  return (
    <div className="space-y-4 mb-8 font-aptos">
      {/* Genre Segmented Tabs in Aptos Bold */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2">
        <button
          onClick={() => onSelectGenre('all')}
          className={`px-3.5 py-1.5 text-xs font-bold whitespace-nowrap transition-all cursor-pointer border-2 uppercase tracking-wide ${
            selectedGenre === 'all'
              ? 'bg-[#ffe600] text-black border-[#ffe600] shadow-[2px_2px_0px_#ffffff]'
              : 'bg-[#121212] border-[#333333] text-[#a3a3a3] hover:text-white hover:border-[#ffe600]'
          }`}
        >
          All Genres
        </button>

        {genres.map((g) => (
          <button
            key={g}
            onClick={() => onSelectGenre(g)}
            className={`px-3.5 py-1.5 text-xs font-bold whitespace-nowrap transition-all cursor-pointer border-2 uppercase tracking-wide ${
              selectedGenre === g
                ? 'bg-[#ffe600] text-black border-[#ffe600] shadow-[2px_2px_0px_#ffffff]'
                : 'bg-[#121212] border-[#333333] text-[#a3a3a3] hover:text-white hover:border-[#ffe600]'
            }`}
          >
            {g}
          </button>
        ))}
      </div>

      {/* Controls Strip: Sort, Rating, View Mode, Count in Aptos font */}
      <div className="bg-[#0c0c0c] border-2 border-[#2b2b2b] p-3 flex flex-wrap items-center justify-between gap-3 text-xs">
        {/* Left: Rating and Sorting Filters */}
        <div className="flex flex-wrap items-center gap-3">
          {/* Rating filter dropdown */}
          <div className="flex items-center gap-1.5 text-xs font-bold text-[#888888]">
            <SlidersHorizontal className="w-3.5 h-3.5 text-[#ffe600]" />
            <span className="uppercase tracking-wider">Rating:</span>
            <select
              value={selectedRatingFilter}
              onChange={(e) => onSelectRatingFilter(e.target.value as RatingFilterOption)}
              className="bg-[#161616] border border-[#333333] text-white text-xs font-semibold px-2 py-1 focus:outline-none focus:border-[#ffe600] cursor-pointer"
            >
              <option value="all">All Scores</option>
              <option value="masterpiece">★ 9.5+ Masterpieces</option>
              <option value="great">★ 9.0+ Exceptional</option>
              <option value="good">★ 8.0+ Recommended</option>
            </select>
          </div>

          {/* Sort selector */}
          <div className="flex items-center gap-1.5 text-xs font-bold text-[#888888]">
            <span className="uppercase tracking-wider">Sort:</span>
            <select
              value={selectedSort}
              onChange={(e) => onSelectSort(e.target.value as SortOption)}
              className="bg-[#161616] border border-[#333333] text-white text-xs font-semibold px-2 py-1 focus:outline-none focus:border-[#ffe600] cursor-pointer"
            >
              <option value="highest_rated">Highest Rated</option>
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
              <option value="alphabetical">Title (A-Z)</option>
            </select>
          </div>
        </div>

        {/* Right: View mode and Reset */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1 border border-[#333333] p-0.5 bg-[#141414]">
            <button
              onClick={() => onToggleViewMode('grid')}
              className={`p-1.5 text-xs transition-colors cursor-pointer ${
                viewMode === 'grid'
                  ? 'bg-[#ffe600] text-black font-bold'
                  : 'text-[#888888] hover:text-white'
              }`}
              title="Grid View"
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
            <button
              onClick={() => onToggleViewMode('list')}
              className={`p-1.5 text-xs transition-colors cursor-pointer ${
                viewMode === 'list'
                  ? 'bg-[#ffe600] text-black font-bold'
                  : 'text-[#888888] hover:text-white'
              }`}
              title="List View"
            >
              <List className="w-4 h-4" />
            </button>
          </div>

          <span className="text-xs font-bold text-[#ffe600] uppercase tracking-wider">
            {filteredCount} Reviews
          </span>

          {isFiltered && (
            <button
              onClick={onResetAllFilters}
              className="text-xs font-bold text-[#ff4444] hover:text-white flex items-center gap-1 cursor-pointer transition-colors"
            >
              <X className="w-3.5 h-3.5" />
              <span>Reset</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
