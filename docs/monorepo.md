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

## Adding a New Application

新規 Next.js アプリは `apps/<app-name>` に作成し、独立して開発・検証・デプロイできる workspace とします。既存アプリには影響を与えず、既存 workspace と整合する場合は Next.js、React、TypeScript、ESLint、test runner のバージョンを揃えます。

アプリごとに最低限、次を用意します。

- 一意な package name（原則 `@repo/<app-name>`）と `dev` / `build` / `lint` / `typecheck` / `test` scripts を持つ `package.json`
- Next.js、React、TypeScript、`tsconfig.json`、ESLint、test runner の設定
- アプリ固有のルールを記載した `AGENTS.md`
- 詳細仕様が必要な場合だけ、アプリ配下の docs

依存関係の追加と lockfile 更新はリポジトリルートから pnpm で行います。不要な dependency は追加しません。`pnpm-workspace.yaml` は `apps/*`、Turborepo は各 workspace の同名 script を対象にするため、通常は新規アプリごとの設定追加は不要です。

## Shared packages

複数アプリで同じ UI、設定、型、utility が実際に必要になった場合だけ、`packages/<package-name>` に独立 package として切り出します。package name は一意にし、利用側では `workspace:*` で参照します。

1つのアプリだけで使うコードは `apps/<app-name>` 内に保持します。「将来使いそう」という推測だけでは共有 package を作りません。

## Codex Workflow

新規アプリ追加は1つの上位タスクとして扱えますが、内部では次の Phase に分け、各 Phase の成功を確認してから次へ進みます。タスクで指定されていない外部サービス操作まで自動的に範囲を広げません。

| Phase | Responsibility | Completion gate |
| --- | --- | --- |
| 1. Application implementation | `apps/<app-name>` の実装と workspace への組み込み | 必須ファイルと scripts が揃っている |
| 2. Local / workspace verification | lint / typecheck / test / build | 対象アプリの build を含む検証が成功している |
| 3. GitHub publication | commit と remote branch への push | GitHub から対象 commit を参照できる |
| 4. Vercel project provisioning | REST API による存在確認と Project 作成 | 設定を再取得し、期待値と一致している |
| 5. Deployment verification | Deployment 状態の確認と原因切り分け | 成否を Project 作成とは別に報告できる |

標準フローは次のとおりです。

```text
Issue / Task
    ↓
apps/<app-name> を実装
    ↓
pnpm workspace / Turborepo へ組み込み
    ↓
lint → typecheck → test → build
    ↓
commit → GitHub remote branch へ push
    ↓
Vercel API で同名・同用途 Project の存在確認
    ↓
Project が存在しなければ作成
    ↓
ysys1195/frontend-lab と Git 連携
    ↓
Root Directory = apps/<app-name>
    ↓
Project 設定を再取得して検証
    ↓
Deployment 状態確認
    ↓
最終報告
```

アプリ実装と Vercel Project 作成は責務を分離します。Phase 1〜3 が完了していても、タスクに Vercel provisioning の許可が含まれなければ Phase 4 へ進みません。

## Verification

Vercel を操作する前に、リポジトリルートから次を実行します。

```bash
pnpm lint
pnpm typecheck
pnpm test
pnpm build
```

必要に応じて対象アプリも単体で確認します。`<package-name>` は `apps/<app-name>/package.json` の `name` です。

```bash
pnpm --filter <package-name> lint
pnpm --filter <package-name> typecheck
pnpm --filter <package-name> test
pnpm --filter <package-name> build
```

対象アプリの build が失敗している場合は Phase 3 以降へ進まず、原因を報告します。既存 workspace に無関係な失敗がある場合も、対象アプリの結果と切り分けて停止し、無視してよいかを人間に確認します。

## GitHub Publication

`main` へ直接変更せず task 用ブランチを使います。Vercel Project 作成前に、次を満たす必要があります。

1. remote が `ysys1195/frontend-lab` を指していることを確認する。
2. 変更を commit する。
3. task branch を GitHub へ push する。
4. push した commit と対象アプリのコードを GitHub から参照できることを確認する。

標準フローでは force push、merge、Production への昇格を自動実行しません。PR の作成・merge はタスクの指示または既存の Git 運用ルールに従います。push に失敗した場合は Vercel の Git 連携へ進みません。

## Vercel Provisioning

Vercel CLI は標準手段にせず、Project の参照・作成には REST API を使用します。endpoint と request schema は、操作直前に [Vercel REST API Reference](https://vercel.com/docs/rest-api) と [Managing Projects](https://vercel.com/docs/projects/managing-projects) で公式の現行仕様を確認します。API version はこの文書の記載だけを根拠に固定しません。

文書更新時点の Project API は次の endpoint です。実際の操作時には、これらも公式リファレンスで再確認します。

| Operation | Endpoint |
| --- | --- |
| Project 一覧 | `GET /v10/projects` |
| Project 作成 | `POST /v11/projects` |
| Project 再取得 | `GET /v9/projects/{idOrName}` |

認証には環境変数 `VERCEL_TOKEN` を使用します。まず `test -n "$VERCEL_TOKEN"` などで設定の有無だけを確認し、Token 本体はログ、console output、verbose / trace output、source code、commit、ドキュメント、最終報告へ出力しません。API 応答も必要な項目だけを抽出し、認証情報を含む raw output を残しません。

Team / Account は既存 Project と同じ scope を確認し、現行 API 仕様に従って `teamId` または `slug` を query parameter で指定します。Team ID をソースや文書へ固定しません。Project の一覧取得、作成、再取得、Deployment 確認には同じ scope を使用します。

Project 作成前に一覧を全ページ確認し、少なくとも次の観点で重複を調べます。

- Project name が `<app-name>` と一致する
- Git repository と Root Directory の組み合わせが `ysys1195/frontend-lab` / `apps/<app-name>` と一致する
- 名前や用途が近く、同一 Project の可能性がある

既存候補が見つかった場合は新規作成せず、利用可能か人間に確認します。設定が異なっていても、既存 Project の更新、削除、再作成を勝手に行いません。

新規作成が必要な場合の標準値は次のとおりです。実際の request は、実行時点の公式 schema に合わせます。

```json
{
  "name": "<app-name>",
  "framework": "nextjs",
  "rootDirectory": "apps/<app-name>",
  "gitRepository": {
    "type": "github",
    "repo": "ysys1195/frontend-lab"
  }
}
```

Root Directory に先頭の `/` は付けません。既存の Vercel GitHub Integration が対象 repository へアクセスできることを使い、新しい repository の作成や既存 repository 接続の変更は行いません。Next.js の自動検出で足りる場合、Build Command、Install Command、Output Directory は不要に上書きしません。

作成 request は確認後に1回だけ送ります。timeout や 5xx などで結果が不明な場合、同じ request を直ちに繰り返さず、Project 一覧・詳細を再取得して作成済みか確認します。外部操作は再実行しても重複を生まないように扱います。

## Deployment Verification

Project 作成後は詳細を再取得し、最低限、次が期待値と一致することを確認します。

- Project name: `<app-name>`
- Git repository: `ysys1195/frontend-lab`
- Root Directory: `apps/<app-name>`
- Framework: Next.js（API 値は `nextjs`）

Deployment API も実行時点の公式 version と schema を確認します。Deployment が自動作成されている場合は、無制限に待たず、間隔と回数を制限して状態を確認します。Deployment の新規作成・再デプロイは、タスクで明示的に許可されている場合だけ行います。

task branch の検証は Preview Deployment、merge 後の `main` は Production Deployment として区別します。Project 作成成功と Application Deployment 成功は別の結果です。Deployment が失敗した場合は build log と Project 設定を確認し、アプリ側の問題か Vercel 設定側の問題かを切り分けて報告します。自動で merge、Production への昇格、Production Branch の変更は行いません。

## Failure Handling

各 Phase が失敗した場合は、現在の状態と副作用を確認し、原則として次の Phase へ進みません。

| Failure | Action |
| --- | --- |
| lint / typecheck / test / build failure | Vercel を操作せず、対象アプリと既存 workspace の失敗を切り分ける |
| GitHub push failure | Git 連携や Project 作成へ進まない |
| 重複・類似 Project を検出 | POST せず、既存 Project を利用するか人間に確認する |
| Project 作成の結果が不明 | 一覧・詳細を再取得し、作成済みでないことを確認してから再実行を判断する |
| Project 設定の不一致 | PATCH / DELETE / 再作成を行わず、人間に確認する |
| Deployment failure | Project 作成成功とは分け、アプリと設定のどちらが原因か調査する |

既存 Vercel Project や Production Domain の削除、他アプリの Root Directory や Git repository 接続の変更、不要な Team / Account 設定変更は標準ワークフローでは禁止します。削除、既存 Project の変更、merge、Production 昇格など不可逆性または影響の大きい操作が必要な場合は、対象と影響を示して人間の承認を得ます。

最終報告では、各 Phase の結果、検証コマンド、GitHub branch / commit、Project の作成または再利用、再取得した設定、Deployment 状態、未確認事項、人間に必要な操作を分けて記載します。Token やその他の secret は含めません。
