import {templates} from './templates';

describe('templates', () => {
  it('formatting', () => {
    for (const template of templates) {
      expect(template.network.charAt(0).toUpperCase()).toEqual(template.network.charAt(0));
    }
  });
});
