import { BaseUser } from '../../core/base-user.entity';
import { UserType } from '../auth/types/user.type';
import { Column, Entity, OneToMany, JoinColumn } from 'typeorm';
import { YN } from '../../common';
import { ADMIN_USER } from '../../shared';
import { Exclude } from 'class-transformer';
import { ProductConsult } from '../product-consult/product-consult.entity';

@Entity('ADMIN_USER')
export class Admin extends BaseUser {
  constructor(partial?: any) {
    super(partial);
  }
  @Exclude({ toPlainOnly: true })
  @Column({
    type: 'varchar',
    nullable: false,
    select: false,
    length: 512,
    name: 'PASSWORD',
    default: '12345678',
  })
  password: string;

  @Column({
    type: 'char',
    nullable: false,
    default: YN.YES,
    name: 'ADMIN_YN',
    length: 1,
  })
  adminYN: YN;

  @Column({
    type: 'varchar',
    nullable: false,
    default: ADMIN_USER.NORMAL,
    name: 'AUTH_CODE',
    length: 10,
  })
  authCode: ADMIN_USER;

  //   need to update to UserType
  // no database column.
  get userType(): UserType {
    return UserType.ADMIN;
  }
}

// TODO: change authCode into json_array
