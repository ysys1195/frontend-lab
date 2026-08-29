import type { Category, InterviewCard } from "@/data/interview-cards";
import type { Confidence, LearningProgress } from "@/types/learning-progress";

export type CardFilters = {
  category: Category | "all";
  confidence: Confidence | "all";
  unreviewedOnly: boolean;
  reviewRecommendedOnly: boolean;
};

export const initialCardFilters: CardFilters = {
  category: "all",
  confidence: "all",
  unreviewedOnly: false,
  reviewRecommendedOnly: false,
};

export type ConfidenceCounts = Record<Confidence, number>;

export function getCardConfidence(cardId: string, progress: LearningProgress): Confidence {
  return progress[cardId]?.confidence ?? 0;
}

export function filterCards(
  cards: InterviewCard[],
  progress: LearningProgress,
  filters: CardFilters,
): InterviewCard[] {
  return cards.filter((card) => {
    const confidence = getCardConfidence(card.id, progress);

    return (
      (filters.category === "all" || card.category === filters.category) &&
      (filters.confidence === "all" || confidence === filters.confidence) &&
      (!filters.unreviewedOnly || confidence === 0) &&
      (!filters.reviewRecommendedOnly || confidence <= 2)
    );
  });
}

export function countConfidence(
  cards: InterviewCard[],
  progress: LearningProgress,
): ConfidenceCounts {
  const counts: ConfidenceCounts = { 0: 0, 1: 0, 2: 0, 3: 0, 4: 0 };

  for (const card of cards) {
    counts[getCardConfidence(card.id, progress)] += 1;
  }

  return counts;
}
