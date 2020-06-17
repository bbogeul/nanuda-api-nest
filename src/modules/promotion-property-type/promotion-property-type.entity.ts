import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { BaseEntity } from 'src/core';

@Entity({ name: 'PROMOTION_PROPERTY_TYPE' })
export class PromotionPropertyType extends BaseEntity<PromotionPropertyType> {
  @PrimaryGeneratedColumn({
    type: 'int',
    name: 'NO',
    unsigned: true,
  })
  no: number;

  @Column('varchar', {
    length: 45,
    nullable: false,
    name: 'KEY',
  })
  key: string;
}
