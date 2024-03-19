import { UserRefreshTokenGuard } from './user-refresh-token.guard';

describe('UserRefreshTokenGuard', () => {
  it('should be defined', () => {
    expect(new UserRefreshTokenGuard()).toBeDefined();
  });
});
