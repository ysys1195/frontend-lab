# Interview Flashcards Guidelines

## Project

Next.js App Router / TypeScript / Tailwind CSS を使用した、技術面接対策用フラッシュカードアプリです。

## Development rules

- TypeScript strict を維持し、`any` は原則使用しません。
- UI、状態管理、データ処理は、必要になった範囲で責務を分離します。
- スタイルには Tailwind CSS を使用し、不要な依存ライブラリを追加しません。
- このアプリだけで使用するコードは `apps/interview-flashcards` 内に保持します。
- 他の workspace を変更せず、無関係なリファクタリングを行いません。
- Vitest / React Testing Library は単体・コンポーネントテスト、Playwright は E2E テストに使用します。

## Verification

リポジトリルートから次を確認します。

```bash
pnpm --filter @repo/interview-flashcards lint
pnpm --filter @repo/interview-flashcards typecheck
pnpm --filter @repo/interview-flashcards test
pnpm --filter @repo/interview-flashcards build
pnpm --filter @repo/interview-flashcards test:e2e
```

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
