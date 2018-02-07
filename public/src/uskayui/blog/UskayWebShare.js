import {UskaySocialShare} from "./UskaySocialShare.js";

const COMPONENT_NAME = "uskay-web-share";
export class UskayWebShare extends UskaySocialShare {

    getComponentName() {
        return COMPONENT_NAME;
    }

    connectedCallback() {
        this.title = this.getAttribute("data-title");
        this.text = this.getAttribute("data-text");
        this.url = this.getAttribute("data-url");
        super.render({
            backgroundColor: "#29495C",
            imgURL: "/img/webshare.png"
        });
    }

    addEvents() {
        this.shadowRoot.addEventListener("click", _ => {
            navigator.share({
                title: this.title,
                text: this.text,
                url: this.url,
            })
        })
    }

}
customElements.define(COMPONENT_NAME, UskayWebShare);