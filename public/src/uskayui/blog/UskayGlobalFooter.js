import {UskayUI} from "./UskayUI.js";

const COMPONENT_NAME = "uskay-global-footer";
export class UskayGlobalFooter extends UskayUI {

    getComponentName() {
        return COMPONENT_NAME;
    }

    connectedCallback() {
        super.render();
    }

    getStyle() {
        return `
            :host {
                width: 100%;
                color:#000;
                text-align: center;
            }
            .wrapper {
                max-width: 640px;
                margin: 0 auto;
                padding-top:50px;
                padding-bottom:50px;
                padding-left: 10px;
                padding-right: 10px;
                font-size:70%;
                color:#FFF;
                font-style: italic;
            }
        `;
    }

    getTemplate(data) {
        return `
            <div class="wrapper">
                Except as otherwise noted, the content of this page is licensed under the Creative Commons Attribution 3.0 License,<br>
                and code samples are licensed under the Apache 2.0 License.
            </div>
        `;
    }

}
customElements.define(COMPONENT_NAME, UskayGlobalFooter);