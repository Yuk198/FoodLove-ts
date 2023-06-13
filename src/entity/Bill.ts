import { Entity, Column, PrimaryGeneratedColumn, OneToOne, OneToMany } from 'typeorm'

@Entity('Bill')
export class Bill {
  @PrimaryGeneratedColumn()
  id_bill!: number

  @Column()
  id_user!: number

  @Column()
  date!: Date
}
