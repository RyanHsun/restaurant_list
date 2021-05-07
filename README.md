# 我的餐廳清單 - My Restaurant List
一個使用 Node.js 的框架 Express 打造的餐廳清單網站專案，

## 功能描述 - Features
* 餐廳資訊列表，在列表中顯示所有餐廳的名稱、類別、評分及店內照片。
* 點擊餐廳可以瀏覽更多關於該餐廳的詳細資訊，顯示的詳細資訊有餐廳的名稱、分類、評分、電話、地址、餐廳介紹及店內照片。
* 除了瀏覽原本的餐廳資料之外，使用者可以透過新增餐廳功能來增加新的一筆餐廳資料。
* 每一筆餐廳資料皆可以透過編輯按鈕進行資料修改並儲存。
* 不喜歡的餐廳(可能換廚師變得不好吃XD)可以透過垃圾桶按鈕點擊刪除該餐廳。
* 可以使用關鍵字或餐廳類別尋找餐廳，如果找不到符合的資料會顯示提示資訊，輸入大小寫皆可查詢到，例：PIzzA。
* 在尋找餐廳時可以直接點擊餐廳類別來尋找，加快找到想要的餐廳。

## 專案畫面
![RestaurantList-Demo](https://raw.githubusercontent.com/RyanHsun/restaurant_list/master/app-demo.png "Restaurant List - Demo") 

## 環境建置與需求 - Prerequisites
* 開發環境：Node.js v10.15.0
* 開發框架：Express v4.17.1
* 框架模板：handlebars v5.3.0
* 中介軟體：body-parser v1.19.0
* 資料庫：  mongoDB v4.2.13
* 物件模型工具：mongoose v5.12.7

## 安裝與執行步驟 - Installation and execution
1. 打開終端機(Terminal)，使用 git clone 將專案下載至本機電腦，或是直接在 github 下載專案壓縮檔(Download ZIP)。
```
git clone https://github.com/RyanHsun/restaurant_list.git
```

2. 在終端機輸入以下指令，進入專案資料夾
```
cd restaurant_list
```

3. 先安裝 MongoDB 資料庫，請看下方安裝流程說明。

4. 再安裝執行專案需要的相關套件
```
npm install
npm install nodemon mongoose express-handlebars body-parser
```

5. 載入預設的餐廳資料以及餐廳類別資料。
```
npm run seed
```

6. 當終端機顯示以下訊息即表示資料載入完成
```
mongodb connected!
import restaurant, done!
import restaurant category, done!
```

7. 接著就可以啟動伺服器來執行專案，若沒有執行步驟 5 在啟動專案後畫面不會顯示餐廳資料。
```
npm run dev
``` 

8. 當終端機顯示以下訊息即成功啟動，使用瀏覽器於網址列中輸入 http://localhost:3000 即可開始操作專案～
```
Server is listening on http://localhost:3000
```

9. 在伺服器啟動狀態下於鍵盤按下 Ctrl + C ，即可關閉伺服器停止執行專案


## 安裝 MongoDB 流程
1. 安裝 MongoDB，將在在後的資料夾名稱改為 "mongodb"，並與專案資料夾放置在同層，接著建立新資料夾 mongodb-data 存放資料。

2. 啟動 MongoDB 伺服器，在終端機輸入以下指令切換到 mongodb 目錄資料夾。
```
cd ~/mongodb/bin/
```

3. 接著輸入以下指令
```
./mongod --dbpath /Users/[你的使用者名稱]/mongodb-data
```

4. 在終端機中找到以下訊息，表示伺服器啟動成功。
```
waiting for connections on port 27017
```

## 專案開發人員 - Contributor
[RyanHsun](https://github.com/RyanHsun)