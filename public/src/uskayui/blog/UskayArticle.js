import {MarkdownParser} from "./MarkdownParser.js";
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
        super.render();  

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
        `
    }

    getTemplate(data) {
        return this.fetchMarkdown();
    }
 
    fetchMarkdown() {
        return new Promise((resolve, reject) => {
            fetch(`${location.origin}/md/${location.pathname.match(/^\/article\/([a-zA-Z0-9-]+)/)[1]}.md`, {credentials: "include"}).then(res => {
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
}
customElements.define(COMPONENT_NAME, UskayArticle);