import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { BaseEntity } from 'src/core';

@Entity({ name: 'COMPANY_DISTRICT_SPACE_MAPPER' })
export class CompanyDistrictSpaceMapper extends BaseEntity<
  CompanyDistrictSpaceMapper
> {
  @PrimaryGeneratedColumn({
    type: 'int',
    name: 'NO',
    unsigned: true,
  })
  no: number;

  @Column('int', {
    name: 'COMPANY_DISTRICT_NO',
    nullable: false,
  })
  companyDistrictNo: number;

  @Column('int', {
    name: 'SPACE_NO',
    nullable: false,
  })
  spaceNo: number;
}
