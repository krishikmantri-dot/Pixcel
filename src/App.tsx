/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useMemo } from 'react';
import { GameReview, SortOption, RatingFilterOption, ReviewComment } from './types';
import { INITIAL_BLOGS } from './data/defaultReviews';
import { Navbar } from './components/Navbar';
import { HeroFeatured } from './components/HeroFeatured';
import { HallOfFame } from './components/HallOfFame';
import { CreateReviewSection } from './components/CreateReviewSection';
import { FilterBar } from './components/FilterBar';
import { ReviewCard } from './components/ReviewCard';
import { ReviewListCard } from './components/ReviewListCard';
import { ReviewModal } from './components/ReviewModal';
import { Footer } from './components/Footer';
import { Sparkles, Gamepad2, BookmarkX, RotateCcw } from 'lucide-react';

const STORAGE_KEY_REVIEWS = 'pixelpulse_reviews_v3';
const STORAGE_KEY_BOOKMARKS = 'pixelpulse_bookmarks_v3';

export default function App() {
  // Initialize reviews from localStorage or defaults with real photos & full 150+ word text
  const [reviews, setReviews] = useState<GameReview[]>(() => {
    try {
      const stored =
        localStorage.getItem(STORAGE_KEY_REVIEWS) ||
        localStorage.getItem('pixelpulse_reviews_v2') ||
        localStorage.getItem('pixelpulse_reviews_v1');
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) {
          // Always map default reviews to their updated real photo paths and 150+ word reviews
          const initialMap = new Map(INITIAL_BLOGS.map((item) => [item.id, item]));
          return parsed.map((item: GameReview) => {
            const initialItem = initialMap.get(item.id);
            if (initialItem) {
              return {
                ...item,
                image: initialItem.image,
                summary: initialItem.summary,
                fullReview: initialItem.fullReview,
              };
            }
            return item;
          });
        }
      }
    } catch {
      // Fallback
    }
    return INITIAL_BLOGS;
  });

  // Bookmarks
  const [bookmarkedIds, setBookmarkedIds] = useState<string[]>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY_BOOKMARKS);
      if (stored) {
        return JSON.parse(stored);
      }
    } catch {
      // Fallback
    }
    return [];
  });

  // UI state
  const [selectedReview, setSelectedReview] = useState<GameReview | null>(null);
  const [isPublishOpen, setIsPublishOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGenre, setSelectedGenre] = useState<string>('all');
  const [selectedSort, setSelectedSort] = useState<SortOption>('highest_rated');
  const [selectedRatingFilter, setSelectedRatingFilter] = useState<RatingFilterOption>('all');
  const [isFilteringBookmarked, setIsFilteringBookmarked] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Helper to extract review ID from the current browser URL (supports /review/:id, ?review=:id, or #/review/:id)
  const extractReviewIdFromUrl = (): string | null => {
    if (typeof window === 'undefined') return null;

    // Check pathname: e.g. /review/elden-ring-shadow-erdtree
    const pathMatch = window.location.pathname.match(/^\/review\/([^/?#]+)/i);
    if (pathMatch && pathMatch[1]) {
      return decodeURIComponent(pathMatch[1]);
    }

    // Check query param: ?review=elden-ring-shadow-erdtree
    const searchParams = new URLSearchParams(window.location.search);
    const queryReview = searchParams.get('review');
    if (queryReview) return queryReview;

    // Check hash: #/review/elden-ring-shadow-erdtree
    const hashMatch = window.location.hash.match(/^#\/?review\/([^/?#]+)/i);
    if (hashMatch && hashMatch[1]) {
      return decodeURIComponent(hashMatch[1]);
    }

    return null;
  };

  // Open a review and update browser URL to its unique URL
  const handleOpenReview = (review: GameReview, updateHistory = true) => {
    setSelectedReview(review);
    document.title = `${review.title} - pixcel.gg`;
    if (updateHistory && typeof window !== 'undefined') {
      const targetUrl = `/review/${review.id}`;
      if (window.location.pathname !== targetUrl) {
        window.history.pushState({ reviewId: review.id }, '', targetUrl);
      }
    }
  };

  // Close review and revert browser URL to /
  const handleCloseReview = (updateHistory = true) => {
    setSelectedReview(null);
    document.title = 'pixcel.gg - Gaming Blog & Reviews';
    if (updateHistory && typeof window !== 'undefined') {
      if (window.location.pathname.startsWith('/review/')) {
        window.history.pushState(null, '', '/');
      }
    }
  };

  // Handle URL on mount and browser popstate (back/forward navigation)
  useEffect(() => {
    const handleUrlChange = () => {
      const reviewId = extractReviewIdFromUrl();
      if (reviewId) {
        const found = reviews.find((r) => r.id === reviewId);
        if (found) {
          handleOpenReview(found, false);
        } else {
          setSelectedReview(null);
          document.title = 'pixcel.gg - Gaming Blog & Reviews';
        }
      } else {
        setSelectedReview(null);
        document.title = 'pixcel.gg - Gaming Blog & Reviews';
      }
    };

    handleUrlChange();

    window.addEventListener('popstate', handleUrlChange);
    return () => window.removeEventListener('popstate', handleUrlChange);
  }, [reviews]);

  // Sync to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_REVIEWS, JSON.stringify(reviews));
    } catch (e) {
      console.error('Failed to save reviews to localStorage', e);
    }
  }, [reviews]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_BOOKMARKS, JSON.stringify(bookmarkedIds));
    } catch (e) {
      console.error('Failed to save bookmarks to localStorage', e);
    }
  }, [bookmarkedIds]);

  // Toast notification auto-dismiss
  const showToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage((prev) => (prev === message ? null : prev));
    }, 3200);
  };

  // Distinct genres for filter tabs
  const distinctGenres = useMemo(() => {
    const set = new Set<string>();
    reviews.forEach((r) => {
      if (r.genre) set.add(r.genre);
    });
    return Array.from(set);
  }, [reviews]);

  // Featured review (Editor's choice)
  const featuredReview = useMemo(() => {
    const found = reviews.find((r) => r.isFeatured);
    return found || reviews[0];
  }, [reviews]);

  // Toggle bookmark
  const handleToggleBookmark = (id: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setBookmarkedIds((prev) => {
      const exists = prev.includes(id);
      if (exists) {
        showToast('Review removed from bookmarks');
        return prev.filter((item) => item !== id);
      } else {
        showToast('Review saved to reading list');
        return [...prev, id];
      }
    });
  };

  // Add new review
  const handleAddReview = (newReview: GameReview) => {
    setReviews((prev) => [newReview, ...prev]);
    setIsPublishOpen(false);

    // Scroll to the reviews section smoothly
    const elem = document.getElementById('reviews-section');
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Add comment to review
  const handleAddComment = (
    reviewId: string,
    commentData: Omit<ReviewComment, 'id' | 'likes' | 'date'>
  ) => {
    const newComment: ReviewComment = {
      id: `comment-${Date.now()}`,
      author: commentData.author,
      text: commentData.text,
      date: 'Just now',
      likes: 1,
    };

    setReviews((prev) =>
      prev.map((r) => {
        if (r.id === reviewId) {
          const updated = {
            ...r,
            comments: [newComment, ...(r.comments || [])],
          };
          if (selectedReview?.id === reviewId) {
            setSelectedReview(updated);
          }
          return updated;
        }
        return r;
      })
    );
  };

  // Reset to original defaults
  const handleResetToDefaults = () => {
    if (window.confirm('Reset catalogue to original 10 curated reviews?')) {
      setReviews(INITIAL_BLOGS);
      setBookmarkedIds([]);
      showToast('Reset to original 10 pixcel.gg reviews');
    }
  };

  // Filter & Sort Logic
  const filteredReviews = useMemo(() => {
    return reviews
      .filter((r) => {
        // Bookmarked filter
        if (isFilteringBookmarked && !bookmarkedIds.includes(r.id)) {
          return false;
        }

        // Search query
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase();
          const matchTitle = r.title.toLowerCase().includes(q);
          const matchGenre = r.genre.toLowerCase().includes(q);
          const matchSummary = r.summary.toLowerCase().includes(q);
          const matchPlatform = r.platform.toLowerCase().includes(q);
          const matchAuthor = r.author.toLowerCase().includes(q);
          if (!matchTitle && !matchGenre && !matchSummary && !matchPlatform && !matchAuthor) {
            return false;
          }
        }

        // Genre filter
        if (selectedGenre !== 'all' && r.genre !== selectedGenre) {
          return false;
        }

        // Rating filter
        if (selectedRatingFilter === 'masterpieces' && r.rating < 9.5) {
          return false;
        }
        if (selectedRatingFilter === 'great' && r.rating < 9.0) {
          return false;
        }
        if (selectedRatingFilter === 'good' && r.rating < 8.0) {
          return false;
        }

        return true;
      })
      .sort((a, b) => {
        if (selectedSort === 'highest_rated') {
          return b.rating - a.rating;
        }
        if (selectedSort === 'newest') {
          return new Date(b.date).getTime() - new Date(a.date).getTime();
        }
        if (selectedSort === 'oldest') {
          return new Date(a.date).getTime() - new Date(b.date).getTime();
        }
        if (selectedSort === 'alphabetical') {
          return a.title.localeCompare(b.title);
        }
        return 0;
      });
  }, [
    reviews,
    isFilteringBookmarked,
    bookmarkedIds,
    searchQuery,
    selectedGenre,
    selectedRatingFilter,
    selectedSort,
  ]);

  return (
    <div className="min-h-screen bg-[#0f111a] text-[#f0f0f5] flex flex-col font-sans selection:bg-[#ff4655] selection:text-white">
      {/* Toast Notification */}
      {toastMessage && (
        <aside
          role="status"
          aria-live="polite"
          className="fixed bottom-6 right-6 z-50 bg-[#141724] border border-[#ff4655] text-white px-4 py-2.5 rounded-xl shadow-2xl text-xs sm:text-sm font-semibold flex items-center gap-2.5 animate-fadeIn"
        >
          <Sparkles className="w-4 h-4 text-[#ff4655]" />
          <span>{toastMessage}</span>
        </aside>
      )}

      {/* Top Bar Navigation */}
      <Navbar
        onOpenPublish={() => {
          setIsPublishOpen(true);
          const elem = document.getElementById('publish-section');
          if (elem) elem.scrollIntoView({ behavior: 'smooth' });
        }}
        bookmarksCount={bookmarkedIds.length}
        onFilterBookmarked={() => setIsFilteringBookmarked((prev) => !prev)}
        isFilteringBookmarked={isFilteringBookmarked}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-16">
        {/* Editorial Sub-header / Brand Kicker */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 mb-8 border-b border-[#2b3048]">
          <div>
            <h1 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight uppercase font-heading">
              Pixcel<span className="text-[#ff4655]">.gg</span> Gaming Chronicle
            </h1>
            <p className="text-xs sm:text-sm text-[#9da3af] mt-1">
              Honest Reviews, In-Depth Impressions & Modern Gaming Stories
            </p>
          </div>

          <div className="flex items-center gap-3 mt-4 sm:mt-0 text-xs">
            <span className="text-[#7b8096]">
              Catalogue Size: <strong className="text-white font-mono">{reviews.length}</strong> Titles
            </span>
            <span aria-hidden="true" className="text-[#2b3048]">·</span>
            <button
              onClick={handleResetToDefaults}
              className="text-[#9da3af] hover:text-[#ff4655] flex items-center gap-1 transition-colors"
              title="Reset default 10 reviews"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset Data</span>
            </button>
          </div>
        </div>

        {/* Hero Spotlight Review (when not filtering by bookmarked only) */}
        {!isFilteringBookmarked && !searchQuery.trim() && (
          <HeroFeatured
            review={featuredReview}
            onReadReview={(rev) => handleOpenReview(rev)}
          />
        )}

        {/* Hall of Fame Highlights */}
        {!isFilteringBookmarked && !searchQuery.trim() && (
          <HallOfFame
            reviews={reviews}
            onSelectReview={(rev) => handleOpenReview(rev)}
          />
        )}

        {/* Publish Review Section */}
        <CreateReviewSection
          onAddReview={handleAddReview}
          isOpen={isPublishOpen}
          onToggleOpen={() => setIsPublishOpen((prev) => !prev)}
          onToast={showToast}
        />

        {/* Latest Reviews Section Header */}
        <div id="reviews-section" className="scroll-mt-24">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <span className="w-1.5 h-6 bg-[#ff4655] rounded-full" />
              <h2 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight font-heading">
                {isFilteringBookmarked
                  ? 'Saved Reading List'
                  : searchQuery.trim()
                  ? `Search Results for "${searchQuery}"`
                  : 'Latest Game Reviews'}
              </h2>
            </div>
            {isFilteringBookmarked && (
              <button
                onClick={() => setIsFilteringBookmarked(false)}
                className="text-xs text-[#ff4655] hover:underline font-semibold"
              >
                ← Back to All Reviews
              </button>
            )}
          </div>

          {/* Interactive Filter Bar */}
          <FilterBar
            genres={distinctGenres}
            selectedGenre={selectedGenre}
            onSelectGenre={setSelectedGenre}
            selectedSort={selectedSort}
            onSelectSort={setSelectedSort}
            selectedRatingFilter={selectedRatingFilter}
            onSelectRatingFilter={setSelectedRatingFilter}
            viewMode={viewMode}
            onToggleViewMode={setViewMode}
            totalCount={reviews.length}
            filteredCount={filteredReviews.length}
            searchQuery={searchQuery}
            onClearSearch={() => setSearchQuery('')}
            isBookmarkedOnly={isFilteringBookmarked}
            onResetAllFilters={() => {
              setSelectedGenre('all');
              setSelectedRatingFilter('all');
              setSelectedSort('highest_rated');
              setSearchQuery('');
              setIsFilteringBookmarked(false);
            }}
          />

          {/* Reviews Output (Grid vs List) */}
          {filteredReviews.length > 0 ? (
            viewMode === 'grid' ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredReviews.map((review) => (
                  <ReviewCard
                    key={review.id}
                    review={review}
                    onSelect={(rev) => handleOpenReview(rev)}
                    isBookmarked={bookmarkedIds.includes(review.id)}
                    onToggleBookmark={handleToggleBookmark}
                  />
                ))}
              </div>
            ) : (
              <div className="space-y-4">
                {filteredReviews.map((review) => (
                  <ReviewListCard
                    key={review.id}
                    review={review}
                    onSelect={(rev) => handleOpenReview(rev)}
                    isBookmarked={bookmarkedIds.includes(review.id)}
                    onToggleBookmark={handleToggleBookmark}
                  />
                ))}
              </div>
            )
          ) : (
            /* Empty State */
            <div className="p-12 text-center rounded-2xl bg-[#141724] border border-[#2b3048] my-6">
              <div className="w-12 h-12 rounded-xl bg-[#ff4655]/10 border border-[#ff4655]/20 text-[#ff4655] flex items-center justify-center mx-auto mb-4">
                {isFilteringBookmarked ? (
                  <BookmarkX className="w-6 h-6" />
                ) : (
                  <Gamepad2 className="w-6 h-6" />
                )}
              </div>
              <h3 className="text-lg font-bold text-white mb-2">
                {isFilteringBookmarked
                  ? 'No Saved Reviews Yet'
                  : 'No Matching Game Reviews Found'}
              </h3>
              <p className="text-xs sm:text-sm text-[#9da3af] max-w-md mx-auto mb-6">
                {isFilteringBookmarked
                  ? 'Bookmark reviews by clicking the bookmark icon on any review card to read them later.'
                  : `We couldn't find any reviews matching your current filters or query. Try resetting filters or post a new review.`}
              </p>
              <div className="flex items-center justify-center gap-3">
                <button
                  onClick={() => {
                    setSelectedGenre('all');
                    setSelectedRatingFilter('all');
                    setSearchQuery('');
                    setIsFilteringBookmarked(false);
                  }}
                  className="px-4 py-2 rounded-lg bg-[#1a1d2e] border border-[#2b3048] text-xs font-semibold text-white hover:border-[#ff4655] transition-colors"
                >
                  Reset All Filters
                </button>
                <button
                  onClick={() => setIsPublishOpen(true)}
                  className="px-4 py-2 rounded-lg bg-[#ff4655] hover:bg-[#ff2d3f] text-xs font-semibold text-white transition-colors"
                >
                  Post a Review Now
                </button>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* In-Depth Review Modal */}
      <ReviewModal
        review={selectedReview}
        onClose={() => handleCloseReview()}
        isBookmarked={selectedReview ? bookmarkedIds.includes(selectedReview.id) : false}
        onToggleBookmark={(id) => handleToggleBookmark(id)}
        onAddComment={handleAddComment}
        onToast={showToast}
      />

      {/* Editorial Footer */}
      <Footer />
    </div>
  );
}
