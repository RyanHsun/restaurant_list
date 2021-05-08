// 引用 Express 與 Express 路由器 
const express = require('express')
const router = express.Router()
const Restaurant = require('../../models/restaurant') // 引用 Restaurant model
const Category = require('../../models/category') // 引用 Restaurant model

// 將路由改為從資料庫查找資料
router.get('/', (req, res) => {
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

// 設定關鍵字搜尋的路由
router.get('/search', (req, res) => {
  // 將關鍵字轉為小寫格式
  const keyword = req.query.keyword.toLowerCase().trim()

  // 使用 find() 查詢名稱及類別中有符合關鍵字條件的資料，透過 $or 判斷餐廳名稱或是餐廳類別是否有符合條件
  Restaurant.find({
    $or: [
      { name: { $regex: keyword, $options: 'i' } },
      { category: { $regex: keyword, $options: 'i' } }
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

// 匯出路由模組
module.exports = router