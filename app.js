// server setting
const express = require('express') // 載入 express
const mongoose = require('mongoose') // 載入 mongoose
const exphbs = require('express-handlebars') // 載入 expres-handlebars
const restaurantList = require('./restaurant.json') // 載入 restaurant data

const app = express()
const port = 3000

// 設定 mongoose 連線
mongoose.connect('mongodb://localhost/todo_list', { useNewUrlParser: true, useUnifiedTopology: true })

// 取得連線狀態，設定 db
const db = mongoose.connection
db.on('error', () => {
  console.log('mongodb error!')
})
db.once('open', () => {
  console.log('mongodb connected!')
})

// hanldebars setting
app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs'}))
app.set('view engine', 'hbs')

// setting static files
app.use(express.static('public'))

// routes setting
app.get('/', (req, res) => {
  res.render('index', { restaurants: restaurantList.results })
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