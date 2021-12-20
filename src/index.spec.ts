//import {downloadTemplates} from './index';
import {execSync} from 'child_process';
import {rmdirSync} from 'fs';

describe('index', () => {
  let branch;

  beforeAll(() => {
    branch = `https://raw.githubusercontent.com/subquery/templates/${execSync('git rev-parse --abbrev-ref HEAD')
      .toString()
      .trim()}/templates.json`;
  })

  it('download templates json', async () => {
    console.log(branch);
    //downloadTemplates();
  });
});

describe('templates', () => {
  it('formatting', () => {
    // for (const template of templates) {
    //   expect(template.network.charAt(0).toUpperCase()).toEqual(template.network.charAt(0));
    // }
  });
});
