# goodsReptile

> ### 安装puppeteer时注意
> * 直接使用npm i puppeteer时可能会显示以下错误
> >ERROR: Failed to download Chromium r515411! Set "PUPPETEER_SKIP_CHROMIUM_DOWNLOAD" env variable to skip download.

> * 解决
> > 跳过Chromium 下载，使用npm i puppeteer --ignore-scripts
> > 手动下载Chromium，[下载地址](:https://download-chromium.appspot.com)（需翻墙）
> * 在目录创建chromium文件夹，解对于系统文件
> * 配置chromium路径
> > ```executablePath: './chromium/chrome-win/chrome.exe'```