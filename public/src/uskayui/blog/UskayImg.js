import {UskayUI} from "./UskayUI.js";

const COMPONENT_NAME = "uskay-img"; 
export class UskayImg extends UskayUI {

    getComponentName() {
        return COMPONENT_NAME
    }

    connectedCallback() {
        this.src = this.getAttribute("data-src");
        this.layout = this.getAttribute("data-layout");
        this.borderRadius = this.getAttribute("data-border-radius") ? this.getAttribute("data-border-radius") : "0px";
        this.randomID = `USKAYIMG${parseInt(Math.random() * 1000)}`;
        const data = {
            randomId: this.randomID,
            height: this.getAttribute("data-height"),
            width: this.getAttribute("data-width"),
            borderRadius: this.borderRadius,
            backgroundColor: this.getAttribute("data-background-color") ? this.getAttribute("data-background-color") : "#222",
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
                background-color: ${data.backgroundColor};
                position: relative;
                padding-top: ${data.height/data.width * 100}%;
            }
            #${data.randomId} img {
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%,-50%);
            }   
        `;
    }

    getTemplate(data) {
        return `
            <div id=${data.randomId}></div>
        `;
    }

    addEvents() {
        const renderImg = _ => {
            const img = document.createElement("img");
            img.src = this.src;
            if(this.borderRadius){
                img.style.borderRadius = this.borderRadius;
            }                    
            if(this.layout == "fixed-height"){
                img.style.height = "100%";
            } else {
                img.style.width = "100%";
            }
            const shadow = this.shadowRoot;
            const randomID = this.randomID;
            img.onload = function() {                        
                shadow.querySelector(`#${randomID}`).appendChild(this);
                shadow.querySelector(`#${randomID}`).style.backgroundColor = "transparent";
            };
        }

        const callback = (entries, observer) => {
            entries.forEach(e => {
                if(e.isIntersecting) {
                    if(this.shadowRoot.querySelector(`#${this.randomID} img`)) {
                        observer.unobserve(e.target);
                        return;
                    }
                    renderImg();
                }
            })
        }
        const observer = new IntersectionObserver(callback);
        observer.observe(this.shadowRoot.querySelector(`#${this.randomID}`));
    }
}
customElements.define(COMPONENT_NAME, UskayImg);