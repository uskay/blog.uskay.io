import {MarkdownParser} from "./MarkdownParser.js";
import {UskayYouTube} from "./UskayYouTube.js";
import {UskayGist} from "./UskayGist.js";
import {UskayArticleHeader} from "./UskayArticleHeader.js";
import {UskayArticleFooter} from "./UskayArticleFooter.js";
import {UskayUI} from "./UskayUI.js";

const COMPONENT_NAME = "uskay-article";
export class UskayArticle extends UskayUI {

    getComponentName() {
        return COMPONENT_NAME;
    }

    connectedCallback() {
        this.firstFetchEndpoint = `/md/${location.pathname.match(/^\/article\/([a-zA-Z0-9-]+)/)[1]}.md`;
        this.secondFetchEndpoint = `/md/${location.pathname.match(/^\/article\/([a-zA-Z0-9-]+)/)[1]}-all.md`;
        super.render().then(_=> {
            if(!this.shadowRoot.querySelector(`#show-more`)) {
                return;
            }
            this.isSecondFetchRequired = true;
            if(location.search.includes("renderall=true")){
                this.secondFetch();
                return;
            }
            if(window.requestIdleCallback) {
                requestIdleCallback(_ => {
                    this.hookIntersectionObserver();
                    this.preloadSecondFetch();
                })
                return;
            }
            this.hookIntersectionObserver();
            this.preloadSecondFetch();
        });
    }

    getStyle() {
        return `
            :host {
                display: block;
                max-width:700px;
                margin: 0px auto 50px auto;
                background-color: #FFF;
                padding:10px 50px 80px 50px;
                border-radius: 2px;
                box-shadow: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23);
            }
            @media all and (max-width: 699px) {
                :host {
                    padding:10px 15px 80px 15px;
                    border-radius: 0px;
                    margin-bottom: 0px;
                }
            }
            blockquote {
                border-left: 10px #000 solid;
                padding-left: 15px;
                margin-left: 10px;
            }
            a:link { color: blue; }
            a:visited { color: blue; }
            a:hover { color: blue; }
            a:active { color: blue; }
            code {
                background-color: #f7f7f7;
                color: black;
                border: 1px solid #dadce0;
            }
        `
    }

    getTemplate(data) {
        return this.firstFetch();
    }
 
    firstFetch() {
        return new Promise((resolve, reject) => {
            fetch(this.firstFetchEndpoint, {credentials: "include"}).then(res => {
                res.text().then(
                    text => {
                        const markup = new MarkdownParser(text).getMarkUp();
                        const dummy = document.querySelector("#dummyArticle")
                        if(dummy) dummy.style.display = "none";
                        resolve(markup);
                    }
                 );
            })
        })
    }

    secondFetch() {
        const showMoreDOM = this.shadowRoot.querySelector(`#show-more`);
        if(showMoreDOM) {
            fetch(this.secondFetchEndpoint, {credentials: "include"}).then(res => {
                res.text().then(
                    text => {
                        const markup = new MarkdownParser(text).getMarkUp();
                        this.shadowRoot.querySelector("#show-more").innerHTML = markup;
                        document.body.appendChild(document.createElement("uskay-profile"));
                        document.body.appendChild(document.createElement("uskay-global-footer"));
                    }
                );
            })
        }
    }

    hookIntersectionObserver() {
        const callback = (entries, observer) => {
            entries.forEach(e => {
                if(e.isIntersecting) {
                    if(e.target.id == "#show-more") {
                        observer.unobserve(e.target);
                    }
                    if(this.isSecondFetchRequired){
                        this.isSecondFetchRequired = false;
                        this.secondFetch();
                    }
                }
            })
        }
        const observer = new IntersectionObserver(callback);
        observer.observe(this.shadowRoot.querySelector(`#show-more`));  
    }

    preloadSecondFetch() {
        const createLinkPreload = (href, as, crossorigin) => {
            const link = document.createElement("link");
            link.rel = "preload";
            link.href = href;
            link.crossOrigin = crossorigin ? crossorigin : "";
            link.as = as;
            return link;
        }
        document.head.appendChild(createLinkPreload(this.secondFetchEndpoint, "fetch", "use-credentials"));
    }
}
customElements.define(COMPONENT_NAME, UskayArticle);