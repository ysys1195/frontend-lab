import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-950 px-4 py-8 text-slate-50">
      <div className="w-full max-w-xl text-center">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-cyan-300">
          404
        </p>
        <h1 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
          ページが見つかりません
        </h1>
        <p className="mt-4 leading-7 text-slate-300">
          URLを確認するか、学習ページへ戻ってください。
        </p>
        <Link
          href="/"
          className="mt-8 inline-flex min-h-11 items-center justify-center rounded-lg bg-cyan-300 px-5 py-2 font-semibold text-slate-950 hover:bg-cyan-200"
        >
          学習ページへ戻る
        </Link>
      </div>
    </main>
  );
}
