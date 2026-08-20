# Implementation Plan

このドキュメントでは、`docs/architecture.md`
で定義した身分証撮影プロトタイプを実装するための作業単位を定義する。

各Taskは、後からGitHub Issueへ変換することを想定する。

初期MVPではカメラ撮影と撮影画像の表示までを対象とし、バックエンド・OCR・画像解析は実装しない。

---

# Phase 1: Project Foundation

## Task 1: プロジェクト初期設定

### Goal

Next.js /
TypeScriptで実装を開始でき、typecheck・lint・testを実行できる状態を作る。

### Implementation

- Next.js App Routerを使用する
- TypeScript strictを有効にする
- ESLintを利用できる状態にする
- Vitestを導入する
- `typecheck` コマンドを追加する
- `test` コマンドを追加する
- `src/` ベースのディレクトリ構成を使用する
- `docs/architecture.md` に定義した基本ディレクトリを作成する

想定する主要ディレクトリ：

```text
src/
├── app/
├── components/
├── hooks/
├── lib/
└── types/
```

### Out of Scope

- カメラ実装
- UI作成
- 撮影処理
- Vercel設定

### Completion Criteria

以下が正常終了する。

```text
typecheck
lint
test
```

初期ページがローカル環境で表示できる。

### Dependencies

なし。

---

## Task 2: 撮影画面の基本UIを作成する

### Goal

カメラ機能を実装する前に、プロトタイプの基本的な画面構造を作る。

### Implementation

以下の状態を表現できるUIを作成する。

```text
カメラ未起動
カメラプレビュー
撮影結果
エラー
```

最低限、以下のUIを用意する。

- タイトル
- 説明文
- カメラ起動ボタン
- カメラプレビュー領域
- 撮影ボタン
- 撮影結果表示領域
- 撮り直しボタン
- エラーメッセージ領域

CSS Modulesを使用する。

モバイル画面を優先したレイアウトにする。

### Components

必要に応じて以下を作成する。

```text
CameraCapture
CameraPreview
CapturedImage
```

この時点では実際のカメラAPIを接続しなくてよい。

### Out of Scope

- `getUserMedia()`
- MediaStream
- Canvas
- Crop
- 実際の撮影
- 詳細なデザイン調整

### Completion Criteria

カメラ機能なしでも、撮影フローの画面構造が確認できる。

モバイル幅でレイアウトが崩れない。

### Dependencies

- Task 1

---

# Phase 2: Camera Preview

## Task 3: カメラ起動とMediaStream管理を実装する

### Goal

ブラウザからカメラの利用許可を取得し、MediaStreamを管理できるようにする。

### Implementation

`useCamera` Custom Hookを作成する。

主な責務：

- `navigator.mediaDevices.getUserMedia()` の呼び出し
- カメラ起動
- MediaStream保持
- `<video>` へのStream設定
- カメラ停止
- Unmount時のcleanup

カメラConstraintは以下を基本とする。

```ts
{
  audio: false,
  video: {
    facingMode: {
      ideal: "environment",
    },
    width: {
      ideal: 1920,
    },
    height: {
      ideal: 1080,
    },
  },
}
```

状態として最低限以下を扱う。

```ts
type CameraStatus = 'idle' | 'requesting' | 'previewing' | 'captured' | 'error';
```

### Out of Scope

- Canvasによる撮影
- Crop
- 撮影結果表示
- Constraint Fallback
- ブラウザ固有の互換性修正

### Completion Criteria

ユーザー操作によってカメラ権限が要求される。

許可するとカメラのMediaStreamを取得できる。

カメラ停止時にすべてのMediaStreamTrackが停止する。

Unmount時にもカメラが停止する。

### Dependencies

- Task 2

---

## Task 4: カメラプレビューと撮影ガイドを実装する

### Goal

取得したカメラ映像を画面に表示し、身分証を合わせるガイド枠を表示する。

### Implementation

`CameraPreview` を実装する。

`<video>` は以下を基本とする。

```tsx
<video autoPlay playsInline muted />
```

映像表示には以下を使用する。

```css
object-fit: cover;
```

`CaptureGuide` を作成し、カメラ映像上にOverlayする。

ガイド枠は一般的なカード比率を意識した横長の矩形とする。

撮影ボタンをプレビュー画面上に配置する。

### Out of Scope

- Crop計算
- Canvas
- Blob生成
- OCR
- ガイド枠内にカードが存在するかの自動判定

### Completion Criteria

カメラ映像がプレビュー領域に表示される。

ガイド枠がカメラ映像上に表示される。

モバイル幅でガイド枠が適切に表示される。

### Dependencies

- Task 3

---

## Task 5: カメラエラーハンドリングを実装する

### Goal

カメラが利用できない場合に、原因に応じた適切なUIを表示する。

### Implementation

最低限以下を区別する。

```text
Unsupported
NotAllowedError
NotFoundError
NotReadableError
OverconstrainedError
Unknown Error
```

Browser
APIのエラーをUI表示用の情報へ変換する処理は、可能であればUIから分離する。

エラー時にはユーザーが理解できるメッセージを表示する。

権限拒否の場合は、ブラウザ設定からカメラを許可する必要があることを案内する。

### Out of Scope

- Constraint Fallback
- ブラウザごとの個別ワークアラウンド

### Completion Criteria

代表的なカメラエラーがUI上で区別される。

内部の例外オブジェクトをそのまま画面へ表示しない。

エラー発生後に不要なMediaStreamが残らない。

### Dependencies

- Task 3

---

# Phase 3: Image Capture

## Task 6: Crop座標計算ロジックを実装する

### Goal

画面上の撮影ガイドを、実際のカメラ映像上の座標へ変換できるようにする。

### Implementation

以下の純粋関数を作成する。

```text
calculateCropArea()
```

入力：

```text
videoWidth
videoHeight
containerWidth
containerHeight
guideX
guideY
guideWidth
guideHeight
```

出力：

```ts
type CropArea = {
  x: number;
  y: number;
  width: number;
  height: number;
};
```

`object-fit: cover` によるScaleとOffsetを考慮する。

DOMやBrowser APIに依存させない。

### Tests

最低限以下をテストする。

- Aspect Ratioが同じ場合
- 横長映像を縦長Containerへ表示した場合
- 縦長映像を横長Containerへ表示した場合
- X方向にOffsetが発生する場合
- Y方向にOffsetが発生する場合
- ガイド枠サイズが異なる場合

### Out of Scope

- Canvas
- Blob生成
- UI操作

### Completion Criteria

Crop座標計算が純粋関数として実装されている。

Unit Testが存在する。

代表ケースのUnit Testがすべて成功する。

### Dependencies

- Task 1

---

## Task 7: Canvasによる静止画キャプチャを実装する

### Goal

現在のカメラ映像から、ガイド枠に対応する静止画を生成する。

### Implementation

以下を実装する。

```text
captureImage()
```

処理：

```text
HTMLVideoElement
  ↓
CropArea
  ↓
Canvas.drawImage()
  ↓
Canvas.toBlob()
  ↓
Blob
```

`calculateCropArea()` の結果を利用する。

画像形式はJPEGとする。

`captureImage()` はPromiseベースでBlobを返せる形を基本とする。

Canvasはユーザーへ表示しない。

### Out of Scope

- API送信
- OCR
- 画像保存
- Base64変換

### Completion Criteria

撮影ボタンから現在のカメラ映像をキャプチャできる。

ガイド枠に対応した範囲が切り抜かれる。

JPEG Blobが生成される。

撮影に成功した場合はカメラを停止する。

### Dependencies

- Task 4
- Task 6

---

## Task 8: 撮影結果表示と撮り直しを実装する

### Goal

撮影したBlobを画面へ表示し、必要に応じて撮り直せるようにする。

### Implementation

撮影されたBlobから以下を生成する。

```ts
URL.createObjectURL(blob);
```

生成したObject URLを `<img>` へ設定する。

撮影後は、

```text
Camera Preview
↓
Captured Image
```

へ画面を切り替える。

撮り直し時は、

```text
Captured Image
↓
Object URL破棄
↓
カメラ再起動
↓
Camera Preview
```

とする。

不要になったObject URLは以下で破棄する。

```ts
URL.revokeObjectURL();
```

Unmount時のObject URL cleanupも行う。

### Out of Scope

- サーバーへの画像送信
- 画像保存
- OCR
- 解析結果表示

### Completion Criteria

撮影画像が画面へ表示される。

撮り直し操作ができる。

撮り直し時にカメラが再起動する。

不要なObject URLが破棄される。

### Dependencies

- Task 7

---

# Phase 4: Browser Compatibility

## Task 9: カメラConstraintのFallbackを実装する

### Goal

端末やブラウザによるカメラConstraintの違いによって、カメラ機能全体が利用不能になることを避ける。

### Implementation

最初に以下を試す。

```ts
{
  audio: false,
  video: {
    facingMode: {
      ideal: "environment",
    },
    width: {
      ideal: 1920,
    },
    height: {
      ideal: 1080,
    },
  },
}
```

Constraintが原因で取得できない場合は、より緩い条件を試す。

Fallback 1：

```ts
{
  audio: false,
  video: {
    facingMode: {
      ideal: "environment",
    },
  },
}
```

必要な場合のFallback 2：

```ts
{
  audio: false,
  video: true,
}
```

FallbackロジックをUIへ直接記述しない。

### Out of Scope

- 特定機種だけを対象にしたハードコード
- User Agentによる端末判定

### Completion Criteria

厳しいConstraintを満たせない場合でも、利用可能なカメラが存在すればFallbackできる。

既存のエラーハンドリングと矛盾しない。

### Dependencies

- Task 5

---

## Task 10: モバイルブラウザでの動作を確認し互換性問題を修正する

### Goal

実際のスマートフォンブラウザでMVPの撮影フローが利用できることを確認する。

### Verification Environment

最低限：

```text
Mac Chrome
iPhone Safari
```

可能であれば：

```text
iPhone Chrome
Android Chrome
```

### Verification

以下を確認する。

- カメラ権限を要求できる
- 背面カメラを利用できる
- プレビューが表示される
- `<video playsInline>` が正しく機能する
- ガイド枠が適切に表示される
- 撮影できる
- Crop結果がガイド枠と概ね一致する
- 撮影結果が表示される
- 撮り直しできる
- カメラ停止後にカメラが利用され続けない
- 権限拒否時に適切なエラーが表示される

### Implementation

確認によって発見された問題のうち、MVPの動作に必要な互換性問題のみ修正する。

### Development Rule

このTaskを理由に、無関係なリファクタリングや抽象化を行わない。

端末固有の修正を追加する場合は、なぜ必要なのかコメントまたはIssue内で説明できる状態にする。

### Completion Criteria

最低限iPhone Safariで以下が成立する。

```text
カメラ起動
↓
プレビュー
↓
撮影
↓
Crop
↓
撮影結果表示
↓
撮り直し
```

### Dependencies

- Task 8
- Task 9

---

# MVP Completion

Task 1〜10が完了した時点で初期MVPを完成とする。

完成状態：

```text
iPhone Safari
  ↓
HTTPSでWebアプリを開く
  ↓
カメラ起動
  ↓
権限許可
  ↓
背面カメラプレビュー
  ↓
ガイド枠にダミーカードを合わせる
  ↓
撮影
  ↓
ガイド枠部分をCrop
  ↓
撮影画像表示
  ↓
撮り直し
```

---

# Future Work

以下は初期MVPには含めず、必要になった場合に別途Implementation Planを追加する。

## Mock Analysis API

```text
Blob
↓
FormData
↓
POST /api/analyze
↓
Next.js Route Handler
↓
Mock Response
↓
解析結果表示
```

## BFF Integration

```text
Browser
↓
Next.js BFF
↓
Go API
```

## Image Analysis

- OCR
- カード検出
- 傾き検出
- ブレ検出
- 撮影品質判定

初期のGitHub Issue作成時には、これらFuture WorkをIssue化しない。
