import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { BaseEntity } from 'src/core';
import { YN } from 'src/common';

@Entity({ name: 'SPACE_NANUDA_BRAND' })
export class SpaceBrandMapper extends BaseEntity<SpaceBrandMapper> {
  @PrimaryGeneratedColumn({
    type: 'int',
    unsigned: true,
  })
  no: number;

  @Column({
    type: 'int',
    name: 'BRAND_NO',
    nullable: false,
  })
  brandNo: number;

  @Column('int', {
    name: 'SPACE_ID',
    nullable: false,
  })
  spaceNo: number;

  @Column('char', {
    length: 1,
    nullable: false,
    default: YN.NO,
    name: 'SHOW_YN',
  })
  showYn: YN;

  @Column('char', {
    length: 1,
    nullable: false,
    default: YN.NO,
    name: 'DEL_YN',
  })
  delYn: YN;
}
