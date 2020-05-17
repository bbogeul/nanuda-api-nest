import { createParamDecorator } from '@nestjs/common';

export const UserInfo = createParamDecorator((data: string, req) => {
  return data ? req.user && req.user[data] : req.user;
});
