---
title: Configuration
sidebar_label: Configuration
---

## Generate a `.smash/task.yml` file

```bash
$ mkdir demo && cd demo
$ smash init

# or
$ smash i
```

## Add a task

You can add any work task you want in the `.smash/task.yml` file.<br> For
example, add the following configuration:

```yaml
helloworld:
  - name: smash-middleware-helloworld
```

It defines a task named `helloworld`.

## Run a task

```bash
$ smash run helloworld

# or
$ smash r helloworld
```

It uses `smash-middleware-helloworld` middleware to output `Hello world` to the
console.
