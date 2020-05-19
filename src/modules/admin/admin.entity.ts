import { BaseUser } from '../../core';
import { UserType } from '../auth';
import { Column, Entity } from 'typeorm';
import { YN } from '../../common';
import { ADMIN_USER } from '../../shared';

@Entity({ name: 'ADMIN_USER' })
export class Admin extends BaseUser {
    constructor(partial?: any) {
        super(partial)
    }
    @Column({
        type: 'varchar',
        nullable: false,
        length: 50,
        name: 'PASSWORD',
        default: '12345678'
    })
    password: string

    @Column({
        type: 'char',
        nullable: false,
        default: YN.YES,
        name: 'ADMIN_YN',
        length: 1
    })
    adminYN: YN;

    @Column({
        type: 'varchar',
        nullable: false,
        default: ADMIN_USER.NORMAL,
        name: 'AUTH_CODE',
        length: 10
    })
    authCode: ADMIN_USER;

    // no database column.
    get userType(): UserType {
        return UserType.ADMIN;
    }
}