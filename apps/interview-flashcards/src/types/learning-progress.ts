export type Confidence = 0 | 1 | 2 | 3 | 4;

export type CardProgress = {
  confidence: Confidence;
  lastReviewedAt?: string;
  reviewCount: number;
};

export type LearningProgress = Record<string, CardProgress>;
