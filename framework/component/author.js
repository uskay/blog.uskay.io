import { Component } from './component.js';
export class Author extends Component {
  getCss() {
    return this.css.add(/* css */`
      .author {
        margin-top: 20px;
      }
      .author > .grid {
        display: grid;
        grid-template-columns: 50px 1fr;
        grid-gap: 20px;
      }
      .author > .grid > .wrapper {
        display: flex;
        justify-content: left;
        align-items: center;
      }
      .author > .grid > .wrapper > img {
        width: 50px;
        height: 50px;
        border-radius: 50%;
      }
      `);
  }
  getHtml() {
    return /* html */`
      <div class="author">
      <div class="grid">
        <div class="wrapper">
          <img src="/img/me.png" alt="me" loading="lazy">
        </div>
        <div class="wrapper">
          <a href="#whoami">Yusuke Utsunomiya</a>
        </div>
      </div>
      </div>
      `;
  }
}