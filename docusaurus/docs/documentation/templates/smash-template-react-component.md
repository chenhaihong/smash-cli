---
title: smash-template-react-component
sidebar_label: smash-template-react-component
---

React component template.

## Installation

```bash
$ mkdir demo && cd demo
$ smash i smash-template-react-component
```

## Development

```bash
$ npm i
$ smash run server # Start webpack-dev-server
```

## Build

```bash
$ smash run lib
```

## Structure

```
├── .smash            # smash-cli 工具的配置文件目录
│     └─── task.yml   # 配置文件
├── dist              # 组件的构建输出目录，文件输出规则：[name].min.js
├── lib               # 组件入口目录，入口文件规则：*.js(x)
├── src               # 本地测试开发的文件存放的目录
└── webpack.config.js
```

## Tip

- It will cost you a few minutes to install `smash-middleware-webpack-v4`
  middleware at the first time.
