import { Component } from './component.js';
export class GlobalFooter extends Component {
  getCss(): Set<string> {
    return this.css/* css */`
      .global-footer {
        width: 100%;
        height: 150px;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 0.7em;
        color: #a3a2a2;
        font-style: italic;
        text-align: center;
      }
    `;
  }
  getHtml(): string {
    return this.html/* html */`
      <div class="global-footer">
        <div>
          <div>Except as otherwise noted, the content of this page is licensed under the Creative Commons Attribution 3.0 License,</div>    
          <div>and code samples are licensed under the Apache 2.0 License.</div>
        </div>
      </div>
    `;
  }
}