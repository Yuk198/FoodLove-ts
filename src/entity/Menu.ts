import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm'

@Entity('Menu')
export class Menu {
  @PrimaryGeneratedColumn()
  id!: number

  @Column()
  name!: string

  @Column()
  description!: string

  @Column()
  price!: number
}
