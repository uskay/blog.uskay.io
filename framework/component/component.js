export class Component {
  constructor() {
    // https://werxltd.com/wp/2010/05/13/javascript-implementation-of-javas-string-hashcode-method/
    const simpleHash = str => {
      let hash = 0;
      for (let i = 0; i < str.length; i++) {
        const char = str.charCodeAt(i);
        hash = (hash << 5) - hash + char;
        hash &= hash;
      }
      return new Uint32Array([hash])[0].toString(36);
    };
    this.id = simpleHash(`ID${(new Date()).getTime()}${Math.random()}`)
    this.meta = new Set();
    this.css = new Set();
    this.js = new Set();
  }
  getId() {
    return this.id;
  }
  use(component) {
    component.getMeta().forEach(key => {
      this.meta.add(key);
    })
    component.getCss().forEach(key => {
      this.css.add(key);
    })
    component.getJs().forEach(key => {
      this.js.add(key);
    })
    return component.getHtml();
  }
  getMeta() {
    // override
    return this.meta;
  }
  getCss() {
    // override
    return this.css;
  }
  getJs() {
    // override
    return this.js;
  }
  getHtml() {
    // override
    return '';
  }
}