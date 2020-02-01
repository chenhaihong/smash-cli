---
title: smash-template-react
sidebar_label: smash-template-react
---

<a class="link-npm-version" href="https://www.npmjs.com/package/smash-template-react" target="_blank" title="npm">
    <img src="https://img.shields.io/npm/v/smash-template-react" alt="npm"/>
</a>

React 16 template.

## 安装

创建一个 `demo` 目录，然后在里面下载本模板，

```bash
# 步骤 1 下载模板
$ mkdir demo && cd demo
$ smash download smash-template-react

# 步骤 2 安装项目依赖
$ npm install

# 步骤 3 安装中间件
$ smash install
```

## 开发

开启 `webpack-dev-server`，

```bash
$ smash run dev-server
```

或者只开启监听模式，

```bash
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
