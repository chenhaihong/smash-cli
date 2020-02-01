---
title: smash-middleware-shell
sidebar_label: smash-middleware-shell
---

<a class="link-npm-version" href="https://www.npmjs.com/package/smash-middleware-shell" target="_blank" title="npm">
    <img src="https://img.shields.io/npm/v/smash-middleware-shell" alt="npm"/>
</a>

Simple shell runner.

## Usage

添加配置到 `.smash/task.yml` 里：

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

运行任务：

```bash
$ smash run series-task
```
