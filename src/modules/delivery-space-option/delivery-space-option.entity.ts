import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { BaseEntity } from 'src/core';
import { Space } from '../space/space.entity';

@Entity({ name: 'DELIVERY_SPACE_OPTION' })
export class DeliverySpaceOption extends BaseEntity<DeliverySpaceOption> {
  @PrimaryGeneratedColumn({
    type: 'int',
    unsigned: true,
    name: 'NO',
  })
  no: number;

  @Column({
    type: 'int',
    name: 'ADMIN_NO',
    nullable: false,
  })
  adminNo: number;

  @Column({
    type: 'varchar',
    name: 'DELIVERY_SPACE_OPTION_CODE',
    nullable: false,
  })
  deliverySpaceOptionCode: string;

  @Column({
    type: 'varchar',
    name: 'DELIVERY_SPACE_OPTION_NAME',
    nullable: true,
  })
  deliverySpaceOptionName?: string;

  // Delivery space options.
  @ManyToMany(
    type => Space,
    space => space.deliverySpaceOptions,
  )
  @JoinTable({
    name: 'DELIVERY_SPACE_OPTION_SPACE_MAPPER',
    joinColumn: {
      name: 'DELIVERY_SPACE_NO',
    },
    inverseJoinColumn: {
      name: 'SPACE_NO',
    },
  })
  spaces?: Space[];
}
