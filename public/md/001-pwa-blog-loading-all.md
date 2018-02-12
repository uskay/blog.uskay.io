## そもそもProgressive Web Appsって？
[こちら](https://codeiq.jp/magazine/2018/01/56804/)にも（ありがたいことに）記事にして頂いておりますが、Progressive Web AppsはPWAという略名で2015年後期ごろから流行っているWebフロントエンドのベスプラ集、かつそのベスプラをいい感じに適用したWebアプリの通称です。**「最近インスタがPWA化したよね」**的な語法で使われることが多いですが、念のためPWAのコンセプトを要約しますと、
- **とにかくパフォーマンスのいいサイトにしましょう。**SPAでもSPAじゃなくても、どんなフレームワーク使っても使わなくても、もうなんでもいいです。なんでもいいから、表示が速くて画面遷移がスムーズなものにしてユーザーに好かれましょう。
- 上記をチューニングしたら、今度は最近使えるようになってきた**イケてるWeb APIを積極的に使ってよりよい体験をユーザーに提供しましょう。**
- イケてるWeb APIを使うと何ができるかというと、**Webアプリをホーム画面に追加できるようになったり、オフラインでも動作するようになったり、プッシュ通知ができるようになったり、**そんな今までWebでは実現できなかったアプリっぽいことができるので、やらない手はないでしょう？
といったものです。少し上記でも触れていますが、PWAはあくまでベスプラ集なので特定の3rd Partyフレームワークやライブラリには依存しません。世の中にはReactを使ったPWAもあるし、Polymerを駆使したPWAもあるし、PHPサーバーサイドページなPWAもあります。従って技術スタックを変えずとも適用可能なベスプラでありますし、一度に全部を適用するのではなく段階的に（=Progressively）最適化することもできます。

上記で言うところのイケてるWeb APIをより具体的に紹介すると、[ServiceWorker](https://developers.google.com/web/fundamentals/primers/service-workers/)、[WebAppManifest](https://developers.google.com/web/fundamentals/app-install-banners/)、[Push API/Notification API](https://developers.google.com/web/fundamentals/codelabs/push-notifications/)，[Payment Request API](https://developers.google.com/web/fundamentals/payments/)、[Credential Management API](https://developers.google.com/web/fundamentals/security/credential-management/?hl=en)がいわゆるビッグ５でスタメンとなります。とりわけ注目度が高い桜木花道は間違いなく**ServiceWorker**となりますので、こちらについては多くの方がどこかで聞き覚えがあるものと思います。

## ウェブボウズはどんな構成で作ったの？
ところで申し遅れましたが、当ブログ名は**「ウェブボウズ」**にしました。私はウェブが好きで、かつボウズ頭であることに由来しておりますが、気分がいいときはスキンヘッドにしておりますので「テクニカルハゲ」とどっちがいいかなと悩んでいたところ、妻からさすがに後者の案はひどいと諭され今に至ります。さて、「ウェブボウズ」はどのような技術スタックで成り立っているかというと、
- フロントのメインは**Vanilla Javascript (ES6) + Web Components**
- バックエンドは**Firebase Hosting + Fireabase Cloud Functions**でサーバレス的なアレ
で構成されています。ちょうど絵にすると以下のような感じです。

![image](/img/article/001-005.png 1031x647)

恥ずかしながら**UskayUI**なるこのブログ専用のWeb Component群を作ってしまいました.. 後述しますが、記事自体はマークダウンで書けるようにつくっていて、`<uskay-article>`というコンポーネントがFirebase Hostingに置いてある`.md`ファイルを`fetch`してきて、フロントエンドでマークダウンをパース・レンダリングしていきます。つまり、**フロントエンドでJavascriptを駆使して動的にコンテンツを構築していくタイプのページとなりますし、それでも如何に初回表示でもパフォーマンスよく、各種Botにもフレンドリーにするかがポイントとなってきます。**

## Web Components イケてるよ！
今回はなるべく3rd Partyフレームワークやライブラリは使わずに、**Webプラットフォームの素材をそのまま活かすことを意識しています。**ただ、そうはいっても最近のトレンドであるWebページ内の各要素郡（たとえばヘッダーとか）はコンポーネント化して一元管理したり再利用したりしたいものです。今でこそReactやVueJsなどコンポーネント指向な使いやすいライブラリが数多くありますが、古くはDojo toolkitで`declare`してみたり、jQueryのプラグインなんか使ってみたり、その歴史は決して短くありません。そういったコンポーネントをWeb標準で作るための仕様がWeb Componentsとなります。Web Componentsは[Custom Elements](https://developers.google.com/web/fundamentals/web-components/customelements)、[Shadow DOM](https://developers.google.com/web/fundamentals/web-components/shadowdom)、[HTML Templates](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/template)という各Web APIから成り立っており、例えば（ものすごいシンプルな例ですが）以下のように簡単にコンポーネントを作れます（R.I.P **HTML imports**...）。

```gist 46275a39039e5edd02022a17784f0799```
[CODEPENで試す: Simple Custom Element](https://codepen.io/uskay/pen/KQaBQL)

上記の通り、Custom ElementsはES6 Classesとして作るので他のコンポーネントの継承もできますし、DOM、内部のロジックおよびCSSはカプセル化されますので名前空間の衝突から開放されます。もう鼻血が出るくらいJavascriptを構造化しやすくなりますので是非ともお試しください。

[AMP](https://www.ampproject.org/)を実装したことある方はご存知かと思いますが、`<amp-img>`や`<amp-carousel>`などといったAMPのコンポーネント達はまさにWeb Componentsです。AMPは、AMPHTMLライブラリが用意してあるCustom Elementsを再利用することで簡単にページがつくれちゃう、というフレームワークなのです。また、最近だと[VueJs](https://twitter.com/youyuxi/status/958461422786301957)や[Angular](https://github.com/robwormald/angular-elements)がWeb Componentsを吐き出す動きがたまらなくステキで、**Web標準をちゃんとレバレッジしようぜ的機運を感じます。**

## Performance をあげるためには。
ということでウェブボウズは**Web Componentsだけでページを作っているのですが、**Web ComponentsってJavascriptを実行して初めてDOMが構築される代物ですので、ページ表示スピードの敵であるJavascriptの読み込みをうまいこと工夫しないとパフォーマンス良くページが描画されません。そんな最適化が必要となる場合は、何かしらのデザインパターンを参考にするのが定石かと思いますが、最近は[PRPL Pattern](https://developers.google.com/web/fundamentals/performance/prpl-pattern/?hl=ja)（パープルパターンと読みます）というものが流行っていますので、それに従ってチューニングを行っていきます。PRPLパターンは**Push、Render、Pre-cache、Lazy-load**の頭文字を取ったものとなりまして、それぞれひとつひとつ見ていきたいとは思うのですが、文量の関係上、当記事ではページ表示スピード最適化に絞って**主にPush/Renderについて見ていきたいと思います。**
### Push/Render
こちらは、Critical Path（＝初期描画に必要なリソースたち）を最適化しようというもので「描画に必要なものはド頭で全部一気にとっていきたいので**H/2 Push**するか`<link rel=preload>`を使いましょう」といったものです。そもそもHTTP/1.1のままだとウェブボウズのCritical Path関連リソースは以下のように五月雨にダウンロードされてしまうわけです。少なくともJsは全部必要なんですけど、悲しいかな、五月雨に。こちらはChrome Developer ToolsのPerformanceタブで簡単に確認できます。

![image](/img/article/001-006.png 913x414)

これをどのように最適化するかというと、
- まずは**H/2を有効にして**一度に多くのリソースを取得できるようにしましょう。
- 次に**リソース取得の優先度**を定義しましょう。
今回はお手軽にH/2 + `<link rel=preload>`を使用していますが、これだけで以下のようにCritical Path取得が最適化されます。Preloadされたリソースは取得優先順位が高まり、非同期でダウンロードされてメモリキャッシュに保存されます。

![image](/img/article/001-007.png 818x560)

`<link rel=preload>`の宣言はこんな感じ。ちょっと`crossorigin`属性についてはややこしい点もあるので、またの機会に記事化しようと思います。
```gist d5686e5acff7cc7bf14f31f36d8815cb```

また、ウェブボウズではタイトルにWeb Fontを使っているのですが、[FOIT](https://css-tricks.com/fout-foit-foft/)を避けるためにCSS @font-face属性のひとつの`font-display`を使っています。現状`font-display: swap`としていますので、Web Fontが使用可能になるまではシステムフォントを使って文字が表示されます。**ユーザーに「読める」コンテンツをなるべく速く届けるために是非とも利用してみて下さい。**

```gist 99a8aa097ad7309d59505e0efcd5f310```

さらには、Web Componentsを**ES6 Modules**を使って読み込んでいるので、`<script type=module>`なJavascriptはすべてDeferされています。DeferしているのでJavascriptがRender BlockすることなくHTMLのパースが行えてお作法としてはハッピーなのですが、そもそもHTMLにコンテンツを何も用意しないと最初は背景だけが表示されて、その後徐々にCustom Elementsが描画されるといった、**レイアウトが動き回る残念な事象**が発生します。これではちょっと恥ずかしい。いくらなんでも無防備するぎるので、スケルトンHTMLを用意しました。なんのことはない、HTMLにただインラインでダミーのヘッダーや記事を実装しているだけです。

![image](/img/article/001-008.png 807x350)

ってな感じでPush/Renderの最適化する前と後を比較するとこんな感じです。分かりやすいようにNetworkとCPU Throttleをかけていますが、**Afterのほうがだんぜん表示が気持ちいい...**

![image](/img/article/001-009.gif 524x316)
### Pre-cache
次にPRPLパターン２番目のP。Pre-cacheですが、これは次に画面遷移するであろうページ（Route）のリソースを先読みしておこうね、というものです。待ってました、主役！**ServiceWorker**の登場です！ ...ただ、こちらについては別記事で紹介させて頂きます。
### Lazy-Load
Lazy-Loadは古くから伝わる手法ですが、ウェブボウズでは画像を全て`<uskay-img>`というWeb ComponentにWrapしており、内部的に[Intersection Observer](https://developer.mozilla.org/ja/docs/Web/API/Intersection_Observer_API)を利用してスクロールに応じた画像のLazy-Loadを実現しています。また、ページ上部の描画を優先するために下部のテキストも`<uskay-article>`内でLazy-Loadしていますし、ところどころ出てくるGistも非同期にShadow DOMに差し込めるように`<uskay-gist>`なるものも作りました。こちらもまた別記事で。

## Lighthouseで測ってみた。
**で結局どんなパフォーマンスなのよ、**ということで[Lighthouse](https://developers.google.com/web/tools/lighthouse/)で測ってみるとこんな感じです。ちなみにLighthouseはChromeのチームが開発していますPerformance Auditツールで、今やWebサイトの最適化度合いを測るツールの中ではデファクト化しているものです。ChromeのDeveloper Toolから簡単に使えますので、まだ試されたことが無い方は是非ともお試しください。

![image](/img/article/001-010.png 1434x1416)

悔しくも、Peformance 99点の[阿部寛のサイト](http://abehiroshi.la.coocan.jp/)には負けますが、出だしとしては悪くない、といったところでしょうか。ちなみにLayoutするコンテンツ量も依存するJavascriptもそれなりにある当ブログにおいて、**Perfomanceを90点台後半まで伸ばすためには、これまたそれなりに頑張る必要がりました。**ただ試行錯誤を繰り返しながら点数が徐々に伸びていくのは見ていて気持ちがいいですし、その過程で使った当記事のTipsが皆様にほんの少しでもお役に立てることがあれば幸いでございます。

## まとめ
以上がLoadingに特化した開発メモとなります。お見苦しい点も多々あったかと存じますが、今回紹介できなかった**ServiceWorker**や**WebAppManifest**を始め、その他Bot用には**Rendertron**を使っていたり、**Web Components Polyfill**を使ってIE11対応したり、**Web Share API**を利用したりしているので、またの機会に記事としてログらせて頂ければと思います。

**Happy Tuesday!!**😆

{"footer": {"title": "🌏 Hello World! Progressive Web-Blog!!", "text": "Web ComponentsでPWAなブログを作ってみた。[Loading編]", "url": "/article/001-pwa-blog-loading"}}