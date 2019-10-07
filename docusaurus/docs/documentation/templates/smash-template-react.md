---
title: smash-template-react
sidebar_label: smash-template-react
---

React@16+ template.

## Installation

```bash
$ mkdir demo && cd demo
$ smash i smash-template-react
```

## Development

> It will cost you several minutes to install `smash-middleware-webpack-v4`
> middleware at the first time.

```bash
$ npm i
$ smash run server # start webpack-dev-server

# or
$ npm i
$ smash run watch
```

## Build

```bash
$ smash run build
```

## structure

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
