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

It will find out all the middlewares used in the tasks.<br>And then check if the middlewares have been installed. If
not, it will install them.

```bash
$ smash install
```

## 3 How to run a task?

The command below can

```bash
$ smash run helloworld
```

## 4 How to download a template package?

```bash
$ mkdir demo && cd demo
$ smash run helloworld
```
