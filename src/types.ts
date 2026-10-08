export interface ScoreBreakdown {
  gameplay: number;
  graphics: number;
  sound: number;
  story: number;
}

export interface ReviewComment {
  id: string;
  author: string;
  date: string;
  text: string;
  likes: number;
}

export interface GameReview {
  id: string;
  title: string;
  genre: string;
  rating: number; // 1-10
  image: string;
  summary: string;
  fullReview?: string;
  date: string;
  author: string;
  platform: string;
  playtime?: string;
  pros?: string[];
  cons?: string[];
  breakdown?: ScoreBreakdown;
  comments?: ReviewComment[];
  isFeatured?: boolean;
}

export type SortOption = 'highest_rated' | 'newest' | 'oldest' | 'alphabetical';
export type RatingFilterOption = 'all' | 'masterpieces' | 'great' | 'good';
