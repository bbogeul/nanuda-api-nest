import { Column, PrimaryGeneratedColumn } from 'typeorm';
import { BaseEntity } from '../../core';
import { YN } from '../../common';
import { UserType } from './types';

export abstract class BaseUser extends BaseEntity<BaseUser> {
    @PrimaryGeneratedColumn({
        type: 'int',
        unsigned: true,
        name: 'NO'
    })
    no: number;

    @Column({
        type: 'varchar',
        length: 12,
        nullable: false,
        unique: true,
        name: 'PHONE'
    })
    phone: string

    @Column({
        type: 'varchar',
        length: 20,
        name: 'NAME',
        nullable: false,
    })
    name: string;

    @Column({
        type: 'varchar',
        nullable: false,
        default: YN.NO,
        name: 'DEL_YN'
    })
    delYN: YN;

    get userType(): UserType {
        return UserType.NANUDA_USER;
    }
}