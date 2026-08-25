# ID Card Camera Guidelines

## Project

Next.js / TypeScript を使用した、スマートフォン向け身分証撮影プロトタイプです。Next.js App Router とブラウザ標準 Web API を利用し、カメラ映像の取得、ガイド枠に合わせた撮影・Crop、撮影 Blob の Mock 画像解析を行います。

## Documentation

- Architecture: `docs/architecture.md`
- Implementation plan: `docs/implementation-plan.md`

既存コードから確認できる仕様を優先し、詳細仕様はこのアプリ配下の `docs/` を参照します。

## Development rules

- TypeScript strict を維持します。
- `any` は原則使用しません。
- UI とロジックを可能な範囲で分離します。
- 不要な依存ライブラリを追加しません。
- 無関係なリファクタリングを行いません。
- アプリ内部の `@/*` path alias と既存 import path を維持します。
- カメラ起動、撮影、Crop、撮り直し、`POST /api/analyze`、Mock 画像解析の既存仕様を壊しません。
- ブラウザカメラを含む実機依存の挙動は、自動テストだけで確認済みと判断しません。

## Investigation

- Issue に必要なファイルから調査し、アプリ全体を無条件に読み込みません。
- 必要になった場合のみ関連ファイルを追加で確認します。
- 共有化が必要な場合も、複数アプリでの利用が確定するまでは `packages/*` へ移しません。

## Verification

リポジトリルートから次を確認します。

```bash
pnpm --filter @repo/id-card-camera lint
pnpm --filter @repo/id-card-camera typecheck
pnpm --filter @repo/id-card-camera test
pnpm --filter @repo/id-card-camera build
```
