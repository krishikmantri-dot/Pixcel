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

export interface AEOQuestionAnswer {
  question: string;
  answer: string;
}

export interface GameReviewHeadings {
  h1: string; // closely related to primary keyword
  h2: string; // section heading closely related to keywords
  h3: string; // subsection heading closely related to keywords
}

export interface GameReviewSEO {
  metaTitle: string; // strictly <= 60 characters
  metaDescription: string; // strictly <= 160 characters
  primaryKeyword: string; // long-tail primary target query
  shortTailKeywords: string[]; // broad 1-2 word head keywords (e.g. 'Elden Ring', 'Action RPG', 'Game reviews')
  secondaryKeywords: string[]; // long-tail secondary search phrases
  imageAlt: string;
  headings: GameReviewHeadings;
  aeoQuestions: [AEOQuestionAnswer, AEOQuestionAnswer];
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
