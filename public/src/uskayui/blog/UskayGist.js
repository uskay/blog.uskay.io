export class UskayGist extends HTMLElement {
    connectedCallback() {
        let shadow = this.attachShadow({mode: "closed"});
        let gistId = this.getAttribute("data-gistId");
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
            let link = document.createElement("link");
            link.setAttribute("rel", "stylesheet");
            link.setAttribute("href", res.stylesheet);
            shadow.appendChild(link);
            let div = document.createElement("div");
            div.innerHTML = res.div;
            shadow.appendChild(div);
        });
    }
}
customElements.define('uskay-gist', UskayGist);