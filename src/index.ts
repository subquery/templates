import {Template} from './templates';
import simpleGit from 'simple-git';
import * as path from 'path';

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
