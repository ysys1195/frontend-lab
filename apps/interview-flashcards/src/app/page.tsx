import { FlashCardStudy } from "@/components/FlashCardStudy";
import { interviewCards } from "@/data/interview-cards";

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-950 px-4 py-10 text-slate-50 sm:px-6 sm:py-16">
      <div className="mx-auto w-full max-w-3xl">
        <header className="mb-10">
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-cyan-300">
            Interview Flashcards
          </p>
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
            技術面接の準備を、毎日の習慣に。
          </h1>
          <p className="mt-5 text-lg leading-8 text-slate-300">
            質問に自分の言葉で答えてから、回答例と公式情報を確認しましょう。
          </p>
        </header>
        <FlashCardStudy cards={interviewCards} />
      </div>
    </main>
  );
}
