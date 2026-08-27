# Interview Flashcards Specification

## 1. Purpose

`frontend-lab` モノレポに、フロントエンドエンジニアの技術面接対策用フラッシュカードアプリを追加する。

主目的は以下。

- 技術面接で頻出する基礎質問を、質問を見て自分で口頭回答してから模範回答を確認できるようにする
- 苦手分野を自信度で記録し、復習対象を絞り込めるようにする
- 回答は可能な限り公式ドキュメント・標準仕様に基づく
- スマートフォンからいつでも復習できる
- MVPではバックエンドを持たず、学習履歴を `localStorage` に保存する

## 2. Repository / Application Location

Repository:

`https://github.com/ysys1195/frontend-lab`

Existing architecture:

- pnpm workspace
- Turborepo
- applications under `apps/*`

New application:

`apps/interview-flashcards`

Existing applications and root monorepo behavior must not be broken.

## 3. Technology

- Next.js
- App Router
- React
- TypeScript
- Tailwind CSS
- Vitest
- React Testing Library
- Playwright
- Vercel

Use the versions and conventions already adopted by the monorepo where possible. Do not introduce a second package manager.

## 4. MVP Scope

The MVP must provide:

1. 70 interview cards
2. category filtering
3. confidence filtering
4. answer reveal
5. official reference links
6. learning progress persistence with `localStorage`
7. progress summary
8. responsive mobile-first UI
9. basic accessibility
10. unit/component/E2E tests

Do not implement the following in the MVP:

- authentication
- database
- Supabase/Firebase
- cross-device synchronization
- AI answer grading
- voice input
- user-created questions
- spaced repetition algorithm
- favorites

These may be added later.

## 5. Card Categories

Use the following six categories.

| id | label | cards |
| --- | --- | ---: |
| `computer-science` | コンピュータ基礎 | 8 |
| `network` | ネットワーク | 12 |
| `security` | セキュリティ | 10 |
| `design` | 設計 | 10 |
| `frontend` | React / Vue / Webフロントエンド | 20 |
| `git` | Git | 10 |
| **Total** | | **70** |

## 6. Card Data Model

教材データとユーザーの学習状況を分離する。

教材データは source code に置き、`localStorage` に複製しない。

Recommended model:

```ts
export type Category =
  | "computer-science"
  | "network"
  | "security"
  | "design"
  | "frontend"
  | "git";

export type Reference = {
  title: string;
  url: string;
};

export type InterviewCard = {
  id: string;
  category: Category;
  question: string;
  answer: string;
  keyPoints: string[];
  followUps: string[];
  references: Reference[];
};
```

The supplied `interview-cards.ts` is the source of truth for the initial 70 cards.

Codex may move shared type definitions to `src/types/interview-card.ts`, but must not rewrite, summarize, expand, or otherwise alter the educational content unless required to fix an objective error.

## 7. Educational Content Rules

Reference priority:

1. Standards / RFC
2. Framework or tool official documentation
3. MDN
4. OWASP

Initial cards should rely on:

- React official documentation
- Vue official documentation
- MDN Web Docs
- OWASP
- Git official documentation
- RFC Editor

Do not replace official references with personal blogs.

Answers are interview-oriented summaries, not verbatim quotations from references.

If implementation work reveals a possible factual problem in a card, do not silently rewrite it. Surface the concern separately.

## 8. Learning Progress Model

```ts
export type Confidence = 0 | 1 | 2 | 3 | 4;

export type CardProgress = {
  confidence: Confidence;
  lastReviewedAt?: string;
  reviewCount: number;
};

export type LearningProgress = Record<string, CardProgress>;
```

Confidence:

| value | label |
| ---: | --- |
| 0 | 未評価 |
| 1 | 😣 自信なし |
| 2 | 🤔 少し不安 |
| 3 | 🙂 だいたいOK |
| 4 | 💪 自信あり |

Persist only progress data.

Recommended storage shape:

```ts
type StoredLearningProgress = {
  version: 1;
  cards: LearningProgress;
};
```

Recommended storage key:

`interview-flashcards-progress-v1`

When confidence is explicitly selected:

- update `confidence`
- set `lastReviewedAt` to current ISO timestamp
- increment `reviewCount`

Do not increment review count merely by rendering a card.

## 9. UI

### Mobile first

Primary target is smartphone usage.

Test at least approximately:

- 375px
- 390px
- 430px

Use a single-column reading flow on mobile.

### Main screen

Show:

- app title
- progress summary
- filters
- current list of cards

Filters:

- category
- confidence
- unreviewed only
- review recommended only

For the MVP:

`reviewRecommended = confidence <= 2`

Unreviewed cards (`confidence === 0`) are therefore included in review recommendations.

### Flash card

Front:

- category
- question
- `回答を見る` button

Back / expanded state:

- 回答例
- 重要ポイント
- 深掘り質問
- 公式Reference links
- confidence selector

Prefer an expandable card over a decorative 3D flip animation.

Do not require hover.

## 10. Component Responsibilities

Suggested structure:

```text
src/
├─ app/
│  ├─ layout.tsx
│  ├─ page.tsx
│  └─ globals.css
├─ components/
│  ├─ flash-card/
│  │  ├─ FlashCard.tsx
│  │  ├─ FlashCardFront.tsx
│  │  ├─ FlashCardBack.tsx
│  │  └─ ConfidenceSelector.tsx
│  ├─ filters/
│  │  ├─ CategoryFilter.tsx
│  │  └─ ConfidenceFilter.tsx
│  ├─ progress/
│  │  └─ LearningProgress.tsx
│  └─ FlashCardList.tsx
├─ data/
│  ├─ categories.ts
│  └─ interview-cards.ts
├─ hooks/
│  └─ useLearningProgress.ts
├─ lib/
│  ├─ filters.ts
│  └─ storage.ts
└─ types/
   └─ interview-card.ts
```

Responsibilities:

- `FlashCardList`: combine card data, progress and filters
- `FlashCard`: control answer visibility
- `FlashCardFront`: render question
- `FlashCardBack`: render answer, key points, follow-ups and references
- `ConfidenceSelector`: edit confidence
- `CategoryFilter`: category selection
- `ConfidenceFilter`: confidence selection
- `LearningProgress`: aggregate progress
- `useLearningProgress`: expose progress operations
- `storage.ts`: serialize / parse / validate localStorage payload
- `filters.ts`: pure filter functions

Do not scatter direct `localStorage` calls throughout UI components.

## 11. Client / Server Boundary

Keep components server-renderable unless browser behavior is required.

Components/hooks using:

- `useState`
- event handlers
- `localStorage`
- browser-only APIs

must run on the client.

Keep the client boundary as small as reasonably practical.

## 12. Accessibility

- buttons must be actual buttons
- reference links must be actual anchors
- confidence controls must not rely on emoji alone
- each confidence option must have an accessible text label
- keyboard operation must work
- focus indicator must remain visible
- do not encode important state by color alone

## 13. Testing

### Unit / component tests

At minimum:

- storage serialization / restoration
- malformed or missing storage handling
- card filters
- confidence updates
- FlashCard answer reveal

### E2E

At minimum:

1. open app
2. locate a card
3. reveal answer
4. select confidence
5. reload
6. verify confidence is restored

Also assert that filtering by confidence can find the updated card.

## 14. Vercel

Deployment will be handled separately.

Expected Vercel Root Directory:

`apps/interview-flashcards`

The application must build successfully within the monorepo and should not require a backend service or secrets for the MVP.

## 15. Issue Order

Recommended dependency order:

1. Scaffold app
2. Data model + 70 seed cards
3. Flash card UI
4. Learning progress + localStorage
5. Filters + progress dashboard
6. Mobile responsive + accessibility
7. Tests
8. Production readiness + docs

Issue #1 may be implemented before this specification is committed.

Before Issue #2 implementation, this specification and the supplied `interview-cards.ts` should be available to Codex so the educational content has a fixed source of truth.

## 16. Implementation Guardrails for Codex

- Preserve existing monorepo conventions.
- Avoid unrelated refactors.
- Do not change existing apps unless required for workspace integration.
- Treat the supplied 70-card dataset as authoritative.
- Do not invent additional cards during MVP implementation.
- Do not remove references.
- Run relevant lint, typecheck, test, and build commands after implementation.
- Keep each Issue scoped to its own acceptance criteria.
