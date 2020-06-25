import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { BaseEntity } from 'src/core';
import { HOMEPAGE_MEDIA } from 'src/shared';
import { YN } from 'src/common';

@Entity({ name: 'HOMEPAGE_MEDIA' })
export class HomepageMedia extends BaseEntity<HomepageMedia> {
  @PrimaryGeneratedColumn({
    type: 'int',
    name: 'NO',
    unsigned: true,
  })
  no: number;

  @Column({
    type: 'varchar',
    name: 'TITLE',
    nullable: false,
  })
  title: string;

  @Column({
    type: 'text',
    name: 'CONTENT',
    nullable: true,
  })
  content?: string;

  @Column({
    type: 'varchar',
    name: 'URL',
    nullable: true,
  })
  url?: string;

  @Column({
    type: 'varchar',
    name: 'ORIGINAL_URL',
    nullable: true,
  })
  originalUrl?: string;

  @Column({
    type: 'varchar',
    nullable: false,
    name: 'MEDIA_TYPE',
  })
  mediaType: HOMEPAGE_MEDIA;

  @Column({
    type: 'char',
    nullable: false,
    default: YN.NO,
    name: 'SHOW_YN',
  })
  showYn: YN;
}
