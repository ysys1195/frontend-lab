import type { InterviewCard } from "@/data/interview-cards";

const categoryLabels: Record<InterviewCard["category"], string> = {
  "computer-science": "コンピュータ基礎",
  network: "ネットワーク",
  security: "セキュリティ",
  design: "設計",
  frontend: "React / Vue / Webフロントエンド",
  git: "Git",
};

type FlashCardFrontProps = {
  card: InterviewCard;
  onReveal: () => void;
};

export function FlashCardFront({ card, onReveal }: FlashCardFrontProps) {
  return (
    <div>
      <p className="text-sm font-semibold text-cyan-300">
        {categoryLabels[card.category]}
      </p>
      <h2 className="mt-4 text-2xl font-bold leading-relaxed text-white sm:text-3xl">
        {card.question}
      </h2>
      <button
        type="button"
        onClick={onReveal}
        className="mt-8 w-full rounded-xl bg-cyan-300 px-5 py-3 font-bold text-slate-950 transition hover:bg-cyan-200 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyan-300 sm:w-auto"
      >
        回答を見る
      </button>
    </div>
  );
}
