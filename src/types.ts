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

export interface SeoHeadings {
  h1: string;
  h2: string;
  h3: string;
}

export interface AeoQuestionAnswer {
  question: string;
  answer: string;
}

export interface GameReview {
  id: string;
  title: string;
  genre: string;
  rating: number; // 1-10
  image: string;
  imageAlt?: string;
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
  metaTitle?: string;
  metaDescription?: string;
  seoHeadings?: SeoHeadings;
  aeoQuestions?: AeoQuestionAnswer[];
}

export type SortOption = 'highest_rated' | 'newest' | 'oldest' | 'alphabetical';
export type RatingFilterOption = 'all' | 'masterpiece' | 'great' | 'good';
