import { Module } from '@nestjs/common';
import { UserController } from './user.controller';

@Module({
  providers: [],
  controllers: [UserController],
  imports: [],
})
export class UserModule {}
