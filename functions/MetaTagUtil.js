
            /** Auto generated module */
            class MetaTagUtil {
                constructor() {
                    this.metaMap = new Map();
                    this.metaMap.set("/article/002-hands-on-portals", {title:'話題の Portals を使った画面遷移UXの未来',subtitle:'ページロードだけでなく滑らかなページ ナビゲーションも積極的に取り組みたい 2019 年',imgsrc:'/img/article/002-001.png'});this.metaMap.set("/article/001-pwa-blog-loading", {title:'🌏 Hello World! Progressive Web-Blog!!',subtitle:'Web ComponentsでPWAなブログを作ってみた。[Loading編]',imgsrc:'/img/article/001-012.png'});this.metaMap.set("/", {title:'何か書きます',subtitle:'本当に書きたいんです',imgsrc:''});this.metaMap.set("/", {title:'お願いします',subtitle:'気持ちだけはあるんです',imgsrc:''});
                }
                
                getMetaTag(path) {
                    return `
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
                        `
                }
            }
            module.exports = MetaTagUtil;
        