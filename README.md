# Element-Dashboard

### develop build
```
make dev
npm run dev
node build/dev-server.js
open http://localhost:8088/
```

### release build
```
make build
npm run build
node build/build.js
open docs/index.html
```

### 文件目录
+ src
  - api —— API 请求
  - assets —— 图片等资源文件
  - components —— 通用组件
  - mock —— API 请求拦截器
  - pages —— 页面文件夹
  - resources —— mock 数据源
  - styles —— 全局通用样式文件夹
  - utils —— 工具库文件夹

- docs 生成的 product 文件

- build 项目运行打包脚本

- config 配置文件
