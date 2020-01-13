# smash-middleware-jest

A jest middleware for smash-cli.

# 使用

在 `.smash/task.yml` 文件中加入以下配置：

```yaml
jest:
  - name: smash-middleware-jest
    options: ./test --coverage
```

然后，执行以下命令来运行 `jest` 任务：

```
$ smash run jest
```

# 链接

- [smash-cli](https://github.com/chenhaihong/smash-cli)
