"use client";

import { useMemo, useState } from "react";
import type { InterviewCard } from "@/data/interview-cards";
import { useLearningProgress } from "@/hooks/useLearningProgress";
import { countConfidence, filterCards, initialCardFilters } from "@/lib/filters";
import { FlashCard } from "./flash-card/FlashCard";
import { LearningProgressDashboard } from "./LearningProgressDashboard";
import { StudyFilters } from "./StudyFilters";

type FlashCardStudyProps = {
  cards: InterviewCard[];
};

export function FlashCardStudy({ cards }: FlashCardStudyProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [filters, setFilters] = useState(initialCardFilters);
  const { progress, updateConfidence } = useLearningProgress();
  const filteredCards = useMemo(
    () => filterCards(cards, progress, filters),
    [cards, progress, filters],
  );
  const confidenceCounts = useMemo(() => countConfidence(cards, progress), [cards, progress]);
  const safeIndex = filteredCards.length === 0 ? 0 : currentIndex % filteredCards.length;
  const card = filteredCards[safeIndex];

  const updateFilters = (nextFilters: typeof filters) => {
    setFilters(nextFilters);
    setCurrentIndex(0);
  };

  const goToNextCard = () => {
    setCurrentIndex((index) => (index + 1) % filteredCards.length);
  };

  return (
    <section aria-label="フラッシュカード学習" className="space-y-6">
      <LearningProgressDashboard
        counts={confidenceCounts}
        totalCount={cards.length}
        targetCount={filteredCards.length}
      />
      <StudyFilters
        filters={filters}
        onChange={updateFilters}
        onClear={() => updateFilters(initialCardFilters)}
      />
      {card ? (
        <div>
          <div className="mb-4 flex items-center justify-between gap-4">
            <p className="font-medium text-slate-300" aria-live="polite">
              カード {safeIndex + 1} / {filteredCards.length}
            </p>
            <button
              type="button"
              onClick={goToNextCard}
              className="min-h-11 rounded-xl border border-slate-600 px-4 py-2 font-semibold text-white transition hover:border-cyan-300 hover:text-cyan-200 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyan-300"
            >
              次のカードへ
            </button>
          </div>
          <FlashCard
            key={card.id}
            card={card}
            confidence={progress[card.id]?.confidence ?? 0}
            onConfidenceChange={(confidence) => updateConfidence(card.id, confidence)}
          />
        </div>
      ) : (
        <div className="rounded-3xl border border-dashed border-slate-600 bg-slate-900 p-8 text-center">
          <h2 className="text-xl font-bold">条件に一致するカードがありません</h2>
          <p className="mt-2 text-slate-300">
            フィルター条件を変更するか、すべて解除してください。
          </p>
          <button
            type="button"
            onClick={() => updateFilters(initialCardFilters)}
            className="mt-5 min-h-11 rounded-xl bg-cyan-300 px-5 py-2 font-bold text-slate-950 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyan-300"
          >
            フィルターをすべて解除
          </button>
        </div>
      )}
    </section>
  );
}
