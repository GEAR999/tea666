# 泡饮百科 PWA 打包指南

## 项目已配置为 PWA（渐进式Web应用）

### 文件说明
- `manifest.json` - PWA 配置文件
- `sw.js` - Service Worker（离线缓存）
- `icon-192.png` / `icon-512.png` - 应用图标（占位符，需替换）
- `icon.svg` - SVG 图标源文件

## 生成应用图标

### 方法一：使用在线工具（推荐）
1. 访问 https://realfavicongenerator.net/
2. 上传 `icon.svg` 文件
3. 下载生成的图标包
4. 将 `icon-192.png` 和 `icon-512.png` 替换到项目根目录

### 方法二：使用设计工具
- 使用 Figma、Photoshop 等工具设计 512x512 和 192x192 的图标
- 导出为 PNG 格式
- 替换项目中的图标文件

### 图标设计建议
- 主色：抹茶绿 #7B9E6B
- 可以包含"茶"字或茶杯图案
- 简洁明了，适合小尺寸显示

## 部署到网上

### 方式一：GitHub Pages（免费）
1. 创建 GitHub 仓库
2. 上传所有文件
3. 在 Settings → Pages 中启用 GitHub Pages
4. 选择 main 分支，保存

### 方式二：Vercel（免费）
1. 访问 https://vercel.com
2. 导入 GitHub 仓库
3. 自动部署

### 方式三：Netlify（免费）
1. 访问 https://netlify.com
2. 拖拽项目文件夹到部署区域
3. 自动部署

## 使用 PWA Builder 打包 APK

1. 访问 https://www.pwabuilder.com/
2. 输入你的网站 URL（如 https://yourusername.github.io/paoyin-baike/）
3. 点击"Start"分析
4. 分析完成后，点击"Package for stores"
5. 选择"Android"
6. 下载 APK 文件
7. 在安卓手机上安装 APK

## 测试 PWA

1. 部署到网上后，用手机浏览器访问
2. 应该可以看到"添加到主屏幕"的提示
3. 添加到主屏幕后，可以离线使用
4. 体验接近原生 App

## 注意事项

- PWA 需要 HTTPS 协议才能正常工作
- 首次访问需要联网，之后可以离线使用
- Service Worker 会缓存静态资源，更新代码后需要刷新缓存
- 图标文件需要替换为真正的图标，否则显示效果不佳
