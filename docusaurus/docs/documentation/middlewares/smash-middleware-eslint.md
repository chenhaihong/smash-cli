---
title: smash-middleware-eslint
sidebar_label: smash-middleware-eslint
---

An ESLint middleware for smash-cli.

## Usage

Add the following configuration to the `.smash/task.yml` file:

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

Then, run the `lint` task by executing the following command:

```shell
$ smash run lint
```

## Links

- [ESLint Command Line Interface ](https://cn.ESLint.org/docs/user-guide/command-line-interface)
- [ESLint Rules](https://cn.ESLint.org/docs/rules/)
