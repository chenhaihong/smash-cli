---
title: smash-middleware-shell
sidebar_label: smash-middleware-shell
---

A shell executor middleware for smash-cli.

## Usage

Add the following configuration to the `.smash/task.yml` file:

```yaml
shell:
  - name: smash-middleware-shell
    commands:
      - mkdir demo && cd demo
      - ls
      - touch index.js
      - ls
```

Then, run the `shell` task by executing the following command:

```bash
$ smash run shell
```
