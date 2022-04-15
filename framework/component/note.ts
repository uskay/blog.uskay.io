import { Component } from './component.js';
export class Note extends Component {
  content: string;
  constructor(content: string) {
    super();
    this.content = content;
  }
  getCss(): Set<string> {
    return this.css/* css */`
      .note {
        background-color: #585216;
        padding: 10px;
        color: white;
        border-radius: 5px;
      }
    `;
  }
  getHtml(): string {
    return this.html/* html */`
      <div class="note">
        ${this.content}
      </div>
    `;
  }
}
