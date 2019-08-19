# smash-cli

A tiny task manager for JavaScript projects.

# 1 开发

## 1.1 安装依赖

```bash
# 安装yarn
$ npm i -g yarn yrm
$ yrm use taobao

# 安装依赖
$ yarn install
# $ npx lerna bootstrap
```

## 1.2 检查静态语法、修正代码格式

```bash
$ yarn run eslint
$ yarn run prettier
```

## 1.3 测试

```bash
# 测试所有main和helper包
$ node scripts/test-main.js
# 只测试某个主包
$ node scripts/test-main.js --package=packagesHelper/smash-helper-logger

# 单个测试中间包
$ node scripts/test-middleware.js --package=packagesMiddleware/smash-middleware-clean
```

## 1.4 查看更改

```bash
$ npx lerna changed
```

## 1.5 发布

```bash
# 只发布tag
$ npx lerna version

# 发布tag，发布npm
$ npx lerna publish
```

# 2 文档

使用 `docusaurus` 生成的文档。

```bash
# 安装依赖
$ cd docusaurus/website && yarn install

# A browser window will open up at http://localhost:3000
$ cd docusaurus/website && yarn start

# Publish the Site
# https://chenhaihong.github.io/smash-cli/
$ cd docusaurus/website && yarn build
$ npx cross-env GIT_USER=chenhaihong CURRENT_BRANCH=master npm run publish-gh-pages
```
