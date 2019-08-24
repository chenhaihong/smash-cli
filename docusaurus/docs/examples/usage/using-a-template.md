---
title: Using a template
sidebar_label: Using a template
---

We are going to download `smash-template-react` and run the `server` task on it.

> Make sure you have the smash-cli installed.

## Download

```bash
$ mkdir demo && cd demo
$ smash install smash-template-react

# Don't forget to install its dependencies.
$ npm i
```

## Usage

### Read the `.smash/task.yml`

Open the `.smash/task.yml`. Here we found a task named `server`.

```yaml
# Start webpack-dev-server
server:
  - name: smash-middleware-webpack-v4
    type: server
```

### Run a task

Now, run the `server` task by executing the following command:

```bash
$ smash run server
```

OK! You finished it.
