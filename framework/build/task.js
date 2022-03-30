import * as fs from 'fs';
import * as process from 'process';

export class Task {
  constructor(settings) {
    this.settings = settings;
    this.option = {
      target: {
        key: '--target',
        value: {
          articleOnly: 'articleOnly',
          imageOnly: 'imageOnly'
        }
      }
    }
    this.taskList = [];
  }
  log(message, index) {
    const ol = index ? `${index}. ` : '';
    console.log('\x1b[36m%s\x1b[0m', `${ol}${message}`);
  }
  logAppend(message) {
    process.stdout.write(message);
  }
  mkdir(dir) {
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(
        dir, { recursive: true }, (err) => {
          if (err) throw err;
        });
    }
  }
  add(task) {
    this.taskList.push(task);
  }
  run() {
    // Override this to execute individual task
  }
  async runAll() {
    let i = 1;
    for (const task of this.taskList) {
      await task.run(i);
      i++;
    }
  }
};