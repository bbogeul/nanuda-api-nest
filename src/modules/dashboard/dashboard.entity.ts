import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { BaseEntity } from 'src/core';

@Entity({ database: 'database2', name: 'PAYMENT_LIST' })
export class PaymentList extends BaseEntity<PaymentList> {
  @PrimaryGeneratedColumn({
    type: 'int',
    unsigned: true,
    name: 'PAYMENT_LIST_NO',
  })
  paymentListNo: number;

  @Column('int', {
    name: 'NANUDA_NO',
    nullable: true,
  })
  nanudaNo: number;

  @Column('char', {
    length: 20,
    name: 'RESULT_VAL',
  })
  resultVal: string;

  @Column('char', {
    length: 20,
    name: 'TRAN_NO',
  })
  tranNo: string;
}
