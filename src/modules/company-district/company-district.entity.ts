import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  JoinColumn,
  ManyToOne,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { BaseEntity } from 'src/core';
import { Company } from '../company/company.entity';
import { Space } from '../space/space.entity';

@Entity({ name: 'COMPANY_DISTRICT' })
export class CompanyDistrict extends BaseEntity<CompanyDistrict> {
  @PrimaryGeneratedColumn({
    type: 'int',
    unsigned: true,
    name: 'NO',
  })
  no: number;

  @Column('int', {
    nullable: false,
    name: 'COMPANY_NO',
  })
  companyNo: number;

  @Column('varchar', {
    nullable: false,
    name: 'NAME_KR',
    length: 45,
  })
  nameKr: string;

  @Column('varchar', {
    nullable: true,
    name: 'NAME_ENG',
    length: 45,
  })
  nameEng?: string;

  @Column('varchar', {
    name: 'ADDRESS',
    length: 500,
    nullable: false,
  })
  address?: string;

  @ManyToOne(
    type => Company,
    company => company.companyDistricts,
  )
  @JoinColumn({ name: 'COMPANY_NO' })
  company?: Company;

  // get many to many for space and company districts
  @ManyToMany(
    type => Space,
    space => space.companyDistricts,
  )
  @JoinTable({
    name: 'COMPANY_DISTRICT_SPACE_MAPPER',
    joinColumn: {
      name: 'COMPANY_DISTRICT_NO',
    },
    inverseJoinColumn: {
      name: 'SPACE_NO',
    },
  })
  spaces?: Space[];
}
