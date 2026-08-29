import { categories } from "@/data/categories";
import type { CardFilters } from "@/lib/filters";
import type { Confidence } from "@/types/learning-progress";

const confidenceOptions: ReadonlyArray<{ value: Confidence; label: string }> = [
  { value: 0, label: "未評価" },
  { value: 1, label: "1: 自信なし" },
  { value: 2, label: "2: 少し不安" },
  { value: 3, label: "3: だいたいOK" },
  { value: 4, label: "4: 自信あり" },
];

type StudyFiltersProps = {
  filters: CardFilters;
  onChange: (filters: CardFilters) => void;
  onClear: () => void;
};

export function StudyFilters({ filters, onChange, onClear }: StudyFiltersProps) {
  return (
    <section aria-labelledby="filters-heading" className="rounded-3xl border border-slate-700 bg-slate-900 p-5 sm:p-6">
      <div className="flex items-center justify-between gap-4">
        <h2 id="filters-heading" className="text-xl font-bold">学習フィルター</h2>
        <button type="button" onClick={onClear} className="min-h-11 rounded-xl px-3 font-semibold text-cyan-300 hover:bg-slate-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-300">
          すべて解除
        </button>
      </div>
      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        <label className="grid gap-2 font-semibold">
          カテゴリ
          <select value={filters.category} onChange={(event) => onChange({ ...filters, category: event.target.value as CardFilters["category"] })} className="min-h-11 rounded-xl border border-slate-600 bg-slate-950 px-3 text-white">
            <option value="all">すべてのカテゴリ</option>
            {categories.map((category) => <option key={category.id} value={category.id}>{category.label}</option>)}
          </select>
        </label>
        <label className="grid gap-2 font-semibold">
          自信度
          <select aria-label="自信度フィルター" value={filters.confidence} onChange={(event) => onChange({ ...filters, confidence: event.target.value === "all" ? "all" : Number(event.target.value) as Confidence })} className="min-h-11 rounded-xl border border-slate-600 bg-slate-950 px-3 text-white">
            <option value="all">すべての自信度</option>
            {confidenceOptions.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}
          </select>
        </label>
      </div>
      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        <label className="flex min-h-11 cursor-pointer items-center gap-3 rounded-xl border border-slate-700 px-4 py-2">
          <input type="checkbox" checked={filters.unreviewedOnly} onChange={(event) => onChange({ ...filters, unreviewedOnly: event.target.checked })} className="size-4 accent-cyan-300" />
          未評価のみ
        </label>
        <label className="flex min-h-11 cursor-pointer items-center gap-3 rounded-xl border border-slate-700 px-4 py-2">
          <input type="checkbox" checked={filters.reviewRecommendedOnly} onChange={(event) => onChange({ ...filters, reviewRecommendedOnly: event.target.checked })} className="size-4 accent-cyan-300" />
          復習推奨のみ（自信度 0〜2）
        </label>
      </div>
    </section>
  );
}
