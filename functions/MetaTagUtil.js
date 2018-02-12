
            /** Auto generated module */
            class MetaTagUtil {
                constructor() {
                    this.metaMap = new Map();
                    this.metaMap.set("/article/001-pwa-blog-loading", {title:'🌏 Hello World! Progressive Web-Blog!!',subtitle:'Web ComponentsでPWAなブログを作ってみた。[Loading編]',imgsrc:'/img/article/001-011.png'});this.metaMap.set("/", {title:'書きます',subtitle:'書かせて下さい',imgsrc:''});this.metaMap.set("/", {title:'何か書きます',subtitle:'本当に書きたいんです',imgsrc:''});this.metaMap.set("/", {title:'お願いします',subtitle:'気持ちだけはあるんです',imgsrc:''});
                }
                
                getMetaTag(path) {
                    return `
                        <meta property="og:title" content="${this.metaMap.get(path).title}" />
                        <meta property="og:type" content="article" />
                        <meta property="og:url" content="${path}" />
                        <meta property="og:image" content="${this.metaMap.get(path).imgsrc}" />
                        <meta property="og:site_name" content="ウェブボウズ" />
                        <meta property="og:description" content="${this.metaMap.get(path).subtitle}" />
                        <meta property="fb:app_id" content="1786319984995103" />
                        <meta name="twitter:card" content="summary" />
                        <meta name="twitter:site" content="uskay" />
                        <meta name="twitter:creator" content="uskay" />
                        `
                }
            }
            module.exports = MetaTagUtil;
        