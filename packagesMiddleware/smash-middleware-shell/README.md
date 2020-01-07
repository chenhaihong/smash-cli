# smash-middleware-shell

A shell executor middleware for smash-cli.

# 使用

在 `.smash/task.yml` 文件中加入以下配置：

```yaml
# 串行
# 所有的命令会被从上往下顺序执行。
series-task:
  - name: smash-middleware-shell
    commands:
      - mkdir demo && cd demo
      - ls
      - touch index.js
      - ls

# 并行
# 切换目录之外的命令都会并行执行。
parallel-task:
  - name: smash-middleware-shell
    parallel: true
    commands:
      - cd demo1
      - npx webpack-dev-server # 并行执行
      - cd ../demo2
      - npx webpack-dev-server # 并行执行
```

然后，执行以下命令来运行 `shell` 任务：

```bash
$ smash run shell
```

# 链接

- [smash-cli](https://www.smash-cli.com/)
