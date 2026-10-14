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

export interface GameReviewSEO {
  metaTitle: string; // strictly <= 60 characters
  metaDescription: string; // strictly <= 160 characters
  primaryKeyword: string;
  secondaryKeywords: string[];
  imageAlt: string;
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
  seo?: GameReviewSEO;
}

export type SortOption = 'highest_rated' | 'newest' | 'oldest' | 'alphabetical';
export type RatingFilterOption = 'all' | 'masterpiece' | 'great' | 'good';
