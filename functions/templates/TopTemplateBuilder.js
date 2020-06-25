const CONST = require("../constants.js");

class TopTemplateBuilder {

    constructor(data) {
        this.compatMode = data.compatMode;
        this.getScripts = (compatMode) => {
            return CONST.REQUIRED_SCRIPT["top"][compatMode];
        }
    }

    getTemplate() {
        return `
                <!DOCTYPE html>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <link href="/img/icon-16.png" rel="shortcut icon">
                <meta name="theme-color" content="#2b546d">
                <title>ウェブボウズ</title>
                <meta property="og:title" content="ウェブボウズ" />
                <meta property="og:type" content="article" />
                <meta property="og:url" content="/" />
                <meta property="og:image" content="/img/icon-512.png" />
                <meta property="og:site_name" content="ウェブボウズ" />
                <meta property="og:description" content="⚡ I LOVE WEB ⚡" />
                <meta property="fb:app_id" content="1786319984995103" />
                <meta name="twitter:card" content="summary" />
                <meta name="twitter:site" content="uskay" />
                <meta name="twitter:creator" content="uskay" />
                <link rel="apple-touch-icon" href="/img/icon-192.png">
                <link rel="manifest" href="/manifest.json">
                <link rel="preload" href="/json/articlelist.json" as="fetch" crossorigin=use-credentials></link>
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
                        height: 100%;
                        font-family: "Roboto",sans-serif;
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
                    #dummyBody {
                        height:100%;
                        width:100%;
                        background-color: #E9EBEE;
                    }
                    @media (max-width: 699px) {
                        #dummyHeader {
                            height: 54px;
                        }
                    }
                    @media (min-width: 1200px) {
                        .responsiveWrapper {
                            display: table;
                            margin: 0 auto;
                            max-width: 1160px;
                            position: relative;
                        }
                        uskay-article-list {
                            float: left;
                            border-radius: 2px;
                            width: 700px;
                            box-shadow: 0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22);
                        }
                        uskay-profile {
                            float: left;
                            width: 400px;
                            border-radius: 2px;
                            margin-left: 20px;
                            padding: 10px 20px 30px 20px;
                            box-shadow: 0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22);
                        }
                    }
                </style>
                <script defer src="https://www.googletagmanager.com/gtag/js?id=UA-63868653-2"></script>
                <noscript>Suup Broski, you hate Javascript? Javascript is awesome🤘<</noscript>
                <background></background>
                <uskay-global-header></uskay-global-header>
                <div id="dummyHeader"></div>
                <div id="dummyBody"></div>
                <div class="responsiveWrapper">
                <uskay-article-list></uskay-article-list>
                <uskay-profile></uskay-profile>
                </div>
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
                    // GA
                    window.dataLayer = window.dataLayer || [];
                    function gtag(){dataLayer.push(arguments);}
                    gtag('js', new Date());
                    gtag('config', 'UA-63868653-2');
                </script>
        `
    }

}

module.exports = TopTemplateBuilder;