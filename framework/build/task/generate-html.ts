import { Task } from '../task.js';
import { Top } from '../../route/top.js';
import { Article } from '../../route/article.js';
import * as fs from 'fs';

export class GenerateHtml extends Task {
  run(index: number): Promise<any> {
    return new Promise((resolve) => {
      const workDirectory:string = this.settings.workdir;
      const articleList:Array<string> = this.settings.articlelist;
      const getMarkdown = (articleId:string):string => {
        const markDownPath:string = `${workDirectory}/${articleId}/${articleId}.md`
        return fs.readFileSync(markDownPath, 'utf8');
      }
      const minify = (html:string):string => {
        html = html.replace(/\s\s+/g, ' ');
        html = html.split('\n').join(' ');
        return html;
      }
      // basically JavaScript's Map is LinkedHashMap (keeps things in order)
      const idMdMap:Map<string, string> = new Map();
      articleList.forEach((articleId:string) => {
        idMdMap.set(articleId, getMarkdown(articleId));
      });
      const top:Top = new Top(idMdMap);

      // Copy 404.html & sw.js
      this.mkdir('./public');
      const fileObjects: Array<fs.Dirent> = fs.readdirSync(
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
        minify(top.build()), 'utf-8');

      // Generate articles
      articleList.forEach((articleId:string) => {
        const articleDirectory:string = './public/article';
        const article:Article = new Article(idMdMap, articleId);
        this.mkdir(articleDirectory)
        fs.writeFileSync(`./public/article/${articleId}.html`,
          minify(article.build()), 'utf-8');
      });
      this.log('GENERATE HTML - COMPLETE', index);
      resolve('complete');
    });
  }
};
