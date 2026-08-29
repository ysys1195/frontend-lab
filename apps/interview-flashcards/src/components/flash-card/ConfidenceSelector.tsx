import type { Confidence } from "@/types/learning-progress";

const confidenceOptions: ReadonlyArray<{ value: Confidence; label: string }> = [
  { value: 0, label: "未評価" },
  { value: 1, label: "😣 自信なし" },
  { value: 2, label: "🤔 少し不安" },
  { value: 3, label: "🙂 だいたいOK" },
  { value: 4, label: "💪 自信あり" },
];

type ConfidenceSelectorProps = {
  cardId: string;
  confidence: Confidence;
  onChange: (confidence: Confidence) => void;
};

export function ConfidenceSelector({
  cardId,
  confidence,
  onChange,
}: ConfidenceSelectorProps) {
  return (
    <fieldset>
      <legend className="text-lg font-bold text-cyan-300">自信度</legend>
      <div className="mt-3 grid gap-2 sm:grid-cols-2">
        {confidenceOptions.map((option) => {
          const inputId = `${cardId}-confidence-${option.value}`;

          return (
            <label
              key={option.value}
              htmlFor={inputId}
              className="flex min-h-11 cursor-pointer items-center gap-3 rounded-xl border border-slate-600 px-4 py-2 text-slate-100 transition has-checked:border-cyan-300 has-checked:bg-cyan-950 hover:border-cyan-300"
            >
              <input
                id={inputId}
                type="radio"
                name={`${cardId}-confidence`}
                value={option.value}
                checked={confidence === option.value}
                onClick={() => {
                  if (confidence === option.value) {
                    onChange(option.value);
                  }
                }}
                onChange={() => onChange(option.value)}
                className="size-4 accent-cyan-300 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyan-300"
              />
              <span>{option.label}</span>
            </label>
          );
        })}
      </div>
    </fieldset>
  );
}
