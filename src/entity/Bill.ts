import { Entity, Column, PrimaryGeneratedColumn, OneToOne, OneToMany } from 'typeorm'
import { User } from './User'
import { Items } from './Items'

@Entity('Bill')
export class Bill {
  @PrimaryGeneratedColumn()
  id_bill!: number

  @OneToOne(() => User, (user) => user.username)
  username!: User

  @OneToMany(() => Items, (items) => items.name)
  nameitem!: Items

  @Column()
  price!: number
}
