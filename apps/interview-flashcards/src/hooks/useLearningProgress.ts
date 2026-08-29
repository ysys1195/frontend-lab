"use client";

import { useEffect, useRef, useState } from "react";
import { loadLearningProgress, saveLearningProgress } from "@/lib/storage";
import type { Confidence, LearningProgress } from "@/types/learning-progress";

type UseLearningProgressOptions = {
  now?: () => Date;
};

export function useLearningProgress({ now = () => new Date() }: UseLearningProgressOptions = {}) {
  const [progress, setProgress] = useState<LearningProgress>({});
  const progressRef = useRef<LearningProgress>({});

  useEffect(() => {
    let isActive = true;
    let restored: LearningProgress = {};

    try {
      restored = loadLearningProgress(window.localStorage);
    } catch {
      // Accessing localStorage itself can be denied by the browser.
    }

    queueMicrotask(() => {
      if (isActive) {
        progressRef.current = restored;
        setProgress(restored);
      }
    });

    return () => {
      isActive = false;
    };
  }, []);

  const updateConfidence = (cardId: string, confidence: Confidence) => {
    const current = progressRef.current;
    const next: LearningProgress = {
      ...current,
      [cardId]: {
        confidence,
        lastReviewedAt: now().toISOString(),
        reviewCount: (current[cardId]?.reviewCount ?? 0) + 1,
      },
    };

    progressRef.current = next;
    setProgress(next);

    try {
      saveLearningProgress(window.localStorage, next);
    } catch {
      // Keep the in-memory update when storage is unavailable.
    }
  };

  return { progress, updateConfidence };
}
