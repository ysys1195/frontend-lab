"use client";

import { useState } from "react";
import type { InterviewCard } from "@/data/interview-cards";
import { FlashCard } from "./flash-card/FlashCard";

type FlashCardStudyProps = {
  cards: InterviewCard[];
};

export function FlashCardStudy({ cards }: FlashCardStudyProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const card = cards[currentIndex];

  if (!card) {
    return <p className="text-slate-300">表示できるカードがありません。</p>;
  }

  const goToNextCard = () => {
    setCurrentIndex((index) => (index + 1) % cards.length);
  };

  return (
    <section aria-label="フラッシュカード学習">
      <div className="mb-4 flex items-center justify-between gap-4">
        <p className="font-medium text-slate-300" aria-live="polite">
          カード {currentIndex + 1} / {cards.length}
        </p>
        <button
          type="button"
          onClick={goToNextCard}
          className="min-h-11 rounded-xl border border-slate-600 px-4 py-2 font-semibold text-white transition hover:border-cyan-300 hover:text-cyan-200 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyan-300"
        >
          次のカードへ
        </button>
      </div>
      <FlashCard key={card.id} card={card} />
    </section>
  );
}
