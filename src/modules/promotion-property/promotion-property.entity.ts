import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { BaseEntity } from 'src/core';
import { Promotion } from '../promotion/promotion.entity';

@Entity({ name: 'PROMOTION_PROPERTY' })
export class PromotionProperty extends BaseEntity<PromotionProperty> {
  @PrimaryGeneratedColumn({
    type: 'int',
    name: 'NO',
    unsigned: true,
  })
  no: number;

  @Column('int', {
    name: 'PROMOTION_NO',
    nullable: false,
  })
  promotionNo: number;

  @Column('varchar', {
    nullable: false,
    name: 'KEY',
  })
  key: string;

  @Column('varchar', {
    name: 'VALUE',
    nullable: true,
  })
  value?: string;

  @Column('int', {
    name: 'ADMIN_NO',
    nullable: false,
  })
  adminNo: number;

  @ManyToOne(
    type => Promotion,
    promotion => promotion.promotionProperties,
  )
  @JoinColumn({ name: 'PROMOTION_NO' })
  promotion?: Promotion;
}
