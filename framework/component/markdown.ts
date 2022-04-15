import { Component } from './component.js';
import { Gist } from './gist.js';
import { Video } from './video.js';
import { Image } from './img.js';
import { Author } from './author.js';
import { Note } from './note.js';

export class MarkDown extends Component {
  md: string;
  previousRow: Row | null;
  markUpRows: Array<string>;
  markUp: string;
  isArticle: boolean;
  constructor(md: string, option?: { route: string }) {
    super();
    this.md = md.replace(/</g, '&lt;').replace(/>/g, '&gt;');
    this.previousRow = null;
    const componentInstance: MarkDown = this;
    this.isArticle = false;
    if (option?.route === 'article') {
      this.isArticle = true;
    }
    this.markUpRows = [];
    this.md.split('\n').forEach(
      (line: string) => {
        let row: Row = this.createRow(line);
        this.markUpRows.push(row.getInnerHTML());
        this.previousRow = row;
      }
    );
    this.markUp = this.markUpRows.join('');
  }

  createRow(row: string): Row {
    const isOl: boolean = !!this.previousRow?.isOl;
    const isUl: boolean = !!this.previousRow?.isUl;
    const isBlock: boolean = false;
    return new Row(row, isOl, isUl, isBlock, this)
      /** Try block elements first **/
      .parseH1()
      .parseH2()
      .parseH3()
      .parseHR()
      .parseGist()
      .parseBlockQuote()
      .parseImg()
      .parseAuthor()
      .parseNote()
      /** Try inline elements next **/
      .parseStrong()
      .parseLink()
      .parseEmphasis()
      .parseCode()
      .parseLineThrough()
      /** Lastly, parse Ol Ul lists **/
      .parseList();
  }

  getCss(): Set<string> {
    return this.css/* css */`
      h1 {
        line-height: 1.4em;
      }
    `;
  }
  getHtml(): string {
    return this.html`${this.markUp}`;
  }
}

class Row {
  row: string;
  isOl: boolean;
  isUl: boolean;
  isBlock: boolean;
  componentInstance: MarkDown;
  constructor(row: string, isOl: boolean, isUl: boolean, isBlock: boolean, componentInstance: MarkDown) {
    this.row = row;
    this.isOl = isOl;
    this.isUl = isUl;
    this.isBlock = isBlock;
    this.componentInstance = componentInstance;
  }
  getInnerHTML(): string {
    if (this.isOl === true || this.isUl === true || this.isBlock === true) {
      return this.row;
    }
    return `${this.row}<br>`;
  }
  createNewRow(regex: RegExp, replace: string): Row {
    return new Row(this.row.replace(regex, replace), this.isOl, this.isUl, this.isBlock, this.componentInstance);
  }

  /**
   * Block elements
   */
  parseH1(): Row {
    const regex: RegExp = /^#\s(.+)/;
    const replace: string = `<h1>$1</h1>`;
    if (this.row.match(regex)) {
      this.isBlock = true;
      return this.createNewRow(regex, replace);
    }
    return this;
  }
  parseH2(): Row {
    const regex: RegExp = /^##\s(.+)/;
    const replace: string = `<h2>$1</h2>`;
    if (this.row.match(regex)) {
      this.isBlock = true;
      return this.createNewRow(regex, replace);
    }
    return this;
  }
  parseH3(): Row {
    const regex: RegExp = /^###\s(.+)/;
    const replace: string = `<h3>$1</h3>`;
    if (this.row.match(regex)) {
      this.isBlock = true;
      return this.createNewRow(regex, replace);
    }
    return this;
  }
  parseHR(): Row {
    const regex: RegExp = /^----$/;
    const replace: string = `<hr>`;
    if (this.row.match(regex)) {
      this.isBlock = true;
      return this.createNewRow(regex, replace);
    }
    return this;
  }
  parseBlockQuote(): Row {
    const regex: RegExp = /^>(.+)/;
    const replace: string = `<blockquote>$1</blockquote>`;
    if (this.row.match(regex)) {
      this.isBlock = true;
      return this.createNewRow(regex, replace);
    }
    return this;
  }
  parseGist(): Row {
    const regex: RegExp = /^```gist\s(.+)```$/;
    const match: RegExpMatchArray | null = this.row.match(regex)
    if (match && match[1]) {
      const gistId: string = match[1];
      const gist = this.componentInstance.use(new Gist(gistId));
      this.isBlock = true;
      return this.createNewRow(regex, gist);
    }
    return this;
  }
  parseImg(): Row {
    const regex: RegExp = /^!\[.+\]\((.+)\s(\d+)x(\d+)\)$/;
    const match: RegExpMatchArray | null = this.row.match(regex);
    if (match && match[1] && match[2] && match[3]) {
      this.isBlock = true;
      if (match[1].includes('https://www.youtube.com/embed/')) {
        const videoSrc: string = match[1];
        const width: string = match[2];
        const height: string = match[3];
        const video = this.componentInstance.use(new Video(videoSrc, parseInt(width), parseInt(height)));
        return this.createNewRow(regex, video);
      }
      const imgSrc: string = match[1];
      const width: string = match[2];
      const height: string = match[3];
      let shouldLoadLazy: boolean = true;
      if (this.componentInstance.isArticle && this.componentInstance.markUpRows.length === 0) {
        shouldLoadLazy = false;
      }
      const image = this.componentInstance.use(new Image(imgSrc, parseInt(width), parseInt(height), shouldLoadLazy));
      return this.createNewRow(regex, image);
    }
    return this;
  }
  parseAuthor(): Row {
    const regex: RegExp = /^@Author$/;
    const match: RegExpMatchArray | null = this.row.match(regex)
    if (match) {
      const author = this.componentInstance.use(new Author());
      this.isBlock = true;
      return this.createNewRow(regex, author);
    }
    return this;
  }
  parseNote(): Row {
    const regex: RegExp = /^`````(.+)`````$/;
    const match: RegExpMatchArray | null = this.row.match(regex)
    if (match && match[1]) {
      const note = this.componentInstance.use(new Note(match[1]));
      this.isBlock = true;
      return this.createNewRow(regex, note);
    }
    return this;
  }

  /**
   * Inline elements
   */
  parseStrong(): Row {
    return this.createNewRow(/\*\*(.+?)\*\*/g, `<b>$1</b>`);
  }
  parseEmphasis(): Row {
    return this.createNewRow(/\*(.+?)\*/g, `<em>$1</em>`);
  }
  parseLink(): Row {
    return this.createNewRow(/\[(.+?)\]\((https?:\/\/.+?)\)/g, `<a href='$2' target='_blank'>$1</a>`);
  }
  parseCode(): Row {
    return this.createNewRow(/`(.+?)`/g, `<code>$1</code>`);
  }
  parseLineThrough(): Row {
    return this.createNewRow(/~(.+?)~/g, `<span style='text-decoration: line-through'>$1</span>`);
  }

  /**
   * Ol / Ul lists
   */
  parseList(): Row {
    const regexOl: RegExp = /^[00-99]\.\s(.+)$/;
    const regexUl: RegExp = /^-\s(.+)$/;
    const replace: string = `<li>$1</li>`;
    if (this.row.match(regexOl)) {
      if (this.isOl === false) {
        this.isOl = true;
        return this.createNewRow(regexOl, `<ol>${replace}`);
      }
      return this.createNewRow(regexOl, replace);
    } else if (this.row.match(regexUl)) {
      if (this.isUl === false) {
        this.isUl = true;
        return this.createNewRow(regexUl, `<ul>${replace}`);
      }
      return this.createNewRow(regexUl, replace);
    } else {
      if (this.isOl === true) {
        this.isOl = false;
        return this.createNewRow(/^/, `</ul>`);
      } else if (this.isUl === true) {
        this.isUl = false;
        return this.createNewRow(/^/, `</ul>`);
      }
      else return this;
    }
  }
}