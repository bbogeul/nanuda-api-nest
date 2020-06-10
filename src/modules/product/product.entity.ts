import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  TreeLevelColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { BaseEntity } from 'src/core';
import { YN } from 'src/common';
import { Admin } from '../admin';

@Entity({ name: 'PRODUCT' })
export class Product extends BaseEntity<Product> {
  @PrimaryGeneratedColumn({
    type: 'int',
    unsigned: true,
  })
  no: number;

  @Column('varchar', {
    length: 20,
    nullable: false,
    name: 'NAME',
  })
  name: string;

  @Column('varchar', {
    nullable: true,
    name: 'CODE',
  })
  code?: string;

  @Column('char', {
    default: YN.NO,
    name: 'DEL_YN',
    nullable: false,
  })
  delYn: YN;

  @Column('char', {
    default: YN.NO,
    name: 'SHOW_YN',
    nullable: false,
  })
  showYn: YN;

  @Column('int', {
    name: 'MANAGER',
    nullable: true,
  })
  manager?: number;

  @Column('datetime', {
    nullable: true,
    name: 'START_DATE',
  })
  started?: Date;

  @Column('datetime', {
    nullable: true,
    name: 'END_DATE',
  })
  ended?: Date;

  @Column('varchar', {
    name: 'INITIAL_CHARGE',
    nullable: true,
  })
  initialCharge?: string;

  @Column('varchar', {
    nullable: true,
    name: 'MONTHLY_FEE',
  })
  monthlyFee?: string;

  @Column('varchar', {
    nullable: true,
    name: 'MONTHLY_PER',
  })
  monthlyPer?: string;

  @Column('varchar', {
    nullable: true,
    name: 'ADD_FEE',
  })
  addFee?: string;

  @Column('varchar', {
    nullable: true,
    name: 'ADD_PER',
  })
  addPer?: string;

  @Column('varchar', {
    length: 255,
    nullable: true,
    name: 'TITLE',
  })
  title?: string;

  @Column('varchar', {
    length: 255,
    nullable: true,
    name: 'SUB_TITLE',
  })
  subTitle?: string;

  @Column('text', {
    nullable: true,
    name: 'CONTENT',
  })
  content?: string;

  @Column('varchar', {
    length: 255,
    nullable: true,
    name: 'ETC',
  })
  etc?: string;

  // Belongs to Manager/Admin
  @ManyToOne(type => Admin)
  @JoinColumn({ name: 'MANAGER' })
  admin?: Admin;
}
