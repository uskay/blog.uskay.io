{"header": {"title": "話題の Portals を使った画面遷移 UX の未来", "subtitle": "滑らかなページ ナビゲーションも積極的に取り組みたい 2019 年", "date": "2019年03月19日"}}
ご無沙汰しております。ウェブボウズを立ち上げて 1 年が経ちました。皆さま如何お過ごしでしょうか。**私は、この 1 年間ひとつもブログポストできていません。**さらには私の坊主頭（スキンヘッド）にちなんでウェブボウズという名前をつけた個人ブログでありましたが、5 年間共にしたこの Hair-less style から心機一転して 2019 年は髪を育んでいく方針を固めましたので、**もはやボウズでもなくなってます。**変わり続けることだけが普遍であると胸に刻んで今年も強く生きていきたいと考えております。

さて、最近 [Signed HTTP Exchanges](https://developers.google.com/web/updates/2018/11/signed-exchanges) やら [Performance Budget](https://developers-jp.googleblog.com/2019/03/blog-post_15.html) やらさまざまな面白いことに関わらせていただいて忙殺と幸せを噛み締めている中でも、[Chrome Dev Summit 2019](https://developer.chrome.com/devsummit/schedule/web-packaging-portals) でも大きくフィーチャーされました **Portals という新しい HTML 要素が好きで**、いろいろデモ作ったりなんだりしていまして、本当に面白いのでここらでいっぺん私が学習した内容をまとめて、ひとりでも多くの方に興味を持ってもらえるようこの場に共有したいと思います。

![image](/img/article/002-001.png 2x1)

# いままでの Web は
ページスピードの重要性はここ数年で認知されてきているかとは思うのですが、あくまで単体のページがステートレスな状態でどこまで速く表示されるか、という点が注目されがちで、[RAIL](https://developers.google.com/web/fundamentals/performance/rail) でいうところので **L（Load）**以外の **R（Responsiveness）**、**A（Animation）**、**I（Idle）**に関してはあまり議論されていないように感じます。初期表示はもちろん大事ですが、勝負はページが表示されてからです。気持ちよくユーザーがサイト内回遊できるような、そんな UX を考える必要があります。

====