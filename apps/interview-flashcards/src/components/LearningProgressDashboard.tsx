import type { ConfidenceCounts } from "@/lib/filters";

const labels = ["未評価", "自信なし", "少し不安", "だいたいOK", "自信あり"] as const;

type LearningProgressDashboardProps = {
  counts: ConfidenceCounts;
  totalCount: number;
  targetCount: number;
};

export function LearningProgressDashboard({ counts, totalCount, targetCount }: LearningProgressDashboardProps) {
  const reviewedCount = totalCount - counts[0];

  return (
    <section aria-labelledby="progress-heading" className="mb-6 min-w-0 rounded-3xl border border-slate-700 bg-slate-900 p-5 sm:p-6">
      <h2 id="progress-heading" className="text-xl font-bold">学習進捗</h2>
      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        <p className="rounded-2xl bg-slate-950 p-4"><span className="block text-sm text-slate-400">全体進捗</span><strong className="text-2xl">{reviewedCount} / {totalCount} 問</strong></p>
        <p className="rounded-2xl bg-slate-950 p-4" aria-live="polite"><span className="block text-sm text-slate-400">現在の対象</span><strong className="text-2xl">{targetCount} 問</strong></p>
      </div>
      <ul className="mt-4 grid grid-cols-1 gap-2 text-sm min-[390px]:grid-cols-2 sm:grid-cols-5" aria-label="自信度の内訳">
        {labels.map((label, confidence) => (
          <li key={label} className="rounded-xl border border-slate-700 p-3">
            <span className="block text-slate-400">{confidence}: {label}</span>
            <strong className="text-lg">{counts[confidence as keyof ConfidenceCounts]} 問</strong>
          </li>
        ))}
      </ul>
    </section>
  );
}
