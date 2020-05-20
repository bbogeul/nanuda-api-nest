import { UserType } from './user.type';

export interface UserSigninPayload {
  _no: number;
  _id: string;
  admin: boolean;
  username: string;
  userType: UserType | string;
  adminRole?: string;
}
