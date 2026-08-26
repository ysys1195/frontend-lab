export default function Home() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-950 px-6 py-16 text-slate-50">
      <section className="w-full max-w-2xl rounded-3xl border border-slate-800 bg-slate-900 p-8 shadow-2xl sm:p-12">
        <p className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-cyan-300">
          Interview Flashcards
        </p>
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
          技術面接の準備を、毎日の習慣に。
        </h1>
        <p className="mt-6 text-lg leading-8 text-slate-300">
          フラッシュカードで重要な知識を繰り返し確認し、自信を持って面接に臨みましょう。
        </p>
      </section>
    </main>
  );
}
