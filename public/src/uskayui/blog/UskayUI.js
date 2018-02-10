export class UskayUI extends HTMLElement {

    render(data) {
        return new Promise((resolve, reject) => {
            const style = this.getStyle(data);
            const template = this.getTemplate(data);
            if(template.then) {
                template.then(asyncTemplate => {
                    this._render(style, asyncTemplate);
                    resolve();
                })
            } else {
                this._render(style, template);
                resolve();
            }
        })
    }

    _render(style, template) {
        const templateDOM = document.createElement("template");
        templateDOM.innerHTML = `<style>${style}</style>${template}`;
        if(window.ShadyCSS){
            ShadyCSS.prepareTemplate(templateDOM, this.getComponentName());
            ShadyCSS.styleElement(this);
        }
        let shadow = this.attachShadow({mode: "open"});
        shadow.appendChild(document.importNode(templateDOM.content, true));
        if(this.addEvents) this.addEvents();
    }
    
}