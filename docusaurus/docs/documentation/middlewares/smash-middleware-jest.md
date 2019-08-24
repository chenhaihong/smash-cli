---
title: smash-middleware-jest
sidebar_label: smash-middleware-jest
---

A jest middleware for smash-cli.

## Usage

Add the following configuration to the `.smash/task.yml` file:

```yaml
jest:
  - name: smash-middleware-jest
    options: ./test --coverage
```

Then, run the `jest` task by executing the following command:

```shell
$ smash run jest
```
