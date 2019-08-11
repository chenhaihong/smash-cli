# smash-cli

A tiny task manager for JavaScript projects.

## 安装依赖

```bash
# 安装yarn
$ npm i -g yarn yrm
$ yrm use taobao

# 安装依赖
$ yarn install
# $ npx lerna bootstrap
```

## 检查静态语法、修正代码格式

```bash
$ yarn run eslint
$ yarn run prettier
```

## 测试

```bash
# 测试所有main和helper包
$ node scripts/test-main.js
# 只测试某个主包
$ node scripts/test-main.js --package=packagesHelper/smash-helper-logger

# 单个测试中间包
$ node scripts/test-middleware.js --package=packagesMiddleware/smash-middleware-clean
```

## 查看更改

```bash
$ npx lerna changed
```

## 发布

```bash
# 只发布tag
$ npx lerna version

# 发布tag，发布npm
$ npx lerna publish
```
