import { GlobalHeader } from '../component/global-header.js';
import { Route } from './route.js';
import { Profile } from '../component/profile.js';
import { MarkDown } from '../component/markdown.js';
import { GlobalFooter } from '../component/global-footer.js';
import { Reco } from '../component/reco.js';

export class Article extends Route {
  compose() {
    const md = this.idMdMap.get(this.articleId);
    const globalHeader = this.use(new GlobalHeader());
    const markUp = this.use(new MarkDown(md, {route: 'article'}));
    const profile = this.use(new Profile());
    const reco = this.use(new Reco(this.idMdMap, this.articleId));
    const globalFooter = this.use(new GlobalFooter());
    const getMetaData = _ => {
      // Format example:
      // ![image](/img/article/001-012.png 2x1)
      // # 🌏 Hello World! Progressive Web-Blog!!
      // ### Web ComponentsでPWAなブログを作ってみた。[Loading編]
      const meta = {};
      md.split('\n').slice(0, 3).forEach(line => {
        if (line.startsWith('!')) {
          meta.image = line.match(/\((.+\.png)/)[1];
        }
        if (line.startsWith('# ')) {
          meta.title = line.split('# ')[1];
        }
        if (line.startsWith('### ')) {
          meta.description = line.split('### ')[1];
        }
      });
      return meta;
    }
    const meta = getMetaData();
    // compose page
    this.meta/* html */`
      <title>${meta.title} | ウェブボウズ</title>
      <link rel="preload" as="image" href="https://blog.uskay.io${meta.image}" />
      <meta property="og:title" content="${meta.title}" />
      <meta property="og:type" content="article" />
      <meta property="og:url" content="/article/${this.articleId}" />
      <meta property="og:image" content="https://blog.uskay.io${meta.image}" />
      <meta property="og:site_name" content="ウェブボウズ" />
      <meta property="og:description" content="${meta.description}" />
      <meta property="fb:app_id" content="1786319984995103" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@uskay" />
      <meta name="twitter:creator" content="@uskay" />
    `;    
    this.css/* css */`
      .container {
          width: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
      }
      .container > .grid {
          width: 95%;
          max-width: 800px;
          display: grid;
          grid-template-columns: 100%;
      }
      .container > .grid > .article {
          width: 100%;
          max-width: 800px;
      }
      h1 {
          margin-top:30px;
      }
      hr {
          display: block;
          height: 1px;
          border: 0;
          border-top: 1px solid #595959;
          margin: 40px 0 20px 0;
          padding: 0;
      }
    `;
    this.html/* html */`
      ${globalHeader}
      <div class="container">
          <div class="grid">
              <div class="article">
                  ${markUp}      
              </div>
              ${reco}
              <hr/>
              ${profile}
          </div>
      </div>      
      ${globalFooter}
    `;
  }
}



