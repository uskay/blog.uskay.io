import { Task } from '../task.js';
import * as fs from 'fs';

export class CleanUp extends Task {
  run(index) {
    return new Promise((resolve, reject) => {
      const target = this.settings.option.get(this.option.target.key);
      let dir = this.settings.distdir;
      if (target && target === this.option.target.value.articleOnly) {
        dir = `${dir}/article`;
      }
      if (target && target === this.option.target.value.imageOnly) {
        dir = `${dir}/img`;
      }
      if (fs.existsSync(dir)) {
        fs.rmSync(dir, { recursive: true })
      }
      this.log('CLEAN UP - COMPLETE', index);
      resolve();
    });
  }
};
