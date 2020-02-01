---
title: Using a template
sidebar_label: Using a template
---

We are going to download `smash-template-react` and run the `dev-server` task on it.

> Make sure you have installed `smash-cli`.

## Download it first

```bash
$ mkdir demo && cd demo
$ smash download smash-template-react
```

Don't forget to install its own dependencies.

```bash
$ npm i
```

## How to use?

### Read the `.smash/task.yml`

Here is what `.smash/task.yml` looks like:

```yaml
# Start webpack-dev-server
dev-server:
  - name: smash-middleware-webpack-v4
    type: dev-server
```

We can find a task named `dev-server`. And a middleware named `smash-middleware-webpack-v4` was used in it.

### Install middleware

Run the command below to install the middleware.

```bash
$ smash install
```

### Run a task

Now, run the `dev-server` task:

```bash
$ smash run dev-server
```

It starts the webpack-dev-server. A few minutes later, you will see a page opened in your browser.

OK! You finished it.
