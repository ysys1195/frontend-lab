# Architecture

## 1. Overview

スマートフォンのブラウザからカメラを起動し、身分証を想定したカードをガイド枠に合わせて撮影できるプロトタイプを作成する。

カメラ用の外部ライブラリは使用せず、ブラウザ標準の Web API を直接利用する。

主な処理フローは以下とする。

```text
ユーザー
  ↓
カメラ起動
  ↓
カメラ権限取得
  ↓
背面カメラの映像を表示
  ↓
ガイド枠にカードを合わせる
  ↓
撮影
  ↓
Canvasへ描画
  ↓
ガイド枠に合わせてCrop
  ↓
Blob生成
  ↓
撮影結果を表示
  ↓
撮り直し
```

### Goals

このプロトタイプでは以下を確認する。

- `navigator.mediaDevices.getUserMedia()` によるカメラ利用
- `MediaStream` の扱い
- `<video>` を利用したリアルタイムプレビュー
- 背面カメラの利用
- 身分証撮影用ガイド枠の表示
- Canvas API による静止画キャプチャ
- ガイド枠に合わせたCrop
- Blobによる画像生成
- カメラ権限とエラーハンドリング
- カメラのライフサイクル管理
- iPhone Safariでの実機動作

### Non Goals

初期MVPでは以下を実装しない。

- OCR
- 顔認識
- 本人確認
- 画像解析
- Goバックエンド
- Next.js BFF
- 画像アップロード
- データベース保存
- 認証
- PWA
- 実際の身分証解析API

撮影には実際の免許証やマイナンバーカードではなく、ダミーカードを使用する。

---

# 2. Technology Stack

## Application

- Next.js
- React
- TypeScript
- App Router

## Styling

- CSS Modules

UIライブラリは原則追加しない。

## Browser APIs

- MediaDevices API
- MediaStream API
- Canvas API
- URL API

主に以下を利用する。

```ts
navigator.mediaDevices.getUserMedia();

video.srcObject;

MediaStreamTrack.stop();

CanvasRenderingContext2D.drawImage();

HTMLCanvasElement.toBlob();

URL.createObjectURL();

URL.revokeObjectURL();
```

## Testing

Cropなどブラウザに依存しないロジックについて、Unit Testを作成する。

テストランナーにはVitestを使用する。

---

# 3. Directory Structure

想定するディレクトリ構成は以下。

```text
src/
├── app/
│   ├── page.tsx
│   └── globals.css
│
├── components/
│   └── camera/
│       ├── CameraCapture.tsx
│       ├── CameraCapture.module.css
│       ├── CameraPreview.tsx
│       ├── CaptureGuide.tsx
│       └── CapturedImage.tsx
│
├── hooks/
│   └── useCamera.ts
│
├── lib/
│   └── camera/
│       ├── calculateCropArea.ts
│       └── captureImage.ts
│
└── types/
    └── camera.ts
```

必要になるまでファイルやディレクトリを増やさない。

---

# 4. Main Components

## CameraCapture

カメラ撮影機能全体を管理するClient Component。

主な責務：

- カメラ画面の状態管理
- `useCamera` の利用
- 撮影処理の開始
- 撮影結果の保持
- 撮り直し処理
- 各UIコンポーネントの切り替え

ブラウザAPIの詳細処理やCrop計算そのものは持たせない。

---

## CameraPreview

リアルタイムのカメラ映像を表示する。

主な責務：

- `<video>` の表示
- `videoRef` の受け取り
- カメラプレビュー用のレイアウト

カメラを直接起動する責務は持たない。

`<video>` はモバイルブラウザを考慮して以下を基本とする。

```tsx
<video ref={videoRef} autoPlay playsInline muted />
```

---

## CaptureGuide

身分証を合わせるためのガイド枠。

主な責務：

- ガイド枠の描画
- Capture範囲を取得できるDOM要素の提供

Crop処理そのものは行わない。

---

## CapturedImage

撮影後の画像を表示する。

主な責務：

- 撮影結果の表示
- 撮り直し操作

---

# 5. Camera Logic

## useCamera

ブラウザのカメラAPIとのやり取りを担当するCustom Hook。

主な責務：

- `getUserMedia()` の呼び出し
- `MediaStream` の保持
- `<video>` へのStream設定
- カメラ停止
- カメラ起動状態の管理
- カメラエラーの取得

想定インターフェース：

```ts
const { status, error, startCamera, stopCamera } = useCamera(videoRef);
```

カメラ取得時は背面カメラを優先する。

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

`exact` は使用せず、利用可能な端末の範囲を狭めすぎない。

---

# 6. Capture Logic

## captureImage

現在のカメラ映像から静止画を取得する。

処理：

```text
HTMLVideoElement
  ↓
Crop範囲を取得
  ↓
Canvas.drawImage()
  ↓
Canvas
  ↓
Canvas.toBlob()
  ↓
Blob
```

UIコンポーネントからCanvas APIの詳細を分離する。

想定インターフェース：

```ts
const blob = await captureImage({
  video,
  cropArea,
});
```

MVPではJPEG形式で生成する。

---

# 7. Crop Calculation

## calculateCropArea

画面上のガイド枠を、実際のカメラ映像上の座標へ変換する純粋関数。

この処理はDOMやBrowser APIへ依存させない。

入力例：

```ts
type CalculateCropAreaInput = {
  videoWidth: number;
  videoHeight: number;
  containerWidth: number;
  containerHeight: number;
  guideX: number;
  guideY: number;
  guideWidth: number;
  guideHeight: number;
};
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

## object-fit: cover

カメラプレビューでは以下を利用する。

```css
video {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
```

そのため、実際の映像の一部が画面外へCropされた状態で表示される可能性がある。

表示倍率は以下で求める。

```ts
const scale = Math.max(
  containerWidth / videoWidth,
  containerHeight / videoHeight
);
```

表示後のサイズ：

```ts
const displayedVideoWidth = videoWidth * scale;
const displayedVideoHeight = videoHeight * scale;
```

画面外へはみ出しているサイズ：

```ts
const offsetX = (displayedVideoWidth - containerWidth) / 2;

const offsetY = (displayedVideoHeight - containerHeight) / 2;
```

ガイド枠を元画像座標へ変換する。

```ts
const sourceX = (guideX + offsetX) / scale;
const sourceY = (guideY + offsetY) / scale;

const sourceWidth = guideWidth / scale;
const sourceHeight = guideHeight / scale;
```

このロジックについてUnit Testを書く。

---

# 8. Data Flow

## Camera Start

```text
User
  ↓
CameraCapture
  ↓
useCamera.startCamera()
  ↓
navigator.mediaDevices.getUserMedia()
  ↓
MediaStream
  ↓
video.srcObject
  ↓
CameraPreview
```

---

## Capture

```text
User
  ↓
Capture button
  ↓
CameraCapture
  ↓
ガイド枠とプレビュー領域を取得
  ↓
calculateCropArea()
  ↓
CropArea
  ↓
captureImage()
  ↓
Canvas.drawImage()
  ↓
Canvas.toBlob()
  ↓
Blob
```

---

## Preview Captured Image

```text
Blob
  ↓
URL.createObjectURL()
  ↓
Object URL
  ↓
CapturedImage
```

Object URLが不要になった場合は必ず以下を実行する。

```ts
URL.revokeObjectURL(url);
```

---

## Retake

```text
CapturedImage
  ↓
撮り直す
  ↓
Object URLを破棄
  ↓
カメラを再起動
  ↓
CameraPreview
```

---

# 9. State Management

外部の状態管理ライブラリは使用しない。

ReactのローカルStateで管理する。

カメラ状態は以下とする。

```ts
type CameraStatus = 'idle' | 'requesting' | 'previewing' | 'captured' | 'error';
```

基本的な状態遷移：

```text
idle
  ↓
requesting
  ↓
previewing
  ↓
captured
```

撮り直し：

```text
captured
  ↓
requesting
  ↓
previewing
```

エラー：

```text
requesting
  ↓
error
```

画像については必要に応じて以下を保持する。

```ts
Blob | null;
```

および表示用のObject URLを保持する。

---

# 10. Browser API Boundary

Browser APIを利用するコードはできるだけ限定する。

## useCamera

以下を担当する。

```text
navigator.mediaDevices
getUserMedia
MediaStream
MediaStreamTrack
video.srcObject
```

---

## captureImage

以下を担当する。

```text
Canvas
drawImage
toBlob
```

---

## CameraCapture

以下のDOM情報を取得する。

```text
video element
preview container
capture guide
getBoundingClientRect()
```

取得した値のみを `calculateCropArea()` へ渡す。

---

## calculateCropArea

Browser APIに依存しない。

```text
number
↓
計算
↓
number
```

だけを扱う。

これによりUnit Testを容易にする。

---

# 11. Camera Lifecycle

カメラは不要になった時点で必ず停止する。

```ts
stream.getTracks().forEach((track) => {
  track.stop();
});
```

主な停止タイミング：

- 撮影完了
- コンポーネントのUnmount
- カメラを利用する画面から離れる場合
- エラー後にStreamが残っている場合

カメラ停止処理をUIコンポーネントへ分散させず、`useCamera` に集約する。

---

# 12. Camera Constraints and Fallback

最初に以下の条件でカメラ取得を試みる。

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

端末やブラウザによって条件を満たせない場合を考慮し、必要に応じてFallbackする。

Fallback候補：

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

最終的には以下も利用可能とする。

```ts
{
  audio: false,
  video: true,
}
```

過度に厳しいConstraintによってカメラ自体が利用不能になることを避ける。

---

# 13. Error Handling

最低限、以下を区別する。

## Unsupported

`navigator.mediaDevices` または `getUserMedia` が利用できない。

表示例：

```text
このブラウザではカメラ機能を利用できません。
```

---

## NotAllowedError

ユーザーがカメラ権限を許可しなかった場合。

表示例：

```text
カメラの使用が許可されていません。
ブラウザの設定からカメラの使用を許可してください。
```

---

## NotFoundError

利用可能なカメラが見つからない場合。

表示例：

```text
利用可能なカメラが見つかりませんでした。
```

---

## NotReadableError

カメラデバイスは存在するが利用できない場合。

表示例：

```text
カメラを起動できませんでした。
他のアプリがカメラを使用していないか確認してください。
```

---

## OverconstrainedError

指定したConstraintを満たすカメラが存在しない場合。

より緩いConstraintでのFallbackを試みる。

---

## Unknown Error

上記に該当しないエラー。

内部情報をそのままUIへ表示せず、共通エラーメッセージを表示する。

---

# 14. Testing Strategy

## Unit Test

Browser APIに依存しないロジックを中心にテストする。

特に、

```text
calculateCropArea()
```

を対象とする。

確認するケース：

- 映像とContainerが同じAspect Ratio
- 横長映像を縦長Containerへ表示
- 縦長映像を横長Containerへ表示
- 中央のガイド枠
- Offsetが発生するケース
- 異なるガイドサイズ

必要に応じてエラー変換などの純粋関数もUnit Test対象とする。

---

## Manual Test

カメラそのものは実機確認を行う。

最低限の確認環境：

- Mac Chrome
- iPhone Safari

可能であれば以下も確認する。

- iPhone Chrome
- Android Chrome

確認内容：

- カメラ権限
- 背面カメラ
- プレビュー
- ガイド枠
- 撮影
- Crop結果
- 撮影画像表示
- 撮り直し
- カメラ停止
- 権限拒否時の表示

---

# 15. HTTPS and Mobile Verification

`getUserMedia()` をスマートフォン実機で確認するため、HTTPS環境へデプロイする。

想定：

```text
GitHub
  ↓
Vercel
  ↓
HTTPS URL
  ↓
iPhone Safari
```

PWA化は行わない。

ブラウザ上のWebアプリとして動作確認する。

---

# 16. Analysis Flow and Future Extensions

現在は、初期MVP後の拡張として以下のMock画像解析フローまで実装済みである。

```text
撮影画像
  ↓
FormData
  ↓
Next.js Route Handler
  ↓
Mock解析API
  ↓
解析結果表示
```

さらに将来的には、

```text
Browser
  ↓
Next.js BFF
  ↓
Go API
  ↓
画像解析
```

のような構成へ拡張できる。

Go APIや実画像解析への接続は、現在の対象には含めない。
