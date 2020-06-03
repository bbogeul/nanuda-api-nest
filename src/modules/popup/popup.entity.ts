import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { LINK_TYPE, POPUP } from 'src/shared';
import { YN } from 'src/common';
import { BaseEntity } from '../../core';

@Entity({ name: 'POPUP' })
export class Popup extends BaseEntity<Popup> {
  @PrimaryGeneratedColumn({
    name: 'NO',
    unsigned: true,
  })
  no: number;

  @Column('varchar', {
    name: 'TITLE',
    length: 255,
    nullable: true,
  })
  title?: string;

  @Column('varchar', {
    name: 'SUB_TITLE',
    length: 255,
    nullable: true,
  })
  subTitle?: string;

  @Column('varchar', {
    length: 1000,
    name: 'CONTENT',
    nullable: true,
  })
  content?: string;

  @Column('varchar', {
    name: 'LINK',
    length: 500,
    nullable: true,
  })
  link?: string;

  @Column('varchar', {
    name: 'LINK_TYPE',
    length: 20,
    nullable: true,
  })
  linkType?: LINK_TYPE;

  @Column('varchar', {
    name: 'POPUP_TYPE',
    length: 20,
    nullable: true,
  })
  popupType?: POPUP;

  @Column('char', {
    name: 'DEL_YN',
    length: 1,
    nullable: false,
    default: YN.NO,
  })
  delYn: YN;

  @Column('char', {
    name: 'SHOW_YN',
    length: 1,
    nullable: false,
    default: YN.NO,
  })
  showYn: YN;

  @Column('datetime', {
    name: 'START_DATE',
    nullable: true,
  })
  started?: Date;

  @Column('datetime', {
    name: 'END_DATE',
    nullable: true,
  })
  ended?: Date;
}
