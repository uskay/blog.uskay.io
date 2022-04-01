import { Component } from './component.js';
export class Gist extends Component {
  constructor(gistId) {
    super();
    this.gistId = gistId;
  }
  getJs() {
    return this.js.add(/* javascript */`
      const loadGist = gistId => {
        const gistElm = document.getElementById('gist-' + gistId);
        const getJsonp = gistId => {
          return new Promise((resolve, reject) => {
            const scriptTag = document.createElement("script");
            const CALLBACK_WINDOW_OBJ_NAME = "__GistJsonpCallback";
            const getCallbackFnName = _ => {
              return "cb" + gistId;
            };
            if (!window[CALLBACK_WINDOW_OBJ_NAME]) {
              window[CALLBACK_WINDOW_OBJ_NAME] = {};
            };
            window[CALLBACK_WINDOW_OBJ_NAME][getCallbackFnName()] = res => resolve(res);
            scriptTag.setAttribute("src", "https://gist.github.com/" + gistId + ".json?callback=" + CALLBACK_WINDOW_OBJ_NAME + "." + getCallbackFnName());
            scriptTag.setAttribute("defer", true);
            gistElm.appendChild(scriptTag);
          });
        };
        getJsonp(gistId).then(res => {
          fetch(res.stylesheet).then(css => {
            css.text().then(textCSS => {
              gistElm.innerHTML = "<style>" + textCSS + "</style>";
              const div = document.createElement("div");
              div.innerHTML = res.div.replace('class="gist"', 'class="gist" style="-webkit-text-size-adjust: 100%;"');
              gistElm.appendChild(div);
            });
          });
        });
      };
  `);
  }
  getHtml() {
    return /* html */`
      <div id="gist-${this.gistId}">
        <script>
          window.addEventListener('load', evt => {
              if ('requestIdleCallback' in window) {
                requestIdleCallback(_ => loadGist('${this.gistId}'));
                return;
              };
              loadGist('${this.gistId}');
          });
        </script>
      </div>
    `;
  }
}

