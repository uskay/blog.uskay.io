import { TaskRunner } from './task-runner.js';

export class Build {
  settings: any;
  constructor(settings:any) {
    this.settings = settings;
  }
  run() {
    // Generate blog
    const runner: TaskRunner = new TaskRunner(this.settings);
    runner.run(0);
  }
}

