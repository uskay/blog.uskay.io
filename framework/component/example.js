import { Component } from './component.js';
export class Example extends Component {
  getCss() {
    return this.css.add(/* css */`
      .example {
        width: 100%;
        height: 50px;
        display: none;
    }
    `);
  }
  getJs() {
    return this.js.add(/* javascript */`
      window.addEventListener('load', _ => {
        document.querySelector('.example').style = 'block';
      });
    `);
  }
  getHtml() {
    const name = 'uskay';
    return /* html */`
      <div class="example">
        My name is ${name}
      </div>
  `;
  }
}
