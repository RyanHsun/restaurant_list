const Restaurant = require('../restaurant')
const Category = require('../category')
const restaurantList = require('../../restaurant.json') // 載入 restaurant JSON 資料
const categoryList = require('../../category.json') // 載入 restaurant category JSON 資料

const db = require('../../config/mongoose') // 載入 mongoose

db.once('open', (req, res) => {
  console.log('mongodb connected!')
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
  console.log('import restaurant, done!')
  categoryList.results.forEach(item => {
    const name = item.name
    const name_en = item.name_en

    return Category.create({ name, name_en })
  })
  console.log('import restaurant category, done!')
})