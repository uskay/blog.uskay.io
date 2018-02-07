import {UskayArticleSnippet} from "./UskayArticleSnippet.js";
import {UskayUI} from "./UskayUI.js";

const COMPONENT_NAME = "uskay-article-list";
export class UskayArticleList extends UskayUI {

    getComponentName() {
        return COMPONENT_NAME;
    }

    connectedCallback() {
        super.render();        
    }

    getStyle() {
        return `
                :host {
                    display:table; 
                    width:100%;
                    background-color:#E9EBEE;
                }
                .wrapper {
                    display:table; 
                    margin:0 auto;
                    padding-bottom:40px;
                    position: relative; 
                    
                }

                h2 {
                    color: #2b546d;
                    margin-left: 10px;
                }
                @media all and (max-width: 699px) {
                    h2 {
                        display: none
                    }
                    .wrapper {
                        padding-top: 10px;
                        width:90%;
                    }
                }
        `;
    }

    getTemplate(data) {
        return this.fetchArticleList();
    }

    fetchArticleList() {
        return new Promise((resolve, reject) => {
            fetch("/json/articlelist.json", {credentials: "include"}).then(res => {
                res.json().then(
                    json => {
                        const articleSnippetArray = [];
                        json.articles.forEach(article => {
                                const template = `<uskay-article-snippet 
                                                    data-snippet-format="${article.snippetFormat}" 
                                                    data-title="${article.title}" 
                                                    data-subtitle="${article.subtitle}" 
                                                    data-date="${article.date}" 
                                                    data-link="${article.link}" 
                                                    data-imgsrc="${article.imgsrc}">
                                                </uskay-article-snippet>`;
                                articleSnippetArray.push(template);           
                            }
                        )
                        const dummy = document.querySelector("#dummyBody")
                        if(dummy) dummy.style.display = "none";
                        resolve(`
                            <div class="wrapper">
                                <h2>ブログ記事。はたして継続できるんでしょうか🙀</h2>
                                <div class="list">
                                    ${articleSnippetArray.join("")}
                                </div>
                            </div>
                            `);     
                    }
                );
            });
        })
    }
}
customElements.define(COMPONENT_NAME, UskayArticleList);