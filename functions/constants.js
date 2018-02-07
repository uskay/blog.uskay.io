module.exports = {
    "COMPAT_MODE_KEY_MODERN_BROWSER": "MODERN_BROWSER",
    "COMPAT_MODE_KEY_MODERN_SAFARI": "MODERN_SAFARI",
    "COMPAT_MODE_KEY_ES5_COMPAT": "ES5_COMPAT",
    "WEB_COMPONENTS_COMPAT_TABLE": {
            "chrome": 61,
            "safari": 10.1,
            "ios_safari": 10.2,
        },
    "INTERSECTION_OBSERVER_COMPAT_TABLE": {
            "chrome": 61,
            "firefox": 58,
            "edge": 15
    },
    "USERAGENT_BROWSER_MAPPING": {
            "chrome": "chrome",
            "firefox": "firefox",
            "safari": "safari",
            "mobile_safari": "ios_safari",
            "edge": "edge"
    },
    "CRAWLER_UA_REGEX": /bot|googlebot|facebookexternalhit/i,
    "RENDERTRON_UA_REGEX": /HeadlessChrome/,
    "REQUIRED_SCRIPT_URL_REGEX": /\/src.+\.js/g,
    "REQUIRED_SCRIPT": {
        "top": {
            "MODERN_BROWSER": `
                <!-- Modern Browser -->
                <link rel="preload" href="/src/uskayui/blog/UskayGlobalHeader.js" as="script" crossorigin>
                <link rel="preload" href="/src/uskayui/blog/UskayArticleList.js" as="script" crossorigin>
                <link rel="preload" href="/src/uskayui/blog/UskayArticleSnippet.js" as="script" crossorigin>
                <link rel="preload" href="/src/uskayui/blog/UskayProfile.js" as="script" crossorigin>
                <link rel="preload" href="/src/uskayui/blog/UskayGlobalFooter.js" as="script" crossorigin>
                <link rel="preload" href="/src/uskayui/blog/UskayUI.js" as="script" crossorigin>
                <link rel="preload" href="/src/uskayui/blog/UskayImg.js" as="script" crossorigin>
                <script type="module" src="/src/uskayui/blog/UskayGlobalHeader.js" crossorigin></script>
                <script type="module" src="/src/uskayui/blog/UskayArticleList.js" crossorigin></script>
                <script type="module" src="/src/uskayui/blog/UskayProfile.js" crossorigin></script>
                <script type="module" src="/src/uskayui/blog/UskayGlobalFooter.js" crossorigin></script>
            `,
            "MODERN_SAFARI": `
                <!-- Modern Safari -->
                <script src="/src/lib/intersection-observer.js" defer></script>
                <script type="module" src="/src/uskayui/blog/UskayGlobalHeader.js"></script>
                <script type="module" src="/src/uskayui/blog/UskayArticleList.js"></script>
                <script type="module" src="/src/uskayui/blog/UskayProfile.js"></script>
                <script type="module" src="/src/uskayui/blog/UskayGlobalFooter.js"></script>
            `,
            "ES5_COMPAT": `
                <!-- ES5 compatible -->
                <script src="/src/lib/fetch.js" defer></script>
                <script src="/src/lib/intersection-observer.js" defer></script>
                <script src="/src/lib/webcomponents-lite.js" defer></script>
                <script src="/src/uskayui/blog/bundle/common.bundle.js" defer></script>
                <script src="/src/uskayui/blog/bundle/top.bundle.js" defer></script>
            `,
        },
        "article": {
            "MODERN_BROWSER": `
                <!-- Modern Browser -->
                <link rel="preload" href="/src/uskayui/blog/UskayGlobalHeader.js" as="script" crossorigin>
                <link rel="preload" href="/src/uskayui/blog/UskayArticle.js" as="script" crossorigin>
                <link rel="preload" href="/src/uskayui/blog/UskayProfile.js" as="script" crossorigin>
                <link rel="preload" href="/src/uskayui/blog/UskayGlobalFooter.js" as="script" crossorigin>
                <link rel="preload" href="/src/uskayui/blog/UskayUI.js" as="script" crossorigin>
                <link rel="preload" href="/src/uskayui/blog/UskayImg.js" as="script" crossorigin>
                <link rel="preload" href="/src/uskayui/blog/MarkdownParser.js" as="script" crossorigin>
                <link rel="preload" href="/src/uskayui/blog/UskayGist.js" as="script" crossorigin>
                <link rel="preload" href="/src/uskayui/blog/UskayArticleHeader.js" as="script" crossorigin>
                <link rel="preload" href="/src/uskayui/blog/UskayArticleFooter.js" as="script" crossorigin>
                <link rel="preload" href="/src/uskayui/blog/UskayTwitterShare.js" as="script" crossorigin>
                <link rel="preload" href="/src/uskayui/blog/UskayFacebookShare.js" as="script" crossorigin>
                <link rel="preload" href="/src/uskayui/blog/UskayWebShare.js" as="script" crossorigin>
                <link rel="preload" href="/src/uskayui/blog/UskaySocialShare.js" as="script" crossorigin>
                <script type="module" src="/src/uskayui/blog/UskayGlobalHeader.js" crossorigin></script>
                <script type="module" src="/src/uskayui/blog/UskayArticle.js" crossorigin></script>
                <script type="module" src="/src/uskayui/blog/UskayProfile.js" crossorigin></script>
                <script type="module" src="/src/uskayui/blog/UskayGlobalFooter.js" crossorigin></script>
            `,
            "MODERN_SAFARI": `
                <!-- Modern Safari -->
                <script src="/src/lib/intersection-observer.js" defer></script>
                <script type="module" src="/src/uskayui/blog/UskayGlobalHeader.js"></script>
                <script type="module" src="/src/uskayui/blog/UskayArticle.js"></script>
                <script type="module" src="/src/uskayui/blog/UskayProfile.js"></script>
                <script type="module" src="/src/uskayui/blog/UskayGlobalFooter.js"></script>
            `,
            "ES5_COMPAT": `            
                <!-- ES5 compatible -->
                <script src="/src/lib/fetch.js" defer></script>
                <script src="/src/lib/intersection-observer.js" defer></script>
                <script src="/src/lib/webcomponents-lite.js" defer></script>
                <script src="/src/uskayui/blog/bundle/common.bundle.js" defer></script>
                <script src="/src/uskayui/blog/bundle/article.bundle.js" defer></script>
            `,            
        }
    },
    "getErrorTemplate": function(message) {
        return `
                <!DOCTYPE html>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
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
                    .message {
                        color: #FFF;
                        position: absolute;
                        top: 50%;
                        left: 50%;
                        transform: translate(-50%, -50%);
                        text-align: center;
                        width:100%;
                    }
                </style>
                <background>
                </background>
                <div class="message">
                    <h1>Suup broski🤘</h1>
                    <div>${message}</div>
                    <div>Try again later, A'aight?</div>
                </div>
            `
        },

}