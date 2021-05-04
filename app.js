// server setting
const express = require('express') // 載入 express
const mongoose = require('mongoose') // 載入 mongoose
const exphbs = require('express-handlebars') // 載入 expres-handlebars
const bodyParser = require('body-parser') // 載入 body parser
const restaurantList = require('./restaurant.json') // 載入 restaurant data
const Restaurant = require('./models/restaurant') // 載入 Restaurant model

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
    .then(restaurants => res.render('index', { restaurants })) // 將資料傳給 index 樣板
    .catch(error => console.lgo(error)) // 錯誤處理
})

// 設定新增餐廳頁面的路由
app.get('/restaurants/new', (req, res) => {
  res.render('new')
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

app.get('/search', (req, res) => {
  const keyword = req.query.keyword.trim()
  const restaurants = restaurantList.results.filter(restaurant =>
    restaurant.name.toLowerCase().includes(keyword.toLowerCase()) || restaurant.category.includes(keyword)
  )
  if (restaurants == 0) {
    res.render('error', { keyword })
  } else {
    res.render('index', { restaurants, keyword })
  }
})

app.get('/restaurant/:id', (req, res) => {
  const restaurant = restaurantList.results.find(restaurant => restaurant.id.toString() === req.params.id)
  res.render('show', { restaurant: restaurant })
})

// server listening
app.listen(port, () => {
  console.log(`Server is listening on http://localhost:${port}`)
})