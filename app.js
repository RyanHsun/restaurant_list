// server setting
const express = require('express') // 載入 express
const mongoose = require('mongoose') // 載入 mongoose
const exphbs = require('express-handlebars') // 載入 expres-handlebars
const bodyParser = require('body-parser') // 載入 body parser
const methodOverride = require('method-override') // 載入 method-override

const routes = require('./routes') // 引用路由器
const app = express()

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

// 設定每一筆請求都會經過 methodOverride 進行前置處理
app.use(methodOverride('_method'))

// 將 request 導入路由器
app.use(routes)

// 設定伺服器監聽
app.listen(3000, () => {
  console.log(`Server is listening on http://localhost:3000`)
})