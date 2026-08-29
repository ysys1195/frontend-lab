import { describe, expect, it, vi } from "vitest";
import {
  LEARNING_PROGRESS_STORAGE_KEY,
  loadLearningProgress,
  parseLearningProgress,
  saveLearningProgress,
  serializeLearningProgress,
} from "./storage";

const progress = {
  "card-one": {
    confidence: 3 as const,
    lastReviewedAt: "2026-08-28T01:02:03.000Z",
    reviewCount: 2,
  },
};

describe("learning progress storage", () => {
  it("serializes only the versioned card progress and restores it", () => {
    const serialized = serializeLearningProgress(progress);

    expect(JSON.parse(serialized)).toEqual({ version: 1, cards: progress });
    expect(serialized).not.toContain("question");
    expect(parseLearningProgress(serialized)).toEqual(progress);
  });

  it.each([
    ["missing", null],
    ["malformed JSON", "{"],
    ["unknown version", JSON.stringify({ version: 2, cards: progress })],
    ["invalid confidence", JSON.stringify({ version: 1, cards: { id: { confidence: 5, reviewCount: 1 } } })],
  ])("falls back for %s storage", (_, stored) => {
    expect(parseLearningProgress(stored)).toEqual({});
  });

  it("falls back when reading storage throws", () => {
    const storage = { getItem: vi.fn(() => { throw new Error("denied"); }) };

    expect(loadLearningProgress(storage)).toEqual({});
  });

  it("writes to the explicit versioned storage key", () => {
    const storage = { setItem: vi.fn() };

    saveLearningProgress(storage, progress);

    expect(storage.setItem).toHaveBeenCalledWith(
      LEARNING_PROGRESS_STORAGE_KEY,
      serializeLearningProgress(progress),
    );
  });
});
