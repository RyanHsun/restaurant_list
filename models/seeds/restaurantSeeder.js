const mongoose = require('mongoose') // 載入 mongoose
const Restaurant = require('../restaurant')
const restaurantList = require('../../restaurant.json') // 載入 restaurant JSON 資料


// 設定 mongoose 連線
mongoose.connect('mongodb://localhost/restaurant_list', { useNewUrlParser: true, useUnifiedTopology: true })

// 取得連線狀態，設定 db
const db = mongoose.connection
db.on('error', () => {
  console.log('mongodb error!')
})

db.once('open', (req, res) => {
  // 載入種子資料時自動將 JSON 檔案中的餐廳資料匯入到資料庫中
  restaurantList.results.forEach( item => {
    const name = item.name
    const name_en = item.name_en
    const category = item.category
    const image = item.image
    const location = item.location
    const phone = item.phone
    const google_map = item.google_map
    const rating = item.rating
    const description = item.description

    return Restaurant.create({ name, name_en, category, image, location, phone, google_map, rating, description })
  })

  console.log('mongodb connected!')
})