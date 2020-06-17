## 0. 前提
- 私はAndroidアプリ開発はスーパー初心者で全く知識がありません。なので、初心者が手探りで[Android Studio](https://developer.android.com/studio)とか[Play Console](https://developer.android.com/distribute/console)触ってる、くらいのライトなログです。
- そもそもPWAをアプリ化すると何がうれしいの？など戦略の部分はあまり触れません。公式情報としては[ここらへん](https://developers.google.com/web/android/trusted-web-activity#:~:text=There%20are%20a%20few%20things%20that%20make%20Trusted%20Web%20Activity%20different%20from%20other%20ways%20to%20open%20web%20content%20from%20your%20Android%20app%3A)読むといいかもしれません。
- 調べごとしながら書いてるので随時更新していくかと思います。

## 1. Bubblewrapでプロジェクトの雛形を生成
Trusted Web Activityを使ったアプリ作成は色々ツールが出揃ってきている印象で、GUIだとMicrosoftが公開している[PWABuilder](https://www.pwabuilder.com/)がありますし、CLIだと[Bubblewrap](https://github.com/GoogleChromeLabs/bubblewrap)（旧[Llama Pack](https://www.npmjs.com/package/@llama-pack/cli)）が用意されています。PWABuilderなんかすごい簡単で、**3ステップくらいでAPK吐き出します。**PWAを立ち上げる軽量なAPKを生成するという単純な目的であればこういうツール類を素直にそのまま使うので十分ではないでしょうか。ただ今回はもろもろ検証するという目的で、Bubblewrapを利用してAndroidプロジェクトの雛形を吐き出してそれを使うことにします。
### Bubblewrap CLIをインストール
```gist 349a4bc2f2aeb8137f555f5b4d254839```
ここまでは簡単。
### 対象のPWAを検証
Trusted Web Activityを利用したアプリは実際にはWebアプリが動くわけですが、激遅なUXだとアプリ化しても微妙なので[minimum quality criteria](https://web.dev/using-a-pwa-in-your-android-app/#quality-criteria)を設けています。そこらへんを加味して事前に検証してくれるのが[Bubblewrap Validator](https://github.com/GoogleChromeLabs/bubblewrap/tree/master/packages/validator)です。ちょっと試してみます。

```gist e48de04bce0f71021f48499367da0d5b```
普通に**FAIL**してますね。あれ、おかしいな、[ちゃんとPWAなんだけどな](https://blog.uskay.io/article/001-pwa-blog-loading)、と[Lighthouse v6.0](https://web.dev/lighthouse-whats-new-6.0/)動かしてみるとなんか問題ありますね。

![Lighthouse PWA audit](/img/article/004-002.png 670x72)

こちら1000年前にはなかった評価項目かと思うので愚直に対応します（こういうののために[Perfromance Budget](https://web.dev/performance-budgets-101/)じゃないですけど、定期的にヘルスチェックは必要だなーとしみじみ）。
- apple-touch-iconを追加
- maskable iconを追加
再度Validationを実施してみると...

```gist bafe95ca8cf768b277bff202336e9895```
**SUCCESS!!**これで下ごしらえはできました。ちなみにBubblewrap validatorは[ここらへんの実装をみると](https://github.com/GoogleChromeLabs/bubblewrap/blob/master/packages/validator/src/lib/PwaValidator.ts)実際どんなことしてるかがわかってスッキリするかと思います。
### Androidプロジェクトを生成
`$ bubblewrap init`していきます。

```gist 2e9de4c4fc22dbb17910b83d08cb632a```
こんな感じで[Web App Manifest](https://w3c.github.io/manifest/)を利用して対話式でプロジェクトが生成されます。簡単！

## 2. Android Studioを立ち上げてプロジェクトをimport
これは普通に[import](https://developer.android.com/studio/intro/migrate)すればいいです。Android本当によくわからないのですが、ちょっとどんな設定になっているのかを見ていきます。

AndroidManifest.xmlを見ると、起動時のアクションとして`com.google.androidbrowserhelper.trusted.LauncherActivity`が指定されていて、またそのIntent Filterとして`android:host="blog.uskay.io"`と`android:scheme="https"`が`android:autoVerify="true"`として設定されており、httpsスキーマでのディープリンクかつ[Digital Asset Link](https://developers.google.com/digital-asset-links/v1/getting-started)の検証までがデフォルトで準備されています。

```gist 224979ac04ec6310fb7dd7192da72204```
`build.gradle`の中身を覗くと、なんかリソースとしてWeb App Manifestの内容を追加していて、最終的にはそこで生成されたgradleResValues.xmlに設定された値が、`AndroidManifest.xml`等で参照されているようみ見えます。従って、何か値を修正するとしたら、gradleをいじるか、`$ bubblewrap update`するとよさそう。

```gist 39ef1324032c8bdca9b797b8977b6de2```
特にその他生成されているActivityはなく、[android-browser-helper](https://github.com/GoogleChrome/android-browser-helper/tree/master/androidbrowserhelper)で用意されているものをそのまま使っているようですね。BuildConfigくらいしか存在しない。デフォルトで色々用意されていて便利ですね。

![Auto generated BuildConfig.java](/img/article/004-003.png 700x179)

## 3. Digital Asset Links
前述の通り、すでに色々デフォルトで設定済なのであとマストでやることと言ったら[Digital Asset Links](https://developers.google.com/digital-asset-links)の対応だけです。これやってないと[Chrome Custom Tab](https://developer.chrome.com/multidevice/android/customtabs)（またはFallback optionとして選べばおそらくWebview）で開くこととなります。

```gist 7f7aec18072fb7a8338e9babc285b389```
あとは署名済APK/App BundleをPlay Consoleに登録するだけ！...なんですがちょっと追加でやりたいことがあるので、もうちょっといじってみます。

## 4. トラッキングまわりを整理する
Trusted Web ActivityはフルフィーチャーなChromeの上で動いているだけなので、通常のウェブ向け計測は利用できます。リファラは`android://`スキーマが設定されているのでそれで通常ウェブと区別してもいいかも知れませんし、起動URLにパラメタ追加してもいいかもしれません。如何様にもできる気がします（以下はGAのリクエスト。dlは[ドキュメントURL](https://developers.google.com/analytics/devguides/collection/protocol/v1/parameters)、drは[リファラ](https://developers.google.com/analytics/devguides/collection/protocol/v1/parameters#dr)です。）。

![GA](/img/article/004-004.png 823x429)

一方でWebviewと違い`@JavascriptInterface`[アノテーション](https://developer.android.com/guide/webapps/webview)などが使えるわけではないので、いわゆるモバイル計測プラットフォーム（[Adjust](https://www.adjust.com/)、[TUNE](https://www.tune.com/)、[AppsFlyer](https://www.appsflyer.com/)など）を使うにはちょっと工夫が必要です。AppsFlyerが[そこらへんのガイド](https://support.appsflyer.com/hc/en-us/articles/360002330178-Using-AppsFlyer-with-TWA#introduction)を出していて大変参考になるのですが、基本Native SDKは利用できないので、一旦ウェブ側で必要なデータ全部かき集めて、[Server to Server](https://support.appsflyer.com/hc/en-us/articles/360002330178-Using-AppsFlyer-with-TWA#inapp-events-with-twa-sending-inapp-events-from-twa)で連携してくださいと読めます。ちょっと手順を大まかに整理すると...
- アプリ起動時にNative側でしか収集できないデータ（たとえば[Advertising ID](https://developer.android.com/training/articles/ad-id)だったり、[各SDKが発行するID](https://support.appsflyer.com/hc/en-us/articles/360002330178-Using-AppsFlyer-with-TWA#inapp-events-with-twa-getting-the-appsflyer-id)だったり）を取得し、それをTrusted Web Activityに引き渡す。
- そのデータを利用して、Server to Serverで計測情報（コンバージョン等）を各プラットフォームに連携する。
というパターンが共通して必要な気がするので、今回は特に前者をどのように実装すればイケるのか試してみようと思います。
### データ引き渡しパターン
大まかには二通りありまして、
- 起動URLのパラメタとして連携する方法
- Custom HTTP Request Headerとして連携する方法
かと思います。特に前者の方法は[こちらでも案内されている](https://developers.google.com/web/android/trusted-web-activity/query-parameters)のでBubblewrap使うのであれば一番安全かなと感じます。一方でQuery Parmeter vs HTTP Request Headerのどちらがいいか議論もあると感じていて、Query Parameterは実装が簡単なんですが、URIに付加されている情報は誰からも簡単にアクセスできてしまう上に[Maximum Length](https://stackoverflow.com/questions/417142/what-is-the-maximum-length-of-a-url-in-different-browsers)に関しても気になる点はあります。従ってここでは後者のCustom HTTP Request Headerをどのように利用できるかをフィージビリティ検証していきたいと思います。
### EXTRA_HEADERSを利用する
AndroidではIntentに対していろいろな付加情報を`putExtra`で追加できるようで、今回はその中の`Browser.EXTRA_HEADERS`を利用したいと思います。ちょうど[AppsFlyerの例](https://support.appsflyer.com/hc/en-us/articles/360002330178-Using-AppsFlyer-with-TWA#inapp-events-with-twa-sending-appsflyer-id-through-custom-headers)にもありますが、Bubblewrap関係なく素で実装するとこんな感じになるはず。

```gist 148e3adc650a1da7350cc8415e1d4fd5```
ただ、前述したとおり、Bubblewrapは[LauncherActivity](https://github.com/GoogleChrome/android-browser-helper/blob/master/androidbrowserhelper/src/main/java/com/google/androidbrowserhelper/trusted/LauncherActivity.java)を利用しているので、それを活かしながらCustom Headerを追加しようとすると、そのままではうまく拡張できない気配があります。独自のQuery Parameterを設定するために[getLaunchingUrl](https://github.com/GoogleChrome/android-browser-helper/blob/master/androidbrowserhelper/src/main/java/com/google/androidbrowserhelper/trusted/LauncherActivity.java#L253)はOverrideできるように作られています。が、Custom Headerに関しては、実際に`putExtra`したい対象のIntentを組み立てる[TrustedWebActivityIntentBuilder](https://github.com/GoogleChrome/custom-tabs-client/blob/master/customtabs/src/android/support/customtabs/trusted/TrustedWebActivityIntentBuilder.java)を生成するところが、[onCreateに直接書かれているので](https://github.com/GoogleChrome/android-browser-helper/blob/master/androidbrowserhelper/src/main/java/com/google/androidbrowserhelper/trusted/LauncherActivity.java#L149)なんか初見ここに何かを差し込むのは厳しそうに思えてきました。なので最適解はおいておいて、ひとまずここは検証を先にすすめるという意味で、こちらをForkしてIntentに付加情報をInjectできるように作り変えてみます。
- 明らかに共通部分と思わしき、そして実際に`builder.build(customTabSession).getIntent()`でIntentを触っている、[TwaLauncher](https://github.com/GoogleChrome/android-browser-helper/blob/master/androidbrowserhelper/src/main/java/com/google/androidbrowserhelper/trusted/TwaLauncher.java)には基本手を加えない。また、`builder.build`をコールしている箇所は他にもありそう。
- 逆にLauncher Activityで一番最初にTrustedWebActivityIntentBuilderを生成する処理を、拡張可能にしてあげれば他もちゃんと動きそう。
とうことで、拡張済の独自IntentBuilderを差し込めるようにFactoryをかまし、そこでIntentだけをカスタマイズできる処理を外部注入できるようにひとまずしてみました。今回試してみた変更の[実際のコードはこちら](https://github.com/GoogleChrome/android-browser-helper/compare/master...uskay:uskay-patch)。

```gist a0c8a3ff575dbf4a22a38ef33e1c68d9```
その上で、実際にIntentを独自カスタマイズする処理を書いて注入していきます。こちらも[実際のコードはこちら](https://github.com/uskay/io.uskay.blog.twa/tree/master/app/src/main/java/io/uskay/blog/twa)。

```gist 8f225c8bdc6ef46a94627181bd72c0e5```
ちょっとハマったのが、[Advertising IDを取得する処理](https://github.com/uskay/io.uskay.blog.twa/blob/master/app/src/main/java/io/uskay/blog/twa/AdInfoSingleton.java#L16)が非同期処理が存在しなかったので、Applicationの[onCreate時](https://github.com/uskay/io.uskay.blog.twa/blob/master/app/src/main/java/io/uskay/blog/twa/MyApp.java#L9)に取得するようにしたのですが、あってるのかな（なんか今の私の実装だとRace Conditinon大いにありそう）。ひとまず今回はGoogle Adsの[App Conversion Tracking API](https://developers.google.com/app-conversion-tracking/api/request-response-specs)に必要なデータを追加してみました。

### 動かしてみる
ちゃんと独自追加したHTTP Request Headerがついています。よかった。こちらちなみに私の[AVD](https://developer.android.com/studio/run/managing-avds)上で動かしているものです（Advertising IDなどもテスト環境のもの）。
![Custom Header](/img/article/004-005.png 859x258)

署名済のAPKは、ちゃんとフルスクリーンで起動します（AVDだとスプラッシュスクリーンでないのなんでだろう？実端末だと出ます。）。
![youtube](https://www.youtube.com/embed/vMSIuExnKYQ 560x315)

## 5. Play Storeに掲載してみる
審査中...（進展がアレばこちら更新します）
![Play Store](/img/article/004-006.png 700x238)

## 全体を通して
- Trusted Web Activityを使ったPWAのアプリ化はツール郡が揃ってきていてそれなりに気軽にできるようなった印象です。
- 一方で[Bubblewrap validator](https://github.com/GoogleChromeLabs/bubblewrap/tree/master/packages/validator)にもあるとおり、前提としてPWAとパフォーマンスの基準を満たす必要があるのでやはりその対応は優先度「高」かと思います。
- 今回はトラッキングまわりも検証してみましたが、対応策はいろいろありそうなのでそこまでブロッカーにはならないかなと感じました。
また気づいた点あれば更新していきます。今夜は眠れるといいなぁ。

{"footer": {"title": "随時更新中 - Trusted Web Activtyを触ってみる", "text": "手探りでPWAをアプリ化してみる作業ログ", "url": "/article/004-trusted-web-activity"}}