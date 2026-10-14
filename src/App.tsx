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
import { ReviewDetailPage } from './components/ReviewDetailPage';
import { Footer } from './components/Footer';
import { Sparkles, Gamepad2, BookmarkX, RotateCcw } from 'lucide-react';

const STORAGE_KEY_REVIEWS = 'pixcel_gg_reviews_v5';
const STORAGE_KEY_BOOKMARKS = 'pixcel_gg_bookmarks_v5';

export default function App() {
  // Initialize reviews from localStorage or defaults
  const [reviews, setReviews] = useState<GameReview[]>(() => {
    try {
      const stored =
        localStorage.getItem(STORAGE_KEY_REVIEWS) ||
        localStorage.getItem('pixcel_gg_reviews_v4') ||
        localStorage.getItem('pixelpulse_reviews_v3');
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) {
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

  // Helper to extract review ID from the current browser URL
  const extractReviewIdFromUrl = (): string | null => {
    if (typeof window === 'undefined') return null;

    // Check pathname: e.g. /review/elden-ring-shadow-erdtree or /blog/elden-ring-shadow-erdtree
    const pathMatch = window.location.pathname.match(/^\/(?:review|blog)\/([^/?#]+)/i);
    if (pathMatch && pathMatch[1]) {
      return decodeURIComponent(pathMatch[1]);
    }

    // Check query param: ?review=elden-ring-shadow-erdtree or ?id=...
    const searchParams = new URLSearchParams(window.location.search);
    const queryReview = searchParams.get('review') || searchParams.get('id') || searchParams.get('blog');
    if (queryReview) return queryReview;

    // Check hash: #/review/elden-ring-shadow-erdtree or #review-elden-ring-shadow-erdtree
    const hashMatch = window.location.hash.match(/^#\/?(?:review|blog)[/-]([^/?#]+)/i);
    if (hashMatch && hashMatch[1]) {
      return decodeURIComponent(hashMatch[1]);
    }

    return null;
  };

  // Open a review
  const handleOpenReview = (review: GameReview, updateHistory = true) => {
    setSelectedReview(review);
    document.title = `${review.title} - pixcel.gg`;
    window.scrollTo({ top: 0, behavior: 'instant' });

    if (updateHistory && typeof window !== 'undefined') {
      const targetUrl = `/review/${review.id}`;
      if (window.location.pathname !== targetUrl) {
        window.history.pushState({ reviewId: review.id }, '', targetUrl);
      }
    }
  };

  // Close review and return to home
  const handleCloseReview = (updateHistory = true) => {
    setSelectedReview(null);
    document.title = 'pixcel.gg - Gaming Blog & Reviews';
    window.scrollTo({ top: 0, behavior: 'instant' });

    if (updateHistory && typeof window !== 'undefined') {
      if (window.location.pathname.startsWith('/review/') || window.location.pathname.startsWith('/blog/')) {
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

    const elem = document.getElementById('reviews-section');
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Add comment to review
  const handleAddComment = (
    reviewId: string,
    commentData: Omit<ReviewComment, 'id' | 'likes'>
  ) => {
    const newComment: ReviewComment = {
      id: `comment-${Date.now()}`,
      author: commentData.author,
      text: commentData.text,
      date: commentData.date || 'Just now',
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
    showToast('Your comment has been posted!');
  };

  // Like a comment
  const handleLikeComment = (reviewId: string, commentId: string) => {
    setReviews((prev) =>
      prev.map((r) => {
        if (r.id === reviewId) {
          const updatedComments = (r.comments || []).map((c) =>
            c.id === commentId ? { ...c, likes: c.likes + 1 } : c
          );
          const updatedReview = { ...r, comments: updatedComments };
          if (selectedReview?.id === reviewId) {
            setSelectedReview(updatedReview);
          }
          return updatedReview;
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
        if (isFilteringBookmarked && !bookmarkedIds.includes(r.id)) {
          return false;
        }

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

        if (selectedGenre !== 'all' && r.genre !== selectedGenre) {
          return false;
        }

        if (selectedRatingFilter === 'masterpiece' && r.rating < 9.5) {
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

  // If a review is selected, redirect to the Review Detail Page!
  if (selectedReview) {
    return (
      <div className="min-h-screen bg-[#000000] text-[#f5f5f5] flex flex-col font-aptos selection:bg-[#ffe600] selection:text-black">
        {/* Toast Notification */}
        {toastMessage && (
          <aside
            role="status"
            aria-live="polite"
            className="fixed bottom-6 right-6 z-50 bg-[#121212] border-2 border-[#ffe600] text-white px-4 py-2.5 shadow-[4px_4px_0px_#ffe600] text-xs font-bold flex items-center gap-2.5 animate-fadeIn"
          >
            <Sparkles className="w-4 h-4 text-[#ffe600]" />
            <span>{toastMessage}</span>
          </aside>
        )}

        <ReviewDetailPage
          review={selectedReview}
          allReviews={reviews}
          onBack={() => handleCloseReview(true)}
          onNavigateToReview={(rev) => handleOpenReview(rev, true)}
          isBookmarked={bookmarkedIds.includes(selectedReview.id)}
          onToggleBookmark={(id) => handleToggleBookmark(id)}
          onAddComment={handleAddComment}
          onLikeComment={handleLikeComment}
        />

        <Footer />
      </div>
    );
  }

  // Main Catalogue View
  return (
    <div className="min-h-screen bg-[#000000] text-[#f5f5f5] flex flex-col font-aptos selection:bg-[#ffe600] selection:text-black">
      {/* Toast Notification */}
      {toastMessage && (
        <aside
          role="status"
          aria-live="polite"
          className="fixed bottom-6 right-6 z-50 bg-[#121212] border-2 border-[#ffe600] text-white px-4 py-2.5 shadow-[4px_4px_0px_#ffe600] text-xs font-bold flex items-center gap-2.5 animate-fadeIn"
        >
          <Sparkles className="w-4 h-4 text-[#ffe600]" />
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
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 mb-8 border-b-4 border-[#ffe600] gap-4">
          <div>
            {/* Main title in 8-bit font */}
            <h1 className="text-xl sm:text-3xl font-8bit text-[#ffe600] tracking-wide uppercase">
              PIXCEL<span className="text-white">.GG</span> GAMING CHRONICLE
            </h1>
            <p className="text-sm sm:text-base text-[#a3a3a3] mt-1 font-medium">
              In-Depth Reviews · Honest Ratings · Modern Gaming Stories
            </p>
          </div>

          <div className="flex items-center gap-3 text-xs font-semibold">
            <span className="text-[#888888]">
              Catalogue: <strong className="text-[#ffe600] font-bold">{reviews.length}</strong> Titles
            </span>
            <span>·</span>
            <button
              onClick={handleResetToDefaults}
              className="text-[#a3a3a3] hover:text-[#ffe600] flex items-center gap-1 transition-colors cursor-pointer font-bold"
              title="Reset to 10 curated reviews"
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
              <span className="w-2.5 h-6 bg-[#ffe600]" />
              {/* Section title in 8-bit font */}
              <h2 className="text-lg sm:text-2xl font-8bit text-white tracking-wide">
                {isFilteringBookmarked
                  ? 'SAVED READING LIST'
                  : searchQuery.trim()
                  ? `SEARCH: "${searchQuery.toUpperCase()}"`
                  : 'LATEST GAME REVIEWS'}
              </h2>
            </div>
            {isFilteringBookmarked && (
              <button
                onClick={() => setIsFilteringBookmarked(false)}
                className="text-xs font-bold text-[#ffe600] hover:underline cursor-pointer"
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
            <div className="p-12 text-center bg-[#0c0c0c] border-3 border-[#333333] my-6 font-aptos">
              <div className="w-14 h-14 bg-[#141414] border-2 border-[#ffe600] text-[#ffe600] flex items-center justify-center mx-auto mb-4">
                {isFilteringBookmarked ? (
                  <BookmarkX className="w-7 h-7" />
                ) : (
                  <Gamepad2 className="w-7 h-7" />
                )}
              </div>
              <h3 className="text-lg font-bold text-white mb-2">
                {isFilteringBookmarked
                  ? 'No Saved Reviews Yet'
                  : 'No Matching Reviews Found'}
              </h3>
              <p className="text-sm text-[#a3a3a3] max-w-md mx-auto mb-6">
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
                  className="px-4 py-2 border-2 border-[#333333] text-xs font-bold text-white hover:border-[#ffe600] cursor-pointer"
                >
                  Reset Filters
                </button>
                <button
                  onClick={() => setIsPublishOpen(true)}
                  className="retro-btn-yellow px-4 py-2 text-xs font-bold cursor-pointer"
                >
                  Post Review Now
                </button>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Editorial Footer */}
      <Footer />
    </div>
  );
}
