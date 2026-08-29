import type {
  CardProgress,
  Confidence,
  LearningProgress,
} from "@/types/learning-progress";

export const LEARNING_PROGRESS_STORAGE_KEY = "interview-flashcards-progress-v1";
export const LEARNING_PROGRESS_STORAGE_VERSION = 1 as const;

type StoredLearningProgress = {
  version: typeof LEARNING_PROGRESS_STORAGE_VERSION;
  cards: LearningProgress;
};

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function isConfidence(value: unknown): value is Confidence {
  return Number.isInteger(value) && typeof value === "number" && value >= 0 && value <= 4;
}

function isCardProgress(value: unknown): value is CardProgress {
  if (!isRecord(value)) {
    return false;
  }

  return (
    isConfidence(value.confidence) &&
    Number.isInteger(value.reviewCount) &&
    typeof value.reviewCount === "number" &&
    value.reviewCount >= 0 &&
    (value.lastReviewedAt === undefined || typeof value.lastReviewedAt === "string")
  );
}

export function parseLearningProgress(value: string | null): LearningProgress {
  if (value === null) {
    return {};
  }

  try {
    const stored: unknown = JSON.parse(value);

    if (
      !isRecord(stored) ||
      stored.version !== LEARNING_PROGRESS_STORAGE_VERSION ||
      !isRecord(stored.cards)
    ) {
      return {};
    }

    const cards: LearningProgress = {};

    for (const [cardId, progress] of Object.entries(stored.cards)) {
      if (!isCardProgress(progress)) {
        return {};
      }

      cards[cardId] = progress;
    }

    return cards;
  } catch {
    return {};
  }
}

export function serializeLearningProgress(progress: LearningProgress): string {
  const stored: StoredLearningProgress = {
    version: LEARNING_PROGRESS_STORAGE_VERSION,
    cards: progress,
  };

  return JSON.stringify(stored);
}

export function loadLearningProgress(storage: Pick<Storage, "getItem">): LearningProgress {
  try {
    return parseLearningProgress(storage.getItem(LEARNING_PROGRESS_STORAGE_KEY));
  } catch {
    return {};
  }
}

export function saveLearningProgress(
  storage: Pick<Storage, "setItem">,
  progress: LearningProgress,
): void {
  try {
    storage.setItem(LEARNING_PROGRESS_STORAGE_KEY, serializeLearningProgress(progress));
  } catch {
    // Storage can be unavailable or full. In-memory progress should still work.
  }
}
