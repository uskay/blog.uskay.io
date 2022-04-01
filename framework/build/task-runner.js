import { Task } from './task.js';
import { CleanUp } from './task/clean-up.js';
import { GenerateHtml } from './task/generate-html.js';
import { OptimizeImage } from './task/optimize-image.js';

export class TaskRunner extends Task {
  async run() {
    const target = this.settings.option.get(this.option.target.key);
    this.log('======================');
    this.log('       GEN SITE       ');
    this.log('======================');
    this.add(new CleanUp(this.settings));
    if (target !== this.option.target.value.imageOnly) {
      this.add(new GenerateHtml(this.settings));
    }
    if (target !== this.option.target.value.articleOnly) {
      this.add(new OptimizeImage(this.settings));
    }
    await this.runAll();
    this.log('======================');
    this.log(' ');
  }
};