# smash-middleware-shell

A shell executor middleware for smash-cli.

# 使用

在 `.smash/task.yml` 文件中加入以下配置：

```yaml
shell:
  - name: smash-middleware-shell
    commands:
      - mkdir demo && cd demo
      - ls
      - touch index.js
      - ls
```

然后，执行以下命令来运行 `shell` 任务：

```bash
$ smash run shell
```

所有的命令会被从上往下顺序执行。

# 链接

- [smash-cli](https://www.smash-cli.com/)
