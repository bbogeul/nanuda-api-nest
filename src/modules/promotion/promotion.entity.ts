import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToOne,
  JoinColumn,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { BaseEntity } from 'src/core';
import { YN } from 'src/common';
import { PromotionProperty } from '../promotion-property/promotion-property.entity';
import { Company } from '../company/company.entity';
import { Space } from '../space/space.entity';

@Entity({ name: 'PROMOTION' })
export class Promotion extends BaseEntity<Promotion> {
  @PrimaryGeneratedColumn({
    type: 'int',
    name: 'NO',
    unsigned: true,
  })
  no: number;

  @Column('int', {
    name: 'ADMIN_NO',
    nullable: false,
  })
  adminNo: number;

  @Column('int', {
    name: 'COMPANY_NO',
    nullable: false,
  })
  companyNo: number;

  @Column('varchar', {
    length: 255,
    nullable: false,
    name: 'TITLE',
  })
  title: string;

  @Column('varchar', {
    length: 512,
    nullable: true,
    name: 'CONTENT',
  })
  content?: string;

  // TODO: change to PROMOTION_TYPE
  @Column('int', {
    nullable: true,
    name: 'PROMOTION_TYPE_NO',
  })
  promotionTypeNo?: number;

  @Column('char', {
    name: 'DETAIL_SHOW_YN',
    default: YN.YES,
    nullable: false,
  })
  detailShowYn: YN;

  @Column('char', {
    length: 1,
    nullable: false,
    default: YN.NO,
    name: 'LIST_SHOW_YN',
  })
  listShowYn: YN;

  @Column('char', {
    length: 1,
    nullable: false,
    default: YN.NO,
    name: 'DEL_YN',
  })
  delYn?: YN;

  @ManyToOne(
    type => Company,
    company => company.promotions,
  )
  @JoinColumn({ name: 'COMPANY_NO' })
  company?: Company;

  @OneToMany(
    type => PromotionProperty,
    promotionProperty => promotionProperty.promotion,
  )
  promotionProperties?: PromotionProperty[];

  @ManyToMany(
    type => Space,
    space => space.promotions,
  )
  @JoinTable({
    name: 'PROMOTION_SPACE_MAPPER',
    joinColumn: {
      name: 'PROMOTION_NO',
    },
    inverseJoinColumn: {
      name: 'SPACE_NO',
    },
  })
  spaces?: Space[];
}
