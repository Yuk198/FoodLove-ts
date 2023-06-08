import * as dotenv from 'dotenv'
import express, { Request, Response } from 'express'
import cors from 'cors'
import helmet from 'helmet'
import path from 'path'
import * as data from './data-source'
import { User } from './entity/User'

dotenv.config()

if (!process.env.PORT) {
  process.exit(1)
}

const PORT: number = parseInt(process.env.PORT as string, 10)
const app = express()

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))

app.use(
  helmet({
    contentSecurityPolicy: false
  })
)
app.use(cors())
app.use(express.json())
app.use(express.urlencoded())
app.use(express.static(path.join(__dirname, 'assets')))

app.get('/login', (req: Request, res: Response) => {
  res.render('pages/login')
})

app.get('/', (req: Request, res: Response) => {
  res.render('pages/home')
})

app.get('/about', (req: Request, res: Response) => {
  res.render('pages/about')
})

app.get('/shop', (req: Request, res: Response) => {
  res.render('pages/shop')
})

app.get('/admin', (req: Request, res: Response) => {
  res.render('pages/admin')
})

app.get('/contact', (req: Request, res: Response) => {
  res.render('pages/contact')
})

const dtb = data.AppDataSource

dtb
  .initialize()
  .then(async () => {
    const user1 = new User()
    user1.username = 'manager1'
    user1.password = '123456'
    await dtb.manager.save(user1)
    console.log('Data Source has been initialized!')
  })
  .catch((err) => {
    console.error('Error during Data Source initialization', err)
  })

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
