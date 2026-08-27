import type { InterviewCard } from "@/data/interview-cards";

type FlashCardBackProps = {
  card: InterviewCard;
};

export function FlashCardBack({ card }: FlashCardBackProps) {
  return (
    <div className="mt-8 space-y-8 border-t border-slate-700 pt-8">
      <section aria-labelledby={`${card.id}-answer`}>
        <h3 id={`${card.id}-answer`} className="text-lg font-bold text-cyan-300">
          回答例
        </h3>
        <p className="mt-3 leading-8 text-slate-200">{card.answer}</p>
      </section>

      <section aria-labelledby={`${card.id}-key-points`}>
        <h3 id={`${card.id}-key-points`} className="text-lg font-bold text-cyan-300">
          重要ポイント
        </h3>
        <ul className="mt-3 list-disc space-y-2 pl-6 text-slate-200">
          {card.keyPoints.map((point) => (
            <li key={point}>{point}</li>
          ))}
        </ul>
      </section>

      <section aria-labelledby={`${card.id}-follow-ups`}>
        <h3 id={`${card.id}-follow-ups`} className="text-lg font-bold text-cyan-300">
          深掘り質問
        </h3>
        <ul className="mt-3 list-disc space-y-2 pl-6 text-slate-200">
          {card.followUps.map((question) => (
            <li key={question}>{question}</li>
          ))}
        </ul>
      </section>

      <section aria-labelledby={`${card.id}-references`}>
        <h3 id={`${card.id}-references`} className="text-lg font-bold text-cyan-300">
          公式 Reference
        </h3>
        <ul className="mt-3 space-y-3">
          {card.references.map((reference) => (
            <li key={reference.url}>
              <a
                href={reference.url}
                target="_blank"
                rel="noreferrer"
                className="inline-flex min-h-11 items-center rounded-lg text-cyan-200 underline decoration-cyan-500 underline-offset-4 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyan-300"
              >
                {reference.title}（公式情報源を開く）
                <span className="sr-only">（新しいタブで開きます）</span>
              </a>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
