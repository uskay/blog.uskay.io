import { Component } from './component.js';
import { MarkDown } from './markdown.js';

export class Reco extends Component {
  idMuMap: Map<string, string>;

  constructor(idMdMap: Map<string, string>, articleId: string) {
    super();
    this.idMuMap = new Map();
    [...idMdMap.keys()].forEach(key => {
      if (key !== articleId) {
        const md = idMdMap.get(key);
        if (md) {
          const mu = this.use(new MarkDown(md.split('\n').slice(0, 3).join('\n')));
          this.idMuMap.set(key, mu);
        }
      }
    });
  }
  getCss(): Set<string> {
    const getColumns = (): string => {
      let size = this.idMuMap.size;
      // Up to 5 article snippets
      if (size > 5) {
        size = 5;
      }
      const columns = new Array(size).fill('70%').join(' ');
      return columns;
    }
    return this.css/* css */`
      .reco {
        padding: 10px;
        display: grid;
        grid-template-columns: ${getColumns()};
        grid-gap: 20px;
        overflow-x: scroll;
        overflow-y: hidden;
        font-size: 0.7em;
      }
      .reco .reco-article-snippet {
        margin-bottom: 30px;
        padding: 20px;
        border: 1px solid #595959;
        border-radius: 5px;
      }
      .reco a {
        text-decoration: none;
        color: #f8f9fa;
      }
      .reco::-webkit-scrollbar {
        background: #253239;
      }    
      .reco::-webkit-scrollbar-thumb {
          background: #364953;
          border-radius: 1ex;
          box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.75);
      }
    `;
  }
  getHtml(): string {
    return this.html/* html */`
      <div class="reco">
        ${[...this.idMuMap.keys()].reverse().map(key => {
      const mu = this.idMuMap.get(key);
      return `<a href="/article/${key}"><div class="reco-article-snippet">${mu}</div></a>`
    }).join('')}
      </div>
    `;
  }
}
