# Interview Flashcards

フロントエンドエンジニアの技術面接対策用フラッシュカードアプリです。70問の質問、回答例、公式Referenceを使って学習し、自信度と進捗をブラウザの `localStorage` に保存します。

## 前提条件

- Node.js 20.9.0以上（LTS版を推奨）
- Corepack
- リポジトリルートの `package.json` に指定された pnpm 10.34.5

## セットアップ

リポジトリルートで依存関係とPlaywrightのChromiumをインストールします。

```bash
corepack enable
pnpm install --frozen-lockfile
pnpm --filter @repo/interview-flashcards exec playwright install chromium
```

## 開発

以下のコマンドはすべてリポジトリルートで実行します。

```bash
pnpm --filter @repo/interview-flashcards dev
```

[http://localhost:3001](http://localhost:3001) を開きます。

## 検証

```bash
pnpm --filter @repo/interview-flashcards lint
pnpm --filter @repo/interview-flashcards typecheck
pnpm --filter @repo/interview-flashcards test
pnpm --filter @repo/interview-flashcards test:e2e
pnpm --filter @repo/interview-flashcards build
```

`test:e2e` はproduction buildを作成し、`next start`で起動したアプリに対してChromiumでE2Eテストを実行します。

## Vercel

Vercel Projectでは、Git repositoryに `ysys1195/frontend-lab`、FrameworkにNext.js、**Root Directoryに `apps/interview-flashcards`** を指定します。バックエンドサービスや環境変数は不要です。
