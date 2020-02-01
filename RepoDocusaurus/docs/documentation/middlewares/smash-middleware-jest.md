---
title: smash-middleware-jest
sidebar_label: smash-middleware-jest
---

<a class="link-npm-version" href="https://www.npmjs.com/package/smash-middleware-jest" target="_blank" title="npm">
    <img src="https://img.shields.io/npm/v/smash-middleware-jest" alt="npm"/>
</a>

A jest middleware for smash-cli.

## Usage

添加配置到 `.smash/task.yml` 里：

```yaml
jest:
  - name: smash-middleware-jest
    options: ./test --coverage
```

运行任务：

```bash
$ smash run jest
```
