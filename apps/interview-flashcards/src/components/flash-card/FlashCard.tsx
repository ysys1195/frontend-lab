"use client";

import { useState } from "react";
import type { InterviewCard } from "@/data/interview-cards";
import type { Confidence } from "@/types/learning-progress";
import { FlashCardBack } from "./FlashCardBack";
import { FlashCardFront } from "./FlashCardFront";

type FlashCardProps = {
  card: InterviewCard;
  confidence?: Confidence;
  onConfidenceChange?: (confidence: Confidence) => void;
};

export function FlashCard({
  card,
  confidence = 0,
  onConfidenceChange = () => undefined,
}: FlashCardProps) {
  const [isAnswerVisible, setIsAnswerVisible] = useState(false);
  const answerRegionId = `${card.id}-answer-region`;

  return (
    <article className="min-w-0 rounded-3xl border border-slate-700 bg-slate-900 p-5 shadow-2xl sm:p-10">
      <FlashCardFront
        card={card}
        answerRegionId={answerRegionId}
        isAnswerVisible={isAnswerVisible}
        onToggle={() => setIsAnswerVisible((isVisible) => !isVisible)}
      />
      <div
        id={answerRegionId}
        role="region"
        aria-labelledby={`${card.id}-answer`}
        hidden={!isAnswerVisible}
      >
        {isAnswerVisible ? (
          <FlashCardBack
            card={card}
            confidence={confidence}
            onConfidenceChange={onConfidenceChange}
          />
        ) : null}
      </div>
    </article>
  );
}
