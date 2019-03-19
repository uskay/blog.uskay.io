import {UskayUI} from "./UskayUI.js";

const COMPONENT_NAME = "uskay-youtube"; 
export class UskayYouTube extends UskayUI {

    getComponentName() {
        return COMPONENT_NAME;
    }

    connectedCallback() {
        const data = {
            src: this.getAttribute("data-src"),
            randomId: `USKAYYT${parseInt(Math.random() * 1000)}`,
            height: this.getAttribute("data-height"),
            width: this.getAttribute("data-width"),
        }
        super.render(data);
    }

    getStyle(data) { 
        return `
            :host {
                display: block;
                position: relative;
                width: 100%;
            }
            #${data.randomId} {
                position:absolute;
                top:0px;
                width: 100%;
                background-color: #222;
                position: relative;
                padding-top: ${data.height/data.width * 100}%;
            }
            #${data.randomId} .video {
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%,-50%);
                width: 100%;
                height: 100%;
            }   
        `;
    }

    getTemplate(data) {
        return `
            <div id=${data.randomId}>
                <iframe class="video" src=${data.src} frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen=""></iframe>
            </div>
        `;
    }

}
customElements.define(COMPONENT_NAME, UskayYouTube);