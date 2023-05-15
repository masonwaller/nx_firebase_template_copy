import { settings } from './firebase';

describe('firebase', () => {
  it('settings', () => {
    expect(settings.project_id).toEqual('nxfirebasetemplate');
  });
});
