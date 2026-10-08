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
    <div className="space-y-4 mb-8">
      {/* Genre Segmented Tabs (Functional Buttons) */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1.5 scrollbar-thin">
        <button
          onClick={() => onSelectGenre('all')}
          className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
            selectedGenre === 'all'
              ? 'bg-[#ff4655] text-white shadow-sm'
              : 'bg-[#1a1d2e] border border-[#2b3048] text-[#9da3af] hover:text-white hover:border-[#ff4655]/40'
          }`}
        >
          All Genres
        </button>

        {genres.map((g) => (
          <button
            key={g}
            onClick={() => onSelectGenre(g)}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
              selectedGenre === g
                ? 'bg-[#ff4655] text-white shadow-sm'
                : 'bg-[#1a1d2e] border border-[#2b3048] text-[#9da3af] hover:text-white hover:border-[#ff4655]/40'
            }`}
          >
            {g}
          </button>
        ))}
      </div>

      {/* Control Strip: Sort, Rating Tier, View Mode & Counter */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-3 rounded-xl bg-[#141724] border border-[#2b3048] text-xs">
        <div className="flex flex-wrap items-center gap-2">
          {/* Rating Tier Filter */}
          <div className="flex items-center gap-1">
            <span className="text-[#7b8096] text-[11px] font-semibold uppercase tracking-wider mr-1 hidden sm:inline">
              Rating:
            </span>
            <select
              value={selectedRatingFilter}
              onChange={(e) => onSelectRatingFilter(e.target.value as RatingFilterOption)}
              className="bg-[#111320] border border-[#2b3048] rounded-md px-2.5 py-1.5 text-xs text-white focus:outline-none focus:border-[#ff4655]"
            >
              <option value="all">Any Rating</option>
              <option value="masterpieces">Masterpieces (9.5+)</option>
              <option value="great">Essential (9.0+)</option>
              <option value="good">Recommended (8.0+)</option>
            </select>
          </div>

          {/* Sort By Dropdown */}
          <div className="flex items-center gap-1">
            <SlidersHorizontal className="w-3.5 h-3.5 text-[#7b8096] hidden sm:inline" />
            <select
              value={selectedSort}
              onChange={(e) => onSelectSort(e.target.value as SortOption)}
              className="bg-[#111320] border border-[#2b3048] rounded-md px-2.5 py-1.5 text-xs text-white focus:outline-none focus:border-[#ff4655]"
            >
              <option value="highest_rated">Highest Rated</option>
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
              <option value="alphabetical">Title (A-Z)</option>
            </select>
          </div>

          {/* Active Filter Clear Tag */}
          {isFiltered && (
            <button
              onClick={onResetAllFilters}
              className="flex items-center gap-1 px-2.5 py-1 rounded bg-[#ff4655]/15 text-[#ff4655] hover:bg-[#ff4655]/25 border border-[#ff4655]/30 text-[11px] font-semibold transition-colors"
            >
              <span>Reset Filters</span>
              <X className="w-3 h-3" />
            </button>
          )}
        </div>

        {/* View Mode & Count */}
        <div className="flex items-center gap-3">
          <span className="text-[#9da3af] tabular-nums font-mono text-[11px]">
            {filteredCount} {filteredCount === 1 ? 'Review' : 'Reviews'}
          </span>

          <div className="flex items-center bg-[#111320] border border-[#2b3048] rounded-md p-0.5">
            <button
              onClick={() => onToggleViewMode('grid')}
              aria-label="Grid layout"
              className={`p-1.5 rounded transition-colors ${
                viewMode === 'grid' ? 'bg-[#ff4655] text-white' : 'text-[#7b8096] hover:text-white'
              }`}
            >
              <LayoutGrid className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => onToggleViewMode('list')}
              aria-label="List layout"
              className={`p-1.5 rounded transition-colors ${
                viewMode === 'list' ? 'bg-[#ff4655] text-white' : 'text-[#7b8096] hover:text-white'
              }`}
            >
              <List className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
