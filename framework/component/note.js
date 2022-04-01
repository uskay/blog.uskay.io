import { Component } from './component.js';
export class Note extends Component {
  constructor(content) {
    super();
    this.content = content;
  }
  getCss() {
    return this.css/* css */`
      .note {
        background-color: #585216;
        padding: 10px;
        color: white;
        border-radius: 5px;
      }
    `;
  }
  getHtml() {
    return this.html/* html */`
      <div class="note">
        ${this.content}
      </div>
    `;
  }
}
