# smash-middleware-copy

A Helloworld middleware for smash-cli.

# 使用

在 `.smash/task.yml` 文件中加入以下配置：

```yaml
copy:
  - name: smash-middleware-copy
    files:
      - ./*.js        -> ./dist/javascript
      - ./index.style -> ./dist/index.style
    tplData:
      name: 这是一个模板数据，使用了handlebars来处理模板
  # 拷贝图片类型的文件时，建议跟上面需要处理模板的操作分开
  - name: smash-middleware-copy
    files:
      - ./images -> ./dist/images
```

然后，执行以下命令来运行 `copy` 任务：

```
$ smash run copy
```

# 链接

- [smash-cli](https://github.com/chenhaihong/smash-cli)
