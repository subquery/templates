//import {downloadTemplates} from './index';
import {execSync} from 'child_process';
import axios from 'axios';
import {URL} from 'url';

describe('templates', () => {

  const TEMPLATES_REMOTE = 'https://raw.githubusercontent.com/subquery/templates/main/templates.json';

  interface Template {
    name: string;
    description: string;
    remote: string;
    branch: string;
    network: string;
    endpoint: string;
    specVersion: string;
  }

  async function fetchTemplates(remote: string = TEMPLATES_REMOTE): Promise<Template[]> {
    return axios
      .create()
      .get(remote)
      .then(({data}) => data as Template[])
      .catch((err) => {
        throw new Error(`Unable to reach endpoint '${remote}', ${err}`);
      });
  }

  let branch;
  let templates: Template[];

  beforeAll(async () => {
    branch = `https://raw.githubusercontent.com/subquery/templates/${execSync('git rev-parse --abbrev-ref HEAD')
      .toString()
      .trim()}/templates.json`;
    templates = (await fetchTemplates(branch)) as Template[];
  });

  it('formatting', async () => {
    for (const template of templates) {
      expect(template.network.charAt(0).toUpperCase()).toEqual(template.network.charAt(0));
      expect(new URL(template.remote)).toBeTruthy;
      expect(new URL(template.endpoint)).toBeTruthy();
      ['\n', '\t'].forEach((s) => expect(template.name).not.toContain(s));
    }
  });
});
