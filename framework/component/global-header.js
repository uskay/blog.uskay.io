import { Component } from './component.js';
export class GlobalHeader extends Component {
  getCss() {
    return this.css.add(/* css */`
      .global-header {
        width: 100%;
        height: 60px;
        font-family: 'Nico Moji';
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 2.0em;
      }
      .global-header > a {
        text-decoration: none;
        color: white;
      }
    `);
  }
  getHtml() {
    return /* html */`
      <div class="global-header">
        <a href="/">ウェブボウズ</a>
      </div>
    `;
  }
}