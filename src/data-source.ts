import 'reflect-metadata'
import { DataSource } from 'typeorm'
import { User } from './entity/User'
import { Menu } from './entity/Menu'

export const AppDataSource = new DataSource({
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: '',
  database: 'foodlovets',
  synchronize: true,
  logging: true,
  entities: [User, Menu],
  migrations: [],
  subscribers: [],
  migrationsTableName: 'migrations'
})

// export const adminacc = async (dtb: DataSource) => {
//   await AppDataSource.createQueryBuilder()
//     .insert()
//     .into(User)
//     .values([
//       { username: 'manager1', password: '123456' },
//       { username: 'manager2', password: 'abcxyz' }
//     ])
//     .execute()
//     .then(() => {
//       console.log('Insert data to User successfully!')
//     })
//     .catch((err) => {
//       console.error('Error with Data Source!', err)
//     })
// }
