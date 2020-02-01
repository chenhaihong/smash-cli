---
title: Using a middleware
sidebar_label: Using a middleware
---

We are going to use `smash-middleware-helloworld` to show `hello world` on the terminal.

> Make sure you have installed `smash-cli`.

## 1 Add a task

Add a task named `helloworld` into `.smash/task.yml`:

```yaml
helloworld: # a task named `helloworld`
  - name: smash-middleware-helloworld
```

## 2 Install the middleware

```bash
$ smash install
```

## 3 Run the task

Now, run the `helloworld` task:

```bash
$ smash run helloworld

# or
$ smash r helloworld
```

Yeah! You finished it. Browse [middlewares](documentation/middlewares/smash-middleware-clean.md) to find more useful
middlewares.
