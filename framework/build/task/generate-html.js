import { Task } from '../task.js';
import { Top } from '../../route/top.js';
import { Article } from '../../route/article.js';
import * as fs from 'fs';

export class GenerateHtml extends Task {
  run(index) {
    return new Promise((resolve, reject) => {
      const workDirectory = this.settings.workdir;
      const articleList = this.settings.articlelist;
      const getMarkdown = articleId => {
        const markDownPath = `${workDirectory}/${articleId}/${articleId}.md`
        return fs.readFileSync(markDownPath, 'utf8');
      }
      const minify = html => {
        html = html.replace(/\s\s+/g, ' ');
        html = html.split('\n').join(' ');
        return html;
      }
      // basically JavaScript's Map is LinkedHashMap (keeps things in order)
      const idMdMap = new Map();
      articleList.forEach(articleId => {
        idMdMap.set(articleId, getMarkdown(articleId));
      });
      const top = new Top(idMdMap);

      // Copy 404.html & sw.js
      this.mkdir('./public');
      const fileObjects = fs.readdirSync(
        `${workDirectory}`, { withFileTypes: true });
      for (let dirent of fileObjects) {
        if (dirent.isDirectory()) {
          continue;
        }
        if (dirent.name === '404.html' || dirent.name === 'sw.js') {
          fs.copyFileSync(
            `${workDirectory}/${dirent.name}`, `./public/${dirent.name}`);
        }
      }

      // Generate top.html
      fs.writeFileSync('./public/index.html',
        minify(top.build()), 'utf-8', (e) => {
          throw e;
        });

      // Generate articles
      articleList.forEach(articleId => {
        const articleDirectory = './public/article';
        const article = new Article(articleId, getMarkdown(articleId));
        this.mkdir(articleDirectory)
        fs.writeFileSync(`./public/article/${articleId}.html`,
          minify(article.build()), 'utf-8', (e) => {
            throw e;
          });
      });
      this.log('GENERATE HTML - COMPLETE', index);
      resolve();
    });
  }
};
