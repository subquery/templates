import axios from 'axios';

const TEMPLATES_REMOTE = 'https://raw.githubusercontent.com/subquery/templates/main/templates.json';

export interface Template {
  name: string;
  description: string;
  remote: string;
  branch: string;
  network: string;
  endpoint: string;
  specVersion: string;
}

/**
 * @description Fetch templates from Github remote
 * @returns {Promise<Template[] | void>}
 */
 export async function fetchTemplates(remote: string = TEMPLATES_REMOTE): Promise<Template[] | void> {
  return axios
    .create()
    .get(remote)
    .then(({data}) => data as Template[])
    .catch((err) => {
      throw new Error(`Unable to reach endpoint '${remote}', ${err}`);
    });
}