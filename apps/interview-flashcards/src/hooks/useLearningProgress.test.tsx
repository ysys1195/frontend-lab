import { act, renderHook, waitFor } from "@testing-library/react";
import { beforeEach, describe, expect, it } from "vitest";
import { LEARNING_PROGRESS_STORAGE_KEY } from "@/lib/storage";
import { useLearningProgress } from "./useLearningProgress";

describe("useLearningProgress", () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  it("restores saved progress after the client mounts", async () => {
    window.localStorage.setItem(
      LEARNING_PROGRESS_STORAGE_KEY,
      JSON.stringify({
        version: 1,
        cards: { saved: { confidence: 2, reviewCount: 4 } },
      }),
    );

    const { result } = renderHook(() => useLearningProgress());

    await waitFor(() => expect(result.current.progress.saved?.confidence).toBe(2));
  });

  it.each([0, 1, 2, 3, 4] as const)(
    "sets confidence %i with a timestamp and incremented review count",
    async (confidence) => {
      const now = () => new Date("2026-08-28T09:30:00.000Z");
      window.localStorage.setItem(
        LEARNING_PROGRESS_STORAGE_KEY,
        JSON.stringify({
          version: 1,
          cards: { "card-one": { confidence: 1, reviewCount: 4 } },
        }),
      );
      const { result } = renderHook(() => useLearningProgress({ now }));

      await waitFor(() => expect(result.current.progress["card-one"]?.reviewCount).toBe(4));

      act(() => result.current.updateConfidence("card-one", confidence));

      await waitFor(() =>
        expect(result.current.progress["card-one"]).toEqual({
          confidence,
          lastReviewedAt: "2026-08-28T09:30:00.000Z",
          reviewCount: 5,
        }),
      );
      expect(JSON.parse(window.localStorage.getItem(LEARNING_PROGRESS_STORAGE_KEY) ?? "")).toEqual({
        version: 1,
        cards: result.current.progress,
      });
    },
  );
});
