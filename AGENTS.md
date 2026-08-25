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

## Verification

実装後はリポジトリルートから、少なくとも次を確認します。

```bash
pnpm lint
pnpm typecheck
pnpm test
pnpm build
```

必要に応じて `pnpm --filter <package-name> <task>` で対象 workspace を単体確認します。
