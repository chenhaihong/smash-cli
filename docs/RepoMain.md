# 开发

## 1 安装依赖

安装 lerna yarn，使用淘宝镜像。

```bash
$ smash run smash-cli-install
```

## 2 开发与测试

```bash
$ cd RepoMain
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
