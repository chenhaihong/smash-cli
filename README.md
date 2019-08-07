# smash-cli

A tiny task manager for JavaScript projects.

## 安装依赖

```bash
$ npm i
$ npx lerna bootstrap
```

## 检查静态语法、修正代码格式

```bash
$ npm run eslint
$ npm run prettier
```

## 测试

```bash
# 测试所有包
$ node scripts/test.js

# 只测试某个包
$ node scripts/test.js --package=packagesHelper/smash-helper-logger
```

## 查看更改

```bash
$ npx lerna changed
```

## Pushing tags

```bash
$ npx lerna version
```

## 发布

```bash
$ npx lerna publish
```
