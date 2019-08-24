---
title: smash-middleware-clean
sidebar_label: smash-middleware-clean
---

A directory cleaner middleware for smash-cli.

## Usage

Add the following configuration to the `.smash/task.yml` file:

```yaml
empty:
  - name: smash-middleware-clean
    dirs:
      - ./dist
      - ./build
remove:
  - name: smash-middleware-clean
    remove: true
    dirs:
      - ./dist
      - ./build
```

Then, run the `empty` or `remove` task by executing the following command:

```shell
# empty dist and build
$ smash run empty

# remove dist and build
$ smash run remove
```
