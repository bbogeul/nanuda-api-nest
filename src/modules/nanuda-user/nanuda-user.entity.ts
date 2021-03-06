import { Entity, Column, OneToMany } from 'typeorm';
import { BaseUser } from '../../core/base-user.entity';
import { YN } from 'src/common';
import { UserType } from '../auth';
import { NANUDA_USER } from 'src/shared';
import { ProductConsult } from '../product-consult/product-consult.entity';

@Entity({ name: 'NANUDA_USER' })
export class NanudaUser extends BaseUser {
  @Column({
    type: 'char',
    length: 1,
    nullable: true,
    default: YN.NO,
    name: 'INFO_YN',
  })
  infoYn?: string;

  @Column({
    type: 'char',
    length: 1,
    nullable: true,
    default: YN.YES,
    name: 'SERVICE_YN',
  })
  serviceYn?: string;

  @Column({
    type: 'char',
    length: 1,
    nullable: true,
    default: YN.NO,
    name: 'MARKET_YN',
  })
  marketYn?: string;

  // What is this column for???
  @Column({
    type: 'int',
    nullable: true,
    name: 'REMAIN_VISIT_COUNT',
    default: 1,
  })
  remainVisitCount?: number;

  @Column({
    type: 'timestamp',
    nullable: true,
    name: 'LAST_LOGIN_AT',
  })
  lastLoginAt?: Date;

  //   no database column
  get userType(): UserType {
    return UserType.NANUDA_USER;
  }

  get authCode() {
    return NANUDA_USER.NORMAL_USER;
  }

  @OneToMany(
    type => ProductConsult,
    productConsults => productConsults.nanudaUser,
  )
  productConsults: ProductConsult[];
}
