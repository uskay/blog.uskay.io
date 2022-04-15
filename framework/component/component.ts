export class Component {
  id: string;
  metaSet: Set<string>;
  cssSet: Set<string>;
  jsSet: Set<string>;
  constructor() {
    // https://werxltd.com/wp/2010/05/13/javascript-implementation-of-javas-string-hashcode-method/
    const simpleHash = (str: string): string => {
      let hash: number = 0;
      for (let i: number = 0; i < str.length; i++) {
        const char: number = str.charCodeAt(i);
        hash = (hash << 5) - hash + char;
        hash &= hash;
      }
      return new Uint32Array([hash])[0].toString(36);
    };
    this.id = simpleHash(`ID${(new Date()).getTime()}${Math.random()}`)
    this.metaSet = new Set<string>();
    this.cssSet = new Set<string>();
    this.jsSet = new Set<string>();
  }
  getId(): string {
    return this.id;
  }
  use(component: Component): string {
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
  getMeta(): Set<string> {
    // override
    return this.metaSet;
  }
  getCss(): Set<string> {
    // override
    return this.cssSet;
  }
  getJs(): Set<string> {
    // override
    return this.jsSet;
  }
  getHtml(): string {
    // override
    return '';
  }
  toString(strings: TemplateStringsArray, ...args: Array<string>): string {
    let value: string = '';
    for (let i: number = 0; i < strings.length; i++) {
      let arg: string = '';
      if (i < args.length) {
        arg = args[i];
      }
      value += strings[i] + arg;
    }
    return value;
  }
  meta(strings: TemplateStringsArray, ...args: Array<string>): Set<string> {
    return this.metaSet.add(this.toString(strings, ...args));
  }
  js(strings: TemplateStringsArray, ...args: Array<string>): Set<string> {
    return this.jsSet.add(this.toString(strings, ...args));
  }
  css(strings: TemplateStringsArray, ...args: Array<string>): Set<string> {
    return this.cssSet.add(this.toString(strings, ...args));
  }
  html(strings: TemplateStringsArray, ...args: Array<string>): string {
    return this.toString(strings, ...args);
  }
}