
            /** Auto generated module */
            class MetaTagUtil {
                constructor() {
                    this.metaMap = new Map();
                    this.metaMap.set("/article/004-trusted-web-activity", {title:'随時更新中 - Trusted Web Activtyを触ってみる',subtitle:'手探りでPWAをアプリ化してみる作業ログ',imgsrc:'/img/article/004-001.png'});this.metaMap.set("/article/003-career-and-hiring", {title:'4年間必死だった話とか、キャリアとか、採用とか',subtitle:'特に技術的な話はなく、今年何やったかと「これから」について少し',imgsrc:'/img/article/003-001.png'});this.metaMap.set("/article/002-hands-on-portals", {title:'話題の Portals を使った画面遷移UXの未来',subtitle:'ページロードだけでなく滑らかなページ ナビゲーションも積極的に取り組みたい 2019 年',imgsrc:'/img/article/002-001.png'});this.metaMap.set("/article/001-pwa-blog-loading", {title:'🌏 Hello World! Progressive Web-Blog!!',subtitle:'Web ComponentsでPWAなブログを作ってみた。[Loading編]',imgsrc:'/img/article/001-012.png'});this.metaMap.set("/", {title:'何か書きます',subtitle:'本当に書きたいんです',imgsrc:''});
                }
                
                getMetaTag(path) {
                    return `
                        <title>${this.metaMap.get(path).title} | ウェブボウズ</title>
                        <meta property="og:title" content="${this.metaMap.get(path).title}" />
                        <meta property="og:type" content="article" />
                        <meta property="og:url" content="${path}" />
                        <meta property="og:image" content="https://blog.uskay.io${this.metaMap.get(path).imgsrc}" />
                        <meta property="og:site_name" content="ウェブボウズ" />
                        <meta property="og:description" content="${this.metaMap.get(path).subtitle}" />
                        <meta property="fb:app_id" content="1786319984995103" />
                        <meta name="twitter:card" content="summary_large_image" />
                        <meta name="twitter:site" content="@uskay" />
                        <meta name="twitter:creator" content="@uskay" />
                        <link rel="apple-touch-icon" href="/img/icon-192.png">
                        `
                }
            }
            module.exports = MetaTagUtil;
        