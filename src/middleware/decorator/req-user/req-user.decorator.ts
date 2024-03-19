import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { user } from '@prisma/client';
export type reqUser = user & {
  authToken: {
    tokenId: string;
  };
};
export const ReqUser = createParamDecorator(
  (data: string | undefined, ctx: ExecutionContext): reqUser => {
    const request = ctx.switchToHttp().getRequest();
    if (data) return request.user[data];
    return request.user;
  },
);
