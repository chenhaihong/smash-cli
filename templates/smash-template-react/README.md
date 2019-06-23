# smash-template-react

使用 [smash-cli 模板规范](https://github.com/chenhaihong/smash-cli) 开发的 react@16.0.0+ 模板。

# 安装模板

```bash
# 在demo目下安装本模板
$ mkdir demo && cd demo
$ smash i smash-template-react
```

# 开发模式构建

```bash
$ npm i
$ smash run server # 启动 webpack-dev-server

# 或者
$ npm i
$ smash run watch # 监听文件变化，立即执行构建
```

# 生产模式构建

```bash
$ smash run build 
```

# 提示

因为在首次运行项目时需要下载 smash-middleware-webpack-v4 中间件，所以速度会比较慢。

# Links

- [smash-cli](https://github.com/chenhaihong/smash-cli)
- [smash-middleware-webpack-v4](https://github.com/chenhaihong/smash-middleware-webpack-v4)
- [开发模板](https://github.com/chenhaihong/smash-cli/wiki/%E5%BC%80%E5%8F%91%E6%A8%A1%E6%9D%BF)
