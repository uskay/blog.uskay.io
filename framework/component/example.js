import { Component } from './component.js';
export class Example extends Component {
  getCss() {
    return this.css/* css */`
      .example {
        width: 100%;
        height: 50px;
        display: none;
    }
    `;
  }
  getJs() {
    return this.js/* javascript */`
      window.addEventListener('load', _ => {
        document.querySelector('.example').style = 'block';
      });
    `;
  }
  getHtml() {
    const name = 'uskay';
    return this.html/* html */`
      <div class="example">
        My name is ${name}
      </div>
  `;
  }
}
