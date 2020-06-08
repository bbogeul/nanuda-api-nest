import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { BaseEntity } from 'src/core';

@Entity({ name: 'SPACE_TYPE_BRAND_MAPPER' })
export class SpaceTypeBrandMapper {
  @PrimaryGeneratedColumn({
    type: 'int',
    unsigned: true,
    name: 'NO',
  })
  no: number;

  @Column('int', {
    nullable: false,
    name: 'SPACE_TYPE_NO',
  })
  spaceTypeNo: number;

  @Column('int', {
    nullable: false,
    name: 'BRAND_NO',
  })
  brandNo: number;

  @Column('varchar', {
    nullable: false,
    name: 'BRAND_NAME',
  })
  brandName: string;
}
