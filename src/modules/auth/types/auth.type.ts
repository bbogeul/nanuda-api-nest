import { NanudaUser } from 'src/modules/nanuda-user';
import { Admin } from '../../../modules/admin';

export class Auth {
  token: string;
  user: Admin | NanudaUser;
}
