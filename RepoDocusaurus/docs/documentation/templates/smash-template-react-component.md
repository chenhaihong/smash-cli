---
title: smash-template-react-component
sidebar_label: smash-template-react-component
---

<a class="link-npm-version" href="https://www.npmjs.com/package/smash-template-react-component" target="_blank" title="npm">
    <img src="https://img.shields.io/npm/v/smash-template-react-component" alt="npm"/>
</a>

React 16 component template.

## 安装

```bash
# 步骤 1 下载模板
$ mkdir demo && cd demo
$ smash download smash-template-react-component

# 步骤 2 安装项目依赖
$ npm install

# 步骤 3 安装中间件
$ smash install
```

## 开发

```bash
$ smash run dev-server # Start webpack-dev-server
```

## 构建

```bash
$ smash run lib
```

## 目录结构

```
├── .smash            # smash-cli 工具的配置文件目录
│     └─── task.yml   # 配置文件
├── dist              # 组件的构建输出目录，文件输出规则：[name].min.js
├── lib               # 组件入口目录，入口文件规则：*.js(x)
├── src               # 本地测试开发的文件存放的目录
└── webpack.config.js
```
