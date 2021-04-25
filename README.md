# 我的餐廳清單 - My Restaurant List
一個使用 Node.js 的框架 Express 打造的餐廳清單網站專案，

## 功能描述 - Features
* 餐廳資訊列表，在列表中顯示餐廳餐廳名稱、分類、評分及店內照片。
* 點擊餐廳可以瀏覽更多關於該餐廳的詳細資訊，顯示的詳細資訊有餐廳的名稱、分類、評分、電話、地址、餐廳介紹及店內照片。
* 可以使用關鍵字或分類尋找餐廳，如果找不到符合的資料會顯示提示資訊。

## 專案畫面
![RestaurantList-Demo](https://raw.githubusercontent.com/RyanHsun/restaurant_list/master/app-demo.png "Restaurant List - Demo") 

## 環境建置與需求 - Prerequisites
* 開發環境：Node.js v10.15.0
* 開發框架：Express v4.17.1
* 框架模板：handlebars v5.3.0

## 安裝與執行步驟 - Installation and execution
1. 打開終端機(Terminal)，使用 git clone 將專案下載至本機電腦，或是直接在 github 下載專案壓縮檔(Download ZIP)。
```
git clone https://github.com/RyanHsun/restaurant_list.git
```

2. 在終端機輸入以下指令，進入專案資料夾
```
cd restaurant_list
```

3. 安裝執行專案需要的相關套件
```
npm install
npm install nodemon
```

4. 啟動伺服器執行專案
```
npm run dev
``` 

5. 當終端機顯示以下訊息即成功啟動，使用瀏覽器於網址列中輸入 http://localhost:3000 即可開始操作專案～
```
Server is listening on http://localhost:3000
```

6. 在伺服器啟動狀態下於鍵盤按下 Ctrl + C ，即可關閉伺服器停止執行專案


## 專案開發人員 - Contributor
> [link text] (https://github.com/RyanHsun)