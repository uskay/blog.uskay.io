const CONST = require("../constants.js");
const MetaTagUtil = require("../MetaTagUtil.js");


class ArticleTemplateBuilder {

    constructor(data) {
        this.compatMode = data.compatMode;
        this.articleId = data.path.match(/^\/article\/([a-zA-Z0-9-]+)/)[1];
        this.getScripts = (compatMode) => {
            return CONST.REQUIRED_SCRIPT["article"][compatMode];
        }
        this.metaTag = new MetaTagUtil().getMetaTag(data.path);
    }

    getTemplate() {
        return `
                <!DOCTYPE html>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <meta name="theme-color" content="#2b546d">
                ${this.metaTag}
                <link rel="manifest" href="/manifest.json">
                <link rel="preload" href="/md/${this.articleId}.md" as="fetch" crossorigin=use-credentials></link>
                ${this.getScripts(this.compatMode)}
                <style>
                    /*
                    * Nico Moji (Japanese) https://fonts.google.com/earlyaccess
                    */
                    @font-face {
                        font-family: 'Nico Moji';
                        font-style: normal;
                        font-weight: 400;
                        src: url(//fonts.gstatic.com/ea/nicomoji/v1/NicoMoji-Regular.eot);
                        src: url(//fonts.gstatic.com/ea/nicomoji/v1/NicoMoji-Regular.eot?#iefix) format('embedded-opentype'),
                            url(//fonts.gstatic.com/ea/nicomoji/v1/NicoMoji-Regular.woff2) format('woff2'),
                            url(//fonts.gstatic.com/ea/nicomoji/v1/NicoMoji-Regular.woff) format('woff'),
                            url(//fonts.gstatic.com/ea/nicomoji/v1/NicoMoji-Regular.ttf) format('truetype');
                        font-display: swap;
                    }
                    html, body {
                        padding: 0px;
                        margin: 0px;
                        width: 100%;
                        font-family:-apple-system, BlinkMacSystemFont, "Helvetica Neue", "Segoe UI","Noto Sans Japanese","ヒラギノ角ゴ ProN W3", Meiryo, sans-serif;
                        line-height:1.8;
                    }
                    background {
                        background-image: linear-gradient(-200deg, #222 0%, #2b546d 100%);
                        position: fixed;
                        width: 100%;
                        height: 100%;
                        z-index: -1;
                    }
                    #dummyHeader {
                        height:86px;
                    }
                    #dummyArticle {
                        max-width: 700px;
                        margin: 0px auto 50px auto;
                        background-color: #FFF;
                        padding: 10px 50px 80px 50px;
                        border-radius: 2px;
                        box-shadow: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23);
                    }
                    #dummyArticle .dummyTitle {
                        width:80%;
                        height:50px;
                        background-color:#DDD;
                        margin-top:30px;
                    }
                    #dummyArticle .dummySubTitle {
                        width:90%;
                        height:30px;
                        background-color:#DDD;
                        margin-top:20px;
                    }
                    #dummyArticle .dummyDate {
                        width:150px;
                        height:30px;
                        background-color:#DDD;
                        margin-top:20px;
                    }
                    #dummyArticle .dummySpacer {
                        height:50px;
                    }
                    #dummyArticle .dummyLine {
                        width:100%;
                        height:30px;
                        background-color:#DDD;
                        margin-top:20px;
                    }
                    #dummyArticle .dummyImg {
                        width:100%;
                        padding-top: 50%;
                        background-color:#DDD;
                        margin-top:20px;
                    }
                    @media (max-width: 699px) {
                        #dummyHeader {
                            height: 54px;
                        }
                        #dummyArticle {
                            padding: 10px 15px 80px 15px;
                            border-radius: 0px;
                            margin-bottom: 0px;
                        }
                    }
                </style>
                <noscript>Suup Broski, you hate Javascript? Javascript is awesome🤘<</noscript>
                <background></background>
                <uskay-global-header></uskay-global-header>
                <div id="dummyHeader"></div>
                <div id="dummyArticle">
                    <div class="dummyTitle"></div>
                    <div class="dummySubTitle"></div>
                    <div class="dummyDate"></div>
                    <div class="dummySpacer"></div>
                    <div class="dummyLine"></div>
                    <div class="dummyLine"></div>
                    <div class="dummyLine"></div>
                    <div class="dummyImg"></div>
                    <div class="dummyLine"></div>
                    <div class="dummyLine"></div>
                    <div class="dummyLine"></div>
                    <div class="dummyLine"></div>
                    <div class="dummyLine"></div>
                    <div class="dummyLine"></div>
                    <div class="dummyLine"></div>
                    <div class="dummyLine"></div>
                    <div class="dummyLine"></div>
                    <div class="dummyLine"></div>
                    <div class="dummyLine"></div>
                    <div class="dummyLine"></div>
                    <div class="dummyLine"></div>
                </div>
                <uskay-article></uskay-article>
                <uskay-profile></uskay-profile>
                <uskay-global-footer></uskay-global-footer>
                <script>
                    window.addEventListener("load", _ => {
                        if ('serviceWorker' in navigator) {
                            navigator.serviceWorker.register('/sw.js');
                        }
                    });
                    var deferredPrompt;
                    window.addEventListener('beforeinstallprompt', function(e) {
                        e.preventDefault();
                        deferredPrompt = e;
                        return false;
                    });
                </script>
        `
    }
}

module.exports = ArticleTemplateBuilder;