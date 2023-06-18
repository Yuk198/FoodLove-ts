import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm'

@Entity('Admin')
export class Admin {
  @PrimaryGeneratedColumn()
  id_ad!: number

  @Column()
  username!: string

  @Column()
  password!: string

  @Column()
  name!: string

  @Column()
  rank!: string
}
