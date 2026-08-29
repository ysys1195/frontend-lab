import { describe, expect, it } from "vitest";
import type { InterviewCard } from "@/data/interview-cards";
import type { LearningProgress } from "@/types/learning-progress";
import { countConfidence, filterCards, initialCardFilters } from "./filters";

const cards = [
  { id: "a", category: "network" },
  { id: "b", category: "network" },
  { id: "c", category: "git" },
  { id: "d", category: "git" },
] as InterviewCard[];

const progress: LearningProgress = {
  b: { confidence: 1, reviewCount: 1 },
  c: { confidence: 2, reviewCount: 1 },
  d: { confidence: 4, reviewCount: 1 },
};

describe("filterCards", () => {
  it("combines category and confidence conditions", () => {
    expect(
      filterCards(cards, progress, {
        ...initialCardFilters,
        category: "network",
        confidence: 1,
      }).map((card) => card.id),
    ).toEqual(["b"]);
  });

  it("treats missing progress as unreviewed", () => {
    expect(
      filterCards(cards, progress, {
        ...initialCardFilters,
        unreviewedOnly: true,
      }).map((card) => card.id),
    ).toEqual(["a"]);
  });

  it("includes confidence 0, 1 and 2 in review recommendations", () => {
    expect(
      filterCards(cards, progress, {
        ...initialCardFilters,
        reviewRecommendedOnly: true,
      }).map((card) => card.id),
    ).toEqual(["a", "b", "c"]);
  });
});

describe("countConfidence", () => {
  it("counts every supplied card exactly once across confidence 0 to 4", () => {
    const counts = countConfidence(cards, progress);

    expect(counts).toEqual({ 0: 1, 1: 1, 2: 1, 3: 0, 4: 1 });
    expect(Object.values(counts).reduce((sum, count) => sum + count, 0)).toBe(cards.length);
  });
});
