import { TaskRunner } from './task-runner.js';

export class Build {
  constructor(settings) {
    this.settings = settings;
  }
  run() {
    // Generate blog
    const runner = new TaskRunner(this.settings);
    runner.run();
  }
}

