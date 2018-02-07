import {UskayUI} from "./UskayUI.js";
import {UskayTwitterShare} from "./UskayTwitterShare.js";
import {UskayFacebookShare} from "./UskayFacebookShare.js";
import {UskayWebShare} from "./UskayWebShare.js";

const COMPONENT_NAME = "uskay-article-footer";
export class UskayArticleFooter extends UskayUI {

    getComponentName() {
        return COMPONENT_NAME;
    }

    connectedCallback(){
        let data = {
            title: this.getAttribute("data-title"),
            text: this.getAttribute("data-text"),
            url: this.getAttribute("data-url")
        }
        super.render(data);
    }

    getStyle() {
        return `
            :host {
                display: block;
                position: relative;
                margin-top:30px;
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
            .share-button {
                float: right;
                margin-right:5px;

            }
        `;
    }

    getTemplate(data) {
        if (navigator.share) {
            return `
                <uskay-web-share class="share-button" data-title="${data.title}" data-text="${data.text}" data-url="${data.url}"></uskay-web-share> 
            `;
        }
        return `
            <uskay-twitter-share class="share-button" data-title="${data.title}" data-text="${data.text}" data-url="${data.url}"></uskay-twitter-share> 
            <uskay-facebook-share class="share-button" data-title="${data.title}" data-text="${data.text}" data-url="${data.url}"></uskay-facebook-share> 
        `;
    }
}
customElements.define(COMPONENT_NAME, UskayArticleFooter);