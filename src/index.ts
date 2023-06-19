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
import { Bill } from './entity/Bill'
import { send } from 'process'

dotenv.config()

if (!process.env.PORT) {
  process.exit(1)
}

const PORT: number = parseInt(process.env.PORT as string, 10)
const app = express()
let checkLog = false
let accType = 0
let uid = 0

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
  checkLog = false
  accType = 0
  uid = 0
  res.render('pages/login')
})

app.get('/register', async function (req: Request, res: Response) {
  res.render('pages/register')
})

app.post('/register', async function (req: Request, res: Response) {
  const username = req.body.username
  const password = req.body.password
  const name = req.body.name
  const tel = req.body.tel
  const address = req.body.address
  await registerAcc(username, password, name, tel, address)
  res.redirect('/login')
})

app.post('/login', async function (req: Request, res: Response) {
  const username = req.body.username
  const password = req.body.password
  if ((await checkAcc(username, password)) == 2) {
    checkLog = true
    accType = 2
    res.redirect('/')
  } else if ((await checkAcc(username, password)) == 1) {
    checkLog = true
    accType = 1
    res.redirect('/admin')
  } else {
    res.redirect('/login')
  }
})

app.get('/', async function (req: Request, res: Response) {
  if (checkLog == true && accType == 2) {
    const items = await dtb.getRepository(Items).find()
    res.render('pages/home', { items: items })
  } else {
    res.redirect('/login')
  }
})

app.get('/about', (req: Request, res: Response) => {
  if (checkLog == true && accType == 2) {
    res.render('pages/about')
  } else {
    res.redirect('/login')
  }
})

app.get('/shop', async function (req: Request, res: Response) {
  if (checkLog == true && accType == 2) {
    const items = await dtb.getRepository(Items).find()
    res.render('pages/shop', { items: items })
  } else {
    res.redirect('/login')
  }
})

app.post('/shop', async function (req: Request, res: Response) {
  if (checkLog == true && accType == 2) {
    const items = req.body
    const items_data: any[] = []
    Object.keys(items.cartid).forEach((key) => {
      const data: number = +items.cartid[key]
      const values = getItems(data).then(function (result) {
        items_data.push(result)
      })
    })
    const usname = await dtb.getRepository(User).findOneBy({ id_user: uid })
    res.render('pages/payment', { items: items, usname: usname, items_data: items_data })
  } else {
    res.redirect('/login')
  }
})

app.get('/contact', (req: Request, res: Response) => {
  if (checkLog == true && accType == 2) {
    res.render('pages/contact')
  } else {
    res.redirect('/login')
  }
})

app.get('/payment', (req: Request, res: Response) => {
  if (checkLog == true && accType == 2) {
    res.render('pages/payment')
  } else {
    res.redirect('/login')
  }
})

app.post('/payment', (req: Request, res: Response) => {
  if (checkLog == true && accType == 2) {
    const items = req.body
    const items_date: Date = new Date(req.body.date)
    const items_id: any[] = []
    sendBill(items.uid, items_date, items.total)
    Object.keys(items.id_item).forEach((key) => {
      const data: number = +items.id_item[key]
      const values = getItems(data).then(function (result) {
        items_id.push(result)
      })
    })
    res.redirect('/shop')
  } else {
    res.redirect('/login')
  }
})

app.get('/admin', async (req: Request, res: Response) => {
  if (checkLog == true && accType == 1) {
    const items = await dtb.getRepository(Items).find()
    let sumtotal = 0
    let menutotal = 0
    let billtotal = 0
    await sumTotal().then(function (result) {
      sumtotal = result.sum
    })
    await menuTotal().then(function (result) {
      menutotal = result
    })
    await billTotal().then(function (result) {
      billtotal = result
    })
    res.render('pages/admin', { sumtotal: sumtotal, menutotal: menutotal, billtotal: billtotal })
  } else {
    res.redirect('/login')
  }
})

app.get('/admin/bill', async (req: Request, res: Response) => {
  if (checkLog == true && accType == 1) {
    const bills = await dtb.getRepository(Bill).find()
    res.render('pages/billadmin', { bills: bills })
  } else {
    res.redirect('/login')
  }
})

app.get('/admin/menu', async (req: Request, res: Response) => {
  if (checkLog == true && accType == 1) {
    const items = await dtb.getRepository(Items).find()
    res.render('pages/menuadmin', { items: items })
  } else {
    res.redirect('/login')
  }
})

app.get('/admin/menu/add', async (req: Request, res: Response) => {
  if (checkLog == true && accType == 1) {
    res.render('pages/FormaddMenu')
  } else {
    res.redirect('/login')
  }
})

app.post('/admin/menu/add', async (req: Request, res: Response) => {
  if (checkLog == true && accType == 1) {
    const item_name = req.body.item_name
    const item_price = req.body.item_price
    const item_image = req.body.item_image
    const item_des = req.body.item_des
    sendItem(item_name, item_price, item_image, item_des)
    res.redirect('/admin/menu')
  } else {
    res.redirect('/login')
  }
})

app.get('/admin/menu/edit/:id', async (req: Request, res: Response) => {
  if (checkLog == true && accType == 1) {
    res.render('pages/FormeditMenu')
  } else {
    res.redirect('/login')
  }
})

app.post('/admin/menu/edit/:id', async (req: Request, res: Response) => {
  if (checkLog == true && accType == 1) {
    const item_name = req.body.item_name
    const item_price = req.body.item_price
    const item_image = req.body.item_image
    const item_des = req.body.item_des
    const editid = Number(req.params.id)
    updateItem(editid, item_name, item_price, item_image, item_des)
    res.redirect('/admin/menu')
  } else {
    res.redirect('/login')
  }
})

app.get('/admin/menu/:id', async (req: Request, res: Response) => {
  if (checkLog == true && accType == 1) {
    const editid = Number(req.params.id)
    deleteItem(editid)
    res.redirect('/admin/menu')
  } else {
    res.redirect('/login')
  }
})

app.get('/admin/customer', async (req: Request, res: Response) => {
  if (checkLog == true && accType == 1) {
    const customer = await dtb.getRepository(User).find()
    res.render('pages/customer', { customer: customer })
  } else {
    res.redirect('/login')
  }
})

app.get('/admin/staff', async (req: Request, res: Response) => {
  if (checkLog == true && accType == 1) {
    const staff = await dtb.getRepository(Admin).find()
    res.render('pages/staff', { staff: staff })
  } else {
    res.redirect('/login')
  }
})

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

async function checkAcc(username_: string, password_: string) {
  const dataad = await dtb.getRepository(Admin).findOne({
    where: {
      username: username_,
      password: password_
    }
  })
  const dataus = await dtb.getRepository(User).findOne({
    where: {
      username: username_,
      password: password_
    }
  })
  if (dataus) {
    uid = dataus.id_user
    return 2
  } else if (dataad) {
    uid = dataad.id_ad
    return 1
  } else {
    return 0
  }
}

async function registerAcc(username: string, password: string, name: string, tel: string, address: string) {
  await dtb
    .createQueryBuilder()
    .insert()
    .into(User)
    .values([{ username: username, password: password, name: name, tel: tel, address: address }])
    .execute()
}

async function sendItem(item_name: string, item_price: number, item_image: string, item_des: string) {
  await dtb
    .createQueryBuilder()
    .insert()
    .into(Items)
    .values([{ name: item_name, price: item_price, image: item_image, description: item_des }])
    .execute()
}

async function updateItem(id: number, item_name: string, item_price: number, item_image: string, item_des: string) {
  await dtb
    .createQueryBuilder()
    .update(Items)
    .set({ name: item_name, price: item_price, image: item_image, description: item_des })
    .where('id_item = :id_item', { id_item: id })
    .execute()
}

async function deleteItem(id: number) {
  await dtb.createQueryBuilder().delete().from(Items).where('id_item = :id_item', { id_item: id }).execute()
}

async function getName(uid: number) {
  await dtb
    .createQueryBuilder()
    .select('username')
    .from(User, 'user')
    .where('user.id_user = :uid', { uid: uid })
    .getOne()
}

async function getItems(id: number) {
  return await dtb
    .getRepository(Items)
    .createQueryBuilder('item')
    .where('item.id_item = :id', { id: id })
    .getOne()
    .then((data) => {
      return data
    })
}

async function sendBill(uid: number, date: Date, total: number) {
  await dtb
    .createQueryBuilder()
    .insert()
    .into(Bill)
    .values([{ id_user: uid, date: date, total: total }])
    .execute()
}

async function sumTotal() {
  return await dtb.getRepository(Bill).createQueryBuilder('bill').select('SUM(bill.total)', 'sum').getRawOne()
}

async function menuTotal() {
  return await dtb.getRepository(Items).createQueryBuilder('item').getCount()
}

async function billTotal() {
  return await dtb.getRepository(Bill).createQueryBuilder('bill').getCount()
}
