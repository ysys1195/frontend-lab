import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";

export const metadata: Metadata = {
  title: "Interview Flashcards | 技術面接対策",
  description:
    "70問の技術面接フラッシュカードで、回答例と公式情報を確認しながら学習できるアプリです。",
  applicationName: "Interview Flashcards",
};

type RootLayoutProps = Readonly<{
  children: ReactNode;
}>;

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="ja">
      <body>{children}</body>
    </html>
  );
}
