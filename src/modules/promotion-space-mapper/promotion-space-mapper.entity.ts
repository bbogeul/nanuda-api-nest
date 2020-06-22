import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { BaseEntity } from 'src/core';

@Entity({ name: 'PROMOTION_SPACE_MAPPER' })
export class PromotionSpaceMapper extends BaseEntity<PromotionSpaceMapper> {
  constructor() {
    super();
  }

  @PrimaryGeneratedColumn({
    type: 'int',
    unsigned: true,
    name: 'NO',
  })
  no: number;

  @Column('int', {
    name: 'PROMOTION_NO',
    nullable: false,
  })
  promotionNo: number;

  @Column('int', {
    name: 'SPACE_NO',
    nullable: false,
  })
  spaceNo: number;
}
