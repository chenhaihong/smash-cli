---
title: smash-middleware-copy
sidebar_label: smash-middleware-copy
---

A copy middleware for smash-cli.

## Usage

Add the following configuration to the `.smash/task.yml` file:

```yaml
copy:
  - name: smash-middleware-copy
    files:
      - /*.js      -> /dist/javascript
      - /index.css -> /dist/index.css
    tplData:
      name: helloworld # turn {{name}} into helloworld
  - name: smash-middleware-copy
    files:
      - /images -> /dist/images
```

Then, run the `copy` task by executing the following command:

```shell
$ smash run copy
```

## Links

- [handlebars](https://www.npmjs.com/package/handlebars)
