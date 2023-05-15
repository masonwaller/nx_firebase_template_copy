import { config } from './config';

describe('constants', () => {
  it('should work', () => {
    expect(config.pubsub.region).toEqual('us-east4');
  });
});
