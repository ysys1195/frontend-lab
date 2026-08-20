# Project Guidelines

## Project

Next.js /
TypeScript を使用した、スマートフォン向け身分証撮影プロトタイプです。ブラウザ標準の Web
API を利用してカメラ映像を取得し、ガイド枠に合わせて画像を撮影・表示します。

## Documentation

- Architecture: `docs/architecture.md`
- Implementation plan: `docs/implementation-plan.md`

## Development Rules

- TypeScript strict
- `any` は原則使用しない
- UIとロジックを可能な範囲で分離する
- 不要な依存ライブラリを追加しない
- 無関係なリファクタリングをしない

## Verification

実装後に以下を確認する。

- typecheck
- lint
- test

## Agent Instructions

- Issueに必要なファイルから調査する
- リポジトリ全体を無条件に読み込まない
- 必要になった場合のみ関連ファイルを追加で確認する
- 詳細仕様は `docs/` を参照する
