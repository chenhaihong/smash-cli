---
title: Command Line Usage
sidebar_label: Command Line Usage
---

## 1 How to create a configuration file?

The command below create a file named `task.yml` in directory `demo/.smash`:

```bash
$ mkdir demo && cd demo
$ smash init
```

Here is what `task.yml` looks like :

```yml
helloworld:
  - name: 'smash-middleware-helloworld' # 中间件名称
    paramA: 'param a' # 传递给这个中间件的参数 paramA
    paramB: 'param b' # 传递给这个中间件的参数 paramB
```

## 2 How to install middlewares?

Just run this.

```bash
$ smash install
```

It will find out all the middlewares used in the tasks.<br>And then it checks if the middlewares have been installed. If
not, it will install them.

## 3 How to run a task?

Just run this.

```bash
$ smash run helloworld
```

## 4 How to download a template package?

```bash
$ smash download smash-template-react
```

Browse [**examples**](examples/usage/using-a-template.md) to get more.
