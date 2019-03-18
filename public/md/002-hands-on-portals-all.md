**そういう意味で SPA っていいと思うのです。**App Shell モデルもしかりですが、常に画面上に表示され続けるヘッダーやフッターはそのままに、ナビゲーションするとコンテンツだけが切り替わっていくので、アプリケーションとしての文脈は持続されます。一方で MPA（＝マルチ ページ アーキテクチャ。かっこよく言っていますが、要するに URL 単位に個別のページが存在するごく普通の構成のことです。）だと**ページ ナビゲーション時の一瞬の真っ白な画面とか、やっぱりちょっとなんとかしたいものです。**この対策としてデベロッパーの皆さまは [Prefetch](https://developer.mozilla.org/en-US/docs/Web/HTTP/Link_prefetching_FAQ) を活用したり、ブラウザ側も [back / forward cache](https://developers.google.com/web/updates/2019/02/back-forward-cache)（先日Chromeでも実装中であることが公開されましたね）を実装したり、なんとか滑らかなナビゲーションを実現しようと腐心されているものと思います。頭が下がります。

# じゃあ Portals は何をしてくれるか
でも SPA 作れと言われてもフレームワークに明るいメンバーがいなかったり、そもそも既存のサイトがあったり、それを全部更改するには時間とお金がかかったり、あれ SPA にしたらちゃんと検索エンジンに Index されるんでしたっけ？という質問がビジネスサイドから来たり、じゃー SSR しましょうかと新たな [Rendertron](https://github.com/GoogleChrome/rendertron) サーバー インスタンス立ち上げに苦労したり、**そういうさまざまな理由で SPA に手を出せていないデベロッパーの皆さまも少なからずいるのではないかと想像します。**私も React とか Vue 流行ってるしかっこいいしすごくその界隈に混ざりたいのですが、日々の業務に追われてなかなかキャッチアップできていません。

一方でそんな多忙で制限のあるデベロッパーの皆さまも、[iframe](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/iframe) は少なくとも一度は使ったことがあると思うのです。`<iframe>` タグを書いて、その `src` 属性に表示したい URL をいれると、不思議と別ページを任意のページに埋め込めるアレです。**簡単に表現すると、そんな iframe に表示しているページに直接ナビゲートできるのが Portals となります。**百聞は一見にしかずなのでまず[こちらの動画（18:05 から）](https://youtu.be/Ai4aZ9Jbsys?t=1085)をご確認頂ければと思います。

![youtube](https://www.youtube.com/embed/Ai4aZ9Jbsys?start=1085 560x315)

Before では、マンガのとあるチャプターを読み終わって次のチャプターに移ろうとした際に、皆さまが毎日体験されるクラシックな「ページ ナビゲーション」が発生していることがわかるかと思います。それに対して After では**次のチャプターをあらかじめ表示し、ユーザーのインタラクションに応じてその表示済のコンテンツに実際にナビゲートできています。**これ、アドレスバーが表示されていませんが、左下に表示されていた次ページが全画面を覆うタイミングで URL もしっかり変わっています。

iframe では別ページを表示するところまではできました。さらには CSS Transition などでアニメーションを加えることもできるかと思います。でもこのように実際のその表示コンテンツにナビゲートすることはできません。**Portals はこれを実現します。**

# 試してみよう as of Version 75.0.3734.0 (Official Build) canary (64-bit)

現状 [Chrome Canary](https://www.google.com/chrome/canary/) で Portal は試せます。起動フラグを付けて Canary を立ち上げてください。
- **Mac:** `open -a Google\ Chrome\ Canary --args --enable-features=Portals`
- **Windows:** ショートカットを右クリック、リンク先に `--args -enable-features=Portals` のオプションを付けて起動。
- **Linux:** Canary は Linux ではサポートされていません。代替として [Chromium](https://www.chromium.org/getting-involved/download-chromium) をご利用ください。
続いて、[DevTools](https://developers.google.com/web/tools/chrome-devtools/) の Console を開いて HTMLPortalElement が存在することを確認しましょう。

![image](/img/article/002-002.png 642x194)

それでは、サンプルコードで具体的に見ていきましょう。

```gist 8e84010d7ea5d454385f2b1db6b045ed```

ものすごい簡単です。ぜひ Console でこれを叩いてみてください。Wikipedia が開くはずです。これを応用して Chrome Dev Summit で紹介されていたデモのような動きを実現したければ例えばこのような実装も考えられます（殴り書きなのでご容赦を）。

![image](/img/article/002-003.gif 752x502)

```gist 0e6f6d8b498e2b076852469d48d58bed```

こちらは、たまたま [Custom Element](https://developer.mozilla.org/ja/docs/Web/Web_Components/Custom_Elements) で実装してみましたが、別に [Web Component](https://developer.mozilla.org/en-US/docs/Web/Web_Components) に拘る必要はありません。iframe を扱うかのようにお好きな方法で操作してみてください。

**ちなみにちゃんと Feature detection もできます。**HTML Element なのでこんな感じでしょうか。

```gist 788db8f7fc7f00316474238757243183```

（Portal を利用するにあたっては、いずれせよ `activate` をコールしないといけないので、JavaScript は必須になります。その意味で上記の Feature detection は確実ですが、[Picture タグ内のフォールバック img](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/picture) のように [HTML Element として対応する可能性もあるかも？](https://github.com/WICG/portals/issues/23)）

**これで [Progressive Enhancement](https://en.wikipedia.org/wiki/Progressive_enhancement) することも可能です！**すぐに使える！！

...という感じでこの記事を書いていたのですが、**簡単に試せるデモ ページがあったほうがいいかなと思いまして急遽簡易的ではありますが、[uskay-portals-demo.glitch.me](https://uskay-portals-demo.glitch.me/) を用意しました。**Portal として表示したいページの URL を入力いただき、Embed Portal Element ボタンを押下するとそのページが Portal として表示されるように作ってあります。そして、表示された Portal をクリックすると、アニメーションが走った後に `activate` されます。Portals 非対応ブラウザの場合は Feature detect してその旨表示します。

![image](/img/article/002-004.gif 932x506)

ぜひともお試し下さい。

# スペックを確認してみよう
現状 [WICG](https://github.com/WICG/portals/blob/master/explainer.md) にてスペックの議論がされています。詳しくは[こちら](https://wicg.github.io/portals/)をご確認頂ければと思いますが、大きく分けて以下の 3 つのインターフェースが検討されています。
- [The portal element](https://wicg.github.io/portals/#the-portal-element): HTML Element 自体。API は非常にシンプルで、`activate` 関数とメッセージをやり取りするためのインターフェース（`postMessage`, `onMessage`等）が準備されています。`activate` 関数には引数でオプションを指定可能で、`activate` するページにイベントを通じて任意のデータを渡すことができます。
- [The portal host interface](https://wicg.github.io/portals/#the-portalhost-interface): `window.portalHost` を公開し、自身が Portal として利用されているかの判定が可能になります。また、メッセージをやり取りするためのインターフェース（`postMessage`, `onMessage`など）が準備されています。
- [The PortalActivateEvent interface](https://wicg.github.io/portals/#the-portalactivateevent-interface): 自身が `activate` されたことを受け取るイベントです。非常に面白いのが、このイベントには `adoptPredecessor` という関数が用意されておいて、以前のページを Portal オブジェクトとして受け取れます。Portal を使ったページの行き来に便利！
他にも、Portal element は iframe と異なり [Unit of related browsing contexts](https://html.spec.whatwg.org/multipage/browsers.html#unit-of-related-browsing-contexts) として扱われるため（UA まかせですが）個別の Event Loop を持つこともできる、など興味深い仕様があるので、**ぜひとも一度スペックを読まれることをおすすめします。**

# 想定されるユースケースと今後の展開
如何でしょう。けっこう気軽に始められるページ ナビゲーション最適化ではないでしょうか。例えば**「商品一覧ページで、ナビゲートする可能性が高い商品ページをあらかじめ Portals で読み込んでおき、ユーザー インタラクションに応じて activate する」**ようなユースケースが真っ先に思いつきますが、もうひとつ大事なポイントは  Portals は cross-origin のページも扱えるので、**複数オリジンのハブになるようなサイトをお持ちの場合にも適用できます。**特にこの cross-origin のユースケースは、現状だと SPA でも実現は難しいものと思いますので、いままでになかった新たな表現を Web にもたらします。

ただ、まだアーリーなフィーチャーなので、現時点では当然完璧ではありません :
- `activate` すると session history が全部なくなってしまったり（元のページに戻れない！）
- `postMessage` によるやり取りがまだできなかったり（Portal のレンダリングが終わったことの通知してから画面上に表示させたい！）
- `adoptPredecessor` などまだ実装されてない機能があったり（もっとクリエイティブな使い方をしたい！）
- DevTools とのサポートがまだまだだったり（Portals 内のログが Console で見づらい）
など。[こちら](https://bugs.chromium.org/p/chromium/issues/list?q=component:Blink%3EHTML%3EPortal)を見るとそれぞれの対応状況がわかります。

また、前述したとおり現状 WICG で話が進んでおり、W3C 上だと Working Draft もこれからですので、**Chrome で Trial をはじめてユーザー・デベロッパーからのフィードバックを得ながら同時並行で仕様を固めに行く方針でしょうか。**その意味でも、ぜひとも一度 Chrome Canary で遊んでみて頂き、何か問題や、改善点などありましたら、 仕様に関するものであれば [WICG](https://github.com/WICG/portals/issues) へ、Chrome の問題であれば[バグを起票](https://bugs.chromium.org/p/chromium/issues/list?q=component:Blink%3EHTML%3EPortal)するのがよいかと思います。

# さいごに
[Web Packaging](https://github.com/WICG/webpackage) といい、この Portals といい、いままでの Web をダイナミックに変えていく仕様が増えていくことにワクワクするのと同時に、日々の業務に追われてなかなかこういう情報に関してブログポストできていませんでしたが、**今年はより頻繁に更新していきたい所存ですので、お時間あるときにでもこっそり訪問いただければと思います。**

そのころにはまた私の髪型も変わっているかもしれませんが。

{"footer": {"title": "話題の Portals を使った画面遷移 UX の未来", "text": "滑らかなページ ナビゲーションも積極的に取り組みたい2019年", "url": "/article/002-hands-on-portals"}}