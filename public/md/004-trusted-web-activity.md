{"header": {"title": "随時更新中 - Trusted Web Activityを触ってみる", "subtitle": "手探りでPWAをアプリ化してみる作業ログ", "date": "2020年06月17日"}}
![Hero image](/img/article/004-001.png 700x350)

暑くなってきましたね。なんか昨夜暑すぎて非常に寝苦しかったので、就寝をあきらめ、今まで「時間がない」を言い訳に着手していなかった技術検証を寝落ちするまでひとまず進めてみようと一人立ち上がったオジサンが私です。お久しぶりです。こちら改めまして **「会社の意見は一切代表していませんし、ありません。すべて私の個人的な見解です。」** な技術検証作業ログです。

実は[2017年ごろに](https://www.youtube.com/watch?v=_sLa0qhuqcA)コンセプトが公開された[Trusted Web Activity](https://developers.google.com/web/android/trusted-web-activity)という**「フルスクリーンなChromeを一つの[Activity](https://developer.android.com/reference/android/app/Activity)として立ち上げてPWAを表示する」**ためのAndroidのフィーチャーを、残念ながら私は一切触って来なかった背景があり、概念としてはわかるんだけど実際どんなものかよくわかってなかったので、この寝れない夜を利用してこのブログをアプリ化してみることにしました。

====