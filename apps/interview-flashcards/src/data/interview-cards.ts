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

  /**
   * Interview-ready answer.
   * Keep this natural and professional so it can be spoken as-is in an interview.
   */
  answer: string;

  /**
   * Study-only Senku-style explanation for motivation and recall.
   */
  senkuMemo: string;

  keyPoints: string[];
  followUps: string[];
  references: Reference[];
};

/**
 * Initial interview flash card dataset.
 *
 * - `answer` stays interview-ready and professional.
 * - `question`, `senkuMemo`, `keyPoints`, and `followUps` use a Senku-inspired study tone.
 * - References and technical meaning must remain unchanged.
 * - User learning progress must be stored separately.
 */
export const interviewCards: InterviewCard[] = [
  {
    "id": "computer-process-thread",
    "category": "computer-science",
    "question": "プロセスとスレッド、違いを100億％切り分けられるか？",
    "answer": "プロセスは実行中のプログラムをOSが管理する単位で、通常は独立したアドレス空間やリソースを持ちます。スレッドはプロセス内の実行単位で、同じプロセス内のスレッドはメモリなどのリソースを共有します。Webフロントエンドでは、メインスレッドを長時間占有すると描画や入力処理を妨げるため、重い処理を分割したりWeb Workerへ移したりする判断が重要です。",
    "keyPoints": [
      "ここは固定。 プロセスは資源管理の単位として扱われる",
      "次に押さえる。 スレッドはプロセス内の実行単位",
      "最後にこれ。 同一プロセスのスレッドはメモリ等を共有する"
    ],
    "followUps": [
      "じゃあ次だ。 ブラウザのメインスレッドでは何が動いていますか？",
      "もう一段掘るぞ。 Web Workerを使うと何が変わりますか？"
    ],
    "references": [
      {
        "title": "MDN - Web Workers API",
        "url": "https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API"
      }
    ],
    "senkuMemo": "基礎科学パートだ。 要するに「プロセスは資源管理の単位として扱われる」が芯だ。ついでに「スレッドはプロセス内の実行単位」まで繋げて説明できりゃ、面接の深掘りにも100億％対応しやすい。"
  },
  {
    "id": "computer-stack-heap",
    "category": "computer-science",
    "question": "スタックとヒープ、何がどこに乗る？ ごっちゃにせず説明してみろ。",
    "answer": "JavaScriptの実行モデルを説明する際、スタックは関数呼び出しなど現在実行している処理を管理する領域、ヒープはオブジェクトなどを確保するためのメモリ領域として捉えられます。不要になったヒープ上の値はガベージコレクションの対象になります。",
    "keyPoints": [
      "ここは固定。 Call Stackは実行中の関数呼び出しを表す",
      "次に押さえる。 オブジェクトなどはヒープに確保される",
      "最後にこれ。 実装詳細はJavaScriptエンジンに依存する"
    ],
    "followUps": [
      "じゃあ次だ。 Call Stackが大きくなりすぎると何が起きますか？",
      "もう一段掘るぞ。 再帰処理との関係は？"
    ],
    "references": [
      {
        "title": "MDN - JavaScript execution model",
        "url": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Execution_model"
      },
      {
        "title": "MDN - Memory management",
        "url": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Memory_management"
      }
    ],
    "senkuMemo": "基礎科学パートだ。 要するに「Call Stackは実行中の関数呼び出しを表す」が芯だ。ついでに「オブジェクトなどはヒープに確保される」まで繋げて説明できりゃ、面接の深掘りにも100億％対応しやすい。"
  },
  {
    "id": "computer-event-loop",
    "category": "computer-science",
    "question": "JavaScriptのイベントループ、何がどう回ってる仕組みだ？",
    "answer": "JavaScriptでは実行するジョブを順番に処理します。非同期処理などによって後から実行可能になった処理はキューに入り、現在の処理が終わった後にイベントループによって次の処理が実行されます。この仕組みによって、メインのJavaScript実行をブロックせずに非同期処理を扱えます。",
    "keyPoints": [
      "ここは固定。 現在のジョブは完了するまで実行される",
      "次に押さえる。 完了した非同期処理は後続ジョブとして処理される",
      "最後にこれ。 イベントループとブラウザAPIは同じものではない"
    ],
    "followUps": [
      "じゃあ次だ。 PromiseとsetTimeoutでは一般にどちらが先に実行されますか？",
      "もう一段掘るぞ。 run-to-completionとは何ですか？"
    ],
    "references": [
      {
        "title": "MDN - JavaScript execution model",
        "url": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Execution_model"
      }
    ],
    "senkuMemo": "基礎科学パートだ。 要するに「現在のジョブは完了するまで実行される」が芯だ。ついでに「完了した非同期処理は後続ジョブとして処理される」まで繋げて説明できりゃ、面接の深掘りにも100億％対応しやすい。"
  },
  {
    "id": "computer-task-microtask",
    "category": "computer-science",
    "question": "TaskとMicrotask、実行順まで含めて違いを説明できるか？",
    "answer": "ブラウザのイベントループでは、タイマーやユーザー操作などはTaskとして扱われ、PromiseのリアクションなどはMicrotaskとして処理されます。現在のTaskが終了すると、通常は次のTaskへ進む前にMicrotaskキューが空になるまで処理されます。そのため、同じタイミングで予約したPromiseの処理がsetTimeoutより先に実行されるケースがあります。",
    "keyPoints": [
      "ここは固定。 PromiseのthenなどはMicrotask",
      "次に押さえる。 setTimeoutのコールバックはTaskとして扱われる",
      "最後にこれ。 Microtaskは次のTaskより前に処理される"
    ],
    "followUps": [
      "じゃあ次だ。 Microtaskを大量に追加し続けると何が問題になりますか？",
      "もう一段掘るぞ。 queueMicrotaskとは？"
    ],
    "references": [
      {
        "title": "MDN - JavaScript execution model",
        "url": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Execution_model"
      }
    ],
    "senkuMemo": "基礎科学パートだ。 要するに「PromiseのthenなどはMicrotask」が芯だ。ついでに「setTimeoutのコールバックはTaskとして扱われる」まで繋げて説明できりゃ、面接の深掘りにも100億％対応しやすい。"
  },
  {
    "id": "computer-sync-async",
    "category": "computer-science",
    "question": "同期処理と非同期処理、違いを一発で説明してみろ。",
    "answer": "同期処理では現在の処理が完了するまで、その処理の流れでは次の処理へ進みません。非同期処理では、時間のかかる処理の完了を待つ間に呼び出し元が別の処理を進められ、完了後にPromiseやコールバックなどを通して結果を扱えます。",
    "keyPoints": [
      "ここは固定。 同期・非同期とシングル・マルチスレッドは別の概念",
      "次に押さえる。 fetchはPromiseを返す",
      "最後にこれ。 awaitは関数全体のスレッドをブロックするわけではない"
    ],
    "followUps": [
      "じゃあ次だ。 async/awaitを使うと同期処理になるのですか？",
      "もう一段掘るぞ。 Promiseとは何ですか？"
    ],
    "references": [
      {
        "title": "MDN - JavaScript execution model",
        "url": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Execution_model"
      }
    ],
    "senkuMemo": "基礎科学パートだ。 要するに「同期・非同期とシングル・マルチスレッドは別の概念」が芯だ。ついでに「fetchはPromiseを返す」まで繋げて説明できりゃ、面接の深掘りにも100億％対応しやすい。"
  },
  {
    "id": "computer-garbage-collection",
    "category": "computer-science",
    "question": "ガベージコレクションって何だ？ 自動だからって油断は100億％禁物だぞ。",
    "answer": "プログラムから到達できなくなったメモリを実行環境が自動的に回収する仕組みです。JavaScriptでは開発者が通常メモリを手動解放する必要はありませんが、不要になったオブジェクトをイベントリスナーやグローバルな参照などから保持し続けると回収されず、メモリ使用量が増える原因になります。",
    "keyPoints": [
      "ここは固定。 到達可能性が重要",
      "次に押さえる。 参照を保持しているデータは回収されない",
      "最後にこれ。 自動GCでもメモリリークは起こり得る"
    ],
    "followUps": [
      "じゃあ次だ。 フロントエンドでメモリリークが起きる例を挙げてください。",
      "もう一段掘るぞ。 イベントリスナーのcleanupが必要なのはなぜ？"
    ],
    "references": [
      {
        "title": "MDN - Memory management",
        "url": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Memory_management"
      }
    ],
    "senkuMemo": "基礎科学パートだ。 要するに「到達可能性が重要」が芯だ。ついでに「参照を保持しているデータは回収されない」まで繋げて説明できりゃ、面接の深掘りにも100億％対応しやすい。"
  },
  {
    "id": "computer-main-thread-blocking",
    "category": "computer-science",
    "question": "重いJavaScriptでUIが固まる。さて、何が詰まってる？",
    "answer": "ブラウザでは多くのJavaScript処理、ユーザー入力への応答、レイアウトや描画に関わる処理がメインスレッド上で調整されます。長時間JavaScriptがメインスレッドを占有すると、ブラウザが入力や描画へ処理時間を渡せなくなり、画面が反応しないように見えます。",
    "keyPoints": [
      "ここは固定。 長い同期処理は応答性を悪化させる",
      "次に押さえる。 処理の分割やアルゴリズム改善を検討する",
      "最後にこれ。 CPU負荷の高い処理はWorkerも候補"
    ],
    "followUps": [
      "じゃあ次だ。 対策にはどんなものがありますか？",
      "もう一段掘るぞ。 Web Workerが向いていない処理は？"
    ],
    "references": [
      {
        "title": "MDN - Web Workers API",
        "url": "https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API"
      },
      {
        "title": "MDN - JavaScript execution model",
        "url": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Execution_model"
      }
    ],
    "senkuMemo": "基礎科学パートだ。 要するに「長い同期処理は応答性を悪化させる」が芯だ。ついでに「処理の分割やアルゴリズム改善を検討する」まで繋げて説明できりゃ、面接の深掘りにも100億％対応しやすい。"
  },
  {
    "id": "computer-web-worker",
    "category": "computer-science",
    "question": "Web Workerって何者だ？ メインスレッドから何を逃がせる？",
    "answer": "Web Workerは、ページのメイン実行スレッドとは別のWorkerスレッドでJavaScriptを実行する仕組みです。CPU負荷の高い計算などをメインスレッドから分離できます。Workerから通常のDOM APIを直接操作することはできず、メイン側とはpostMessageなどでデータをやり取りします。",
    "keyPoints": [
      "ここは固定。 別スレッドでJavaScriptを実行できる",
      "次に押さえる。 DOMを直接操作できない",
      "最後にこれ。 メッセージでメインスレッドと通信する"
    ],
    "followUps": [
      "じゃあ次だ。 Dedicated WorkerとShared Workerの違いは？",
      "もう一段掘るぞ。 データ転送コストには何を考慮しますか？"
    ],
    "references": [
      {
        "title": "MDN - Web Workers API",
        "url": "https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API"
      }
    ],
    "senkuMemo": "基礎科学パートだ。 要するに「別スレッドでJavaScriptを実行できる」が芯だ。ついでに「DOMを直接操作できない」まで繋げて説明できりゃ、面接の深掘りにも100億％対応しやすい。"
  },
  {
    "id": "network-url-render",
    "category": "network",
    "question": "URLを叩いてから画面が出るまで、通信とブラウザの流れを順番に追ってみろ。",
    "answer": "大まかには、URLを解釈し、必要ならDNSでホスト名から接続先を解決し、サーバーとの通信経路を確立します。HTTPSではTLSによる保護された接続を確立した上でHTTPリクエストを送り、HTMLなどのレスポンスを受信します。ブラウザはHTMLやCSSを解析し、必要なJavaScript・画像なども取得して、レイアウトと描画を行います。実際にはキャッシュ、HTTPのバージョン、接続再利用などで処理は変わります。",
    "keyPoints": [
      "ここは固定。 DNSは名前解決を担当",
      "次に押さえる。 HTTPSではTLSが通信を保護する",
      "最後にこれ。 HTML受信後も追加リソース取得とレンダリングがある"
    ],
    "followUps": [
      "じゃあ次だ。 DNSキャッシュが効いている場合は？",
      "もう一段掘るぞ。 HTTP/2やHTTP/3だと何が変わりますか？"
    ],
    "references": [
      {
        "title": "MDN - DNS",
        "url": "https://developer.mozilla.org/en-US/docs/Glossary/DNS"
      },
      {
        "title": "MDN - HTTPS",
        "url": "https://developer.mozilla.org/en-US/docs/Glossary/HTTPS"
      },
      {
        "title": "MDN - Overview of HTTP",
        "url": "https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/Overview"
      }
    ],
    "senkuMemo": "通信の一本道を整理するぞ。 要するに「DNSは名前解決を担当」が芯だ。ついでに「HTTPSではTLSが通信を保護する」まで繋げて説明できりゃ、面接の深掘りにも100億％対応しやすい。"
  },
  {
    "id": "network-http",
    "category": "network",
    "question": "HTTPって結局なんだ？ RequestとResponseまで含めて説明してみろ。",
    "answer": "HTTPはWebでリソースをやり取りするためのアプリケーション層プロトコルです。クライアントがメソッド、対象URI、ヘッダー、必要に応じて本文を含むリクエストを送り、サーバーがステータスコード、ヘッダー、本文などを含むレスポンスを返します。",
    "keyPoints": [
      "ここは固定。 Request/Response型のプロトコル",
      "次に押さえる。 メソッドとステータスコードがある",
      "最後にこれ。 HTTP SemanticsはRFC 9110で定義される"
    ],
    "followUps": [
      "じゃあ次だ。 HTTP/1.1とHTTP/2の主な違いは？",
      "もう一段掘るぞ。 HTTPはどの層のプロトコルですか？"
    ],
    "references": [
      {
        "title": "MDN - Overview of HTTP",
        "url": "https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/Overview"
      },
      {
        "title": "RFC 9110 - HTTP Semantics",
        "url": "https://www.rfc-editor.org/rfc/rfc9110"
      }
    ],
    "senkuMemo": "通信の一本道を整理するぞ。 要するに「Request/Response型のプロトコル」が芯だ。ついでに「メソッドとステータスコードがある」まで繋げて説明できりゃ、面接の深掘りにも100億％対応しやすい。"
  },
  {
    "id": "network-stateless",
    "category": "network",
    "question": "HTTPが『stateless』ってのはどういうことだ？ ここ曖昧だと通信の話は100億％詰まるぞ。",
    "answer": "HTTPの各リクエストは、プロトコル上はそれぞれ独立したものとして扱えます。HTTP自体がアプリケーションのログイン状態などを自動的に保持するわけではありません。そのためWebアプリではCookie、セッション識別子、トークンなどを利用して複数リクエストにまたがる状態を実現します。",
    "keyPoints": [
      "ここは固定。 HTTPそのものとアプリケーションのセッションは分けて考える",
      "次に押さえる。 Cookie等で状態を関連付けられる",
      "最後にこれ。 接続再利用とアプリ状態保持も別概念"
    ],
    "followUps": [
      "じゃあ次だ。 ログイン状態はどう実現しますか？",
      "もう一段掘るぞ。 CookieはHTTPのstateless性をなくすのですか？"
    ],
    "references": [
      {
        "title": "MDN - Overview of HTTP",
        "url": "https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/Overview"
      },
      {
        "title": "MDN - Using HTTP cookies",
        "url": "https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/Cookies"
      }
    ],
    "senkuMemo": "通信の一本道を整理するぞ。 要するに「HTTPそのものとアプリケーションのセッションは分けて考える」が芯だ。ついでに「Cookie等で状態を関連付けられる」まで繋げて説明できりゃ、面接の深掘りにも100億％対応しやすい。"
  },
  {
    "id": "network-get-post",
    "category": "network",
    "question": "GETとPOST、単に『URLかBodyか』で済ませず違いを説明してみろ。",
    "answer": "GETは対象リソースの表現を取得するためのメソッドで、仕様上safeかつidempotentです。POSTはリクエスト本文などを対象リソースに処理させるために使われ、一般にはsafeでもidempotentでもありません。GETとPOSTの違いを単に『URLに付けるかBodyに入れるか』だけで捉えないことが重要です。",
    "keyPoints": [
      "ここは固定。 GETはsafeかつidempotent",
      "次に押さえる。 POSTの意味は対象リソースに表現を処理させること",
      "最後にこれ。 メソッドのsemanticを基準に選ぶ"
    ],
    "followUps": [
      "じゃあ次だ。 safeとidempotentの違いは？",
      "もう一段掘るぞ。 GETにBodyを付ければPOSTと同じですか？"
    ],
    "references": [
      {
        "title": "MDN - HTTP request methods",
        "url": "https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Methods"
      },
      {
        "title": "RFC 9110 - HTTP Semantics",
        "url": "https://www.rfc-editor.org/rfc/rfc9110"
      }
    ],
    "senkuMemo": "通信の一本道を整理するぞ。 要するに「GETはsafeかつidempotent」が芯だ。ついでに「POSTの意味は対象リソースに表現を処理させること」まで繋げて説明できりゃ、面接の深掘りにも100億％対応しやすい。"
  },
  {
    "id": "network-idempotency",
    "category": "network",
    "question": "HTTPの冪等性って何だ？ リトライ設計までつながる重要ポイントだ。",
    "answer": "同一のリクエストを1回送った場合と複数回送った場合で、サーバーに意図される効果が同じになる性質です。仕様上、GET、HEAD、PUT、DELETEなどはidempotentです。これはレスポンスが毎回完全に同一になるという意味ではありません。",
    "keyPoints": [
      "ここは固定。 冪等性はサーバー上の意図された効果についての性質",
      "次に押さえる。 PUTやDELETEはidempotent",
      "最後にこれ。 同じレスポンスになることを保証する概念ではない"
    ],
    "followUps": [
      "じゃあ次だ。 POSTを冪等に設計することはできますか？",
      "もう一段掘るぞ。 リトライ設計と冪等性はどう関係しますか？"
    ],
    "references": [
      {
        "title": "MDN - HTTP request methods",
        "url": "https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Methods"
      },
      {
        "title": "RFC 9110 - HTTP Semantics",
        "url": "https://www.rfc-editor.org/rfc/rfc9110"
      }
    ],
    "senkuMemo": "通信の一本道を整理するぞ。 要するに「冪等性はサーバー上の意図された効果についての性質」が芯だ。ついでに「PUTやDELETEはidempotent」まで繋げて説明できりゃ、面接の深掘りにも100億％対応しやすい。"
  },
  {
    "id": "network-success-status",
    "category": "network",
    "question": "200・201・204、全部成功だが何が違う？",
    "answer": "200 OKはリクエストが成功したことを表す一般的な成功レスポンスです。201 Createdはリクエストの結果として新しいリソースが作成されたことを表します。204 No Contentはリクエストは成功したものの、レスポンス本文として送るコンテンツがないことを表します。",
    "keyPoints": [
      "ここは固定。 200は一般的な成功",
      "次に押さえる。 201はリソース作成",
      "最後にこれ。 204は成功だが本文なし"
    ],
    "followUps": [
      "じゃあ次だ。 POSTが成功したら常に201ですか？",
      "もう一段掘るぞ。 DELETE成功時には何を返しますか？"
    ],
    "references": [
      {
        "title": "MDN - HTTP response status codes",
        "url": "https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Status"
      }
    ],
    "senkuMemo": "通信の一本道を整理するぞ。 要するに「200は一般的な成功」が芯だ。ついでに「201はリソース作成」まで繋げて説明できりゃ、面接の深掘りにも100億％対応しやすい。"
  },
  {
    "id": "network-401-403",
    "category": "network",
    "question": "401と403、認証と認可を混ぜずに切り分けられるか？",
    "answer": "401 Unauthorizedは、そのリクエストに有効な認証資格情報がなく認証が必要であることを示します。403 Forbiddenはサーバーがリクエストを理解したものの、処理を拒否している状態です。実務では『未認証なら401、認証済みだが権限不足なら403』という整理が基本ですが、セキュリティ上の理由で別のコードを選ぶ設計もあります。",
    "keyPoints": [
      "ここは固定。 401は認証challengeと関係する",
      "次に押さえる。 403は処理を拒否している",
      "最後にこれ。 認証と認可を区別する"
    ],
    "followUps": [
      "じゃあ次だ。 存在を隠したいリソースでは404を使うことがありますか？",
      "もう一段掘るぞ。 401という名前がUnauthorizedなのは紛らわしくないですか？"
    ],
    "references": [
      {
        "title": "MDN - HTTP response status codes",
        "url": "https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Status"
      },
      {
        "title": "RFC 9110 - HTTP Semantics",
        "url": "https://www.rfc-editor.org/rfc/rfc9110"
      }
    ],
    "senkuMemo": "通信の一本道を整理するぞ。 要するに「401は認証challengeと関係する」が芯だ。ついでに「403は処理を拒否している」まで繋げて説明できりゃ、面接の深掘りにも100億％対応しやすい。"
  },
  {
    "id": "network-http-header",
    "category": "network",
    "question": "HTTP Headerって何を運んでる？ 代表例もセットで答えてみろ。",
    "answer": "HTTPリクエストやレスポンスに付随するフィールドで、本文以外のメタデータや制御情報を伝えます。例えばContent-Typeは表現のメディアタイプ、Authorizationは認証情報、Cache-Controlはキャッシュ方針などを伝えます。",
    "keyPoints": [
      "ここは固定。 Request HeaderとResponse Headerがある",
      "次に押さえる。 表現・認証・キャッシュなど幅広い情報を扱う",
      "最後にこれ。 Header名だけでなくsemanticを理解する"
    ],
    "followUps": [
      "じゃあ次だ。 Content-TypeとAcceptの違いは？",
      "もう一段掘るぞ。 Authorization Headerには何を入れますか？"
    ],
    "references": [
      {
        "title": "MDN - HTTP headers",
        "url": "https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers"
      }
    ],
    "senkuMemo": "通信の一本道を整理するぞ。 要するに「Request HeaderとResponse Headerがある」が芯だ。ついでに「表現・認証・キャッシュなど幅広い情報を扱う」まで繋げて説明できりゃ、面接の深掘りにも100億％対応しやすい。"
  },
  {
    "id": "network-dns",
    "category": "network",
    "question": "DNSって何だ？ ドメイン名から接続先までの橋渡しを説明してみろ。",
    "answer": "DNSはDomain Name Systemの略で、ドメイン名に対応するIPアドレスなどの情報を分散して管理・問い合わせする仕組みです。Webアクセスでは、ブラウザがホスト名を使って接続先を決める際の名前解決に利用されます。",
    "keyPoints": [
      "ここは固定。 ドメイン名とIPアドレス等を対応付ける",
      "次に押さえる。 DNSは分散型の名前解決システム",
      "最後にこれ。 A/AAAA以外にも複数のレコード種別がある"
    ],
    "followUps": [
      "じゃあ次だ。 AとAAAAの違いは？",
      "もう一段掘るぞ。 CNAMEとは？",
      "ここまで来たらこれも。 TTLは何のためにありますか？"
    ],
    "references": [
      {
        "title": "MDN - DNS",
        "url": "https://developer.mozilla.org/en-US/docs/Glossary/DNS"
      }
    ],
    "senkuMemo": "通信の一本道を整理するぞ。 要するに「ドメイン名とIPアドレス等を対応付ける」が芯だ。ついでに「DNSは分散型の名前解決システム」まで繋げて説明できりゃ、面接の深掘りにも100億％対応しやすい。"
  },
  {
    "id": "network-tcp-udp",
    "category": "network",
    "question": "TCPとUDP、保証するものと捨ててるものの違いは何だ？",
    "answer": "TCPはコネクション指向で、データを順序どおり信頼性高く届けるための仕組みを提供します。UDPはデータグラム単位で通信し、TCPのような配送・順序保証をプロトコル自体では提供しないため、より小さいオーバーヘッドで利用できます。用途に応じて上位プロトコルが必要な性質を補います。",
    "keyPoints": [
      "ここは固定。 TCPは信頼性・順序制御を提供",
      "次に押さえる。 UDPは配送保証を提供しない",
      "最後にこれ。 HTTP/3はUDP上のQUICを利用する"
    ],
    "followUps": [
      "じゃあ次だ。 HTTP/3はなぜTCPではないのですか？",
      "もう一段掘るぞ。 WebSocketは通常どちらを使いますか？"
    ],
    "references": [
      {
        "title": "MDN - TCP",
        "url": "https://developer.mozilla.org/en-US/docs/Glossary/TCP"
      }
    ],
    "senkuMemo": "通信の一本道を整理するぞ。 要するに「TCPは信頼性・順序制御を提供」が芯だ。ついでに「UDPは配送保証を提供しない」まで繋げて説明できりゃ、面接の深掘りにも100億％対応しやすい。"
  },
  {
    "id": "network-http-https",
    "category": "network",
    "question": "HTTPとHTTPS、Sが付いただけじゃねえ。何が増える？",
    "answer": "HTTPSはHTTPをTLSで保護して通信する仕組みです。TLSによって通信内容の機密性と完全性を保護し、証明書などを使って接続先の認証も行います。そのため盗聴や改ざん、中間者攻撃のリスクを下げられます。",
    "keyPoints": [
      "ここは固定。 HTTPSはHTTP over TLS",
      "次に押さえる。 暗号化だけでなく完全性・認証も重要",
      "最後にこれ。 証明書の検証が接続先認証に使われる"
    ],
    "followUps": [
      "じゃあ次だ。 TLS証明書には何が書かれていますか？",
      "もう一段掘るぞ。 HTTPSでも防げない攻撃は？"
    ],
    "references": [
      {
        "title": "MDN - HTTPS",
        "url": "https://developer.mozilla.org/en-US/docs/Glossary/HTTPS"
      }
    ],
    "senkuMemo": "通信の一本道を整理するぞ。 要するに「HTTPSはHTTP over TLS」が芯だ。ついでに「暗号化だけでなく完全性・認証も重要」まで繋げて説明できりゃ、面接の深掘りにも100億％対応しやすい。"
  },
  {
    "id": "network-http-cache",
    "category": "network",
    "question": "HTTPキャッシュって何だ？ 速くなる仕組みを説明してみろ。",
    "answer": "以前取得したHTTPレスポンスをブラウザや共有キャッシュが保存し、条件が合えば再利用する仕組みです。再利用によって通信量や待ち時間を減らせます。Cache-Controlで保存や再利用方針を指定し、ETagやLast-Modifiedを使って再検証することもできます。",
    "keyPoints": [
      "ここは固定。 freshなレスポンスは再利用できる",
      "次に押さえる。 Cache-Controlが主要な制御手段",
      "最後にこれ。 ETag等でvalidationできる"
    ],
    "followUps": [
      "じゃあ次だ。 no-cacheとno-storeの違いは？",
      "もう一段掘るぞ。 ETagとは何ですか？"
    ],
    "references": [
      {
        "title": "MDN - HTTP caching",
        "url": "https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/Caching"
      }
    ],
    "senkuMemo": "通信の一本道を整理するぞ。 要するに「freshなレスポンスは再利用できる」が芯だ。ついでに「Cache-Controlが主要な制御手段」まで繋げて説明できりゃ、面接の深掘りにも100億％対応しやすい。"
  },
  {
    "id": "security-xss",
    "category": "security",
    "question": "XSSってどんな攻撃だ？ フロントエンドなら100億％押さえとけ。",
    "answer": "XSSは、信頼できないデータが適切に扱われず、攻撃者の用意したスクリプト等がWebページの文脈で実行されてしまう脆弱性です。基本対策は、出力するコンテキストに応じたエスケープや安全なAPIの利用、必要な場合のサニタイズです。Reactの通常のテキスト埋め込みはエスケープされますが、HTMLを直接挿入する機能などでは別途注意が必要です。",
    "keyPoints": [
      "ここは固定。 信頼できない入力を実行可能な文脈へ入れない",
      "次に押さえる。 コンテキストに応じた出力エンコーディングが重要",
      "最後にこれ。 CSPは追加防御であり根本対策の代替ではない"
    ],
    "followUps": [
      "じゃあ次だ。 Stored XSSとReflected XSSの違いは？",
      "もう一段掘るぞ。 dangerouslySetInnerHTMLを使う場合は？"
    ],
    "references": [
      {
        "title": "OWASP - Cross Site Scripting Prevention Cheat Sheet",
        "url": "https://cheatsheetseries.owasp.org/cheatsheets/Cross_Site_Scripting_Prevention_Cheat_Sheet.html"
      }
    ],
    "senkuMemo": "守りの基本だ。 要するに「信頼できない入力を実行可能な文脈へ入れない」が芯だ。ついでに「コンテキストに応じた出力エンコーディングが重要」まで繋げて説明できりゃ、面接の深掘りにも100億％対応しやすい。"
  },
  {
    "id": "security-csrf",
    "category": "security",
    "question": "CSRFって何だ？ 『本人のブラウザを使わせる』って視点で説明してみろ。",
    "answer": "CSRFは、ユーザーが対象サイトに認証された状態を悪用し、攻撃者が用意したページなどから本人の意図しない状態変更リクエストを送らせる攻撃です。対策としてCSRF Token、SameSite Cookie、Origin等の検証などがあります。特にブラウザがCookieを自動送信する認証方式では考慮が必要です。",
    "keyPoints": [
      "ここは固定。 被害者の認証状態を悪用する",
      "次に押さえる。 状態変更操作が主な標的",
      "最後にこれ。 CSRF TokenやSameSiteが代表的対策"
    ],
    "followUps": [
      "じゃあ次だ。 XSSとの違いは？",
      "もう一段掘るぞ。 Authorization HeaderのBearer Tokenを使う場合はどう変わりますか？"
    ],
    "references": [
      {
        "title": "OWASP - Cross-Site Request Forgery Prevention Cheat Sheet",
        "url": "https://cheatsheetseries.owasp.org/cheatsheets/Cross-Site_Request_Forgery_Prevention_Cheat_Sheet.html"
      },
      {
        "title": "MDN - Using HTTP cookies",
        "url": "https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/Cookies"
      }
    ],
    "senkuMemo": "守りの基本だ。 要するに「被害者の認証状態を悪用する」が芯だ。ついでに「状態変更操作が主な標的」まで繋げて説明できりゃ、面接の深掘りにも100億％対応しやすい。"
  },
  {
    "id": "security-same-origin",
    "category": "security",
    "question": "Same-Origin Policyって何を守る仕組みだ？ Originの定義まで言えるか？",
    "answer": "Same-Origin Policyは、あるOriginから読み込まれたスクリプトが別Originのリソースへ自由にアクセスすることを制限するブラウザのセキュリティモデルです。Originは基本的にscheme、host、portの組み合わせで判断されます。",
    "keyPoints": [
      "ここは固定。 ブラウザの重要なセキュリティ境界",
      "次に押さえる。 scheme/host/portでOriginを判断",
      "最後にこれ。 クロスオリジン通信を全面禁止する仕組みではない"
    ],
    "followUps": [
      "じゃあ次だ。 同一サイトと同一オリジンの違いは？",
      "もう一段掘るぞ。 CORSとはどう関係しますか？"
    ],
    "references": [
      {
        "title": "MDN - Same-origin policy",
        "url": "https://developer.mozilla.org/en-US/docs/Web/Security/Same-origin_policy"
      }
    ],
    "senkuMemo": "守りの基本だ。 要するに「ブラウザの重要なセキュリティ境界」が芯だ。ついでに「scheme/host/portでOriginを判断」まで繋げて説明できりゃ、面接の深掘りにも100億％対応しやすい。"
  },
  {
    "id": "security-cors",
    "category": "security",
    "question": "CORSって何だ？ 『サーバーの許可をブラウザが適用する』ところまで押さえろ。",
    "answer": "CORSはCross-Origin Resource Sharingの略で、Same-Origin Policyによる制約の中で、サーバーがHTTPレスポンスヘッダーを使って、どのOriginからのブラウザ上のアクセスを許可するかを伝える仕組みです。一部のクロスオリジンリクエストでは、実リクエストの前にOPTIONSによるPreflightが行われます。",
    "keyPoints": [
      "ここは固定。 サーバーが許可方針をレスポンスヘッダーで示す",
      "次に押さえる。 ブラウザがその方針を適用する",
      "最後にこれ。 条件によりPreflightが行われる"
    ],
    "followUps": [
      "じゃあ次だ。 Preflightが発生する条件は？",
      "もう一段掘るぞ。 curlでCORSエラーにならないのはなぜ？"
    ],
    "references": [
      {
        "title": "MDN - CORS",
        "url": "https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/CORS"
      },
      {
        "title": "MDN - Same-origin policy",
        "url": "https://developer.mozilla.org/en-US/docs/Web/Security/Same-origin_policy"
      }
    ],
    "senkuMemo": "守りの基本だ。 要するに「サーバーが許可方針をレスポンスヘッダーで示す」が芯だ。ついでに「ブラウザがその方針を適用する」まで繋げて説明できりゃ、面接の深掘りにも100億％対応しやすい。"
  },
  {
    "id": "security-token-localstorage",
    "category": "security",
    "question": "localStorageに認証トークンを置く。どんなリスクがある？",
    "answer": "localStorageの値は同一Origin上で動くJavaScriptから読み取れるため、XSSが成立した場合にトークンを取得されるリスクがあります。認証要件によってはJavaScriptから読み取れないHttpOnly Cookieにセッション情報を保存する方式を検討します。ただしCookie方式ではCSRFなど別の脅威も含めて設計する必要があり、保存場所だけで安全性は決まりません。",
    "keyPoints": [
      "ここは固定。 localStorageはJavaScriptからアクセス可能",
      "次に押さえる。 HttpOnly CookieはJavaScriptから直接読めない",
      "最後にこれ。 認証方式全体の脅威モデルで判断する"
    ],
    "followUps": [
      "じゃあ次だ。 HttpOnly CookieならXSS対策は不要ですか？",
      "もう一段掘るぞ。 Cookie認証でCSRFをどう対策しますか？"
    ],
    "references": [
      {
        "title": "MDN - Web Storage API",
        "url": "https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API"
      },
      {
        "title": "MDN - Using HTTP cookies",
        "url": "https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/Cookies"
      },
      {
        "title": "OWASP - Cross Site Scripting Prevention Cheat Sheet",
        "url": "https://cheatsheetseries.owasp.org/cheatsheets/Cross_Site_Scripting_Prevention_Cheat_Sheet.html"
      },
      {
        "title": "OWASP - Cross-Site Request Forgery Prevention Cheat Sheet",
        "url": "https://cheatsheetseries.owasp.org/cheatsheets/Cross-Site_Request_Forgery_Prevention_Cheat_Sheet.html"
      }
    ],
    "senkuMemo": "守りの基本だ。 要するに「localStorageはJavaScriptからアクセス可能」が芯だ。ついでに「HttpOnly CookieはJavaScriptから直接読めない」まで繋げて説明できりゃ、面接の深掘りにも100億％対応しやすい。"
  },
  {
    "id": "security-httponly",
    "category": "security",
    "question": "HttpOnly Cookieって何が嬉しい？ 何を防げて、何は防げない？",
    "answer": "HttpOnly属性が付いたCookieは、document.cookieなどのJavaScript APIから読み取れません。セッション識別子などの機密性が高いCookieを、XSSによる直接窃取から守るための防御として利用できます。ただし、そのCookieを使ったリクエスト送信自体をXSSから完全に防ぐ仕組みではありません。",
    "keyPoints": [
      "ここは固定。 JavaScriptからCookie値を直接取得できない",
      "次に押さえる。 HTTPリクエストには条件に従って送信される",
      "最後にこれ。 XSSそのものを防ぐ属性ではない"
    ],
    "followUps": [
      "じゃあ次だ。 Secure属性との違いは？",
      "もう一段掘るぞ。 HttpOnlyでもCSRFは起きますか？"
    ],
    "references": [
      {
        "title": "MDN - Using HTTP cookies",
        "url": "https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/Cookies"
      }
    ],
    "senkuMemo": "守りの基本だ。 要するに「JavaScriptからCookie値を直接取得できない」が芯だ。ついでに「HTTPリクエストには条件に従って送信される」まで繋げて説明できりゃ、面接の深掘りにも100億％対応しやすい。"
  },
  {
    "id": "security-cookie-attributes",
    "category": "security",
    "question": "CookieのSecureとSameSite、役割を混ぜずに説明してみろ。",
    "answer": "Secure属性は、Cookieを原則HTTPS経由でのみ送信させるための属性です。SameSite属性はクロスサイトなコンテキストでCookieを送る条件を制御し、Strict、Lax、Noneなどがあります。SameSite=Noneを使うCookieにはSecureが必要です。",
    "keyPoints": [
      "ここは固定。 SecureはHTTPS送信を制御",
      "次に押さえる。 SameSiteはクロスサイト送信を制御",
      "最後にこれ。 SameSite=NoneにはSecureが必要"
    ],
    "followUps": [
      "じゃあ次だ。 StrictとLaxの違いは？",
      "もう一段掘るぞ。 DomainやPath属性はセキュリティ境界ですか？"
    ],
    "references": [
      {
        "title": "MDN - Using HTTP cookies",
        "url": "https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/Cookies"
      }
    ],
    "senkuMemo": "守りの基本だ。 要するに「SecureはHTTPS送信を制御」が芯だ。ついでに「SameSiteはクロスサイト送信を制御」まで繋げて説明できりゃ、面接の深掘りにも100億％対応しやすい。"
  },
  {
    "id": "security-authn-authz",
    "category": "security",
    "question": "認証と認可、似てるようで別物だ。どう違う？",
    "answer": "認証は『その利用者が誰であるか』を確認すること、認可は『認証された主体が特定の操作やリソースへアクセスしてよいか』を判断することです。ログインは主に認証、管理者だけが設定画面を変更できるかの判定は認可に当たります。",
    "keyPoints": [
      "ここは固定。 authenticationとauthorizationを分ける",
      "次に押さえる。 認証後にも認可判定が必要",
      "最後にこれ。 UI非表示だけで認可を実現してはいけない"
    ],
    "followUps": [
      "じゃあ次だ。 401と403はどう使い分けますか？",
      "もう一段掘るぞ。 フロントエンドだけで権限制御してよいですか？"
    ],
    "references": [
      {
        "title": "RFC 9110 - HTTP Semantics",
        "url": "https://www.rfc-editor.org/rfc/rfc9110"
      }
    ],
    "senkuMemo": "守りの基本だ。 要するに「authenticationとauthorizationを分ける」が芯だ。ついでに「認証後にも認可判定が必要」まで繋げて説明できりゃ、面接の深掘りにも100億％対応しやすい。"
  },
  {
    "id": "security-csp",
    "category": "security",
    "question": "CSPって何だ？ XSS対策のどのポジションにいる？",
    "answer": "Content Security Policyは、ページが読み込み・実行できるスクリプトやその他のリソースの供給元などをHTTPヘッダー等で制限する仕組みです。適切に設定するとXSSなどの影響を軽減できますが、入力処理や出力エスケープといった根本的な対策の代替ではありません。",
    "keyPoints": [
      "ここは固定。 許可するリソース源を制限できる",
      "次に押さえる。 XSSへの多層防御として有効",
      "最後にこれ。 Report-Onlyで導入前検証もできる"
    ],
    "followUps": [
      "じゃあ次だ。 nonceとは？",
      "もう一段掘るぞ。 unsafe-inlineを許可すると何が変わりますか？"
    ],
    "references": [
      {
        "title": "MDN - Content Security Policy",
        "url": "https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/CSP"
      },
      {
        "title": "OWASP - Cross Site Scripting Prevention Cheat Sheet",
        "url": "https://cheatsheetseries.owasp.org/cheatsheets/Cross_Site_Scripting_Prevention_Cheat_Sheet.html"
      }
    ],
    "senkuMemo": "守りの基本だ。 要するに「許可するリソース源を制限できる」が芯だ。ついでに「XSSへの多層防御として有効」まで繋げて説明できりゃ、面接の深掘りにも100億％対応しやすい。"
  },
  {
    "id": "security-client-secret",
    "category": "security",
    "question": "フロントエンドにAPI Secretを置いていいか？ 答えと理由を100億％セットで。",
    "answer": "秘密にする必要がある値をブラウザへ配信されるフロントエンドコードへ埋め込んではいけません。ユーザーは配信されたJavaScript、ソースマップ、ネットワーク通信などを確認できます。秘匿が必要な資格情報は信頼できるサーバー側で保持し、フロントエンドから必要なAPIを経由して利用します。",
    "keyPoints": [
      "ここは固定。 ブラウザへ渡した秘密はユーザーから隠せない",
      "次に押さえる。 環境変数でもクライアントバンドルへ含めれば公開情報になる",
      "最後にこれ。 公開前提のAPI keyとSecretを区別する"
    ],
    "followUps": [
      "じゃあ次だ。 Next.jsのNEXT_PUBLIC_変数は秘密にできますか？",
      "もう一段掘るぞ。 公開API keyが許容されるケースは？"
    ],
    "references": [
      {
        "title": "MDN - Same-origin policy",
        "url": "https://developer.mozilla.org/en-US/docs/Web/Security/Same-origin_policy"
      }
    ],
    "senkuMemo": "守りの基本だ。 要するに「ブラウザへ渡した秘密はユーザーから隠せない」が芯だ。ついでに「環境変数でもクライアントバンドルへ含めれば公開情報になる」まで繋げて説明できりゃ、面接の深掘りにも100億％対応しやすい。"
  },
  {
    "id": "design-component-boundary",
    "category": "design",
    "question": "コンポーネント、どこで分ける？ 行数じゃなく設計理由で答えてみろ。",
    "answer": "単純な行数ではなく、責務や変更理由、データの流れを基準に考えます。異なる理由で変更されるUIやロジックが一つのコンポーネントに集まりすぎた場合や、独立して再利用・テストしたい明確な単位が見えた場合に分割します。一方、将来使うかもしれないという理由だけで細かく抽象化しすぎることは避けます。",
    "keyPoints": [
      "ここは固定。 責務と変更理由を見る",
      "次に押さえる。 データフローを不必要に複雑にしない",
      "最後にこれ。 早すぎる抽象化を避ける"
    ],
    "followUps": [
      "じゃあ次だ。 分割しすぎると何が問題ですか？",
      "もう一段掘るぞ。 UIコンポーネントとロジックをどう分けますか？"
    ],
    "references": [
      {
        "title": "React - Choosing the State Structure",
        "url": "https://react.dev/learn/choosing-the-state-structure"
      }
    ],
    "senkuMemo": "設計は判断理由が命だ。 要するに「責務と変更理由を見る」が芯だ。ついでに「データフローを不必要に複雑にしない」まで繋げて説明できりゃ、面接の深掘りにも100億％対応しやすい。"
  },
  {
    "id": "design-state-location",
    "category": "design",
    "question": "stateはどこに置く？ 何でもGlobalに放り込むのは科学じゃねえぞ。",
    "answer": "まず、そのstateを必要とするコンポーネントにできるだけ近い場所へ置きます。複数の兄弟コンポーネントで共有するなら共通の親へ持ち上げ、ツリーの広い範囲で同じ値が必要ならContextなどを検討します。必要以上にグローバル化しないことで依存関係と更新範囲を把握しやすくします。",
    "keyPoints": [
      "ここは固定。 stateは必要な場所の近くに置く",
      "次に押さえる。 共有が必要なら共通親へ持ち上げる",
      "最後にこれ。 Global Stateは必要性がある場合に限定する"
    ],
    "followUps": [
      "じゃあ次だ。 Contextを使う基準は？",
      "もう一段掘るぞ。 URLに持つべきstateはありますか？"
    ],
    "references": [
      {
        "title": "React - Sharing State Between Components",
        "url": "https://react.dev/learn/sharing-state-between-components"
      },
      {
        "title": "React - Choosing the State Structure",
        "url": "https://react.dev/learn/choosing-the-state-structure"
      }
    ],
    "senkuMemo": "設計は判断理由が命だ。 要するに「stateは必要な場所の近くに置く」が芯だ。ついでに「共有が必要なら共通親へ持ち上げる」まで繋げて説明できりゃ、面接の深掘りにも100億％対応しやすい。"
  },
  {
    "id": "design-server-client-state",
    "category": "design",
    "question": "Server StateとClient State、性質の違いを説明してみろ。",
    "answer": "Client Stateはモーダルの開閉や入力途中の値など、主に現在のUIやクライアント操作が所有する状態です。Server StateはAPIなど外部システムが正本を持つデータで、取得中・エラー・キャッシュ・再取得・stale判定・同時更新などの問題があります。そのため両者を同じ仕組みで一括管理するより性質に応じて扱いを分けます。",
    "keyPoints": [
      "ここは固定。 Server Stateの正本は通常サーバー側",
      "次に押さえる。 Server Stateにはキャッシュや再検証がある",
      "最後にこれ。 UI StateとRemote Dataを区別する"
    ],
    "followUps": [
      "じゃあ次だ。 TanStack Queryを使う理由は？",
      "もう一段掘るぞ。 Server Componentを使う場合はどう考えますか？"
    ],
    "references": [
      {
        "title": "React - Choosing the State Structure",
        "url": "https://react.dev/learn/choosing-the-state-structure"
      }
    ],
    "senkuMemo": "設計は判断理由が命だ。 要するに「Server Stateの正本は通常サーバー側」が芯だ。ついでに「Server Stateにはキャッシュや再検証がある」まで繋げて説明できりゃ、面接の深掘りにも100億％対応しやすい。"
  },
  {
    "id": "design-api-layer",
    "category": "design",
    "question": "API通信処理、どこに置く？ UIにベタ書きしない理由まで答えてみろ。",
    "answer": "UIコンポーネントの各所に通信詳細を散らすより、fetcherやAPI client、データ取得用Hookなど、プロジェクト規模に合った境界へまとめます。目的はURL、HTTP処理、エラー変換などの変更影響を局所化することです。ただし単純な一回だけの通信まで無理に多層化せず、複雑さとのバランスを取ります。",
    "keyPoints": [
      "ここは固定。 UIと通信詳細の責務を分離する",
      "次に押さえる。 エラー処理や型変換を集約できる",
      "最後にこれ。 抽象化自体を目的にしない"
    ],
    "followUps": [
      "じゃあ次だ。 Custom HookとAPI clientの責務はどう分けますか？",
      "もう一段掘るぞ。 Server Componentから取得する場合は？"
    ],
    "references": [
      {
        "title": "React - Reusing Logic with Custom Hooks",
        "url": "https://react.dev/learn/reusing-logic-with-custom-hooks"
      },
      {
        "title": "Next.js - Server and Client Components",
        "url": "https://nextjs.org/docs/app/getting-started/server-and-client-components"
      }
    ],
    "senkuMemo": "設計は判断理由が命だ。 要するに「UIと通信詳細の責務を分離する」が芯だ。ついでに「エラー処理や型変換を集約できる」まで繋げて説明できりゃ、面接の深掘りにも100億％対応しやすい。"
  },
  {
    "id": "design-ui-states",
    "category": "design",
    "question": "loading・error・empty、正常系以外をどう設計する？",
    "answer": "データ取得後の成功状態だけでなく、取得前・取得中・失敗・データ0件といった状態を仕様として明示します。loadingではユーザーが待っている理由を示し、errorでは必要なら再試行手段を提供し、emptyでは『正常に0件』なのか『条件が未指定』なのかを区別します。非同期UIではこれらを後付けではなく最初から状態遷移として考えます。",
    "keyPoints": [
      "ここは固定。 成功以外もUI仕様の一部",
      "次に押さえる。 emptyとerrorを区別する",
      "最後にこれ。 再試行可能性を考える"
    ],
    "followUps": [
      "じゃあ次だ。 SkeletonとSpinnerはどう使い分けますか？",
      "もう一段掘るぞ。 楽観的更新ではどんな状態が増えますか？"
    ],
    "references": [
      {
        "title": "React - Choosing the State Structure",
        "url": "https://react.dev/learn/choosing-the-state-structure"
      }
    ],
    "senkuMemo": "設計は判断理由が命だ。 要するに「成功以外もUI仕様の一部」が芯だ。ついでに「emptyとerrorを区別する」まで繋げて説明できりゃ、面接の深掘りにも100億％対応しやすい。"
  },
  {
    "id": "design-reusable-component",
    "category": "design",
    "question": "再利用可能コンポーネント、どう作る？ 万能部品化の罠も込みで。",
    "answer": "実際に複数箇所で共通している責務や振る舞いを見つけて抽出します。特定画面の都合を大量のboolean propsで吸収する万能コンポーネントを作るより、共通部分と用途固有部分の境界を明確にします。必要に応じてcompositionを使い、利用側が内容を組み立てられる設計も検討します。",
    "keyPoints": [
      "ここは固定。 実際の共通性から抽象化する",
      "次に押さえる。 巨大な条件分岐コンポーネントを避ける",
      "最後にこれ。 compositionも選択肢"
    ],
    "followUps": [
      "じゃあ次だ。 Propsが増えすぎたらどうしますか？",
      "もう一段掘るぞ。 Compound Componentsを使うケースは？"
    ],
    "references": [
      {
        "title": "React - Passing Props to a Component",
        "url": "https://react.dev/learn/passing-props-to-a-component"
      }
    ],
    "senkuMemo": "設計は判断理由が命だ。 要するに「実際の共通性から抽象化する」が芯だ。ついでに「巨大な条件分岐コンポーネントを避ける」まで繋げて説明できりゃ、面接の深掘りにも100億％対応しやすい。"
  },
  {
    "id": "design-custom-hook",
    "category": "design",
    "question": "Custom Hook、どんな時に切り出す？ Utility関数との違いも見えるか？",
    "answer": "複数コンポーネントで再利用したいReactのstatefulなロジックや、Effectを含む外部システムとの同期処理を抽出したいときにCustom Hookを検討します。Custom Hookはロジックを共有しますが、呼び出し元同士でstateそのものが自動的に共有されるわけではありません。",
    "keyPoints": [
      "ここは固定。 Hookを組み合わせてロジックを再利用する",
      "次に押さえる。 呼び出しごとにstateは独立する",
      "最後にこれ。 純粋な計算だけなら通常の関数でよい"
    ],
    "followUps": [
      "じゃあ次だ。 Utility関数との違いは？",
      "もう一段掘るぞ。 Hook名がuseから始まるのはなぜ？"
    ],
    "references": [
      {
        "title": "React - Reusing Logic with Custom Hooks",
        "url": "https://react.dev/learn/reusing-logic-with-custom-hooks"
      }
    ],
    "senkuMemo": "設計は判断理由が命だ。 要するに「Hookを組み合わせてロジックを再利用する」が芯だ。ついでに「呼び出しごとにstateは独立する」まで繋げて説明できりゃ、面接の深掘りにも100億％対応しやすい。"
  },
  {
    "id": "design-testability",
    "category": "design",
    "question": "テストしやすい設計って何だ？ 『テストを書く』より一段手前の話だ。",
    "answer": "重要なビジネスロジックをUIや外部I/Oと必要以上に密結合させず、純粋な関数や明確な境界として検証できる設計です。一方で実装詳細へ過剰に依存したテストを増やすのではなく、ユーザーから観測できる振る舞いを中心に検証します。Unit、Component、E2Eは対象となるリスクに応じて使い分けます。",
    "keyPoints": [
      "ここは固定。 外部I/Oとの境界を明確にする",
      "次に押さえる。 純粋なロジックはテストしやすい",
      "最後にこれ。 実装詳細より振る舞いを検証する"
    ],
    "followUps": [
      "じゃあ次だ。 Unit TestとE2E Testをどう使い分けますか？",
      "もう一段掘るぞ。 モックしすぎると何が問題ですか？"
    ],
    "references": [
      {
        "title": "React - Reusing Logic with Custom Hooks",
        "url": "https://react.dev/learn/reusing-logic-with-custom-hooks"
      }
    ],
    "senkuMemo": "設計は判断理由が命だ。 要するに「外部I/Oとの境界を明確にする」が芯だ。ついでに「純粋なロジックはテストしやすい」まで繋げて説明できりゃ、面接の深掘りにも100億％対応しやすい。"
  },
  {
    "id": "design-performance",
    "category": "design",
    "question": "フロントエンドの性能改善、いきなりuseMemo貼る前に何をする？",
    "answer": "まずユーザー影響のある問題を計測し、ボトルネックを特定してから改善します。JavaScript実行、不要な再レンダリング、ネットワーク、画像、レイアウトなど原因は複数あるため、推測だけでuseMemoなどを追加するのではなくDevToolsやProfilerなどで確認します。改善後も再計測して効果を確認します。",
    "keyPoints": [
      "ここは固定。 計測→仮説→改善→再計測",
      "次に押さえる。 原因に応じた対策を選ぶ",
      "最後にこれ。 メモ化は万能ではない"
    ],
    "followUps": [
      "じゃあ次だ。 React Profilerでは何を確認しますか？",
      "もう一段掘るぞ。 Core Web Vitalsとは？"
    ],
    "references": [
      {
        "title": "React - useMemo",
        "url": "https://react.dev/reference/react/useMemo"
      },
      {
        "title": "React - Render and Commit",
        "url": "https://react.dev/learn/render-and-commit"
      }
    ],
    "senkuMemo": "設計は判断理由が命だ。 要するに「計測→仮説→改善→再計測」が芯だ。ついでに「原因に応じた対策を選ぶ」まで繋げて説明できりゃ、面接の深掘りにも100億％対応しやすい。"
  },
  {
    "id": "design-tradeoff",
    "category": "design",
    "question": "設計のトレードオフ、どう判断する？ 『全部最高』なんて都合のいい話はねえ。",
    "answer": "要件、変更頻度、保守性、実装コスト、性能、チームの習熟度などの軸を明示して比較します。全てを最大化できる設計はないため、その時点で重要な制約と将来変わりそうな点を整理し、採用理由と捨てた選択肢を説明できるようにします。必要なら小さく始めて、実際の変化に合わせて拡張します。",
    "keyPoints": [
      "ここは固定。 正解ではなく制約に対する判断",
      "次に押さえる。 採用理由と非採用理由を説明する",
      "最後にこれ。 将来予測だけで過剰設計しない"
    ],
    "followUps": [
      "じゃあ次だ。 実務でトレードオフを判断した例は？",
      "もう一段掘るぞ。 技術的負債をいつ許容しますか？"
    ],
    "references": [
      {
        "title": "React - Choosing the State Structure",
        "url": "https://react.dev/learn/choosing-the-state-structure"
      }
    ],
    "senkuMemo": "設計は判断理由が命だ。 要するに「正解ではなく制約に対する判断」が芯だ。ついでに「採用理由と非採用理由を説明する」まで繋げて説明できりゃ、面接の深掘りにも100億％対応しやすい。"
  },
  {
    "id": "frontend-react-rerender",
    "category": "frontend",
    "question": "Reactの再レンダリング、いつ起きる？ DOM更新との違いまで押さえろ。",
    "answer": "初回表示時にレンダリングされ、その後はstate更新などによってレンダリングが要求されます。また親がレンダリングされると、通常その子コンポーネントのレンダリング処理も再び評価されます。レンダリングはコンポーネント関数を呼んで次のUIを計算する処理であり、再レンダリングされたからといって実DOMが必ず全て変更されるわけではありません。",
    "keyPoints": [
      "ここは固定。 renderとDOM commitを区別する",
      "次に押さえる。 state updateは代表的なrender trigger",
      "最後にこれ。 親のrenderは通常子のrenderにも伝播する"
    ],
    "followUps": [
      "じゃあ次だ。 再レンダリングとDOM更新の違いは？",
      "もう一段掘るぞ。 memoを使うとどうなりますか？"
    ],
    "references": [
      {
        "title": "React - Render and Commit",
        "url": "https://react.dev/learn/render-and-commit"
      },
      {
        "title": "React - memo",
        "url": "https://react.dev/reference/react/memo"
      }
    ],
    "senkuMemo": "フロントエンド本丸だ。 要するに「renderとDOM commitを区別する」が芯だ。ついでに「state updateは代表的なrender trigger」まで繋げて説明できりゃ、面接の深掘りにも100億％対応しやすい。"
  },
  {
    "id": "frontend-props-state",
    "category": "frontend",
    "question": "propsとstate、Reactではどう役割が違う？",
    "answer": "propsは親コンポーネントなど外部から渡される、そのレンダーに対する読み取り専用の入力です。stateはコンポーネントがレンダー間で保持する情報で、setterを通じて更新すると新しいレンダリングが要求されます。UIはpropsとstateなどの入力から計算するのが基本です。",
    "keyPoints": [
      "ここは固定。 propsは読み取り専用の入力",
      "次に押さえる。 stateはレンダー間で保持される",
      "最後にこれ。 どちらも現在のrenderから見ればsnapshotとして扱う"
    ],
    "followUps": [
      "じゃあ次だ。 propsを直接変更してはいけないのはなぜ？",
      "もう一段掘るぞ。 stateを親へ持ち上げるのはどんな時？"
    ],
    "references": [
      {
        "title": "React - Passing Props to a Component",
        "url": "https://react.dev/learn/passing-props-to-a-component"
      },
      {
        "title": "React - useState",
        "url": "https://react.dev/reference/react/useState"
      }
    ],
    "senkuMemo": "フロントエンド本丸だ。 要するに「propsは読み取り専用の入力」が芯だ。ついでに「stateはレンダー間で保持される」まで繋げて説明できりゃ、面接の深掘りにも100億％対応しやすい。"
  },
  {
    "id": "frontend-state-mutation",
    "category": "frontend",
    "question": "Reactのstateを直接mutationしちゃダメなのはなぜだ？",
    "answer": "Reactではstateはそのレンダー時点のスナップショットとして扱い、setterを使って次のstateを渡すことで再レンダリングを要求します。オブジェクトや配列を直接mutationして同じ参照のままにすると、Reactが期待する更新モデルから外れ、UI更新や過去stateの扱いで問題になります。そのため新しいオブジェクトや配列を作って更新します。",
    "keyPoints": [
      "ここは固定。 setterで更新を要求する",
      "次に押さえる。 object/arrayは新しい値として作る",
      "最後にこれ。 過去renderのstateをmutationしない"
    ],
    "followUps": [
      "じゃあ次だ。 配列へpushしたい場合はどう書きますか？",
      "もう一段掘るぞ。 Immerを使う場合は？"
    ],
    "references": [
      {
        "title": "React - useState",
        "url": "https://react.dev/reference/react/useState"
      }
    ],
    "senkuMemo": "フロントエンド本丸だ。 要するに「setterで更新を要求する」が芯だ。ついでに「object/arrayは新しい値として作る」まで繋げて説明できりゃ、面接の深掘りにも100億％対応しやすい。"
  },
  {
    "id": "frontend-react-key",
    "category": "frontend",
    "question": "Reactのkey、何のためにある？ indexを雑に入れる前に答えてみろ。",
    "answer": "リスト内の要素を兄弟の中で識別し、追加・削除・並び替えが起きたときにReactがどの要素がどれに対応するか判断するために使います。keyは兄弟間で一意かつデータに基づいて安定している値が望ましく、並び順が変わり得るリストでindexをkeyにするとstateが意図しない項目へ対応するなどの問題が起こり得ます。",
    "keyPoints": [
      "ここは固定。 兄弟要素のIdentityを表す",
      "次に押さえる。 安定したデータ由来IDを使う",
      "最後にこれ。 keyは子コンポーネントのpropsとして自動では渡らない"
    ],
    "followUps": [
      "じゃあ次だ。 indexをkeyにしても問題ないケースは？",
      "もう一段掘るぞ。 keyを変えるとstateはどうなりますか？"
    ],
    "references": [
      {
        "title": "React - Rendering Lists",
        "url": "https://react.dev/learn/rendering-lists"
      }
    ],
    "senkuMemo": "フロントエンド本丸だ。 要するに「兄弟要素のIdentityを表す」が芯だ。ついでに「安定したデータ由来IDを使う」まで繋げて説明できりゃ、面接の深掘りにも100億％対応しやすい。"
  },
  {
    "id": "frontend-useeffect",
    "category": "frontend",
    "question": "useEffect、何のためのHookだ？ 『副作用用』で止まるなよ。",
    "answer": "useEffectはReactコンポーネントをReactの外部システムと同期するためのHookです。例えばタイマー、ブラウザイベント、外部ライブラリ、ネットワーク接続などがあります。単にpropsやstateから別の値を計算するだけならEffectを使わずレンダー中に導出できることが多いです。",
    "keyPoints": [
      "ここは固定。 外部システムとの同期が中心",
      "次に押さえる。 render自体はpureに保つ",
      "最後にこれ。 外部システムがなければEffect不要な可能性が高い"
    ],
    "followUps": [
      "じゃあ次だ。 Effectが不要な具体例は？",
      "もう一段掘るぞ。 イベントハンドラとEffectはどう使い分けますか？"
    ],
    "references": [
      {
        "title": "React - Synchronizing with Effects",
        "url": "https://react.dev/learn/synchronizing-with-effects"
      },
      {
        "title": "React - You Might Not Need an Effect",
        "url": "https://react.dev/learn/you-might-not-need-an-effect"
      },
      {
        "title": "React - useEffect",
        "url": "https://react.dev/reference/react/useEffect"
      }
    ],
    "senkuMemo": "フロントエンド本丸だ。 要するに「外部システムとの同期が中心」が芯だ。ついでに「render自体はpureに保つ」まで繋げて説明できりゃ、面接の深掘りにも100億％対応しやすい。"
  },
  {
    "id": "frontend-effect-dependencies",
    "category": "frontend",
    "question": "useEffectのdependency array、何を入れる欄だ？ 好きに調整するツマミじゃねえぞ。",
    "answer": "Effect内で参照するprops、state、コンポーネント内で宣言した変数や関数などのReactive Valueを依存関係として指定します。Reactは各依存値を前回とObject.isで比較し、変化していればsetupを再実行します。依存関係は『実行回数を調整するため好きに選ぶ値』ではなく、Effectのコードから決まります。",
    "keyPoints": [
      "ここは固定。 Reactive Valueを列挙する",
      "次に押さえる。 ReactはObject.isで比較する",
      "最後にこれ。 依存値を意図的に隠すよりEffect設計を見直す"
    ],
    "followUps": [
      "じゃあ次だ。 空配列なら何を意味しますか？",
      "もう一段掘るぞ。 関数をdependencyにすると毎回実行されることがあるのはなぜ？"
    ],
    "references": [
      {
        "title": "React - useEffect",
        "url": "https://react.dev/reference/react/useEffect"
      }
    ],
    "senkuMemo": "フロントエンド本丸だ。 要するに「Reactive Valueを列挙する」が芯だ。ついでに「ReactはObject.isで比較する」まで繋げて説明できりゃ、面接の深掘りにも100億％対応しやすい。"
  },
  {
    "id": "frontend-effect-cleanup",
    "category": "frontend",
    "question": "useEffectのcleanup、何を片付ける？ いつ走るかまで言えるか？",
    "answer": "Effectのsetupで開始した接続、購読、イベントリスナー、タイマーなどを停止・解除するために返す関数です。依存値が変わってEffectを再同期する前には古い値でのcleanupが実行され、コンポーネントがDOMから外れるときにもcleanupされます。setupとcleanupを対になる処理として考えます。",
    "keyPoints": [
      "ここは固定。 setupで開始したものをcleanupで戻す",
      "次に押さえる。 再実行前にもcleanupされる",
      "最後にこれ。 unmount時にもcleanupされる"
    ],
    "followUps": [
      "じゃあ次だ。 Strict Modeで開発時にsetup/cleanupが追加実行されるのはなぜ？",
      "もう一段掘るぞ。 fetchの競合をどう防ぎますか？"
    ],
    "references": [
      {
        "title": "React - useEffect",
        "url": "https://react.dev/reference/react/useEffect"
      },
      {
        "title": "React - Synchronizing with Effects",
        "url": "https://react.dev/learn/synchronizing-with-effects"
      }
    ],
    "senkuMemo": "フロントエンド本丸だ。 要するに「setupで開始したものをcleanupで戻す」が芯だ。ついでに「再実行前にもcleanupされる」まで繋げて説明できりゃ、面接の深掘りにも100億％対応しやすい。"
  },
  {
    "id": "frontend-usememo",
    "category": "frontend",
    "question": "useMemoって何をキャッシュする？ 使えば速くなる魔法じゃねえぞ。",
    "answer": "useMemoは、依存値が変わらない間、計算結果を再レンダリング間でキャッシュするためのHookです。主に性能最適化のために使い、コードの正しさをuseMemoに依存させないのが基本です。計算が十分軽い場合や参照安定性が不要な場合は、付けない方が単純です。",
    "keyPoints": [
      "ここは固定。 計算結果をキャッシュする",
      "次に押さえる。 performance optimizationとして使う",
      "最後にこれ。 全ての値をmemoizeしない"
    ],
    "followUps": [
      "じゃあ次だ。 どんな処理ならuseMemoを検討しますか？",
      "もう一段掘るぞ。 React Compilerを使う場合は？"
    ],
    "references": [
      {
        "title": "React - useMemo",
        "url": "https://react.dev/reference/react/useMemo"
      }
    ],
    "senkuMemo": "フロントエンド本丸だ。 要するに「計算結果をキャッシュする」が芯だ。ついでに「performance optimizationとして使う」まで繋げて説明できりゃ、面接の深掘りにも100億％対応しやすい。"
  },
  {
    "id": "frontend-usecallback",
    "category": "frontend",
    "question": "useCallbackって何をキャッシュする？ useMemoとの違いも見えてるか？",
    "answer": "useCallbackは、依存値が変わらない間、関数定義を再レンダリング間でキャッシュするHookです。memo化された子へコールバックを渡す場合や、別Hookの依存関係として参照の安定性が必要な場合などの最適化に使えます。すべてのイベントハンドラへ付ける必要はありません。",
    "keyPoints": [
      "ここは固定。 関数をキャッシュする",
      "次に押さえる。 主目的は最適化",
      "最後にこれ。 参照同一性が意味を持つ場面で使う"
    ],
    "followUps": [
      "じゃあ次だ。 useMemoとの違いは？",
      "もう一段掘るぞ。 useCallbackだけ付けても子のrenderを防げないのはなぜ？"
    ],
    "references": [
      {
        "title": "React - useCallback",
        "url": "https://react.dev/reference/react/useCallback"
      }
    ],
    "senkuMemo": "フロントエンド本丸だ。 要するに「関数をキャッシュする」が芯だ。ついでに「主目的は最適化」まで繋げて説明できりゃ、面接の深掘りにも100億％対応しやすい。"
  },
  {
    "id": "frontend-react-memo",
    "category": "frontend",
    "question": "React.memo、何をスキップする最適化だ？",
    "answer": "memoはコンポーネントをmemo化し、親が再レンダリングしてもpropsが前回と同等なら、そのコンポーネントの再レンダリングをスキップできるようにする最適化です。これは性能上の最適化であり、正しさのために必要な仕組みとして使うべきではありません。",
    "keyPoints": [
      "ここは固定。 propsが変わらない場合のrender skipを狙う",
      "次に押さえる。 performance optimization",
      "最後にこれ。 object/function propsの参照変化に注意する"
    ],
    "followUps": [
      "じゃあ次だ。 useCallbackと一緒に使われることがあるのはなぜ？",
      "もう一段掘るぞ。 Contextが変わった場合は？"
    ],
    "references": [
      {
        "title": "React - memo",
        "url": "https://react.dev/reference/react/memo"
      }
    ],
    "senkuMemo": "フロントエンド本丸だ。 要するに「propsが変わらない場合のrender skipを狙う」が芯だ。ついでに「performance optimization」まで繋げて説明できりゃ、面接の深掘りにも100億％対応しやすい。"
  },
  {
    "id": "frontend-controlled-input",
    "category": "frontend",
    "question": "Controlled Componentって何だ？ inputを例に説明してみろ。",
    "answer": "フォーム入力でいえば、inputのvalueをReactのstateから渡し、onChangeなどでstateを更新して値を管理する方式です。React側のstateが表示値のsource of truthになります。一方、defaultValueとDOM自身の状態を使う入力はuncontrolledな使い方です。",
    "keyPoints": [
      "ここは固定。 value + onChangeでReact stateから制御",
      "次に押さえる。 React stateがsource of truth",
      "最後にこれ。 uncontrolledではDOM側に現在値を持たせる"
    ],
    "followUps": [
      "じゃあ次だ。 ControlledとUncontrolledをどう使い分けますか？",
      "もう一段掘るぞ。 checkboxの場合は何を使いますか？"
    ],
    "references": [
      {
        "title": "React - input",
        "url": "https://react.dev/reference/react-dom/components/input"
      }
    ],
    "senkuMemo": "フロントエンド本丸だ。 要するに「value + onChangeでReact stateから制御」が芯だ。ついでに「React stateがsource of truth」まで繋げて説明できりゃ、面接の深掘りにも100億％対応しやすい。"
  },
  {
    "id": "frontend-custom-hook",
    "category": "frontend",
    "question": "Custom Hookって何だ？ ロジック共有とstate共有を混ぜるなよ。",
    "answer": "useから始まる関数としてReactのHookを組み合わせ、コンポーネント間でstatefulなロジックを再利用する方法です。Custom Hookを複数コンポーネントから呼んでも、そのHook内部のstateそのものが自動的に共有されるわけではなく、それぞれ独立したstateを持ちます。",
    "keyPoints": [
      "ここは固定。 ロジックを共有する仕組み",
      "次に押さえる。 state自体の共有とは別",
      "最後にこれ。 HookのRulesに従う"
    ],
    "followUps": [
      "じゃあ次だ。 共有stateが必要ならどうしますか？",
      "もう一段掘るぞ。 通常のutility functionとの違いは？"
    ],
    "references": [
      {
        "title": "React - Reusing Logic with Custom Hooks",
        "url": "https://react.dev/learn/reusing-logic-with-custom-hooks"
      }
    ],
    "senkuMemo": "フロントエンド本丸だ。 要するに「ロジックを共有する仕組み」が芯だ。ついでに「state自体の共有とは別」まで繋げて説明できりゃ、面接の深掘りにも100億％対応しやすい。"
  },
  {
    "id": "frontend-context",
    "category": "frontend",
    "question": "React Context、いつ使う？ 何でも詰め込む巨大倉庫にするな。",
    "answer": "Theme、認証ユーザー、ルーティング等のようにツリーの離れた複数箇所で必要になる値を、各階層へpropsとして手渡しし続けずに提供したい場合に使います。ただしContextの値が変わるとそれを読むコンポーネントは再レンダリングされるため、何でも一つの巨大Contextへ入れるのではなく責務を考えます。",
    "keyPoints": [
      "ここは固定。 深い階層へ値を提供できる",
      "次に押さえる。 props drillingを減らせる",
      "最後にこれ。 Context更新の影響範囲を考える"
    ],
    "followUps": [
      "じゃあ次だ。 Contextと状態管理ライブラリの違いは？",
      "もう一段掘るぞ。 Contextを分割する基準は？"
    ],
    "references": [
      {
        "title": "React - Passing Data Deeply with Context",
        "url": "https://react.dev/learn/passing-data-deeply-with-context"
      }
    ],
    "senkuMemo": "フロントエンド本丸だ。 要するに「深い階層へ値を提供できる」が芯だ。ついでに「props drillingを減らせる」まで繋げて説明できりゃ、面接の深掘りにも100億％対応しやすい。"
  },
  {
    "id": "frontend-virtual-dom",
    "category": "frontend",
    "question": "Virtual DOMって何だ？ 『だから絶対速い』で終わったらアウトだ。",
    "answer": "一般にReactでは、コンポーネントのレンダリング結果をJavaScript上の要素ツリーとして扱い、前後のUI構造を照合して必要な変更を実DOMへ反映します。重要なのは、宣言的に『このstateならこのUI』を記述できることであり、『Virtual DOMを使うから常に直接DOM操作より高速』という意味ではありません。",
    "keyPoints": [
      "ここは固定。 render結果と実DOMを区別する",
      "次に押さえる。 差分に基づいてcommitする",
      "最後にこれ。 常に高速という保証ではない"
    ],
    "followUps": [
      "じゃあ次だ。 Reconciliationとは何ですか？",
      "もう一段掘るぞ。 keyは照合にどう影響しますか？"
    ],
    "references": [
      {
        "title": "React - Render and Commit",
        "url": "https://react.dev/learn/render-and-commit"
      },
      {
        "title": "React - Rendering Lists",
        "url": "https://react.dev/learn/rendering-lists"
      }
    ],
    "senkuMemo": "フロントエンド本丸だ。 要するに「render結果と実DOMを区別する」が芯だ。ついでに「差分に基づいてcommitする」まで繋げて説明できりゃ、面接の深掘りにも100億％対応しやすい。"
  },
  {
    "id": "frontend-csr-ssr",
    "category": "frontend",
    "question": "CSRとSSR、どこでUIを作るかの違いを説明してみろ。",
    "answer": "CSRは主にブラウザ側のJavaScriptでUIを構築する方式、SSRはリクエスト時などにサーバー側でHTMLを生成してクライアントへ返す方式です。React/Next.jsではサーバーで生成されたHTMLを表示した後、必要なClient ComponentへJavaScriptの振る舞いを結び付けるHydrationが関係します。実際のアプリでは静的生成やServer Componentsなども組み合わせます。",
    "keyPoints": [
      "ここは固定。 CSRはクライアント中心",
      "次に押さえる。 SSRはサーバーでHTML生成",
      "最後にこれ。 HydrationはサーバーHTMLにクライアントの振る舞いを接続する"
    ],
    "followUps": [
      "じゃあ次だ。 SSRのメリット・デメリットは？",
      "もう一段掘るぞ。 Server ComponentとSSRは同じものですか？"
    ],
    "references": [
      {
        "title": "Next.js - Server and Client Components",
        "url": "https://nextjs.org/docs/app/getting-started/server-and-client-components"
      }
    ],
    "senkuMemo": "フロントエンド本丸だ。 要するに「CSRはクライアント中心」が芯だ。ついでに「SSRはサーバーでHTML生成」まで繋げて説明できりゃ、面接の深掘りにも100億％対応しやすい。"
  },
  {
    "id": "frontend-vue-ref",
    "category": "frontend",
    "question": "Vueのrefって何だ？ `.value`まで含めて説明してみろ。",
    "answer": "refは値をVueのリアクティブシステムで追跡できるようにするAPIです。JavaScriptではRefオブジェクトの`.value`から値を読み書きし、template内では通常自動的にunwrapされます。primitiveだけでなくobjectも保持できます。",
    "keyPoints": [
      "ここは固定。 `.value`で値へアクセスする",
      "次に押さえる。 templateでは多くの場合unwrapされる",
      "最後にこれ。 値の読み書きがreactivity trackingの対象になる"
    ],
    "followUps": [
      "じゃあ次だ。 reactiveとの違いは？",
      "もう一段掘るぞ。 shallowRefは何に使いますか？"
    ],
    "references": [
      {
        "title": "Vue - Reactivity Fundamentals",
        "url": "https://vuejs.org/guide/essentials/reactivity-fundamentals.html"
      }
    ],
    "senkuMemo": "フロントエンド本丸だ。 要するに「`.value`で値へアクセスする」が芯だ。ついでに「templateでは多くの場合unwrapされる」まで繋げて説明できりゃ、面接の深掘りにも100億％対応しやすい。"
  },
  {
    "id": "frontend-vue-computed-watch",
    "category": "frontend",
    "question": "Vueのcomputedとwatch、導出と副作用で切り分けられるか？",
    "answer": "computedは既存のリアクティブなstateから宣言的に導出値を作る用途で、依存関係に基づいてキャッシュされます。watchは特定のリアクティブな値の変化を監視し、API呼び出しなどの副作用を実行したい場合に使います。単に別の値を計算するだけならcomputedが適しています。",
    "keyPoints": [
      "ここは固定。 computedはderived state",
      "次に押さえる。 computedはdependencyに基づきキャッシュ",
      "最後にこれ。 watchは副作用向け"
    ],
    "followUps": [
      "じゃあ次だ。 watchEffectとの違いは？",
      "もう一段掘るぞ。 API通信ならどちらを使いますか？"
    ],
    "references": [
      {
        "title": "Vue - Computed Properties",
        "url": "https://vuejs.org/guide/essentials/computed.html"
      },
      {
        "title": "Vue - Watchers",
        "url": "https://vuejs.org/guide/essentials/watchers.html"
      }
    ],
    "senkuMemo": "フロントエンド本丸だ。 要するに「computedはderived state」が芯だ。ついでに「computedはdependencyに基づきキャッシュ」まで繋げて説明できりゃ、面接の深掘りにも100億％対応しやすい。"
  },
  {
    "id": "frontend-vue-composition-api",
    "category": "frontend",
    "question": "VueのComposition APIって何だ？ 何を組み合わせる仕組みか答えてみろ。",
    "answer": "Composition APIは、refやcomputedなどのReactivity API、onMountedなどのLifecycle Hook、provide/inject等をimportして組み合わせ、コンポーネントを構成するAPI群です。Options APIのようにoption種別ごとにコードを分けるだけでなく、機能・関心ごとに関連するロジックをまとめたりComposableとして再利用したりしやすくなります。",
    "keyPoints": [
      "ここは固定。 Reactivity APIやLifecycle Hooks等から構成される",
      "次に押さえる。 機能単位でロジックを整理しやすい",
      "最後にこれ。 Composableでロジックを再利用できる"
    ],
    "followUps": [
      "じゃあ次だ。 Options APIとの違いは？",
      "もう一段掘るぞ。 Composableとは？"
    ],
    "references": [
      {
        "title": "Vue - Composition API FAQ",
        "url": "https://vuejs.org/guide/extras/composition-api-faq.html"
      }
    ],
    "senkuMemo": "フロントエンド本丸だ。 要するに「Reactivity APIやLifecycle Hooks等から構成される」が芯だ。ついでに「機能単位でロジックを整理しやすい」まで繋げて説明できりゃ、面接の深掘りにも100億％対応しやすい。"
  },
  {
    "id": "frontend-react-vue",
    "category": "frontend",
    "question": "ReactとVue、どう違う？ 優劣じゃなく設計思想で話してみろ。",
    "answer": "どちらもコンポーネントベースでUIを構築できますが、ReactはJavaScript/JSXとHooksを中心にUIを表現し、React自身はUIライブラリとして周辺の選択肢を組み合わせる設計が多いです。VueはSingle-File Component、template、組み込みのリアクティビティ、Composition APIなどを一体的に提供します。優劣というより、既存プロジェクトの設計・チーム・要件に合わせて選びます。",
    "keyPoints": [
      "ここは固定。 共通点はcomponent-based UI",
      "次に押さえる。 ReactはJSX/Hooks中心",
      "最後にこれ。 Vueはtemplateと組み込みreactivityを提供"
    ],
    "followUps": [
      "じゃあ次だ。 VueからReactへ移ると何が変わりますか？",
      "もう一段掘るぞ。 状態追跡の考え方はどう違いますか？"
    ],
    "references": [
      {
        "title": "React - Render and Commit",
        "url": "https://react.dev/learn/render-and-commit"
      },
      {
        "title": "Vue - Composition API FAQ",
        "url": "https://vuejs.org/guide/extras/composition-api-faq.html"
      }
    ],
    "senkuMemo": "フロントエンド本丸だ。 要するに「共通点はcomponent-based UI」が芯だ。ついでに「ReactはJSX/Hooks中心」まで繋げて説明できりゃ、面接の深掘りにも100億％対応しやすい。"
  },
  {
    "id": "frontend-performance-investigation",
    "category": "frontend",
    "question": "フロントエンドが遅い。さて、最初に何を見る？ 勘で最適化するなよ。",
    "answer": "まずChrome DevToolsやReact Profilerなどで症状を計測します。ネットワークが遅いのか、JavaScript実行が長いのか、不要な再レンダリングなのか、画像・フォントが重いのか、レイアウトや描画が多いのかを切り分けます。その上で原因に対応する改善を行い、同じ指標で改善後を再計測します。",
    "keyPoints": [
      "ここは固定。 原因を測定してから最適化する",
      "次に押さえる。 Network/CPU/renderingを切り分ける",
      "最後にこれ。 改善前後を同じ条件で比較する"
    ],
    "followUps": [
      "じゃあ次だ。 Core Web Vitalsとは？",
      "もう一段掘るぞ。 React Profilerで何が分かりますか？"
    ],
    "references": [
      {
        "title": "React - Render and Commit",
        "url": "https://react.dev/learn/render-and-commit"
      },
      {
        "title": "React - useMemo",
        "url": "https://react.dev/reference/react/useMemo"
      }
    ],
    "senkuMemo": "フロントエンド本丸だ。 要するに「原因を測定してから最適化する」が芯だ。ついでに「Network/CPU/renderingを切り分ける」まで繋げて説明できりゃ、面接の深掘りにも100億％対応しやすい。"
  },
  {
    "id": "git-vcs",
    "category": "git",
    "question": "Gitって何だ？ GitHubとの違いまで切り分けられると強いぞ。",
    "answer": "Gitは分散型バージョン管理システムです。ファイルの変更履歴をcommitとして管理し、各開発者のローカルリポジトリにも履歴を保持できます。branchによって開発の系列を分け、mergeやrebaseなどで履歴を統合できます。",
    "keyPoints": [
      "ここは固定。 分散型VCS",
      "次に押さえる。 ローカルにも履歴を持つ",
      "最後にこれ。 commit/branchを中心に履歴を管理する"
    ],
    "followUps": [
      "じゃあ次だ。 集中型VCSとの違いは？",
      "もう一段掘るぞ。 GitHubとGitの違いは？"
    ],
    "references": [
      {
        "title": "Git - About Version Control",
        "url": "https://git-scm.com/book/en/v2/Getting-Started-About-Version-Control"
      }
    ],
    "senkuMemo": "履歴操作は慎重にな。 要するに「分散型VCS」が芯だ。ついでに「ローカルにも履歴を持つ」まで繋げて説明できりゃ、面接の深掘りにも100億％対応しやすい。"
  },
  {
    "id": "git-working-staging-repo",
    "category": "git",
    "question": "Working Tree・Staging Area・Repository、三層を説明してみろ。",
    "answer": "Working Treeは現在チェックアウトして編集しているファイル群、Staging Area（index）は次のcommitへ含める内容を準備する領域、Repositoryはcommitとして保存された履歴です。git addでWorking Treeの選択した内容をindexへ登録し、git commitでindexの内容からcommitを作ります。",
    "keyPoints": [
      "ここは固定。 Working Treeは作業中ファイル",
      "次に押さえる。 Staging Areaは次commitの内容",
      "最後にこれ。 commitはstaged contentから作られる"
    ],
    "followUps": [
      "じゃあ次だ。 git addは単にファイル名を登録するだけですか？",
      "もう一段掘るぞ。 git diffとgit diff --stagedの違いは？"
    ],
    "references": [
      {
        "title": "Git - Recording Changes to the Repository",
        "url": "https://git-scm.com/book/en/v2/Git-Basics-Recording-Changes-to-the-Repository"
      }
    ],
    "senkuMemo": "履歴操作は慎重にな。 要するに「Working Treeは作業中ファイル」が芯だ。ついでに「Staging Areaは次commitの内容」まで繋げて説明できりゃ、面接の深掘りにも100億％対応しやすい。"
  },
  {
    "id": "git-branch-head",
    "category": "git",
    "question": "GitのbranchとHEAD、何を指してる？",
    "answer": "branchは基本的に特定のcommitを指す移動可能な参照です。新しいcommitを作ると現在のbranch参照が新しいcommitへ進みます。HEADは通常、現在チェックアウトしているbranchを指す特別な参照で、detached HEADではbranchではなくcommitを直接指す状態になります。",
    "keyPoints": [
      "ここは固定。 branchはcommitへの可動参照",
      "次に押さえる。 HEADは現在位置を表す",
      "最後にこれ。 detached HEADという状態がある"
    ],
    "followUps": [
      "じゃあ次だ。 branchを作るとcommitはコピーされますか？",
      "もう一段掘るぞ。 detached HEADでcommitするとどうなりますか？"
    ],
    "references": [
      {
        "title": "Git - Branches in a Nutshell",
        "url": "https://git-scm.com/book/en/v2/Git-Branching-Branches-in-a-Nutshell"
      }
    ],
    "senkuMemo": "履歴操作は慎重にな。 要するに「branchはcommitへの可動参照」が芯だ。ついでに「HEADは現在位置を表す」まで繋げて説明できりゃ、面接の深掘りにも100億％対応しやすい。"
  },
  {
    "id": "git-merge-rebase",
    "category": "git",
    "question": "mergeとrebase、履歴がどう変わるか説明できるか？",
    "answer": "mergeは分岐した履歴を統合し、必要に応じて複数の親を持つmerge commitを作ります。rebaseはあるbranchのcommitを別のbaseの上へ再適用し、新しいcommitとして履歴を作り直します。rebaseは履歴を読みやすくできる一方commit IDが変わるため、他の人が基にしている公開済み履歴を安易にrebaseしないようにします。",
    "keyPoints": [
      "ここは固定。 mergeは履歴を統合する",
      "次に押さえる。 rebaseはcommitを別baseへ再適用する",
      "最後にこれ。 rebaseはhistory rewriteになる"
    ],
    "followUps": [
      "じゃあ次だ。 fast-forward mergeとは？",
      "もう一段掘るぞ。 共有branchをrebaseすると何が困りますか？"
    ],
    "references": [
      {
        "title": "Git - Basic Branching and Merging",
        "url": "https://git-scm.com/book/en/v2/Git-Branching-Basic-Branching-and-Merging"
      },
      {
        "title": "Git - Rebasing",
        "url": "https://git-scm.com/book/en/v2/Git-Branching-Rebasing"
      }
    ],
    "senkuMemo": "履歴操作は慎重にな。 要するに「mergeは履歴を統合する」が芯だ。ついでに「rebaseはcommitを別baseへ再適用する」まで繋げて説明できりゃ、面接の深掘りにも100億％対応しやすい。"
  },
  {
    "id": "git-conflict",
    "category": "git",
    "question": "Gitでコンフリクト発生。どう解く？ マーカー消して終わりじゃねえぞ。",
    "answer": "まず競合したファイルと両方の変更意図を確認します。競合マーカーだけを機械的に消すのではなく、期待する最終コードへ編集し、git addで解決済みとして登録してmergeやrebaseを続行します。その後テストや動作確認を行います。相手の変更意図を判断できない場合は担当者へ確認します。",
    "keyPoints": [
      "ここは固定。 両変更の意図を理解して解決する",
      "次に押さえる。 解決後にstageして処理を続行する",
      "最後にこれ。 テストで統合結果を確認する"
    ],
    "followUps": [
      "じゃあ次だ。 mergeを中止するには？",
      "もう一段掘るぞ。 rebase中のconflictでは何が違いますか？"
    ],
    "references": [
      {
        "title": "Git - Basic Branching and Merging",
        "url": "https://git-scm.com/book/en/v2/Git-Branching-Basic-Branching-and-Merging"
      },
      {
        "title": "Git - Rebasing",
        "url": "https://git-scm.com/book/en/v2/Git-Branching-Rebasing"
      }
    ],
    "senkuMemo": "履歴操作は慎重にな。 要するに「両変更の意図を理解して解決する」が芯だ。ついでに「解決後にstageして処理を続行する」まで繋げて説明できりゃ、面接の深掘りにも100億％対応しやすい。"
  },
  {
    "id": "git-reset-revert",
    "category": "git",
    "question": "git resetとgit revert、何が違う？ 共有branchならどっちを選ぶ？",
    "answer": "resetはbranchやHEAD、index、Working Treeを指定したcommitの状態へ動かすための操作で、使い方によって既存履歴を参照しなくすることがあります。revertは指定commitの変更を打ち消す逆向きの変更を新しいcommitとして記録します。そのため既に共有されたbranchの変更を取り消す場合は、履歴を書き換えないrevertが適しているケースが多いです。",
    "keyPoints": [
      "ここは固定。 resetは参照/index/working treeを動かす",
      "次に押さえる。 revertは打ち消しcommitを新規作成",
      "最後にこれ。 共有履歴ではhistory rewriteに注意"
    ],
    "followUps": [
      "じゃあ次だ。 --soft、--mixed、--hardの違いは？",
      "もう一段掘るぞ。 merge commitをrevertするには？"
    ],
    "references": [
      {
        "title": "Git - Reset Demystified",
        "url": "https://git-scm.com/book/en/v2/Git-Tools-Reset-Demystified"
      },
      {
        "title": "Git - git-revert",
        "url": "https://git-scm.com/docs/git-revert"
      }
    ],
    "senkuMemo": "履歴操作は慎重にな。 要するに「resetは参照/index/working treeを動かす」が芯だ。ついでに「revertは打ち消しcommitを新規作成」まで繋げて説明できりゃ、面接の深掘りにも100億％対応しやすい。"
  },
  {
    "id": "git-fetch-pull",
    "category": "git",
    "question": "git fetchとgit pull、取得と統合を分けて説明してみろ。",
    "answer": "git fetchはリモートリポジトリからcommitやrefなどを取得し、remote-tracking branchを更新しますが、現在のbranchへ自動的に統合はしません。git pullは基本的にfetchを行った後、設定に応じてmergeやrebaseなどで取得した履歴を現在のbranchへ統合します。",
    "keyPoints": [
      "ここは固定。 fetchは取得まで",
      "次に押さえる。 pullは取得+統合",
      "最後にこれ。 fetch後なら差分を確認してから統合できる"
    ],
    "followUps": [
      "じゃあ次だ。 pull --rebaseは何をしますか？",
      "もう一段掘るぞ。 origin/mainとは何ですか？"
    ],
    "references": [
      {
        "title": "Git - git-fetch",
        "url": "https://git-scm.com/docs/git-fetch"
      },
      {
        "title": "Git - git-pull",
        "url": "https://git-scm.com/docs/git-pull"
      }
    ],
    "senkuMemo": "履歴操作は慎重にな。 要するに「fetchは取得まで」が芯だ。ついでに「pullは取得+統合」まで繋げて説明できりゃ、面接の深掘りにも100億％対応しやすい。"
  },
  {
    "id": "git-cherry-pick",
    "category": "git",
    "question": "git cherry-pickって何だ？ どんな時に使う？",
    "answer": "指定した既存commitが導入した変更を現在のbranchへ適用し、新しいcommitとして記録する操作です。特定の修正だけ別branchへ持っていきたい場合などに使えます。ただし多用すると同じ変更由来のcommitが複数系列にでき、後のmerge関係が分かりにくくなることがあります。",
    "keyPoints": [
      "ここは固定。 特定commitの変更を現在branchへ適用する",
      "次に押さえる。 新しいcommit IDになる",
      "最後にこれ。 必要な変更だけ移植する用途"
    ],
    "followUps": [
      "じゃあ次だ。 mergeと何が違いますか？",
      "もう一段掘るぞ。 conflictした場合は？"
    ],
    "references": [
      {
        "title": "Git - git-cherry-pick",
        "url": "https://git-scm.com/docs/git-cherry-pick"
      }
    ],
    "senkuMemo": "履歴操作は慎重にな。 要するに「特定commitの変更を現在branchへ適用する」が芯だ。ついでに「新しいcommit IDになる」まで繋げて説明できりゃ、面接の深掘りにも100億％対応しやすい。"
  },
  {
    "id": "git-force-push",
    "category": "git",
    "question": "force push、なぜ危険だ？ `--force-with-lease`まで行けたら上出来だ。",
    "answer": "通常のpushはリモートbranchがfast-forwardできない更新を拒否しますが、force pushはその保護を上書きし、リモートbranchの参照を別の履歴へ動かせます。そのため他の人のcommitをbranchから失わせる可能性があります。履歴書き換えが必要な場合でも、可能ならリモートが想定した状態のときだけ更新する`--force-with-lease`を使い、共有状況を確認します。",
    "keyPoints": [
      "ここは固定。 remote historyを書き換えられる",
      "次に押さえる。 他者のcommitを失わせる危険がある",
      "最後にこれ。 force-with-leaseは追加の安全確認を行う"
    ],
    "followUps": [
      "じゃあ次だ。 rebase後にforce pushが必要になるのはなぜ？",
      "もう一段掘るぞ。 --force-with-leaseでも安全が保証されるわけではないのはなぜ？"
    ],
    "references": [
      {
        "title": "Git - git-push",
        "url": "https://git-scm.com/docs/git-push"
      },
      {
        "title": "Git - Rebasing",
        "url": "https://git-scm.com/book/en/v2/Git-Branching-Rebasing"
      }
    ],
    "senkuMemo": "履歴操作は慎重にな。 要するに「remote historyを書き換えられる」が芯だ。ついでに「他者のcommitを失わせる危険がある」まで繋げて説明できりゃ、面接の深掘りにも100億％対応しやすい。"
  },
  {
    "id": "git-team-flow",
    "category": "git",
    "question": "チーム開発でGitをどう回す？ branch名より大事なところを答えてみろ。",
    "answer": "プロジェクトのルールに従うのが前提ですが、例えばmainなど保護されたbranchから作業branchを作り、意味のある単位でcommitし、Pull Requestで変更理由・確認方法を共有してレビューとCIを通した後にmergeします。重要なのは特定のbranch戦略名より、変更を小さく保ち、レビュー可能にし、共有branchの履歴を安全に扱うことだと考えています。",
    "keyPoints": [
      "ここは固定。 プロジェクトの既存ルールを尊重する",
      "次に押さえる。 PRをレビュー可能な大きさに保つ",
      "最後にこれ。 CIとレビューを統合前の安全網にする"
    ],
    "followUps": [
      "じゃあ次だ。 PRが大きくなったらどうしますか？",
      "もう一段掘るぞ。 commitはどの粒度にしますか？"
    ],
    "references": [
      {
        "title": "Git - Branches in a Nutshell",
        "url": "https://git-scm.com/book/en/v2/Git-Branching-Branches-in-a-Nutshell"
      },
      {
        "title": "Git - Basic Branching and Merging",
        "url": "https://git-scm.com/book/en/v2/Git-Branching-Basic-Branching-and-Merging"
      }
    ],
    "senkuMemo": "履歴操作は慎重にな。 要するに「プロジェクトの既存ルールを尊重する」が芯だ。ついでに「PRをレビュー可能な大きさに保つ」まで繋げて説明できりゃ、面接の深掘りにも100億％対応しやすい。"
  }
];
