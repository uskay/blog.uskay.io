import {UskayUI} from "./UskayUI.js";

export class UskaySocialShare extends UskayUI {

    getStyle(data) {
        return `
            :host {
                display: block;
                position: relative;
                width: 50px;
                height: 50px;
                background-color: ${data.backgroundColor};
                cursor: pointer;
                border-radius: 2px;
                box-shadow: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23);
            }
            :host .social-share-icon {
                width:30px;
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%,-50%);
            }
        `;
    }

    getTemplate(data) {
        return `
            <uskay-img class="social-share-icon" data-src="${data.imgURL}" data-width="30" data-height="30" data-background-color="transparent"></uskay-img>
        `;
    }

    addEvents() {
        this.shadowRoot.addEventListener("click", _ => {
            window.open(this.getLinkURL(), 'newwindow', 'location=yes,height=570,width=520,scrollbars=yes,status=yes');
        })
    }

}