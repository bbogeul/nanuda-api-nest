import { UserType } from './user.type';
import { ADMIN_USER } from '../../../shared';

export interface UserSigninPayload {
    _no: number,
    _id: string,
    admin: boolean,
    username: string,
    userType: UserType
    adminRole?: ADMIN_USER
}