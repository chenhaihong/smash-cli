# smash-middleware-copy

A copy middleware for smash-cli.

# 使用

在 `.smash/task.yml` 文件中加入以下配置：

```yaml
copy:
  - name: smash-middleware-copy
    files:
      - /*.js      -> /dist/javascript
      - /index.css -> /dist/index.css
    tplData:
      name: helloworld # 这是一个模板数据，拷贝文件中的{{name}}会被替换成helloworld
  # 拷贝图片类型的文件时，建议跟上面需要处理模板的操作分开
  - name: smash-middleware-copy
    files:
      - /images -> /dist/images
```

然后，执行以下命令来运行 `copy` 任务：

```bash
$ smash run copy
```

# 链接

- [smash-cli](https://github.com/chenhaihong/smash-cli/tree/master/packagesMain/smash-cli)
- [handlebars](https://www.npmjs.com/package/handlebars)
