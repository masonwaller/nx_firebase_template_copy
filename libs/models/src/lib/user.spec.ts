import { UserRoles } from './user.interface';

describe('models', () => {
  it('User', () => {
    expect(UserRoles.ADMIN).toEqual('Admin');
    expect(UserRoles.USER).toEqual('User');
  });
});
