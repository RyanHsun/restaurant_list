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

// 設定 hanldebars 模板
app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')

// 設定可以使用靜態檔案路徑
app.use(express.static('public'))

// 設定 Body Parser
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
  const restaurant = req.body // 從 req.body 拿出表單裡的所有資料，並存放在 restaurant
  return Restaurant.create(restaurant) // 透過 create() 將資料存入資料庫
    .then(() => res.redirect('/')) // 新增新增完成後導回首頁
    .catch(error => console.log(error))
})

// 設定餐廳詳細頁面的路由
app.get('/restaurants/:id', (req, res) => {
  const id = req.params.id
  return Restaurant.findById(id)
    .lean()
    .then((restaurant) => res.render('detail', { restaurant }))
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
  return Restaurant.findById(id)
    .then(restaurant => {
      // 為使語法更精簡化，移除原本放在外面的 const 宣告，直接在內層分配 req.body
      restaurant.name = req.body.name,
      restaurant.name_en = req.body.name_en,
      restaurant.category = req.body.category,
      restaurant.image = req.body.image,
      restaurant.location = req.body.location,
      restaurant.phone = req.body.phone,
      restaurant.google_map = req.body.google_map,
      restaurant.rating = req.body.rating,
      restaurant.description = req.body.description
      return restaurant.save()
    })
    .then(() => res.redirect(`/restaurants/${id}`))
    .catch(error => console.log(error))
})

// 設定將特定資料刪除的路由
app.post('/restaurants/:id/delete', (req, res) => {
  const id = req.params.id
  return Restaurant.findById(id)
    .then(restaurant => restaurant.remove())
    .then(() => res.redirect(`/`))
    .catch(error => console.log(error))
})

// 設定關鍵字搜尋的路由
app.get('/search', (req, res) => {
  // 將關鍵字轉為小寫格式
  const keyword = req.query.keyword.toLowerCase().trim()

  // 使用 find() 查詢名稱及類別中有符合關鍵字條件的資料，透過 $or 判斷餐廳名稱或是餐廳類別是否有符合條件
  Restaurant.find({ $or: [
      { name: { $regex: keyword, $options: 'i' }},
      { category: { $regex: keyword, $options: 'i' }}
    ]
  })
    .lean() 
    .then(restaurants => {
      Category.find() // 導入餐廳類別資料，讓點擊搜尋按鈕後指向的模板可以抓到值
        .lean()
        .then(categories => {
          if (restaurants == 0) {
            // 找不到該關鍵字顯示錯誤提示，使用 error 模板
            res.render('error', { categories, keyword })
          } else {
            // 該關鍵字有找到符合的資料顯示結果，並在搜尋列上放上使用者輸入的關鍵字方便修改
            res.render('index', { restaurants, categories, keyword })
          }
        })
      
    }) 
    .catch(error => console.lgo(error)) 
})

// 設定伺服器監聽
app.listen(port, () => {
  console.log(`Server is listening on http://localhost:${port}`)
})