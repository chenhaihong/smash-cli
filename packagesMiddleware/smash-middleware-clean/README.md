# smash-middleware-clean

A directory cleaner middleware for smash-cli.

# 使用

在 `.smash/task.yml` 文件中加入以下配置：

```yaml
clean:
  - name: smash-middleware-clean
    dirs:
      - ./dist
      - ./build
remove:
  - name: smash-middleware-clean
    remove: true
    dirs:
      - ./dist
      - ./build
```

然后，执行以下命令来运行 `clean` 或者 `remove` 任务：

```bash
# `clean` 任务会清空当前工作目录下的 `dist` 和 `build` 目录。
$ smash run clean

# `remove` 任务会删除当前工作目录下的 `dist` 和 `build` 目录。
$ smash run remove
```

# 链接

- [smash-cli](https://github.com/chenhaihong/smash-cli/tree/master/packagesMain/smash-cli)