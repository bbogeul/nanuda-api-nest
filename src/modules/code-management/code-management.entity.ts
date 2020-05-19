import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { BaseEntity } from '../../core'
import { deleteYN } from '../../common'

@Entity({ name: 'CODE_MANAGEMENT' })
export class CodeManagement extends BaseEntity<CodeManagement> {
    constructor(partial?: any) {
        super(partial)
    }

    @PrimaryGeneratedColumn({ type: 'int', unsigned: true })
    NO: number;

    @Column({ type: 'varchar', length: 20, nullable: false })
    KEY: string;

    @Column({ type: 'varchar', length: 20, nullable: false })
    VALUE: string;

    @Column({ type: 'varchar', length: 255 })
    DESC: string;

    @Column({ type: 'varchar', length: 20, nullable: false })
    CATEGORY_1: string;

    @Column({ type: 'varchar', length: 20, nullable: false })
    CATEGORY_2: string;

    @Column({ type: 'int' })
    ORDER_BY: number;

    @Column({ type: 'varchar', length: 1, nullable: false, default: deleteYN.NO })
    DEL_YN: string;

}