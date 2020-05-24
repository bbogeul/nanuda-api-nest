import { Entity, BaseEntity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'POPUP' })
export class Popup extends BaseEntity {
  @PrimaryGeneratedColumn({
    name: 'NO',
    unsigned: true,
  })
  no: number;
}
