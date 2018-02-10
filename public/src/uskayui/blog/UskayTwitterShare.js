import {UskaySocialShare} from "./UskaySocialShare.js";

const COMPONENT_NAME = "uskay-twitter-share";
export class UskayTwitterShare extends UskaySocialShare {

    getComponentName() {
        return COMPONENT_NAME;
    }

    connectedCallback() {
        this.title = this.getAttribute("data-title");
        this.text = this.getAttribute("data-text");
        this.url = this.getAttribute("data-url");
        super.render({
            backgroundColor: "#1DA1F2",
            imgURL: "/img/tw.png"
        });
    }

    getLinkURL() {
        return `
            https://twitter.com/intent/tweet?text=${encodeURI(this.title)} - ${encodeURI(this.text)}&url=https://blog.uskay.io${this.url}&via=uskay
        `;

    }

}
customElements.define(COMPONENT_NAME, UskayTwitterShare);