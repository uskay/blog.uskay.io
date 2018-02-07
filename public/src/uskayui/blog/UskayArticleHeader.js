import {UskayUI} from "./UskayUI.js";

const COMPONENT_NAME = "uskay-article-header";
export class UskayArticleHeader extends UskayUI {

    getComponentName() {
        return COMPONENT_NAME;
    }

    connectedCallback(){
        let data = {
            title: this.getAttribute("data-title"),
            subtitle: this.getAttribute("data-subtitle"),
            date: this.getAttribute("data-date")
        }
        super.render(data);
    }

    getStyle() {
        return `
            :host {
                display: block;
                position: relative;
            }
            h1 {
                color: #000;
                font-weight: 700;
            }
            .subtitle {
                margin-top:-25px;
                font-size:140%;
                color: #666;
            }
            .date {
                margin-top:5px;
                color: blue;
                
            }
        `;
    }

    getTemplate(data) {
        return `
                <h1>${data.title}</h1>
                <div class="subtitle">${data.subtitle}</div>
                <div class="date">${data.date}</div>
        `;
    }
}
customElements.define(COMPONENT_NAME, UskayArticleHeader);