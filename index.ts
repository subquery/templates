import * as path from 'path';
import axios from 'axios';
import simpleGit from 'simple-git';

const TEMPLATES_REMOTE = 'https://raw.githubusercontent.com/subquery/templates/main/templates.json';

export interface Template {
  name: string;
  description: string;
  remote: string;
  branch: string;
  network: string;
  specVersion: string;
}

/**
 * @description Fetch templates from Github remote
 * @returns {Promise<Template[] | void>}
 */
export async function fetchTemplates(): Promise<Template[] | void> {
  return axios
    .create()
    .get(TEMPLATES_REMOTE)
    .then(({data}) => data as Template[])
    .catch((err) => {
      throw new Error(`Unable to reach endpoint '${TEMPLATES_REMOTE}', ${err}`);
    });
}

/**
 * @param {Template} template Template to download
 * @param {string} localPath Local path to clone template to
 * @description Download a template from Github remote
 */
export async function downloadTemplate(template: Template, localPath: string) {
  const projectPath = path.join(localPath, template.name);
  await simpleGit()
    .clone(template.remote, projectPath, ['-b', template.branch, '--single-branch'])
    .catch((err) => {
      throw new Error(`Failed to clone template from Github, ${err}`);
    });
}
