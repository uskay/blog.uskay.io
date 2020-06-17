import {UskayUI} from "./UskayUI.js";

const COMPONENT_NAME = "uskay-article-snippet";
export class UskayArticleSnippet extends UskayUI {

    getComponentName() {
        return COMPONENT_NAME;
    }

    connectedCallback() {
        let data = {
            format: this.getAttribute("data-snippet-format"),
            title: this.getAttribute("data-title"),
            subtitle: this.getAttribute("data-subtitle"),
            date: this.getAttribute("data-date"),
            imgsrc: this.getAttribute("data-imgsrc")
        };
        this.dataLink = this.getAttribute("data-link");
        super.render(data);
    }

    getStyle() {
        return `
                :host {
                    display:table; 
                    margin:0 auto;
                    border-radius: 2px;
                    overflow: hidden;
                    margin-top:10px;
                    box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
                    transition: all 0.3s cubic-bezier(.25,.8,.25,1);
                    cursor: pointer;
                }
                .img-wrapper-small {
                    width:100px;
                    height:100px;
                    float: left;
                    overflow: hidden;
                }
                .img-wrapper-large {
                    width:640px;
                    overflow: hidden;
                }
                .img-wrapper-large + .snippet{
                    width:640px;
                }
                .snippet {
                    float: left;
                    background-color: #FFF;
                    width:500px;
                    padding-bottom: 10px
                }
                .snippet .title {
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                    font-weight: 700;
                    font-size: 20px;
                    margin-top:5px;
                    padding-right:20px;
                    padding-left:20px;
                }
                .snippet .description {
                    padding-right:20px;
                    padding-left:20px;
                }
                .snippet .description .subtitle{
                    color: #666;
                    margin-top: -5px;
                }
                .snippet .description .date {
                    color:#FFF;
                    font-size:12px;
                    padding-left:5px;
                    padding-right:5px;
                    background-color:#000;
                    display: inline-block;
                    margin-top:5px;
                }
                @media all and (max-width: 699px) {
                    :host {
                        width:100%; 
                    }
                    .img-wrapper-small, .img-wrapper-large {
                        width:100%;
                    }
                    .snippet .title {
                        white-space: normal;
                    }
                    .snippet {
                        width:100% !important; 
                        height: 100%;
                        padding-top:5px;
                        padding-bottom: 15px;
                    }
                }       
        `;
    }
    
    getTemplate(data) {
        return `      
            <div class="${data.format == 'large' ? 'img-wrapper-large' : 'img-wrapper-small'}">
                <uskay-img 
                    data-src="${data.imgsrc}",
                    data-width="${data.format == 'large' ? '2' : '1'}" ,
                    data-height="${data.format == 'large' ? '1' : '1'}",
                    data-layout="${data.format == 'large' ? '' : 'fixed-layout'}"
                    >
                </uskay-img>
            </div>
            <div class="snippet">
                <div class="title">
                    ${data.title}
                </div>
                <div class="description">
                    <div class="subtitle">${data.subtitle}</div>
                    <div class="date">${data.date}</div>
                </div>
            </div>
        `;
    }

    addEvents() {
        const div = this.shadowRoot.querySelectorAll("div");
        Array.to
        Array.from(this.shadowRoot.querySelectorAll("div")).map(div => {
            div.addEventListener("click", () => {
            location.href = this.dataLink;
            });
        });
    }

}
customElements.define('uskay-article-snippet', UskayArticleSnippet);