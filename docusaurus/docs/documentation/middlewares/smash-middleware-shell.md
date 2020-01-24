---
title: smash-middleware-shell
sidebar_label: smash-middleware-shell
---

A shell executor middleware for smash-cli.

## Usage

Add the following configuration to the `.smash/task.yml` file:

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

Then, you can run the `series-task` task by executing the following command:

```bash
$ smash run series-task
```
