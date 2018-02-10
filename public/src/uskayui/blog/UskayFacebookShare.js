import {UskaySocialShare} from "./UskaySocialShare.js";

const COMPONENT_NAME = "uskay-facebook-share";
export class UskayFacebookShare extends UskaySocialShare {

    getComponentName() {
        return COMPONENT_NAME;
    }

    connectedCallback() {
        this.title = this.getAttribute("data-title");
        this.text = this.getAttribute("data-text");
        this.url = this.getAttribute("data-url");
        super.render({
            backgroundColor: "#395A9A",
            imgURL: "/img/fb.png"
        });
    }

    getLinkURL() {
        return `
            https://www.facebook.com/sharer/sharer.php?display=popup&u=https://blog.uskay.io${this.url}&t=${encodeURI(this.title)} - ${encodeURI(this.text)}
        `;

    }

}
customElements.define(COMPONENT_NAME, UskayFacebookShare);