---
title: Using a middleware
sidebar_label: Using a middleware
---

We are going to use `smash-middleware-helloworld` ouput `hello world` on the
console.

> Make sure you have the smash-cli installed.

## Add a task

Add a task named `helloworld` into `.smash/task.yml`:

```yaml
helloworld: # a task named `helloworld`
  - name: smash-middleware-helloworld
```

## Run the task

Now, run the `server` task by executing the following command:

```bash
$ smash run helloworld

# or
$ smash r helloworld
```

Yeah! You finished it. Goto
[middlewares](documentation/middlewares/smash-middleware-clean.md) to find more
useful middlewares.
