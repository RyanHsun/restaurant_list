// 引用 Express 與 Express 路由器
const express = require('express')
const router = express.Router()
const Restaurant = require('../../models/restaurant') // 引用 Restaurant model
const Category = require('../../models/category') // 引用 Restaurant model

// 設定新增餐廳頁面的路由
router.get('/new', (req, res) => {
  Category.find()
    .lean()
    .then(categories => res.render('new', { categories }))
    .catch(error => console.lgo(error))
})

// 將新增的餐廳資料傳到資料庫
router.post('/', (req, res) => {
  const restaurant = req.body // 從 req.body 拿出表單裡的所有資料，並存放在 restaurant
  return Restaurant.create(restaurant) // 透過 create() 將資料存入資料庫
    .then(() => res.redirect('/')) // 新增新增完成後導回首頁
    .catch(error => console.log(error))
})

// 設定餐廳詳細頁面的路由
router.get('/:id', (req, res) => {
  const id = req.params.id
  return Restaurant.findById(id)
    .lean()
    .then((restaurant) => res.render('detail', { restaurant }))
    .catch(error => console.log(error))
})

// 設定餐廳編輯頁面的路由
router.get('/:id/edit', (req, res) => {
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
router.put('/:id', (req, res) => {
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
router.delete('/:id', (req, res) => {
  const id = req.params.id
  return Restaurant.findById(id)
    .then(restaurant => restaurant.remove())
    .then(() => res.redirect(`/`))
    .catch(error => console.log(error))
})

module.exports = router