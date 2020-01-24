# smash-middleware-webpack-v4

使用 [smash-cli 中间件规范](https://www.smash-cli.com/) 开发的 webpack 中间件，该中间件已经内置了
[webpack-dev-server](https://www.npmjs.com/package/webpack-dev-server)。

- 支持 mock
- 支持 proxy
- 支持
  [dynamic import](https://webpack.docschina.org/guides/code-splitting/#%E5%8A%A8%E6%80%81%E5%AF%BC%E5%85%A5-dynamic-imports-)
- 支持以下类型的文件
  - html
  - js
  - react 支持，使用 .jsx 文件后缀
  - vue 2 支持，（不支持 JSX、CSS Modules）
  - css、less，（`.m.css` 和 `.m.less` 将启用 CSS Modules）

# 使用

<!-- ## Step 1 - 加入配置 -->
<details>
<summary><b>Step 1 - 加入配置</b></summary>
<p>
在 <code>.smash/task.yml</code> 文件中加入配置：

```yaml
dev-server:
  - name: smash-middleware-webpack-v4
    type: dev-server # 浏览器网页应用，开发模式，启用webpack-dev-server

watch:
  - name: smash-middleware-webpack-v4
    type: watch # 浏览器网页应用，开发模式，开启watch模式

build:
  - name: smash-middleware-webpack-v4
    type: build # 浏览器网页应用，生产环境

buildLib:
  - name: smash-middleware-webpack-v4
    type: lib # js lib类型应用，生产环境
```

参数的配置规则如下：

- `type`：默认为 `build`
  - `dev-server`：浏览器网页应用，开发模式，启用 webpack-dev-server
  - `watch`：浏览器网页应用，开发模式，开启 watch 模式
  - `build`：浏览器网页应用，生产环境
  - `lib`：js 库类型应用，生产环境
    </p>
    </details>

<!-- ## Step 2 - 添加自定义webpack配置 -->
<details>
<summary><b>Step 2 [可选] - 添加自定义webpack配置</b></summary>
<p>

在项目根目录新建 `webpack.config.js` 文件，可增加自定义配置。

```javascript
module.exports = ({ webpack, defaultWebpackConfig }) => {
  return {
    devtool: 'source-map',
    externals: {
      axios: 'axios',
      jquery: 'jQuery',
      react: 'React',
      'react-dom': 'ReactDOM',
      vue: 'Vue',
    },
    resolve: {
      ...defaultWebpackConfig.resolve,
      alias: {},
    },
    devServer: {
      ...defaultWebpackConfig.devServer,
      hot: true,
      // hotOnly: true, // 只启用页面无刷新替换
      port: 8080,
      proxy: {
        // 代理配置
        '/api': 'http://localhost:3000',
      },
    },
  };
};
```

</p>
</details>

<!-- ## Step 3 - 执行任务 -->
<details>
<summary><b>Step 3 - 执行任务</b></summary>
<p>

```bash
# 启动 webpack-dev-server
$ smash run dev-server

# 开启 watch 模式
$ smash run watch

# 生产模式构建网页应用
$ smash run build

# 生产模式下构建js库应用
$ smash run buildLib
```

</p>
</details>

# 使用示例

- [smash-template-react](https://www.smash-cli.com/docs/documentation/templates/smash-template-react.html)
- [smash-template-react-component](https://www.smash-cli.com/docs/documentation/templates/smash-template-react-component.html)

# 链接

- [smash-cli](https://www.smash-cli.com/)
- [开发 smash-cli 中间件](https://www.smash-cli.com/docs/examples/contribute/writing-a-middleware.html)
- [webpack loaders [zh]](https://webpack.docschina.org/loaders/)
