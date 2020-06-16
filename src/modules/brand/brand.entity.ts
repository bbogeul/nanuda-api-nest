import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  JoinColumn,
  JoinTable,
  ManyToOne,
  ManyToMany,
} from 'typeorm';
import { BaseEntity } from 'src/core';
import { YN } from 'src/common';
import { SPACE_TYPE } from 'src/shared';
import { Menu } from '../menu/menu.entity';
import { Exclude } from 'class-transformer';
import { FoodCategory } from '../food-category/food-category.entity';
import { SpaceType } from '../space-type/space-type.entity';

@Entity({ name: 'BRAND' })
export class Brand extends BaseEntity<Brand> {
  @PrimaryGeneratedColumn({
    name: 'NO',
    unsigned: true,
  })
  no: number;

  @Column('varchar', {
    length: 50,
    nullable: false,
    name: 'NAME_KR',
  })
  nameKr: string;

  @Column('varchar', {
    length: 50,
    nullable: true,
    name: 'NAME_ENG',
  })
  nameEng: string;

  @Column('varchar', {
    length: 1000,
    nullable: true,
    name: 'DESC',
  })
  desc?: string;

  @Exclude()
  @Column('int', {
    nullable: false,
    name: 'ADMIN_NO',
    unsigned: true,
    select: false,
  })
  adminNo: number;

  @Column('int', {
    nullable: false,
    name: 'CATEGORY_NO',
    unsigned: true,
    default: 0,
  })
  categoryNo: number;

  @Column('char', {
    default: YN.YES,
    nullable: false,
    length: 1,
    name: 'SHOW_YN',
  })
  showYn: YN;

  @Column('char', {
    default: YN.NO,
    nullable: false,
    length: 1,
    name: 'DEL_YN',
  })
  delYn: YN;

  @ManyToOne(
    type => FoodCategory,
    category => category.brands,
  )
  @JoinColumn({ name: 'CATEGORY_NO' })
  category: FoodCategory;

  @JoinTable({
    name: 'MENU',
    joinColumn: { name: 'BRAND_NO' },
    inverseJoinColumn: { name: 'NO' },
  })
  @OneToMany(
    type => Menu,
    menu => menu.brand,
  )
  menus?: Menu[];

  @ManyToMany(
    type => SpaceType,
    spaceType => spaceType.brands,
  )
  @JoinTable({
    name: 'SPACE_TYPE_BRAND_MAPPER',
    joinColumn: {
      name: 'BRAND_NO',
    },
    inverseJoinColumn: {
      name: 'SPACE_TYPE_NO',
    },
  })
  spaceTypes?: SpaceType[];
}
