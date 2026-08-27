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

/**
 * Initial interview flash card dataset.
 *
 * Content is intentionally stored as static source data.
 * User learning progress must be stored separately.
 */
export const interviewCards: InterviewCard[] = [
  {
    "id": "computer-process-thread",
    "category": "computer-science",
    "question": "プロセスとスレッドの違いを説明してください。",
    "answer": "プロセスは実行中のプログラムをOSが管理する単位で、通常は独立したアドレス空間やリソースを持ちます。スレッドはプロセス内の実行単位で、同じプロセス内のスレッドはメモリなどのリソースを共有します。Webフロントエンドでは、メインスレッドを長時間占有すると描画や入力処理を妨げるため、重い処理を分割したりWeb Workerへ移したりする判断が重要です。",
    "keyPoints": [
      "プロセスは資源管理の単位として扱われる",
      "スレッドはプロセス内の実行単位",
      "同一プロセスのスレッドはメモリ等を共有する"
    ],
    "followUps": [
      "ブラウザのメインスレッドでは何が動いていますか？",
      "Web Workerを使うと何が変わりますか？"
    ],
    "references": [
      {
        "title": "MDN - Web Workers API",
        "url": "https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API"
      }
    ]
  },
  {
    "id": "computer-stack-heap",
    "category": "computer-science",
    "question": "スタックとヒープの違いを説明してください。",
    "answer": "JavaScriptの実行モデルを説明する際、スタックは関数呼び出しなど現在実行している処理を管理する領域、ヒープはオブジェクトなどを確保するためのメモリ領域として捉えられます。不要になったヒープ上の値はガベージコレクションの対象になります。",
    "keyPoints": [
      "Call Stackは実行中の関数呼び出しを表す",
      "オブジェクトなどはヒープに確保される",
      "実装詳細はJavaScriptエンジンに依存する"
    ],
    "followUps": [
      "Call Stackが大きくなりすぎると何が起きますか？",
      "再帰処理との関係は？"
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
    ]
  },
  {
    "id": "computer-event-loop",
    "category": "computer-science",
    "question": "JavaScriptのイベントループとは何ですか？",
    "answer": "JavaScriptでは実行するジョブを順番に処理します。非同期処理などによって後から実行可能になった処理はキューに入り、現在の処理が終わった後にイベントループによって次の処理が実行されます。この仕組みによって、メインのJavaScript実行をブロックせずに非同期処理を扱えます。",
    "keyPoints": [
      "現在のジョブは完了するまで実行される",
      "完了した非同期処理は後続ジョブとして処理される",
      "イベントループとブラウザAPIは同じものではない"
    ],
    "followUps": [
      "PromiseとsetTimeoutでは一般にどちらが先に実行されますか？",
      "run-to-completionとは何ですか？"
    ],
    "references": [
      {
        "title": "MDN - JavaScript execution model",
        "url": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Execution_model"
      }
    ]
  },
  {
    "id": "computer-task-microtask",
    "category": "computer-science",
    "question": "TaskとMicrotaskの違いを説明してください。",
    "answer": "ブラウザのイベントループでは、タイマーやユーザー操作などはTaskとして扱われ、PromiseのリアクションなどはMicrotaskとして処理されます。現在のTaskが終了すると、通常は次のTaskへ進む前にMicrotaskキューが空になるまで処理されます。そのため、同じタイミングで予約したPromiseの処理がsetTimeoutより先に実行されるケースがあります。",
    "keyPoints": [
      "PromiseのthenなどはMicrotask",
      "setTimeoutのコールバックはTaskとして扱われる",
      "Microtaskは次のTaskより前に処理される"
    ],
    "followUps": [
      "Microtaskを大量に追加し続けると何が問題になりますか？",
      "queueMicrotaskとは？"
    ],
    "references": [
      {
        "title": "MDN - JavaScript execution model",
        "url": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Execution_model"
      }
    ]
  },
  {
    "id": "computer-sync-async",
    "category": "computer-science",
    "question": "同期処理と非同期処理の違いを説明してください。",
    "answer": "同期処理では現在の処理が完了するまで、その処理の流れでは次の処理へ進みません。非同期処理では、時間のかかる処理の完了を待つ間に呼び出し元が別の処理を進められ、完了後にPromiseやコールバックなどを通して結果を扱えます。",
    "keyPoints": [
      "同期・非同期とシングル・マルチスレッドは別の概念",
      "fetchはPromiseを返す",
      "awaitは関数全体のスレッドをブロックするわけではない"
    ],
    "followUps": [
      "async/awaitを使うと同期処理になるのですか？",
      "Promiseとは何ですか？"
    ],
    "references": [
      {
        "title": "MDN - JavaScript execution model",
        "url": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Execution_model"
      }
    ]
  },
  {
    "id": "computer-garbage-collection",
    "category": "computer-science",
    "question": "ガベージコレクションとは何ですか？",
    "answer": "プログラムから到達できなくなったメモリを実行環境が自動的に回収する仕組みです。JavaScriptでは開発者が通常メモリを手動解放する必要はありませんが、不要になったオブジェクトをイベントリスナーやグローバルな参照などから保持し続けると回収されず、メモリ使用量が増える原因になります。",
    "keyPoints": [
      "到達可能性が重要",
      "参照を保持しているデータは回収されない",
      "自動GCでもメモリリークは起こり得る"
    ],
    "followUps": [
      "フロントエンドでメモリリークが起きる例を挙げてください。",
      "イベントリスナーのcleanupが必要なのはなぜ？"
    ],
    "references": [
      {
        "title": "MDN - Memory management",
        "url": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Memory_management"
      }
    ]
  },
  {
    "id": "computer-main-thread-blocking",
    "category": "computer-science",
    "question": "JavaScriptで重い計算をするとUIが固まることがあるのはなぜですか？",
    "answer": "ブラウザでは多くのJavaScript処理、ユーザー入力への応答、レイアウトや描画に関わる処理がメインスレッド上で調整されます。長時間JavaScriptがメインスレッドを占有すると、ブラウザが入力や描画へ処理時間を渡せなくなり、画面が反応しないように見えます。",
    "keyPoints": [
      "長い同期処理は応答性を悪化させる",
      "処理の分割やアルゴリズム改善を検討する",
      "CPU負荷の高い処理はWorkerも候補"
    ],
    "followUps": [
      "対策にはどんなものがありますか？",
      "Web Workerが向いていない処理は？"
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
    ]
  },
  {
    "id": "computer-web-worker",
    "category": "computer-science",
    "question": "Web Workerとは何ですか？",
    "answer": "Web Workerは、ページのメイン実行スレッドとは別のWorkerスレッドでJavaScriptを実行する仕組みです。CPU負荷の高い計算などをメインスレッドから分離できます。Workerから通常のDOM APIを直接操作することはできず、メイン側とはpostMessageなどでデータをやり取りします。",
    "keyPoints": [
      "別スレッドでJavaScriptを実行できる",
      "DOMを直接操作できない",
      "メッセージでメインスレッドと通信する"
    ],
    "followUps": [
      "Dedicated WorkerとShared Workerの違いは？",
      "データ転送コストには何を考慮しますか？"
    ],
    "references": [
      {
        "title": "MDN - Web Workers API",
        "url": "https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API"
      }
    ]
  },
  {
    "id": "network-url-render",
    "category": "network",
    "question": "ブラウザにURLを入力してから画面が表示されるまでを説明してください。",
    "answer": "大まかには、URLを解釈し、必要ならDNSでホスト名から接続先を解決し、サーバーとの通信経路を確立します。HTTPSではTLSによる保護された接続を確立した上でHTTPリクエストを送り、HTMLなどのレスポンスを受信します。ブラウザはHTMLやCSSを解析し、必要なJavaScript・画像なども取得して、レイアウトと描画を行います。実際にはキャッシュ、HTTPのバージョン、接続再利用などで処理は変わります。",
    "keyPoints": [
      "DNSは名前解決を担当",
      "HTTPSではTLSが通信を保護する",
      "HTML受信後も追加リソース取得とレンダリングがある"
    ],
    "followUps": [
      "DNSキャッシュが効いている場合は？",
      "HTTP/2やHTTP/3だと何が変わりますか？"
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
    ]
  },
  {
    "id": "network-http",
    "category": "network",
    "question": "HTTPとは何ですか？",
    "answer": "HTTPはWebでリソースをやり取りするためのアプリケーション層プロトコルです。クライアントがメソッド、対象URI、ヘッダー、必要に応じて本文を含むリクエストを送り、サーバーがステータスコード、ヘッダー、本文などを含むレスポンスを返します。",
    "keyPoints": [
      "Request/Response型のプロトコル",
      "メソッドとステータスコードがある",
      "HTTP SemanticsはRFC 9110で定義される"
    ],
    "followUps": [
      "HTTP/1.1とHTTP/2の主な違いは？",
      "HTTPはどの層のプロトコルですか？"
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
    ]
  },
  {
    "id": "network-stateless",
    "category": "network",
    "question": "HTTPがstatelessであるとはどういう意味ですか？",
    "answer": "HTTPの各リクエストは、プロトコル上はそれぞれ独立したものとして扱えます。HTTP自体がアプリケーションのログイン状態などを自動的に保持するわけではありません。そのためWebアプリではCookie、セッション識別子、トークンなどを利用して複数リクエストにまたがる状態を実現します。",
    "keyPoints": [
      "HTTPそのものとアプリケーションのセッションは分けて考える",
      "Cookie等で状態を関連付けられる",
      "接続再利用とアプリ状態保持も別概念"
    ],
    "followUps": [
      "ログイン状態はどう実現しますか？",
      "CookieはHTTPのstateless性をなくすのですか？"
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
    ]
  },
  {
    "id": "network-get-post",
    "category": "network",
    "question": "GETとPOSTの違いを説明してください。",
    "answer": "GETは対象リソースの表現を取得するためのメソッドで、仕様上safeかつidempotentです。POSTはリクエスト本文などを対象リソースに処理させるために使われ、一般にはsafeでもidempotentでもありません。GETとPOSTの違いを単に『URLに付けるかBodyに入れるか』だけで捉えないことが重要です。",
    "keyPoints": [
      "GETはsafeかつidempotent",
      "POSTの意味は対象リソースに表現を処理させること",
      "メソッドのsemanticを基準に選ぶ"
    ],
    "followUps": [
      "safeとidempotentの違いは？",
      "GETにBodyを付ければPOSTと同じですか？"
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
    ]
  },
  {
    "id": "network-idempotency",
    "category": "network",
    "question": "HTTPメソッドの冪等性とは何ですか？",
    "answer": "同一のリクエストを1回送った場合と複数回送った場合で、サーバーに意図される効果が同じになる性質です。仕様上、GET、HEAD、PUT、DELETEなどはidempotentです。これはレスポンスが毎回完全に同一になるという意味ではありません。",
    "keyPoints": [
      "冪等性はサーバー上の意図された効果についての性質",
      "PUTやDELETEはidempotent",
      "同じレスポンスになることを保証する概念ではない"
    ],
    "followUps": [
      "POSTを冪等に設計することはできますか？",
      "リトライ設計と冪等性はどう関係しますか？"
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
    ]
  },
  {
    "id": "network-success-status",
    "category": "network",
    "question": "200、201、204の違いを説明してください。",
    "answer": "200 OKはリクエストが成功したことを表す一般的な成功レスポンスです。201 Createdはリクエストの結果として新しいリソースが作成されたことを表します。204 No Contentはリクエストは成功したものの、レスポンス本文として送るコンテンツがないことを表します。",
    "keyPoints": [
      "200は一般的な成功",
      "201はリソース作成",
      "204は成功だが本文なし"
    ],
    "followUps": [
      "POSTが成功したら常に201ですか？",
      "DELETE成功時には何を返しますか？"
    ],
    "references": [
      {
        "title": "MDN - HTTP response status codes",
        "url": "https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Status"
      }
    ]
  },
  {
    "id": "network-401-403",
    "category": "network",
    "question": "401と403の違いを説明してください。",
    "answer": "401 Unauthorizedは、そのリクエストに有効な認証資格情報がなく認証が必要であることを示します。403 Forbiddenはサーバーがリクエストを理解したものの、処理を拒否している状態です。実務では『未認証なら401、認証済みだが権限不足なら403』という整理が基本ですが、セキュリティ上の理由で別のコードを選ぶ設計もあります。",
    "keyPoints": [
      "401は認証challengeと関係する",
      "403は処理を拒否している",
      "認証と認可を区別する"
    ],
    "followUps": [
      "存在を隠したいリソースでは404を使うことがありますか？",
      "401という名前がUnauthorizedなのは紛らわしくないですか？"
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
    ]
  },
  {
    "id": "network-http-header",
    "category": "network",
    "question": "HTTP Headerとは何ですか？",
    "answer": "HTTPリクエストやレスポンスに付随するフィールドで、本文以外のメタデータや制御情報を伝えます。例えばContent-Typeは表現のメディアタイプ、Authorizationは認証情報、Cache-Controlはキャッシュ方針などを伝えます。",
    "keyPoints": [
      "Request HeaderとResponse Headerがある",
      "表現・認証・キャッシュなど幅広い情報を扱う",
      "Header名だけでなくsemanticを理解する"
    ],
    "followUps": [
      "Content-TypeとAcceptの違いは？",
      "Authorization Headerには何を入れますか？"
    ],
    "references": [
      {
        "title": "MDN - HTTP headers",
        "url": "https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers"
      }
    ]
  },
  {
    "id": "network-dns",
    "category": "network",
    "question": "DNSとは何ですか？",
    "answer": "DNSはDomain Name Systemの略で、ドメイン名に対応するIPアドレスなどの情報を分散して管理・問い合わせする仕組みです。Webアクセスでは、ブラウザがホスト名を使って接続先を決める際の名前解決に利用されます。",
    "keyPoints": [
      "ドメイン名とIPアドレス等を対応付ける",
      "DNSは分散型の名前解決システム",
      "A/AAAA以外にも複数のレコード種別がある"
    ],
    "followUps": [
      "AとAAAAの違いは？",
      "CNAMEとは？",
      "TTLは何のためにありますか？"
    ],
    "references": [
      {
        "title": "MDN - DNS",
        "url": "https://developer.mozilla.org/en-US/docs/Glossary/DNS"
      }
    ]
  },
  {
    "id": "network-tcp-udp",
    "category": "network",
    "question": "TCPとUDPの違いを説明してください。",
    "answer": "TCPはコネクション指向で、データを順序どおり信頼性高く届けるための仕組みを提供します。UDPはデータグラム単位で通信し、TCPのような配送・順序保証をプロトコル自体では提供しないため、より小さいオーバーヘッドで利用できます。用途に応じて上位プロトコルが必要な性質を補います。",
    "keyPoints": [
      "TCPは信頼性・順序制御を提供",
      "UDPは配送保証を提供しない",
      "HTTP/3はUDP上のQUICを利用する"
    ],
    "followUps": [
      "HTTP/3はなぜTCPではないのですか？",
      "WebSocketは通常どちらを使いますか？"
    ],
    "references": [
      {
        "title": "MDN - TCP",
        "url": "https://developer.mozilla.org/en-US/docs/Glossary/TCP"
      }
    ]
  },
  {
    "id": "network-http-https",
    "category": "network",
    "question": "HTTPとHTTPSの違いを説明してください。",
    "answer": "HTTPSはHTTPをTLSで保護して通信する仕組みです。TLSによって通信内容の機密性と完全性を保護し、証明書などを使って接続先の認証も行います。そのため盗聴や改ざん、中間者攻撃のリスクを下げられます。",
    "keyPoints": [
      "HTTPSはHTTP over TLS",
      "暗号化だけでなく完全性・認証も重要",
      "証明書の検証が接続先認証に使われる"
    ],
    "followUps": [
      "TLS証明書には何が書かれていますか？",
      "HTTPSでも防げない攻撃は？"
    ],
    "references": [
      {
        "title": "MDN - HTTPS",
        "url": "https://developer.mozilla.org/en-US/docs/Glossary/HTTPS"
      }
    ]
  },
  {
    "id": "network-http-cache",
    "category": "network",
    "question": "HTTPキャッシュとは何ですか？",
    "answer": "以前取得したHTTPレスポンスをブラウザや共有キャッシュが保存し、条件が合えば再利用する仕組みです。再利用によって通信量や待ち時間を減らせます。Cache-Controlで保存や再利用方針を指定し、ETagやLast-Modifiedを使って再検証することもできます。",
    "keyPoints": [
      "freshなレスポンスは再利用できる",
      "Cache-Controlが主要な制御手段",
      "ETag等でvalidationできる"
    ],
    "followUps": [
      "no-cacheとno-storeの違いは？",
      "ETagとは何ですか？"
    ],
    "references": [
      {
        "title": "MDN - HTTP caching",
        "url": "https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/Caching"
      }
    ]
  },
  {
    "id": "security-xss",
    "category": "security",
    "question": "XSSとは何ですか？",
    "answer": "XSSは、信頼できないデータが適切に扱われず、攻撃者の用意したスクリプト等がWebページの文脈で実行されてしまう脆弱性です。基本対策は、出力するコンテキストに応じたエスケープや安全なAPIの利用、必要な場合のサニタイズです。Reactの通常のテキスト埋め込みはエスケープされますが、HTMLを直接挿入する機能などでは別途注意が必要です。",
    "keyPoints": [
      "信頼できない入力を実行可能な文脈へ入れない",
      "コンテキストに応じた出力エンコーディングが重要",
      "CSPは追加防御であり根本対策の代替ではない"
    ],
    "followUps": [
      "Stored XSSとReflected XSSの違いは？",
      "dangerouslySetInnerHTMLを使う場合は？"
    ],
    "references": [
      {
        "title": "OWASP - Cross Site Scripting Prevention Cheat Sheet",
        "url": "https://cheatsheetseries.owasp.org/cheatsheets/Cross_Site_Scripting_Prevention_Cheat_Sheet.html"
      }
    ]
  },
  {
    "id": "security-csrf",
    "category": "security",
    "question": "CSRFとは何ですか？",
    "answer": "CSRFは、ユーザーが対象サイトに認証された状態を悪用し、攻撃者が用意したページなどから本人の意図しない状態変更リクエストを送らせる攻撃です。対策としてCSRF Token、SameSite Cookie、Origin等の検証などがあります。特にブラウザがCookieを自動送信する認証方式では考慮が必要です。",
    "keyPoints": [
      "被害者の認証状態を悪用する",
      "状態変更操作が主な標的",
      "CSRF TokenやSameSiteが代表的対策"
    ],
    "followUps": [
      "XSSとの違いは？",
      "Authorization HeaderのBearer Tokenを使う場合はどう変わりますか？"
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
    ]
  },
  {
    "id": "security-same-origin",
    "category": "security",
    "question": "Same-Origin Policyとは何ですか？",
    "answer": "Same-Origin Policyは、あるOriginから読み込まれたスクリプトが別Originのリソースへ自由にアクセスすることを制限するブラウザのセキュリティモデルです。Originは基本的にscheme、host、portの組み合わせで判断されます。",
    "keyPoints": [
      "ブラウザの重要なセキュリティ境界",
      "scheme/host/portでOriginを判断",
      "クロスオリジン通信を全面禁止する仕組みではない"
    ],
    "followUps": [
      "同一サイトと同一オリジンの違いは？",
      "CORSとはどう関係しますか？"
    ],
    "references": [
      {
        "title": "MDN - Same-origin policy",
        "url": "https://developer.mozilla.org/en-US/docs/Web/Security/Same-origin_policy"
      }
    ]
  },
  {
    "id": "security-cors",
    "category": "security",
    "question": "CORSとは何ですか？",
    "answer": "CORSはCross-Origin Resource Sharingの略で、Same-Origin Policyによる制約の中で、サーバーがHTTPレスポンスヘッダーを使って、どのOriginからのブラウザ上のアクセスを許可するかを伝える仕組みです。一部のクロスオリジンリクエストでは、実リクエストの前にOPTIONSによるPreflightが行われます。",
    "keyPoints": [
      "サーバーが許可方針をレスポンスヘッダーで示す",
      "ブラウザがその方針を適用する",
      "条件によりPreflightが行われる"
    ],
    "followUps": [
      "Preflightが発生する条件は？",
      "curlでCORSエラーにならないのはなぜ？"
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
    ]
  },
  {
    "id": "security-token-localstorage",
    "category": "security",
    "question": "localStorageに認証トークンを保存する場合のリスクは何ですか？",
    "answer": "localStorageの値は同一Origin上で動くJavaScriptから読み取れるため、XSSが成立した場合にトークンを取得されるリスクがあります。認証要件によってはJavaScriptから読み取れないHttpOnly Cookieにセッション情報を保存する方式を検討します。ただしCookie方式ではCSRFなど別の脅威も含めて設計する必要があり、保存場所だけで安全性は決まりません。",
    "keyPoints": [
      "localStorageはJavaScriptからアクセス可能",
      "HttpOnly CookieはJavaScriptから直接読めない",
      "認証方式全体の脅威モデルで判断する"
    ],
    "followUps": [
      "HttpOnly CookieならXSS対策は不要ですか？",
      "Cookie認証でCSRFをどう対策しますか？"
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
    ]
  },
  {
    "id": "security-httponly",
    "category": "security",
    "question": "HttpOnly Cookieとは何ですか？",
    "answer": "HttpOnly属性が付いたCookieは、document.cookieなどのJavaScript APIから読み取れません。セッション識別子などの機密性が高いCookieを、XSSによる直接窃取から守るための防御として利用できます。ただし、そのCookieを使ったリクエスト送信自体をXSSから完全に防ぐ仕組みではありません。",
    "keyPoints": [
      "JavaScriptからCookie値を直接取得できない",
      "HTTPリクエストには条件に従って送信される",
      "XSSそのものを防ぐ属性ではない"
    ],
    "followUps": [
      "Secure属性との違いは？",
      "HttpOnlyでもCSRFは起きますか？"
    ],
    "references": [
      {
        "title": "MDN - Using HTTP cookies",
        "url": "https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/Cookies"
      }
    ]
  },
  {
    "id": "security-cookie-attributes",
    "category": "security",
    "question": "CookieのSecure属性とSameSite属性を説明してください。",
    "answer": "Secure属性は、Cookieを原則HTTPS経由でのみ送信させるための属性です。SameSite属性はクロスサイトなコンテキストでCookieを送る条件を制御し、Strict、Lax、Noneなどがあります。SameSite=Noneを使うCookieにはSecureが必要です。",
    "keyPoints": [
      "SecureはHTTPS送信を制御",
      "SameSiteはクロスサイト送信を制御",
      "SameSite=NoneにはSecureが必要"
    ],
    "followUps": [
      "StrictとLaxの違いは？",
      "DomainやPath属性はセキュリティ境界ですか？"
    ],
    "references": [
      {
        "title": "MDN - Using HTTP cookies",
        "url": "https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/Cookies"
      }
    ]
  },
  {
    "id": "security-authn-authz",
    "category": "security",
    "question": "認証と認可の違いを説明してください。",
    "answer": "認証は『その利用者が誰であるか』を確認すること、認可は『認証された主体が特定の操作やリソースへアクセスしてよいか』を判断することです。ログインは主に認証、管理者だけが設定画面を変更できるかの判定は認可に当たります。",
    "keyPoints": [
      "authenticationとauthorizationを分ける",
      "認証後にも認可判定が必要",
      "UI非表示だけで認可を実現してはいけない"
    ],
    "followUps": [
      "401と403はどう使い分けますか？",
      "フロントエンドだけで権限制御してよいですか？"
    ],
    "references": [
      {
        "title": "RFC 9110 - HTTP Semantics",
        "url": "https://www.rfc-editor.org/rfc/rfc9110"
      }
    ]
  },
  {
    "id": "security-csp",
    "category": "security",
    "question": "CSPとは何ですか？",
    "answer": "Content Security Policyは、ページが読み込み・実行できるスクリプトやその他のリソースの供給元などをHTTPヘッダー等で制限する仕組みです。適切に設定するとXSSなどの影響を軽減できますが、入力処理や出力エスケープといった根本的な対策の代替ではありません。",
    "keyPoints": [
      "許可するリソース源を制限できる",
      "XSSへの多層防御として有効",
      "Report-Onlyで導入前検証もできる"
    ],
    "followUps": [
      "nonceとは？",
      "unsafe-inlineを許可すると何が変わりますか？"
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
    ]
  },
  {
    "id": "security-client-secret",
    "category": "security",
    "question": "フロントエンドのコードにAPI Secretを置いてもよいですか？",
    "answer": "秘密にする必要がある値をブラウザへ配信されるフロントエンドコードへ埋め込んではいけません。ユーザーは配信されたJavaScript、ソースマップ、ネットワーク通信などを確認できます。秘匿が必要な資格情報は信頼できるサーバー側で保持し、フロントエンドから必要なAPIを経由して利用します。",
    "keyPoints": [
      "ブラウザへ渡した秘密はユーザーから隠せない",
      "環境変数でもクライアントバンドルへ含めれば公開情報になる",
      "公開前提のAPI keyとSecretを区別する"
    ],
    "followUps": [
      "Next.jsのNEXT_PUBLIC_変数は秘密にできますか？",
      "公開API keyが許容されるケースは？"
    ],
    "references": [
      {
        "title": "MDN - Same-origin policy",
        "url": "https://developer.mozilla.org/en-US/docs/Web/Security/Same-origin_policy"
      }
    ]
  },
  {
    "id": "design-component-boundary",
    "category": "design",
    "question": "コンポーネントをどのような基準で分割しますか？",
    "answer": "単純な行数ではなく、責務や変更理由、データの流れを基準に考えます。異なる理由で変更されるUIやロジックが一つのコンポーネントに集まりすぎた場合や、独立して再利用・テストしたい明確な単位が見えた場合に分割します。一方、将来使うかもしれないという理由だけで細かく抽象化しすぎることは避けます。",
    "keyPoints": [
      "責務と変更理由を見る",
      "データフローを不必要に複雑にしない",
      "早すぎる抽象化を避ける"
    ],
    "followUps": [
      "分割しすぎると何が問題ですか？",
      "UIコンポーネントとロジックをどう分けますか？"
    ],
    "references": [
      {
        "title": "React - Choosing the State Structure",
        "url": "https://react.dev/learn/choosing-the-state-structure"
      }
    ]
  },
  {
    "id": "design-state-location",
    "category": "design",
    "question": "stateはどこに置くべきだと考えますか？",
    "answer": "まず、そのstateを必要とするコンポーネントにできるだけ近い場所へ置きます。複数の兄弟コンポーネントで共有するなら共通の親へ持ち上げ、ツリーの広い範囲で同じ値が必要ならContextなどを検討します。必要以上にグローバル化しないことで依存関係と更新範囲を把握しやすくします。",
    "keyPoints": [
      "stateは必要な場所の近くに置く",
      "共有が必要なら共通親へ持ち上げる",
      "Global Stateは必要性がある場合に限定する"
    ],
    "followUps": [
      "Contextを使う基準は？",
      "URLに持つべきstateはありますか？"
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
    ]
  },
  {
    "id": "design-server-client-state",
    "category": "design",
    "question": "Server StateとClient Stateの違いを説明してください。",
    "answer": "Client Stateはモーダルの開閉や入力途中の値など、主に現在のUIやクライアント操作が所有する状態です。Server StateはAPIなど外部システムが正本を持つデータで、取得中・エラー・キャッシュ・再取得・stale判定・同時更新などの問題があります。そのため両者を同じ仕組みで一括管理するより性質に応じて扱いを分けます。",
    "keyPoints": [
      "Server Stateの正本は通常サーバー側",
      "Server Stateにはキャッシュや再検証がある",
      "UI StateとRemote Dataを区別する"
    ],
    "followUps": [
      "TanStack Queryを使う理由は？",
      "Server Componentを使う場合はどう考えますか？"
    ],
    "references": [
      {
        "title": "React - Choosing the State Structure",
        "url": "https://react.dev/learn/choosing-the-state-structure"
      }
    ]
  },
  {
    "id": "design-api-layer",
    "category": "design",
    "question": "API通信処理をどこに置きますか？",
    "answer": "UIコンポーネントの各所に通信詳細を散らすより、fetcherやAPI client、データ取得用Hookなど、プロジェクト規模に合った境界へまとめます。目的はURL、HTTP処理、エラー変換などの変更影響を局所化することです。ただし単純な一回だけの通信まで無理に多層化せず、複雑さとのバランスを取ります。",
    "keyPoints": [
      "UIと通信詳細の責務を分離する",
      "エラー処理や型変換を集約できる",
      "抽象化自体を目的にしない"
    ],
    "followUps": [
      "Custom HookとAPI clientの責務はどう分けますか？",
      "Server Componentから取得する場合は？"
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
    ]
  },
  {
    "id": "design-ui-states",
    "category": "design",
    "question": "loading、error、empty stateをどのように設計しますか？",
    "answer": "データ取得後の成功状態だけでなく、取得前・取得中・失敗・データ0件といった状態を仕様として明示します。loadingではユーザーが待っている理由を示し、errorでは必要なら再試行手段を提供し、emptyでは『正常に0件』なのか『条件が未指定』なのかを区別します。非同期UIではこれらを後付けではなく最初から状態遷移として考えます。",
    "keyPoints": [
      "成功以外もUI仕様の一部",
      "emptyとerrorを区別する",
      "再試行可能性を考える"
    ],
    "followUps": [
      "SkeletonとSpinnerはどう使い分けますか？",
      "楽観的更新ではどんな状態が増えますか？"
    ],
    "references": [
      {
        "title": "React - Choosing the State Structure",
        "url": "https://react.dev/learn/choosing-the-state-structure"
      }
    ]
  },
  {
    "id": "design-reusable-component",
    "category": "design",
    "question": "再利用可能なコンポーネントをどう設計しますか？",
    "answer": "実際に複数箇所で共通している責務や振る舞いを見つけて抽出します。特定画面の都合を大量のboolean propsで吸収する万能コンポーネントを作るより、共通部分と用途固有部分の境界を明確にします。必要に応じてcompositionを使い、利用側が内容を組み立てられる設計も検討します。",
    "keyPoints": [
      "実際の共通性から抽象化する",
      "巨大な条件分岐コンポーネントを避ける",
      "compositionも選択肢"
    ],
    "followUps": [
      "Propsが増えすぎたらどうしますか？",
      "Compound Componentsを使うケースは？"
    ],
    "references": [
      {
        "title": "React - Passing Props to a Component",
        "url": "https://react.dev/learn/passing-props-to-a-component"
      }
    ]
  },
  {
    "id": "design-custom-hook",
    "category": "design",
    "question": "Custom Hookを使う基準は何ですか？",
    "answer": "複数コンポーネントで再利用したいReactのstatefulなロジックや、Effectを含む外部システムとの同期処理を抽出したいときにCustom Hookを検討します。Custom Hookはロジックを共有しますが、呼び出し元同士でstateそのものが自動的に共有されるわけではありません。",
    "keyPoints": [
      "Hookを組み合わせてロジックを再利用する",
      "呼び出しごとにstateは独立する",
      "純粋な計算だけなら通常の関数でよい"
    ],
    "followUps": [
      "Utility関数との違いは？",
      "Hook名がuseから始まるのはなぜ？"
    ],
    "references": [
      {
        "title": "React - Reusing Logic with Custom Hooks",
        "url": "https://react.dev/learn/reusing-logic-with-custom-hooks"
      }
    ]
  },
  {
    "id": "design-testability",
    "category": "design",
    "question": "テストしやすい設計とはどのような設計ですか？",
    "answer": "重要なビジネスロジックをUIや外部I/Oと必要以上に密結合させず、純粋な関数や明確な境界として検証できる設計です。一方で実装詳細へ過剰に依存したテストを増やすのではなく、ユーザーから観測できる振る舞いを中心に検証します。Unit、Component、E2Eは対象となるリスクに応じて使い分けます。",
    "keyPoints": [
      "外部I/Oとの境界を明確にする",
      "純粋なロジックはテストしやすい",
      "実装詳細より振る舞いを検証する"
    ],
    "followUps": [
      "Unit TestとE2E Testをどう使い分けますか？",
      "モックしすぎると何が問題ですか？"
    ],
    "references": [
      {
        "title": "React - Reusing Logic with Custom Hooks",
        "url": "https://react.dev/learn/reusing-logic-with-custom-hooks"
      }
    ]
  },
  {
    "id": "design-performance",
    "category": "design",
    "question": "フロントエンドのパフォーマンス改善をどう進めますか？",
    "answer": "まずユーザー影響のある問題を計測し、ボトルネックを特定してから改善します。JavaScript実行、不要な再レンダリング、ネットワーク、画像、レイアウトなど原因は複数あるため、推測だけでuseMemoなどを追加するのではなくDevToolsやProfilerなどで確認します。改善後も再計測して効果を確認します。",
    "keyPoints": [
      "計測→仮説→改善→再計測",
      "原因に応じた対策を選ぶ",
      "メモ化は万能ではない"
    ],
    "followUps": [
      "React Profilerでは何を確認しますか？",
      "Core Web Vitalsとは？"
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
    ]
  },
  {
    "id": "design-tradeoff",
    "category": "design",
    "question": "設計上のトレードオフをどう判断しますか？",
    "answer": "要件、変更頻度、保守性、実装コスト、性能、チームの習熟度などの軸を明示して比較します。全てを最大化できる設計はないため、その時点で重要な制約と将来変わりそうな点を整理し、採用理由と捨てた選択肢を説明できるようにします。必要なら小さく始めて、実際の変化に合わせて拡張します。",
    "keyPoints": [
      "正解ではなく制約に対する判断",
      "採用理由と非採用理由を説明する",
      "将来予測だけで過剰設計しない"
    ],
    "followUps": [
      "実務でトレードオフを判断した例は？",
      "技術的負債をいつ許容しますか？"
    ],
    "references": [
      {
        "title": "React - Choosing the State Structure",
        "url": "https://react.dev/learn/choosing-the-state-structure"
      }
    ]
  },
  {
    "id": "frontend-react-rerender",
    "category": "frontend",
    "question": "Reactで再レンダリングはいつ起きますか？",
    "answer": "初回表示時にレンダリングされ、その後はstate更新などによってレンダリングが要求されます。また親がレンダリングされると、通常その子コンポーネントのレンダリング処理も再び評価されます。レンダリングはコンポーネント関数を呼んで次のUIを計算する処理であり、再レンダリングされたからといって実DOMが必ず全て変更されるわけではありません。",
    "keyPoints": [
      "renderとDOM commitを区別する",
      "state updateは代表的なrender trigger",
      "親のrenderは通常子のrenderにも伝播する"
    ],
    "followUps": [
      "再レンダリングとDOM更新の違いは？",
      "memoを使うとどうなりますか？"
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
    ]
  },
  {
    "id": "frontend-props-state",
    "category": "frontend",
    "question": "Reactのpropsとstateの違いを説明してください。",
    "answer": "propsは親コンポーネントなど外部から渡される、そのレンダーに対する読み取り専用の入力です。stateはコンポーネントがレンダー間で保持する情報で、setterを通じて更新すると新しいレンダリングが要求されます。UIはpropsとstateなどの入力から計算するのが基本です。",
    "keyPoints": [
      "propsは読み取り専用の入力",
      "stateはレンダー間で保持される",
      "どちらも現在のrenderから見ればsnapshotとして扱う"
    ],
    "followUps": [
      "propsを直接変更してはいけないのはなぜ？",
      "stateを親へ持ち上げるのはどんな時？"
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
    ]
  },
  {
    "id": "frontend-state-mutation",
    "category": "frontend",
    "question": "Reactのstateを直接変更してはいけないのはなぜですか？",
    "answer": "Reactではstateはそのレンダー時点のスナップショットとして扱い、setterを使って次のstateを渡すことで再レンダリングを要求します。オブジェクトや配列を直接mutationして同じ参照のままにすると、Reactが期待する更新モデルから外れ、UI更新や過去stateの扱いで問題になります。そのため新しいオブジェクトや配列を作って更新します。",
    "keyPoints": [
      "setterで更新を要求する",
      "object/arrayは新しい値として作る",
      "過去renderのstateをmutationしない"
    ],
    "followUps": [
      "配列へpushしたい場合はどう書きますか？",
      "Immerを使う場合は？"
    ],
    "references": [
      {
        "title": "React - useState",
        "url": "https://react.dev/reference/react/useState"
      }
    ]
  },
  {
    "id": "frontend-react-key",
    "category": "frontend",
    "question": "Reactのkeyは何のためにありますか？",
    "answer": "リスト内の要素を兄弟の中で識別し、追加・削除・並び替えが起きたときにReactがどの要素がどれに対応するか判断するために使います。keyは兄弟間で一意かつデータに基づいて安定している値が望ましく、並び順が変わり得るリストでindexをkeyにするとstateが意図しない項目へ対応するなどの問題が起こり得ます。",
    "keyPoints": [
      "兄弟要素のIdentityを表す",
      "安定したデータ由来IDを使う",
      "keyは子コンポーネントのpropsとして自動では渡らない"
    ],
    "followUps": [
      "indexをkeyにしても問題ないケースは？",
      "keyを変えるとstateはどうなりますか？"
    ],
    "references": [
      {
        "title": "React - Rendering Lists",
        "url": "https://react.dev/learn/rendering-lists"
      }
    ]
  },
  {
    "id": "frontend-useeffect",
    "category": "frontend",
    "question": "useEffectは何のために使いますか？",
    "answer": "useEffectはReactコンポーネントをReactの外部システムと同期するためのHookです。例えばタイマー、ブラウザイベント、外部ライブラリ、ネットワーク接続などがあります。単にpropsやstateから別の値を計算するだけならEffectを使わずレンダー中に導出できることが多いです。",
    "keyPoints": [
      "外部システムとの同期が中心",
      "render自体はpureに保つ",
      "外部システムがなければEffect不要な可能性が高い"
    ],
    "followUps": [
      "Effectが不要な具体例は？",
      "イベントハンドラとEffectはどう使い分けますか？"
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
    ]
  },
  {
    "id": "frontend-effect-dependencies",
    "category": "frontend",
    "question": "useEffectのdependency arrayは何を表しますか？",
    "answer": "Effect内で参照するprops、state、コンポーネント内で宣言した変数や関数などのReactive Valueを依存関係として指定します。Reactは各依存値を前回とObject.isで比較し、変化していればsetupを再実行します。依存関係は『実行回数を調整するため好きに選ぶ値』ではなく、Effectのコードから決まります。",
    "keyPoints": [
      "Reactive Valueを列挙する",
      "ReactはObject.isで比較する",
      "依存値を意図的に隠すよりEffect設計を見直す"
    ],
    "followUps": [
      "空配列なら何を意味しますか？",
      "関数をdependencyにすると毎回実行されることがあるのはなぜ？"
    ],
    "references": [
      {
        "title": "React - useEffect",
        "url": "https://react.dev/reference/react/useEffect"
      }
    ]
  },
  {
    "id": "frontend-effect-cleanup",
    "category": "frontend",
    "question": "useEffectのcleanup functionは何のためにありますか？",
    "answer": "Effectのsetupで開始した接続、購読、イベントリスナー、タイマーなどを停止・解除するために返す関数です。依存値が変わってEffectを再同期する前には古い値でのcleanupが実行され、コンポーネントがDOMから外れるときにもcleanupされます。setupとcleanupを対になる処理として考えます。",
    "keyPoints": [
      "setupで開始したものをcleanupで戻す",
      "再実行前にもcleanupされる",
      "unmount時にもcleanupされる"
    ],
    "followUps": [
      "Strict Modeで開発時にsetup/cleanupが追加実行されるのはなぜ？",
      "fetchの競合をどう防ぎますか？"
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
    ]
  },
  {
    "id": "frontend-usememo",
    "category": "frontend",
    "question": "useMemoとは何ですか？",
    "answer": "useMemoは、依存値が変わらない間、計算結果を再レンダリング間でキャッシュするためのHookです。主に性能最適化のために使い、コードの正しさをuseMemoに依存させないのが基本です。計算が十分軽い場合や参照安定性が不要な場合は、付けない方が単純です。",
    "keyPoints": [
      "計算結果をキャッシュする",
      "performance optimizationとして使う",
      "全ての値をmemoizeしない"
    ],
    "followUps": [
      "どんな処理ならuseMemoを検討しますか？",
      "React Compilerを使う場合は？"
    ],
    "references": [
      {
        "title": "React - useMemo",
        "url": "https://react.dev/reference/react/useMemo"
      }
    ]
  },
  {
    "id": "frontend-usecallback",
    "category": "frontend",
    "question": "useCallbackとは何ですか？",
    "answer": "useCallbackは、依存値が変わらない間、関数定義を再レンダリング間でキャッシュするHookです。memo化された子へコールバックを渡す場合や、別Hookの依存関係として参照の安定性が必要な場合などの最適化に使えます。すべてのイベントハンドラへ付ける必要はありません。",
    "keyPoints": [
      "関数をキャッシュする",
      "主目的は最適化",
      "参照同一性が意味を持つ場面で使う"
    ],
    "followUps": [
      "useMemoとの違いは？",
      "useCallbackだけ付けても子のrenderを防げないのはなぜ？"
    ],
    "references": [
      {
        "title": "React - useCallback",
        "url": "https://react.dev/reference/react/useCallback"
      }
    ]
  },
  {
    "id": "frontend-react-memo",
    "category": "frontend",
    "question": "React.memoとは何ですか？",
    "answer": "memoはコンポーネントをmemo化し、親が再レンダリングしてもpropsが前回と同等なら、そのコンポーネントの再レンダリングをスキップできるようにする最適化です。これは性能上の最適化であり、正しさのために必要な仕組みとして使うべきではありません。",
    "keyPoints": [
      "propsが変わらない場合のrender skipを狙う",
      "performance optimization",
      "object/function propsの参照変化に注意する"
    ],
    "followUps": [
      "useCallbackと一緒に使われることがあるのはなぜ？",
      "Contextが変わった場合は？"
    ],
    "references": [
      {
        "title": "React - memo",
        "url": "https://react.dev/reference/react/memo"
      }
    ]
  },
  {
    "id": "frontend-controlled-input",
    "category": "frontend",
    "question": "Controlled Componentとは何ですか？",
    "answer": "フォーム入力でいえば、inputのvalueをReactのstateから渡し、onChangeなどでstateを更新して値を管理する方式です。React側のstateが表示値のsource of truthになります。一方、defaultValueとDOM自身の状態を使う入力はuncontrolledな使い方です。",
    "keyPoints": [
      "value + onChangeでReact stateから制御",
      "React stateがsource of truth",
      "uncontrolledではDOM側に現在値を持たせる"
    ],
    "followUps": [
      "ControlledとUncontrolledをどう使い分けますか？",
      "checkboxの場合は何を使いますか？"
    ],
    "references": [
      {
        "title": "React - input",
        "url": "https://react.dev/reference/react-dom/components/input"
      }
    ]
  },
  {
    "id": "frontend-custom-hook",
    "category": "frontend",
    "question": "Custom Hookとは何ですか？",
    "answer": "useから始まる関数としてReactのHookを組み合わせ、コンポーネント間でstatefulなロジックを再利用する方法です。Custom Hookを複数コンポーネントから呼んでも、そのHook内部のstateそのものが自動的に共有されるわけではなく、それぞれ独立したstateを持ちます。",
    "keyPoints": [
      "ロジックを共有する仕組み",
      "state自体の共有とは別",
      "HookのRulesに従う"
    ],
    "followUps": [
      "共有stateが必要ならどうしますか？",
      "通常のutility functionとの違いは？"
    ],
    "references": [
      {
        "title": "React - Reusing Logic with Custom Hooks",
        "url": "https://react.dev/learn/reusing-logic-with-custom-hooks"
      }
    ]
  },
  {
    "id": "frontend-context",
    "category": "frontend",
    "question": "React Contextはどんな場合に使いますか？",
    "answer": "Theme、認証ユーザー、ルーティング等のようにツリーの離れた複数箇所で必要になる値を、各階層へpropsとして手渡しし続けずに提供したい場合に使います。ただしContextの値が変わるとそれを読むコンポーネントは再レンダリングされるため、何でも一つの巨大Contextへ入れるのではなく責務を考えます。",
    "keyPoints": [
      "深い階層へ値を提供できる",
      "props drillingを減らせる",
      "Context更新の影響範囲を考える"
    ],
    "followUps": [
      "Contextと状態管理ライブラリの違いは？",
      "Contextを分割する基準は？"
    ],
    "references": [
      {
        "title": "React - Passing Data Deeply with Context",
        "url": "https://react.dev/learn/passing-data-deeply-with-context"
      }
    ]
  },
  {
    "id": "frontend-virtual-dom",
    "category": "frontend",
    "question": "Virtual DOMとは何ですか？",
    "answer": "一般にReactでは、コンポーネントのレンダリング結果をJavaScript上の要素ツリーとして扱い、前後のUI構造を照合して必要な変更を実DOMへ反映します。重要なのは、宣言的に『このstateならこのUI』を記述できることであり、『Virtual DOMを使うから常に直接DOM操作より高速』という意味ではありません。",
    "keyPoints": [
      "render結果と実DOMを区別する",
      "差分に基づいてcommitする",
      "常に高速という保証ではない"
    ],
    "followUps": [
      "Reconciliationとは何ですか？",
      "keyは照合にどう影響しますか？"
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
    ]
  },
  {
    "id": "frontend-csr-ssr",
    "category": "frontend",
    "question": "CSRとSSRの違いを説明してください。",
    "answer": "CSRは主にブラウザ側のJavaScriptでUIを構築する方式、SSRはリクエスト時などにサーバー側でHTMLを生成してクライアントへ返す方式です。React/Next.jsではサーバーで生成されたHTMLを表示した後、必要なClient ComponentへJavaScriptの振る舞いを結び付けるHydrationが関係します。実際のアプリでは静的生成やServer Componentsなども組み合わせます。",
    "keyPoints": [
      "CSRはクライアント中心",
      "SSRはサーバーでHTML生成",
      "HydrationはサーバーHTMLにクライアントの振る舞いを接続する"
    ],
    "followUps": [
      "SSRのメリット・デメリットは？",
      "Server ComponentとSSRは同じものですか？"
    ],
    "references": [
      {
        "title": "Next.js - Server and Client Components",
        "url": "https://nextjs.org/docs/app/getting-started/server-and-client-components"
      }
    ]
  },
  {
    "id": "frontend-vue-ref",
    "category": "frontend",
    "question": "Vueのrefとは何ですか？",
    "answer": "refは値をVueのリアクティブシステムで追跡できるようにするAPIです。JavaScriptではRefオブジェクトの`.value`から値を読み書きし、template内では通常自動的にunwrapされます。primitiveだけでなくobjectも保持できます。",
    "keyPoints": [
      "`.value`で値へアクセスする",
      "templateでは多くの場合unwrapされる",
      "値の読み書きがreactivity trackingの対象になる"
    ],
    "followUps": [
      "reactiveとの違いは？",
      "shallowRefは何に使いますか？"
    ],
    "references": [
      {
        "title": "Vue - Reactivity Fundamentals",
        "url": "https://vuejs.org/guide/essentials/reactivity-fundamentals.html"
      }
    ]
  },
  {
    "id": "frontend-vue-computed-watch",
    "category": "frontend",
    "question": "Vueのcomputedとwatchの違いを説明してください。",
    "answer": "computedは既存のリアクティブなstateから宣言的に導出値を作る用途で、依存関係に基づいてキャッシュされます。watchは特定のリアクティブな値の変化を監視し、API呼び出しなどの副作用を実行したい場合に使います。単に別の値を計算するだけならcomputedが適しています。",
    "keyPoints": [
      "computedはderived state",
      "computedはdependencyに基づきキャッシュ",
      "watchは副作用向け"
    ],
    "followUps": [
      "watchEffectとの違いは？",
      "API通信ならどちらを使いますか？"
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
    ]
  },
  {
    "id": "frontend-vue-composition-api",
    "category": "frontend",
    "question": "VueのComposition APIとは何ですか？",
    "answer": "Composition APIは、refやcomputedなどのReactivity API、onMountedなどのLifecycle Hook、provide/inject等をimportして組み合わせ、コンポーネントを構成するAPI群です。Options APIのようにoption種別ごとにコードを分けるだけでなく、機能・関心ごとに関連するロジックをまとめたりComposableとして再利用したりしやすくなります。",
    "keyPoints": [
      "Reactivity APIやLifecycle Hooks等から構成される",
      "機能単位でロジックを整理しやすい",
      "Composableでロジックを再利用できる"
    ],
    "followUps": [
      "Options APIとの違いは？",
      "Composableとは？"
    ],
    "references": [
      {
        "title": "Vue - Composition API FAQ",
        "url": "https://vuejs.org/guide/extras/composition-api-faq.html"
      }
    ]
  },
  {
    "id": "frontend-react-vue",
    "category": "frontend",
    "question": "ReactとVueの違いをどのように説明しますか？",
    "answer": "どちらもコンポーネントベースでUIを構築できますが、ReactはJavaScript/JSXとHooksを中心にUIを表現し、React自身はUIライブラリとして周辺の選択肢を組み合わせる設計が多いです。VueはSingle-File Component、template、組み込みのリアクティビティ、Composition APIなどを一体的に提供します。優劣というより、既存プロジェクトの設計・チーム・要件に合わせて選びます。",
    "keyPoints": [
      "共通点はcomponent-based UI",
      "ReactはJSX/Hooks中心",
      "Vueはtemplateと組み込みreactivityを提供"
    ],
    "followUps": [
      "VueからReactへ移ると何が変わりますか？",
      "状態追跡の考え方はどう違いますか？"
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
    ]
  },
  {
    "id": "frontend-performance-investigation",
    "category": "frontend",
    "question": "フロントエンドのパフォーマンス問題を調べるとき、何を確認しますか？",
    "answer": "まずChrome DevToolsやReact Profilerなどで症状を計測します。ネットワークが遅いのか、JavaScript実行が長いのか、不要な再レンダリングなのか、画像・フォントが重いのか、レイアウトや描画が多いのかを切り分けます。その上で原因に対応する改善を行い、同じ指標で改善後を再計測します。",
    "keyPoints": [
      "原因を測定してから最適化する",
      "Network/CPU/renderingを切り分ける",
      "改善前後を同じ条件で比較する"
    ],
    "followUps": [
      "Core Web Vitalsとは？",
      "React Profilerで何が分かりますか？"
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
    ]
  },
  {
    "id": "git-vcs",
    "category": "git",
    "question": "Gitとは何ですか？",
    "answer": "Gitは分散型バージョン管理システムです。ファイルの変更履歴をcommitとして管理し、各開発者のローカルリポジトリにも履歴を保持できます。branchによって開発の系列を分け、mergeやrebaseなどで履歴を統合できます。",
    "keyPoints": [
      "分散型VCS",
      "ローカルにも履歴を持つ",
      "commit/branchを中心に履歴を管理する"
    ],
    "followUps": [
      "集中型VCSとの違いは？",
      "GitHubとGitの違いは？"
    ],
    "references": [
      {
        "title": "Git - About Version Control",
        "url": "https://git-scm.com/book/en/v2/Getting-Started-About-Version-Control"
      }
    ]
  },
  {
    "id": "git-working-staging-repo",
    "category": "git",
    "question": "Working Tree、Staging Area、Repositoryの違いを説明してください。",
    "answer": "Working Treeは現在チェックアウトして編集しているファイル群、Staging Area（index）は次のcommitへ含める内容を準備する領域、Repositoryはcommitとして保存された履歴です。git addでWorking Treeの選択した内容をindexへ登録し、git commitでindexの内容からcommitを作ります。",
    "keyPoints": [
      "Working Treeは作業中ファイル",
      "Staging Areaは次commitの内容",
      "commitはstaged contentから作られる"
    ],
    "followUps": [
      "git addは単にファイル名を登録するだけですか？",
      "git diffとgit diff --stagedの違いは？"
    ],
    "references": [
      {
        "title": "Git - Recording Changes to the Repository",
        "url": "https://git-scm.com/book/en/v2/Git-Basics-Recording-Changes-to-the-Repository"
      }
    ]
  },
  {
    "id": "git-branch-head",
    "category": "git",
    "question": "GitのbranchとHEADとは何ですか？",
    "answer": "branchは基本的に特定のcommitを指す移動可能な参照です。新しいcommitを作ると現在のbranch参照が新しいcommitへ進みます。HEADは通常、現在チェックアウトしているbranchを指す特別な参照で、detached HEADではbranchではなくcommitを直接指す状態になります。",
    "keyPoints": [
      "branchはcommitへの可動参照",
      "HEADは現在位置を表す",
      "detached HEADという状態がある"
    ],
    "followUps": [
      "branchを作るとcommitはコピーされますか？",
      "detached HEADでcommitするとどうなりますか？"
    ],
    "references": [
      {
        "title": "Git - Branches in a Nutshell",
        "url": "https://git-scm.com/book/en/v2/Git-Branching-Branches-in-a-Nutshell"
      }
    ]
  },
  {
    "id": "git-merge-rebase",
    "category": "git",
    "question": "mergeとrebaseの違いを説明してください。",
    "answer": "mergeは分岐した履歴を統合し、必要に応じて複数の親を持つmerge commitを作ります。rebaseはあるbranchのcommitを別のbaseの上へ再適用し、新しいcommitとして履歴を作り直します。rebaseは履歴を読みやすくできる一方commit IDが変わるため、他の人が基にしている公開済み履歴を安易にrebaseしないようにします。",
    "keyPoints": [
      "mergeは履歴を統合する",
      "rebaseはcommitを別baseへ再適用する",
      "rebaseはhistory rewriteになる"
    ],
    "followUps": [
      "fast-forward mergeとは？",
      "共有branchをrebaseすると何が困りますか？"
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
    ]
  },
  {
    "id": "git-conflict",
    "category": "git",
    "question": "Gitでコンフリクトが発生したらどう対応しますか？",
    "answer": "まず競合したファイルと両方の変更意図を確認します。競合マーカーだけを機械的に消すのではなく、期待する最終コードへ編集し、git addで解決済みとして登録してmergeやrebaseを続行します。その後テストや動作確認を行います。相手の変更意図を判断できない場合は担当者へ確認します。",
    "keyPoints": [
      "両変更の意図を理解して解決する",
      "解決後にstageして処理を続行する",
      "テストで統合結果を確認する"
    ],
    "followUps": [
      "mergeを中止するには？",
      "rebase中のconflictでは何が違いますか？"
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
    ]
  },
  {
    "id": "git-reset-revert",
    "category": "git",
    "question": "git resetとgit revertの違いを説明してください。",
    "answer": "resetはbranchやHEAD、index、Working Treeを指定したcommitの状態へ動かすための操作で、使い方によって既存履歴を参照しなくすることがあります。revertは指定commitの変更を打ち消す逆向きの変更を新しいcommitとして記録します。そのため既に共有されたbranchの変更を取り消す場合は、履歴を書き換えないrevertが適しているケースが多いです。",
    "keyPoints": [
      "resetは参照/index/working treeを動かす",
      "revertは打ち消しcommitを新規作成",
      "共有履歴ではhistory rewriteに注意"
    ],
    "followUps": [
      "--soft、--mixed、--hardの違いは？",
      "merge commitをrevertするには？"
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
    ]
  },
  {
    "id": "git-fetch-pull",
    "category": "git",
    "question": "git fetchとgit pullの違いを説明してください。",
    "answer": "git fetchはリモートリポジトリからcommitやrefなどを取得し、remote-tracking branchを更新しますが、現在のbranchへ自動的に統合はしません。git pullは基本的にfetchを行った後、設定に応じてmergeやrebaseなどで取得した履歴を現在のbranchへ統合します。",
    "keyPoints": [
      "fetchは取得まで",
      "pullは取得+統合",
      "fetch後なら差分を確認してから統合できる"
    ],
    "followUps": [
      "pull --rebaseは何をしますか？",
      "origin/mainとは何ですか？"
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
    ]
  },
  {
    "id": "git-cherry-pick",
    "category": "git",
    "question": "git cherry-pickとは何ですか？",
    "answer": "指定した既存commitが導入した変更を現在のbranchへ適用し、新しいcommitとして記録する操作です。特定の修正だけ別branchへ持っていきたい場合などに使えます。ただし多用すると同じ変更由来のcommitが複数系列にでき、後のmerge関係が分かりにくくなることがあります。",
    "keyPoints": [
      "特定commitの変更を現在branchへ適用する",
      "新しいcommit IDになる",
      "必要な変更だけ移植する用途"
    ],
    "followUps": [
      "mergeと何が違いますか？",
      "conflictした場合は？"
    ],
    "references": [
      {
        "title": "Git - git-cherry-pick",
        "url": "https://git-scm.com/docs/git-cherry-pick"
      }
    ]
  },
  {
    "id": "git-force-push",
    "category": "git",
    "question": "force pushが危険なのはなぜですか？",
    "answer": "通常のpushはリモートbranchがfast-forwardできない更新を拒否しますが、force pushはその保護を上書きし、リモートbranchの参照を別の履歴へ動かせます。そのため他の人のcommitをbranchから失わせる可能性があります。履歴書き換えが必要な場合でも、可能ならリモートが想定した状態のときだけ更新する`--force-with-lease`を使い、共有状況を確認します。",
    "keyPoints": [
      "remote historyを書き換えられる",
      "他者のcommitを失わせる危険がある",
      "force-with-leaseは追加の安全確認を行う"
    ],
    "followUps": [
      "rebase後にforce pushが必要になるのはなぜ？",
      "--force-with-leaseでも安全が保証されるわけではないのはなぜ？"
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
    ]
  },
  {
    "id": "git-team-flow",
    "category": "git",
    "question": "チーム開発で普段どのようなGitフローを使いますか？",
    "answer": "プロジェクトのルールに従うのが前提ですが、例えばmainなど保護されたbranchから作業branchを作り、意味のある単位でcommitし、Pull Requestで変更理由・確認方法を共有してレビューとCIを通した後にmergeします。重要なのは特定のbranch戦略名より、変更を小さく保ち、レビュー可能にし、共有branchの履歴を安全に扱うことだと考えています。",
    "keyPoints": [
      "プロジェクトの既存ルールを尊重する",
      "PRをレビュー可能な大きさに保つ",
      "CIとレビューを統合前の安全網にする"
    ],
    "followUps": [
      "PRが大きくなったらどうしますか？",
      "commitはどの粒度にしますか？"
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
    ]
  }
];
