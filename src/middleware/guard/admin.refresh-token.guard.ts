import { AuthGuard } from '@nestjs/passport';

export class AdminRefreshTokenGuard extends AuthGuard('adminRefreshToken') {}
