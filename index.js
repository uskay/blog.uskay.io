import { Build } from './out/framework/build/build.js';
import * as fs from 'fs';

const settings = JSON.parse(fs.readFileSync('./settings.json'))
settings.option = new Map();
process.argv.slice(2).forEach((val, index) => {
  if(val.includes('=') && val.startsWith('--')){
    const optionKey = val.split('=')[0];
    const optionValue = val.split('=')[1]
    settings.option.set(optionKey, optionValue);
  }
});

const build = new Build(settings);
build.run();
