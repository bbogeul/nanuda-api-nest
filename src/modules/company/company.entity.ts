import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import { BaseEntity } from 'src/core';
import { COMPANY } from 'src/shared';
import { CompanyDistrict } from '../company-district/company-district.entity';
import { Promotion } from '../promotion/promotion.entity';

@Entity({ name: 'COMPANY' })
export class Company extends BaseEntity<Company> {
  @PrimaryGeneratedColumn({
    type: 'int',
    unsigned: true,
    name: 'NO',
  })
  no: number;

  @Column('varchar', {
    length: 45,
    nullable: false,
    name: 'COMPANY_TYPE',
    default: COMPANY.OTHER_COMPANY,
  })
  companyType: COMPANY;

  @Column('int', {
    nullable: false,
    name: 'ADMIN_NO',
  })
  adminNo: number;

  @Column('varchar', {
    nullable: false,
    length: 45,
    name: 'NAME_KR',
  })
  nameKr: string;

  @Column('varchar', {
    nullable: true,
    length: 45,
    name: 'NAME_ENG',
  })
  nameEng?: string;

  @Column('varchar', {
    nullable: false,
    length: 45,
    name: 'CEO_KR',
  })
  ceoKr: string;

  @Column('varchar', {
    nullable: true,
    length: 45,
    name: 'CEO_ENG',
  })
  ceoEng?: string;

  @Column('varchar', {
    nullable: true,
    name: 'POPULATION',
  })
  population?: string;

  @Column('varchar', {
    nullable: true,
    name: 'ADDRESS',
  })
  address?: string;

  @Column('varchar', {
    nullable: true,
    name: 'BUSINESS_NO',
  })
  businessNo?: string;

  @Column('varchar', {
    nullable: true,
    name: 'FAX',
  })
  fax?: string;

  @Column('varchar', {
    nullable: true,
    name: 'PHONE',
  })
  phone?: string;

  @Column('varchar', {
    nullable: true,
    name: 'EMAIL',
  })
  email?: string;

  @Column('varchar', {
    nullable: true,
    name: 'WEBSITE',
  })
  website?: string;

  @OneToMany(
    type => CompanyDistrict,
    companyDistrict => companyDistrict.company,
  )
  companyDistricts?: CompanyDistrict[];

  @OneToMany(
    type => Promotion,
    promotion => promotion.company,
  )
  promotions?: Promotion[];
}
