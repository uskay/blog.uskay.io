export class Route {
  constructor(idMdMap, articleId) {
    this.metaSet = new Set();
    this.cssSet = new Set();
    this.jsSet = new Set();
    this.htmlList = new Array();
    this.idMdMap = idMdMap;
    this.articleId = articleId ? articleId : '';
  }
  use(component) {
    component.getCss().forEach(key => {
      this.cssSet.add(key);
    })
    component.getMeta().forEach(key => {
      this.metaSet.add(key);
    })
    component.getJs().forEach(key => {
      this.jsSet.add(key);
    })
    return component.getHtml();
  }
  compose() {
    // extend
  }
  build() {
    this.meta/* html */`
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <link href="/img/me-16.png" rel="shortcut icon" />
    `
    this.css/* css */`
      @font-face {
        font-family: 'Nico Moji';
        font-style: normal;
        font-weight: 400;
        src: url(//fonts.gstatic.com/ea/nicomoji/v1/NicoMoji-Regular.eot);
        src: url(//fonts.gstatic.com/ea/nicomoji/v1/NicoMoji-Regular.eot?#iefix) format('embedded-opentype'),
            url(//fonts.gstatic.com/ea/nicomoji/v1/NicoMoji-Regular.woff2) format('woff2'),
            url(//fonts.gstatic.com/ea/nicomoji/v1/NicoMoji-Regular.woff) format('woff'),
            url(//fonts.gstatic.com/ea/nicomoji/v1/NicoMoji-Regular.ttf) format('truetype');
      }
      html, body {
        width: 100%;
        height: 100%;
        margin: 0px;
        padding: 0px;
        background-color: #202124;
        color: #f8f9fa;
        font-family: 'Noto Sans JP',Segoe UI,system-ui,-apple-system,sans-serif;
        line-height: 2.0em;
      }
      a {
        color: #9da2ff;
      }
    `
    this.compose();
    return /* html */`
      <!DOCTYPE html>
      <html lang='ja'>
      ${Array.from(this.metaSet).join(' ')}
      <style>${Array.from(this.cssSet).join(' ')}</style>
      <div id='warning'></div>
      ${this.htmlList.join('')}
      <script>${Array.from(this.jsSet).join(' ')}</script>
      <!-- For now, let's just add GA directly here -->
      <script defer src="https://www.googletagmanager.com/gtag/js?id=UA-63868653-2"></script>
      <script>window.dataLayer = window.dataLayer || []; function gtag(){dataLayer.push(arguments);}; gtag('js', new Date()); gtag('config', 'UA-63868653-2');</script>
      <!-- For legacy browsers, at least show images and warn  -->
      <script>
        if (!window.IntersectionObserver) {
          window.addEventListener("DOMContentLoaded", function (__evt) {
            for (var __w = document.querySelectorAll(".img-wrapper"), __i = 0; __i < __w.length; __i++) {
                var __img = __w[__i].querySelector("img");
                __img.setAttribute("src", __img.getAttribute("data-src"));
                __img.style.display = "block";
            }
          })
        };
        try {
          eval('const f = (x) => x + 1');
        } catch (__e) {
          var __warning = document.createElement('div');
          __warning.style.width = '100%';
          __warning.style.backgroundColor = '#694CFF';
          __warning.style.color = 'white';
          __warning.style.textAlign = 'center';
          __warning.innerText = 'Your browser not supporting ES6? The site could break. Consider updating to a modern browser ;-)';
          document.querySelector('#warning').appendChild(__warning);          
        };
      </script>
      </html>
      `;
  }
  toString(strings, ...args) {
    let value = '';
    for (let i = 0; i < strings.length; i++) {
      let arg = '';
      if (i < args.length) {
        arg = args[i];
      }
      value += strings[i] + arg;
    }
    return value;
  }
  meta(strings, ...args) {
    return this.metaSet.add(this.toString(strings, ...args));
  }
  js(strings, ...args) {
    return this.jsSet.add(this.toString(strings, ...args));
  }
  css(strings, ...args) {
    return this.cssSet.add(this.toString(strings, ...args));
  }
  html(strings, ...args) {
    return this.htmlList.push(this.toString(strings, ...args));
  }
}