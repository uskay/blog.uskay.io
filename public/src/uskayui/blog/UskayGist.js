export class UskayGist extends HTMLElement {
    connectedCallback() {
        const shadow = this.attachShadow({mode: "closed"});
        const gistId = this.getAttribute("data-gistId");
        let getJsonp = gistId => {
            return new Promise((resolve, reject) => {
                let scriptTag = document.createElement("script");
                const CALLBACK_WINDOW_OBJ_NAME = "__GistJsonpCallback";
                let getCallbackFnName = _ => {
                    return "cb" + gistId;
                }
                if(!window[CALLBACK_WINDOW_OBJ_NAME]){
                    window[CALLBACK_WINDOW_OBJ_NAME] = {};
                }
                window[CALLBACK_WINDOW_OBJ_NAME][getCallbackFnName()] = res => resolve(res);
                scriptTag.setAttribute("src", `https://gist.github.com/${gistId}.json?callback=${CALLBACK_WINDOW_OBJ_NAME}.${getCallbackFnName()}`);
                scriptTag.setAttribute("defer", true);
                shadow.appendChild(scriptTag);
            });
        }
        getJsonp(gistId).then(res => {
            fetch(res.stylesheet).then(css => {
                css.text().then(textCSS => {
                    shadow.innerHTML = `<style>${textCSS}</style>`
                    const div = document.createElement("div");
                    div.innerHTML = res.div.replace('class="gist"', 'class="gist" style="-webkit-text-size-adjust: 100%;"');
                    shadow.appendChild(div);
                })
            })

        });
    }
}
customElements.define('uskay-gist', UskayGist);