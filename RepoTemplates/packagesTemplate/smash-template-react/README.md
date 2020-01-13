# smash-template-react

使用 [smash-cli 模板规范](https://github.com/chenhaihong/smash-cli) 开发的 react@16.0.0+ 模板。

## 安装模板

```bash
# 在demo目下安装本模板
$ mkdir demo && cd demo
$ smash i smash-template-react
```

## 开发

> 因为在启动项目时需要下载 `smash-middleware-webpack-v4` 中间件，所以速度会比较慢。<br/>请耐心等待一会 ^\_^

```bash
$ npm i
$ smash run server # 启动 webpack-dev-server

# 或者
$ npm i
$ smash run watch # 监听文件变化，立即执行构建
```

## 构建

```bash
$ smash run build
```

## 目录结构

```
├─ .smash/          # smash-cli配置目录
│   └── task.yml
│
├─ mock/
│   └── user.js     # mock文件示例
|
├─ src/
│   ├─ assets/        # 静态资源目录
|   │   └─ index.html # index应用的html入口文件
│   ├─ components/    # 公共组件目录
│   ├─ helper/        # 辅助函数目录
│   ├─ pages/         # 页面层级组件目录
|   │   └─ index      # 首页文件目录
│   ├─ services/      # services请求目录
│   └─ index.js       # index应用入口
│
├─ .gitignore
├─ .npmignore
├─ package.json
├─ proxy.js
├─ README.md
└─ webpack.config.js # 自定义webpack配置
```

## Links

- [smash-cli](https://github.com/chenhaihong/smash-cli)
- [smash-middleware-webpack-v4](https://github.com/chenhaihong/smash-middleware-webpack-v4)
- [开发模板](https://github.com/chenhaihong/smash-cli/wiki/%E5%BC%80%E5%8F%91%E6%A8%A1%E6%9D%BF)
