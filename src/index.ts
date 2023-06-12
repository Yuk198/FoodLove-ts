import * as dotenv from 'dotenv'
import express, { Request, Response } from 'express'
import cors from 'cors'
import helmet from 'helmet'
import path from 'path'
import bodyParser from 'body-parser'
import * as data from './data-source'
import { User } from './entity/User'
import { Admin } from './entity/Admin'
import { Items } from './entity/Items'

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
app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.static(path.join(__dirname, 'assets')))
app.use(express.static(path.join(__dirname, 'modal')))

export const dtb = data.AppDataSource

dtb
  .initialize()
  .then(() => {
    console.log('Data Source has been initialized!')
  })
  .catch((err) => {
    console.error('Error during Data Source initialization', err)
  })

app.get('/login', async function (req: Request, res: Response) {
  res.render('pages/login')
})

app.post('/login', async function (req: Request, res: Response) {
  const username = req.body.username
  const password = req.body.password
  if (await checkAcc(username, password)) {
    res.redirect('/admin')
  } else {
    res.redirect('/login')
  }
})

app.get('/', async function (req: Request, res: Response) {
  const items = await dtb.getRepository(Items).find()
  res.render('pages/home', { items: items })
})

app.get('/about', (req: Request, res: Response) => {
  res.render('pages/about')
})

app.get('/shop', async function (req: Request, res: Response) {
  const items = await dtb.getRepository(Items).find()
  res.render('pages/shop', { items: items })
})

app.get('/contact', (req: Request, res: Response) => {
  res.render('pages/contact')
})

app.get('/admin', (req: Request, res: Response) => {
  res.render('pages/admin')
})

app.get('/admin/bill', (req: Request, res: Response) => {
  res.render('pages/billadmin')
})

app.get('/admin/menu', (req: Request, res: Response) => {
  res.render('pages/menuadmin')
})

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

async function checkAcc(username_: string, password_: string) {
  const data = await dtb.getRepository(Admin).findOne({
    where: {
      username: username_,
      password: password_
    }
  })
  if (data) {
    return true
  } else {
    return false
  }
}
