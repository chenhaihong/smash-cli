---
title: smash-middleware-helloworld
sidebar_label: smash-middleware-helloworld
---

<a class="link-npm-version" href="https://www.npmjs.com/package/smash-middleware-helloworld" target="_blank" title="npm">
    <img src="https://img.shields.io/npm/v/smash-middleware-helloworld" alt="npm"/>
</a>

A Helloworld middleware for smash-cli.

## Usage

在 `.smash/task.yml` 文件中加入以下配置：

```yaml
helloworld:
  - name: smash-middleware-helloworld
```

然后，执行以下命令来运行 `helloworld` 任务：

```bash
$ smash run helloworld
```
