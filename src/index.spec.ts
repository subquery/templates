//import {downloadTemplates} from './index';
import {execSync} from 'child_process';
import {fetchTemplates, Template} from './index';
import {URL} from 'url';

describe('templates', () => {
  describe('index', () => {
    let branch;
    let templates: Template[];

    beforeAll(() => {
      branch = `https://raw.githubusercontent.com/subquery/templates/${execSync('git rev-parse --abbrev-ref HEAD')
        .toString()
        .trim()}/templates.json`;
    });

    it('fetch templates', async () => {
      templates = (await fetchTemplates(branch)) as Template[];
    });

    describe('templates', () => {
      it('formatting', async () => {
        for (const template of templates) {
          expect(template.network.charAt(0).toUpperCase()).toEqual(template.network.charAt(0));
          expect(new URL(template.remote)).toBeTruthy;
          expect(new URL(template.endpoint)).toBeTruthy();
          ['\n', '\t'].forEach((s) => expect(template.name).not.toContain(s));
        }
      });
    });
  });
});
