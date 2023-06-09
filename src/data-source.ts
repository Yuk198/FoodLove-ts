import 'reflect-metadata'
import { DataSource } from 'typeorm'
import { User } from './entity/User'
import { Items } from './entity/Items'
import { Bill } from './entity/Bill'
import { Admin } from './entity/Admin'
import { UserData1686325824123 } from './migrations/1686325824123User_data'
import { ItemsData1686325824123 } from './migrations/1686325824123Items_data'
import { BillData1686325824123 } from './migrations/1686325824123Bill_data'
import { AdminData1686325824123 } from './migrations/1686325824123Admin_data'

export const AppDataSource = new DataSource({
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: '',
  database: 'foodlovets',
  synchronize: true,
  logging: true,
  entities: [User, Items, Bill, Admin],
  migrations: [UserData1686325824123, ItemsData1686325824123, BillData1686325824123, AdminData1686325824123],
  subscribers: [],
  migrationsTableName: 'migrations'
})
