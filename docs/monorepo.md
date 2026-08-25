# Monorepo guide

## Overview

このリポジトリは pnpm workspace と Turborepo で複数の Next.js アプリを管理します。アプリの機能コードとデプロイ境界は `apps/*`、複数アプリで再利用することが確定したコードは `packages/*` に配置します。

```text
frontend-lab/
├── apps/
│   └── id-card-camera/
├── packages/
├── docs/
│   └── monorepo.md
├── AGENTS.md
├── package.json
├── pnpm-lock.yaml
├── pnpm-workspace.yaml
└── turbo.json
```

現在の workspace は `@repo/id-card-camera` だけです。`packages/*` は将来の共有コード用に workspace 対象へ含めていますが、必要性のない共有 package は作成していません。

## Package manager and install

package manager はルート `package.json` の `packageManager` に固定された pnpm だけを使用します。npm / yarn の lockfile は追加しません。

```bash
pnpm install --frozen-lockfile
```

依存関係の追加や更新もリポジトリルートから対象 workspace を指定して行います。

```bash
pnpm --filter @repo/id-card-camera add <package>
pnpm --filter @repo/id-card-camera add -D <package>
```

workspace 間の依存には `workspace:*` を使用します。

## Tasks

ルート scripts は Turborepo を経由して、各 workspace の同名 task を実行します。

| Command | Purpose |
| --- | --- |
| `pnpm dev` | 各アプリの開発サーバーを起動する長時間 task |
| `pnpm build` | 各アプリを build し、`.next/**` を output として扱う |
| `pnpm lint` | 各 workspace の lint を実行する |
| `pnpm typecheck` | 各 workspace の型検査を実行する |
| `pnpm test` | 各 workspace の test を実行する |

単一 workspace だけを実行する場合は filter を使用します。

```bash
pnpm --filter @repo/id-card-camera dev
pnpm --filter @repo/id-card-camera test
```

## Adding an app

新規アプリは次の手順で追加します。Codex から実行する場合も、対象 workspace と最も近い `AGENTS.md` だけを先に確認します。

1. `apps/<app-name>` にアプリを作成する。
2. `package.json` に一意な name と `dev` / `build` / `lint` / `typecheck` / `test` scripts を定義する。
3. アプリ固有の `AGENTS.md` と必要な docs をアプリ配下へ置く。
4. 共有候補のコードは、複数アプリで必要になるまではアプリ内に保持する。
5. ルートで `pnpm install` を実行して `pnpm-lock.yaml` を更新する。
6. filter による単体検証後、ルートの lint / typecheck / test / build を実行する。

`pnpm-workspace.yaml` は `apps/*` と `packages/*` を対象にしているため、通常は新規アプリごとの追記は不要です。

## Shared packages

複数アプリで同じ UI、設定、型、utility が実際に必要になった場合だけ、`packages/<package-name>` に独立 package として切り出します。package name は一意にし、利用側では `workspace:*` で参照します。

## Vercel

各 `apps/<app-name>` は個別の Vercel Project として扱います。既存 id-card-camera Project は維持し、モノレポ化を反映する際に Vercel Dashboard で Root Directory を `apps/id-card-camera` へ変更します。

新規アプリも `apps/<app-name>` を Root Directory とする別 Project を人間が作成します。このリポジトリ変更では、Vercel Project の削除・作成・設定変更は行いません。
