# smash-template-react-component

使用 [smash-cli 模板规范](https://github.com/chenhaihong/smash-cli) 开发的 react 组件 模板。

# 安装模板

```bash
# 在demo目下安装本模板
$ mkdir demo && cd demo
$ smash i smash-template-react-component
```

# 目录结构

```
├── .smash            # smash-cli 工具的配置文件目录
│   └─── task.yml     # 配置文件，介绍文档：https://github.com/chenhaihong/smash-cli/wiki
│
├── dist              # 组件的构建输出目录，文件输出规则：[name].min.js
│
├── lib               # 组件入口目录，入口文件规则：*.js(x)
│
├── src               # 本地测试开发的文件存放的目录
│
├── webpack.config.js
│
```

# 开发模式构建

```bash
$ npm i
$ smash run server # 启动 webpack-dev-server
```

# 生产模式构建

```bash
$ smash run lib
```

# 提示

因为在首次运行项目时需要下载 smash-middleware-webpack-v4 中间件，所以速度会比较慢。

# Links

- [smash-cli](https://github.com/chenhaihong/smash-cli)
- [smash-middleware-webpack-v4](https://github.com/chenhaihong/smash-middleware-webpack-v4)
- [开发模板](https://github.com/chenhaihong/smash-cli/wiki/%E5%BC%80%E5%8F%91%E6%A8%A1%E6%9D%BF)
