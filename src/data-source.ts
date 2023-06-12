import 'reflect-metadata'
import { DataSource } from 'typeorm'
import { User } from './entity/User'
import { Items } from './entity/Items'
import { Bill } from './entity/Bill'
import { Admin } from './entity/Admin'
import { BillList } from './entity/BillList'
import { UserData1686359172376 } from './migrations/1686359172376User_data'
import { ItemsData1686359172376 } from './migrations/1686359172376Items_data'
import { BillData1686359172376 } from './migrations/1686359172376Bill_data'
import { AdminData1686359172376 } from './migrations/1686359172376Admin_data'
import { BillListData1686359172376 } from './migrations/1686359172376BillList_data'

export const AppDataSource = new DataSource({
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: '',
  database: 'foodlovets',
  synchronize: false,
  logging: true,
  entities: [User, Items, Bill, Admin, BillList],
  migrations: [
    UserData1686359172376,
    ItemsData1686359172376,
    BillData1686359172376,
    AdminData1686359172376,
    BillListData1686359172376
  ],
  subscribers: [],
  migrationsTableName: 'migrations'
})
