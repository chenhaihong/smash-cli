---
title: smash-middleware-copy
sidebar_label: smash-middleware-copy
---

<a class="link-npm-version" href="https://www.npmjs.com/package/smash-middleware-copy" target="_blank" title="npm">
    <img src="https://img.shields.io/npm/v/smash-middleware-copy" alt="npm"/>
</a>

Copies files or directories.

## Usage

添加配置到 `.smash/task.yml` 里：

```yaml
copy-files:
  - name: smash-middleware-copy
    files:
      - /*.js -> /dist/javascript
    tplData:
      name: helloworld # Replace {{name}} with 'helloworld'

copy-directories:
  - name: smash-middleware-copy
    files:
      - /images -> /dist/images
```

运行任务：

```bash
$ smash run copy-files

$ smash run copy-directories
```

## Links

- [handlebars](https://www.npmjs.com/package/handlebars)
