// server setting
const express = require('express') // 載入 express
const mongoose = require('mongoose') // 載入 mongoose
const exphbs = require('express-handlebars') // 載入 expres-handlebars
const bodyParser = require('body-parser') // 載入 body parser
const Restaurant = require('./models/restaurant') // 載入 Restaurant model
const Category = require('./models/category') // 載入 category model

const app = express()
const port = 3000

// 設定 mongoose 連線
mongoose.connect('mongodb://localhost/restaurant_list', { useNewUrlParser: true, useUnifiedTopology: true })

// 取得連線狀態，設定 db
const db = mongoose.connection
db.on('error', () => {
  console.log('mongodb error!')
})
db.once('open', () => {
  console.log('mongodb connected!')
})

// hanldebars setting
app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')

// setting static files
app.use(express.static('public'))

// Body Parser 設定
app.use(bodyParser.urlencoded({ extended: true }))

// 將路由改為從資料庫查找資料
app.get('/', (req, res) => {
  Restaurant.find() // 取出 Restaurant model 裡的所有資料
    .lean() // 把 Mongoose 的 Model 物件轉換成乾淨的 JavaScript 資料陣列
    .then((restaurants) => {
      Category.find() 
        .lean()
        .then(categories => res.render('index', { restaurants, categories }))
        .catch(error => console.log(error))
    }) // 將資料傳給 index 樣板
    .catch(error => console.log(error)) // 錯誤處理
})

// 設定新增餐廳頁面的路由
app.get('/restaurants/new', (req, res) => {
  Category.find()
    .lean()
    .then(categories => res.render('new', { categories }))
    .catch(error => console.lgo(error))
})

// 將新增的餐廳資料傳到資料庫
app.post('/restaurants', (req, res) => {
  const name = req.body.name
  const name_en = req.body.name_en
  const category = req.body.category
  const image = req.body.image
  const location = req.body.location
  const phone = req.body.phone
  const google_map = req.body.google_map
  const rating = req.body.rating
  const description = req.body.description

  return Restaurant.create({ name, name_en, category, image, location, phone, google_map, rating, description })
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

// 設定餐廳詳細頁面的路由
app.get('/restaurants/:id', (req, res) => {
  const id = req.params.id
  return Restaurant.findById(id)
    .lean() // 用 lean() 將資料整理乾淨
    .then((restaurant) => res.render('detail', { restaurant })) // 將資料傳給樣板引擎，透過hbs組裝頁面
    .catch(error => console.log(error))
})

// 設定餐廳編輯頁面的路由
app.get('/restaurants/:id/edit', (req, res) => {
  const id = req.params.id
  return Restaurant.findById(id)
    .lean() 
    .then((restaurant) => {
      Category.find()
        .lean()
        .then(categories => res.render('edit', { restaurant, categories }))
        .catch(error => console.log(error))
    })
    .catch(error => console.log(error))
})

// 將重新編輯完後的資料更新至資料庫
app.post('/restaurants/:id/edit', (req, res) => {
  const id = req.params.id
  const name = req.body.name
  const name_en = req.body.name_en
  const category = req.body.category
  const image = req.body.image
  const location = req.body.location
  const phone = req.body.phone
  const google_map = req.body.google_map
  const rating = req.body.rating
  const description = req.body.description
  return Restaurant.findById(id)
    .then(restaurant => {
      restaurant.name = name,
      restaurant.name_en = name_en,
      restaurant.category = category,
      restaurant.image = image,
      restaurant.location = location,
      restaurant.phone = phone,
      restaurant.google_map = google_map,
      restaurant.rating = rating,
      restaurant.description = description
      return restaurant.save()
    })
    .then(() => res.redirect(`/restaurants/${id}`))
    .catch(error => console.log(error))
})

// 設定將特定資料刪除的路由
app.post('/restaurants/:id/delete', (req, res) => {
  const id = req.params.id
  return Restaurant.findById(id)
    .then(restaurant => {
      // alert('ＯＫ？')
      restaurant.remove()
    })
    .then(() => res.redirect(`/`))
    .catch(error => console.log(error))
})

// 設定關鍵字搜尋的路由
app.get('/search', (req, res) => {
  // 將關鍵字轉為小寫格式
  const keyword = req.query.keyword.toLowerCase().trim()

  // 使用 find() 查詢名稱及類別中有符合關鍵字條件的資料
  Restaurant.find({ $or: [
      { name: { $regex: keyword, $options: 'i' }},
      { category: { $regex: keyword, $options: 'i' }}
    ]
  })
    .lean() 
    .then(restaurants => res.render('index', { restaurants })) 
    .catch(error => console.lgo(error)) 
})

// server listening
app.listen(port, () => {
  console.log(`Server is listening on http://localhost:${port}`)
})