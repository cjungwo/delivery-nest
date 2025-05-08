import {
  createParamDecorator,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';

export const Authorization = createParamDecorator(
  (data: any, ctx: ExecutionContext) => {
    const req = ctx.switchToHttp().getRequest();

    if (!req) {
      throw new UnauthorizedException('Enter token');
    }

    const authorization = req.headers.authorization;

    if (!authorization) {
      throw new UnauthorizedException('Enter token');
    }

    return authorization;
  },
);
