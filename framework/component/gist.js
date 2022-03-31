import { Component } from './component.js';
export class Gist extends Component {
  constructor(gistId) {
    super();
    this.gistId = gistId;
  }
  getHtml() {
    return /* html */`
      <div id="gist-${this.gistId}">
        <script src="https://gist.github.com/uskay/${this.gistId}.js"></script>
      </div>
    `;
  }
}

