import { Task } from '../task.js';
// https://github.com/GoogleChromeLabs/squoosh/tree/dev/libsquoosh
import { ImagePool } from '@squoosh/lib';
import { cpus } from 'os';
import * as fs from 'fs';

export class OptimizeImage extends Task {
  run(index) {
    this.logAppend(`now optimizing image`);
    return new Promise((resolve, reject) => {
      const workDirectory = this.settings.workdir;
      const articleList = this.settings.articlelist;

      // First copy all the common images
      const fileObjects = fs.readdirSync(
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
      const imagePool = new ImagePool(cpus().length);
      const optimizeImg = async _ => {
        for (let articleId of articleList) {
          const fileObjects = fs.readdirSync(
            `${workDirectory}/${articleId}/img`, { withFileTypes: true });
          for (let dirent of fileObjects) {
            if (dirent.isDirectory()) {
              continue;
            }
            const fileName = dirent.name;
            const fileSrc = `${workDirectory}/${articleId}/img/${fileName}`;
            const fileDestDir = './public/img/article'
            this.mkdir(fileDestDir);
            const fileDest = `${fileDestDir}/${fileName}`;
            // Only optimize png. Just copy the rest.
            if (!fileName.endsWith('.png')) {
              fs.copyFileSync(fileSrc, fileDest);
              continue;
            }
            // Optimize
            const processImage = async _ => {
              const file = fs.readFileSync(fileSrc);
              const image = imagePool.ingestImage(file);
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
              fs.writeFileSync(fileDest, binary, 'binary', e => {
                throw e;
              });
              this.logAppend('.');
            }
            await processImage();
          }
        }
        await imagePool.close();
        this.log('');
        this.log('OPTIMIZE IMAGE - COMPLETE', index);
        resolve();
      }
      optimizeImg();
    });
  }
};
