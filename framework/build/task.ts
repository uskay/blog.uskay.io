import * as fs from 'fs';
import * as process from 'process';

export class Task {
  settings: any;
  option: any;
  taskList: Array<Task>;
  constructor(settings: any) {
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
  log(message: string, index?: number): void {
    const ol = index ? `${index}. ` : '';
    console.log('\x1b[36m%s\x1b[0m', `${ol}${message}`);
  }
  logAppend(message: string): void {
    process.stdout.write(message);
  }
  mkdir(dir: string): void {
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(
        dir, { recursive: true });
    }
  }
  add(task: Task): void {
    this.taskList.push(task);
  }
  run(index: number): Promise<any> {
    // Override this to execute individual task
    return new Promise(()=>{});
  }
  async runAll(): Promise<any> {
    let i: number = 1;
    for (const task of this.taskList) {
      await task.run(i);
      i++;
    }
  }
};