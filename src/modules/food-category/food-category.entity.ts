import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { BaseEntity } from 'src/core';
import { YN } from 'src/common';
import { Brand } from '../brand/brand.entity';
import { Expose, Exclude } from 'class-transformer';
import { CONST_ADMIN_USER } from 'src/shared';

@Entity({ name: 'FOOD_CATEGORY' })
export class FoodCategory extends BaseEntity<FoodCategory> {
  @PrimaryGeneratedColumn({
    type: 'int',
    unsigned: true,
    name: 'NO',
  })
  no: number;

  @Column('varchar', {
    name: 'CODE',
    length: 50,
    nullable: false,
  })
  code: string;

  @Column('varchar', {
    name: 'NAME_KR',
    length: 50,
    nullable: false,
  })
  nameKr: string;

  @Column('varchar', {
    name: 'NAME_ENG',
    length: 50,
    nullable: true,
  })
  nameEng?: string;

  //   @Expose({ groups: [...CONST_ADMIN_USER] })
  //   @Exclude({ toPlainOnly: true })
  @Column('int', {
    name: 'ADMIN_NO',
    nullable: false,
    select: false,
  })
  adminNo: number;

  @Column('char', {
    length: 1,
    nullable: false,
    default: YN.NO,
    name: 'DEL_YN',
  })
  delYn: YN;

  @OneToMany(
    type => Brand,
    brands => brands.category,
  )
  brands: Brand[];
}
