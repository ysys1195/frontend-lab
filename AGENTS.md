# Monorepo Guidelines

## Workspace boundaries

- `apps/*` は、それぞれ独立して開発・デプロイ可能なアプリです。
- `packages/*` は、複数アプリから利用する共有コード用です。
- Issue / task に必要な workspace だけを調査し、無関係な workspace は変更しません。
- 作業対象から最も近い `AGENTS.md` を確認し、その規約を優先します。
- 共有コードは、実際に複数アプリから必要になってから `packages/*` へ切り出します。

## Package management

- package manager は、ルート `package.json` に固定された pnpm のみを使用します。
- npm と yarn は使用しません。
- dependency install と lockfile 更新は、原則としてリポジトリルートから行います。
- workspace 間の依存には `workspace:*` を使用します。
- 不要な依存パッケージや、必要性のない共有 package は追加しません。

## Development

- アプリ固有の実装・文書・設定は対象の `apps/<app-name>` 内に保持します。
- 複数 workspace に影響する変更では、影響範囲を明示して最小限の変更に留めます。
- 無関係なリファクタリングは行いません。
- 新規アプリは `apps/<app-name>` に追加し、一意な package name を設定します。

## New application workflow

- 新規アプリは `apps/<app-name>` に作成し、独立して検証・デプロイできる状態にします。
- 対象アプリを含む lint / typecheck / test / build が成功するまで Vercel を操作しません。
- task branch へ commit し、GitHub の remote branch へ push した後にのみ Vercel Project 作成へ進みます。
- Vercel Project の参照・作成には実行時点の公式仕様を確認した REST API を使い、認証には `VERCEL_TOKEN` を使用します。
- Token 値をログ、出力、ソース、commit、ドキュメント、最終報告へ含めません。
- 同名または同用途の Project を先に確認し、重複作成や既存 Project の削除・再作成を行いません。
- 標準設定は Git repository `ysys1195/frontend-lab`、Root Directory `apps/<app-name>`、Framework Next.js です。
- 詳細な Phase、停止条件、安全策は `docs/monorepo.md` の標準フローに従います。

## Verification

実装後はリポジトリルートから、少なくとも次を確認します。

```bash
pnpm lint
pnpm typecheck
pnpm test
pnpm build
```

必要に応じて `pnpm --filter <package-name> <task>` で対象 workspace を単体確認します。
