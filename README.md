# 純前端網站專案

這是一個使用純前端技術開發的網站專案，使用了以下技術：
- HTML5
- CSS3
- JavaScript
- GUN.js (透過 CDN 載入) 用於分散式資料庫和即時連線功能

## 如何開始

1. 直接用瀏覽器開啟 `src/index.html` 檔案即可
2. 或是使用 Live Server 之類的開發伺服器來執行

## GUN.js 使用說明

此專案使用 GUN.js 作為分散式資料庫，預設連接到公開的 relay peer。如果需要自行架設 relay peer，可以修改 `src/scripts/app.js` 中的 peers 設定。