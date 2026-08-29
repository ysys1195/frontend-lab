import type { Category } from "./interview-cards";

export const categories: ReadonlyArray<{ id: Category; label: string }> = [
  { id: "computer-science", label: "コンピュータ基礎" },
  { id: "network", label: "ネットワーク" },
  { id: "security", label: "セキュリティ" },
  { id: "design", label: "設計" },
  { id: "frontend", label: "React / Vue / Webフロントエンド" },
  { id: "git", label: "Git" },
];
