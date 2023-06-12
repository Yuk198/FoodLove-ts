import { Entity, Column, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm'

@Entity('BillList')
export class BillList {
  @PrimaryGeneratedColumn()
  id_bl!: number

  @Column()
  id_item!: number

  @Column()
  id_bill!: number

  @Column()
  quantity!: number
}
