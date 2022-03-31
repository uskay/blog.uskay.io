export class Route {
  constructor(idMdMap, articleId) {
    this.meta = new Set();
    this.css = new Set();
    this.js = new Set();
    this.html = new Array();
    this.idMdMap = idMdMap;
    this.articleId = articleId ? articleId : '';
  }
  use(component) {
    component.getCss().forEach(key => {
      this.css.add(key);
    })
    component.getMeta().forEach(key => {
      this.meta.add(key);
    })
    component.getJs().forEach(key => {
      this.js.add(key);
    })
    return component.getHtml();
  }
  compose() {
    // extend
  }
  build() {
    this.meta.add(/* html */`<meta name="viewport" content="width=device-width, initial-scale=1.0">`);
    this.meta.add(/* html */`<link href="/img/me-16.png" rel="shortcut icon" />`);

    this.css.add(/* css */`
      @import url('https://fonts.googleapis.com/earlyaccess/nicomoji.css');
      @import url('https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@400;700&display=swap');
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
    `)
    this.compose();
    return `
      <!DOCTYPE html>
      <html lang='ja'>
      ${Array.from(this.meta).join(' ')}
      <style>
          ${Array.from(this.css).join(' ')}
      </style>
      ${this.html.join('')}
      <script>
          ${Array.from(this.js).join(' ')}
      </script>
      <!-- For now, let's just add GA directly here -->
      <script defer src="https://www.googletagmanager.com/gtag/js?id=UA-63868653-2"></script>
      <script>window.dataLayer = window.dataLayer || []; function gtag(){dataLayer.push(arguments);}; gtag('js', new Date()); gtag('config', 'UA-63868653-2');</script>
      </html>
      `;
  }
  addRawMeta(string) {
    this.meta.add(string);
  }
  addRawCss(string) {
    this.css.add(string);
  }
  addRawHtml(string) {
    this.html.push(string);
  }
  addRawJs(string) {
    this.js.add(string);
  }
}