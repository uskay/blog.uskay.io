import { GlobalHeader } from '../component/global-header.js';
import { Route } from './route.js';
import { Profile } from '../component/profile.js';
import { MarkDown } from '../component/markdown.js';
import { GlobalFooter } from '../component/global-footer.js';

export class Top extends Route {
  compose() {
    const globalHeader = this.use(new GlobalHeader());
    // articleId=MarkUp
    const idMuMap = new Map();
    [...this.idMdMap.keys()].forEach(key => {
      const md = this.idMdMap.get(key);
      const mu = this.use(new MarkDown(md.split('\n').slice(0, 4).join('\n')));
      idMuMap.set(key, mu);
    });
    const profile = this.use(new Profile());
    const globalFooter = this.use(new GlobalFooter());
    // compose page
    this.meta/* html */`
      <title>ウェブボウズ</title>
      <meta property="og:title" content="ウェブボウズ" />
      <meta property="og:type" content="article" />
      <meta property="og:url" content="/" />
      <meta property="og:image" content="/img/top.png" />
      <meta property="og:site_name" content="ウェブボウズ" />
      <meta property="og:description" content="⚡ I LOVE WEB ⚡" />
      <meta property="fb:app_id" content="1786319984995103" />
      <meta name="twitter:card" content="summary" />
      <meta name="twitter:site" content="uskay" />
      <meta name="twitter:creator" content="uskay" />
    `;
    this.css/* css */`
      .container {
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
      }
      @media (max-width: 1199px) {
        .container > .grid {
          width: 95%;
          max-width: 700px;
          display: grid;
          grid-template-columns: 100%;
        }
        .container > .grid > .article-list {
          width: 100%;
          max-width: 700px;
        }
      }
      @media (min-width: 1200px) {
        .container > .grid {
          width: 90%;
          max-width: 1100px;
          display: grid;
          grid-template-columns: 1fr 350px;
          grid-gap: 50px;
        }
        .container > .grid > .article-list {
          width: 100%;
          max-width: 750px;
        }
      }
      .article-snippet {
        margin-bottom: 30px;
        padding: 20px;
        border: 1px solid #595959;
        border-radius: 5px;
      }
      .article-snippet:hover {
        background-color: #393b41;
      }
      .article-list a {
        text-decoration: none;
        color: #f8f9fa;
      }
      h1 {
        margin-top:30px;
      }
   `;
    this.html/* html */`
      ${globalHeader}
      <div class="container">
        <div class="grid">
          <div class="article-list">
            <h2 style="color: #a3a2a2; font-size: 1.2em">Randomly posted blog</h2>
            ${[...idMuMap.keys()].reverse().map(key => {
              const mu = idMuMap.get(key);
              return `<a href="/article/${key}"><div class="article-snippet">${mu}</div></a>`
            }).join('')
            }                        
          </div>
          ${profile}
        </div>
      </div>
      ${globalFooter}
  `;
  }
}



