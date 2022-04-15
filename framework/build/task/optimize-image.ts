import { Task } from '../task.js';
// https://github.com/GoogleChromeLabs/squoosh/tree/dev/libsquoosh
// @ts-ignore
import { ImagePool } from '@squoosh/lib';
import { cpus } from 'os';
import * as fs from 'fs';

export class OptimizeImage extends Task {
  run(index: number): Promise<any> {
    this.logAppend(`now optimizing image`);
    return new Promise((resolve, reject) => {
      const workDirectory:string = this.settings.workdir;
      const articleList: Array<string> = this.settings.articlelist;

      // First copy all the common images
      const fileObjects: Array<fs.Dirent> = fs.readdirSync(
        `${workDirectory}/img`, { withFileTypes: true });
      for (let dirent of fileObjects) {
        if (dirent.isDirectory()) {
          continue;
        }
        this.mkdir(`./public/img`);
        fs.copyFileSync(
          `${workDirectory}/img/${dirent.name}`, `./public/img/${dirent.name}`);
      }

      // Next optimize all the article images
      const imagePool:ImagePool = new ImagePool(cpus().length);
      const optimizeImg = async (): Promise<any> => {
        for (let articleId of articleList) {
          const fileObjects: Array<fs.Dirent> = fs.readdirSync(
            `${workDirectory}/${articleId}/img`, { withFileTypes: true });
          for (let dirent of fileObjects) {
            if (dirent.isDirectory()) {
              continue;
            }
            const fileName:string = dirent.name;
            const fileSrc:string = `${workDirectory}/${articleId}/img/${fileName}`;
            const fileDestDir:string = './public/img/article'
            this.mkdir(fileDestDir);
            const fileDest:string = `${fileDestDir}/${fileName}`;
            // Only optimize png. Just copy the rest.
            if (!fileName.endsWith('.png')) {
              fs.copyFileSync(fileSrc, fileDest);
              continue;
            }
            // Optimize
            const processImage = async (): Promise<any> => {
              const file:Buffer = fs.readFileSync(fileSrc);
              const image:ImagePool = imagePool.ingestImage(file);
              const preprocessOptions = {
                resize: {
                  width: 700
                }
              };
              await image.preprocess(preprocessOptions);
              const encodeOptions = {
                oxipng: {}
              };
              await image.encode(encodeOptions);
              const binary = (await image.encodedWith.oxipng).binary
              fs.writeFileSync(fileDest, binary, 'binary');
              this.logAppend('.');
            }
            await processImage();
          }
        }
        await imagePool.close();
        this.log('');
        this.log('OPTIMIZE IMAGE - COMPLETE', index);
        resolve('complete');
      }
      optimizeImg();
    });
  }
};
