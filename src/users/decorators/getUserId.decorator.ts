// import { createParamDecorator } from '@nestjs/common';
// export const GetUserId = createParamDecorator(
//   (data, [root, args, ctx, info]) => {
//     return ctx.req.session.userId;
//   },
// );
import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const User = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return request.user;
  },
);
