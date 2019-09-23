# 开发

## 1 安装依赖

```bash
# 安装yarn，使用淘宝源
$ npm i -g yarn yrm
$ yrm use taobao

$ yarn install
```

## 2 测试

```bash
# 测试所有main和helper包
$ node scripts/test-main.js
# 只测试某个主包
$ node scripts/test-main.js --package=packagesHelper/smash-helper-logger

# 测试单个中间件
$ node scripts/test-middleware.js --package=packagesMiddleware/smash-middleware-clean
```

## 3 查看更改

```bash
$ npx lerna changed
```

## 4 发布

```bash
# 发布tag，提交记录，发布npm
$ npx lerna publish
```
