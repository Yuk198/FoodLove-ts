import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm'
import { Bill } from './Bill'

@Entity('Items')
export class Items {
  @PrimaryGeneratedColumn()
  id_item!: number

  @Column()
  name!: string

  @Column()
  type!: string

  @Column({ type: 'longblob' })
  image!: string

  @Column()
  description!: string

  @Column()
  price!: number

  // @ManyToOne(() => Bill, (bill) => bill.nameitem)
  // bill!: Bill
}
