
            /** Auto generated module */
            class ArticlePathValidator {
                constructor(path){
                    this.urlSet = new Set();
                    this.urlSet.add("/article/004-trusted-web-activity"); this.urlSet.add("/article/003-career-and-hiring"); this.urlSet.add("/article/002-hands-on-portals"); this.urlSet.add("/article/001-pwa-blog-loading"); this.urlSet.add("/");
                    this.path = path;
                }
                isValid() {
                    return this.urlSet.has(this.path);
                }
                getAllPathSet() {
                    return this.urlSet;
                }
            }
            module.exports = ArticlePathValidator;
        