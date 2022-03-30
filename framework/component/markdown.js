import { Component } from './component.js';
import { Gist } from './gist.js';
import { Video } from './video.js';
import { Image } from './img.js';
import { Author } from './author.js';
import { Note } from './note.js';

export class MarkDown extends Component {
  constructor(md) {
    super();
    this.md = md.replace(/</g, '&lt;').replace(/>/g, '&gt;');
    this.previouseRow;
    const componentInstance = this;
    this.Row = class Row {
      constructor(row, isOl, isUl, isBlock, mdInstance) {
        this.row = row;
        this.isOl = isOl === undefined ? false : isOl;
        this.isUl = isUl === undefined ? false : isUl;
        this.isBlock = isBlock;
        this.mdInstance = mdInstance;
      }
      getInnerHTML() {
        if (this.isOl === true || this.isUl === true || this.isBlock === true) {
          return this.row;
        }
        return `${this.row}<br>`;
      }
      createNewRow(regex, replace) {
        return new Row(this.row.replace(regex, replace), this.isOl, this.isUl, this.isBlock);
      }

      /**
       * Block elements
       */
      parseH1() {
        const regex = /^#\s(.+)/;
        const replace = `<h1>$1</h1>`;
        if (this.row.match(regex)) {
          this.isBlock = true;
          return this.createNewRow(regex, replace);
        }
        return this;
      }
      parseH2() {
        const regex = /^##\s(.+)/;
        const replace = `<h2>$1</h2>`;
        if (this.row.match(regex)) {
          this.isBlock = true;
          return this.createNewRow(regex, replace);
        }
        return this;
      }
      parseH3() {
        const regex = /^###\s(.+)/;
        const replace = `<h3>$1</h3>`;
        if (this.row.match(regex)) {
          this.isBlock = true;
          return this.createNewRow(regex, replace);
        }
        return this;
      }
      parseHR() {
        const regex = /^----$/;
        const replace = `<hr>`;
        if (this.row.match(regex)) {
          this.isBlock = true;
          return this.createNewRow(regex, replace);
        }
        return this;
      }
      parseBlockQuote() {
        const regex = /^>(.+)/;
        const replace = `<blockquote>$1</blockquote>`;
        if (this.row.match(regex)) {
          this.isBlock = true;
          return this.createNewRow(regex, replace);
        }
        return this;
      }
      parseGist() {
        const regex = /^```gist\s(.+)```$/;
        const match = this.row.match(regex)
        if (match && match[1]) {
          const gistId = match[1];
          const gist = componentInstance.use(new Gist(gistId));
          this.isBlock = true;
          return this.createNewRow(regex, gist);
        }
        return this;
      }
      parseImg() {
        const regex = /^!\[.+\]\((.+)\s(\d+)x(\d+)\)$/;
        const match = this.row.match(regex);
        if (match && match[1] && match[2] && match[3]) {
          this.isBlock = true;
          if (match[1].includes('https://www.youtube.com/embed/')) {
            const videoSrc = match[1];
            const video = componentInstance.use(new Video(videoSrc, match[2], match[3]));
            return this.createNewRow(regex, video);
          }
          const imgSrc = match[1];
          const image = componentInstance.use(new Image(imgSrc, match[2], match[3]));
          return this.createNewRow(regex, image);
        }
        return this;
      }
      parseAuthor() {
        const regex = /^@Author$/;
        const match = this.row.match(regex)
        if (match) {
          const author = componentInstance.use(new Author());
          this.isBlock = true;
          return this.createNewRow(regex, author);
        }
        return this;
      }
      parseNote() {
        const regex = /^`````(.+)`````$/;
        const match = this.row.match(regex)
        if (match && match[1]) {
          const note = componentInstance.use(new Note(match[1]));
          this.isBlock = true;
          return this.createNewRow(regex, note);
        }
        return this;
      }

      /**
       * Inline elements
       */
      parseStrong() {
        return this.createNewRow(/\*\*(.+?)\*\*/g, `<b>$1</b>`);
      }
      parseEmphasis() {
        return this.createNewRow(/\*(.+?)\*/g, `<em>$1</em>`);
      }
      parseLink() {
        return this.createNewRow(/\[(.+?)\]\((https?:\/\/.+?)\)/g, `<a href='$2' target='_blank'>$1</a>`);
      }
      parseCode() {
        return this.createNewRow(/`(.+?)`/g, `<code>$1</code>`);
      }
      parseLineThrough() {
        return this.createNewRow(/~(.+?)~/g, `<span style='text-decoration: line-through'>$1</span>`);
      }

      /**
       * Ol / Ul lists
       */
      parseList() {
        const regexOl = /^[00-99]\.\s(.+)$/;
        const regexUl = /^-\s(.+)$/;
        const replace = `<li>$1</li>`;
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
    const markUp = [];
    this.md.split('\n').forEach(
      line => {
        let row = this.createRow(line);
        markUp.push(row.getInnerHTML());
        this.previouseRow = row;
      }
    );
    this.markUp = markUp.join('');
  }

  createRow(row) {
    let isOl = false;
    let isUl = false;
    let isBlock = false;
    if (this.previouseRow) {
      isOl = this.previouseRow.isOl;
      isUl = this.previouseRow.isUl;
    }
    return new this.Row(row, isOl, isUl, isBlock)
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

  getCss() {
    return this.css.add(/* css */`
      h1 {
        line-height: 1.4em;
      }
    `);
  }
  getHtml() {
    return this.markUp;
  }
}
