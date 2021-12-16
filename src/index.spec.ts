import {templates} from './templates';
import {downloadTemplate} from './index';
import {execSync} from 'child_process';
import {rmdirSync} from 'fs';

describe('index', () => {
  it('download and check templates', async () => {
    for (const template of templates) {
      await downloadTemplate(template, '/tmp/');
      const path = `/tmp/${template.name}`;
      execSync(`cd ${path} && yarn && yarn codegen && yarn build`);
      rmdirSync(path, {recursive: true});
    }
  }, 1000000);
});
