"use client";

import { useState } from "react";
import type { InterviewCard } from "@/data/interview-cards";
import { FlashCardBack } from "./FlashCardBack";
import { FlashCardFront } from "./FlashCardFront";

type FlashCardProps = {
  card: InterviewCard;
};

export function FlashCard({ card }: FlashCardProps) {
  const [isAnswerVisible, setIsAnswerVisible] = useState(false);

  return (
    <article className="rounded-3xl border border-slate-700 bg-slate-900 p-6 shadow-2xl sm:p-10">
      <FlashCardFront card={card} onReveal={() => setIsAnswerVisible(true)} />
      {isAnswerVisible ? <FlashCardBack card={card} /> : null}
    </article>
  );
}
