import { createParamDecorator, ExecutionContext } from '@nestjs/common';
export const ReqParseAuthToken = createParamDecorator(
  (data: any, ctx: ExecutionContext): string => {
    const request = ctx.switchToHttp().getRequest();
    // console.log('request.headers', request.headers);
    const Authorization =
      request.headers['Authorization'] || request.headers['authorization'];
    if (Authorization) {
      const token = Authorization.split('Bearer ').filter(
        (value: any) => value,
      )[0];
      return token;
    } else {
      return '';
    }
  },
);
//
// return this.authService.logout(
//   request.headers['authorization'].replace('Bearer ', ''),
// );
