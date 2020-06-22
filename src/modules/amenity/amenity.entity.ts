import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { BaseEntity } from 'src/core';
import { AMENITY } from 'src/shared';
import { Space } from '../space/space.entity';

@Entity({ name: 'AMENITY' })
export class Amenity extends BaseEntity<Amenity> {
  @PrimaryGeneratedColumn({
    type: 'int',
    name: 'NO',
    unsigned: true,
  })
  no: number;

  @Column({
    type: 'varchar',
    nullable: false,
    name: 'AMENITY_NAME',
  })
  amenityName: string;

  @Column({
    type: 'varchar',
    nullable: false,
    name: 'AMENITY_CODE',
  })
  amenityCode: string;

  @Column({
    type: 'varchar',
    nullable: false,
    name: 'AMENITY_TYPE',
  })
  amenityType: AMENITY;

  @ManyToMany(
    type => Space,
    space => space.amenities,
  )
  @JoinTable({
    name: 'AMENITY_SPACE_MAPPER',
    joinColumn: {
      name: 'AMENITY_NO',
    },
    inverseJoinColumn: {
      name: 'SPACE_NO',
    },
  })
  spaces?: Space[];
}
