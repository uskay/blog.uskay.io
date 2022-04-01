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
    this.metaSet = new Set();
    this.cssSet = new Set();
    this.jsSet = new Set();
  }
  getId() {
    return this.id;
  }
  use(component) {
    component.getMeta().forEach(key => {
      this.metaSet.add(key);
    })
    component.getCss().forEach(key => {
      this.cssSet.add(key);
    })
    component.getJs().forEach(key => {
      this.jsSet.add(key);
    })
    return component.getHtml();
  }
  getMeta() {
    // override
    return this.metaSet;
  }
  getCss() {
    // override
    return this.cssSet;
  }
  getJs() {
    // override
    return this.jsSet;
  }
  getHtml() {
    // override
    return '';
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
    return this.toString(strings, ...args);
  }
}