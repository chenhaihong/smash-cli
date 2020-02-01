---
title: smash-middleware-eslint
sidebar_label: smash-middleware-eslint
---

<a class="link-npm-version" href="https://www.npmjs.com/package/smash-middleware-eslint" target="_blank" title="npm">
    <img src="https://img.shields.io/npm/v/smash-middleware-eslint" alt="npm"/>
</a>

An ESLint middleware for smash-cli.

## Usage

添加配置到 `.smash/task.yml` 里：

```yaml
# 初始化ESLint配置
init:
  - name: smash-middleware-eslint
    options: --init

# 查找错误
check:
  - name: smash-middleware-eslint
    options:
      - ./
      - --ext .jsx,.js

# 查找并修复错误
lint:
  - name: smash-middleware-eslint
    options: ./ --ext .jsx,.js --fix
```

options 参数与 ESLint 的 [ESLint 命令行 options 规则](https://cn.eslint.org/docs/user-guide/command-line-interface) 一致
。

运行任务：

```bash
$ smash run lint
```

## Links

- [ESLint Command Line Interface ](https://cn.ESLint.org/docs/user-guide/command-line-interface)
- [ESLint Rules](https://cn.ESLint.org/docs/rules/)
