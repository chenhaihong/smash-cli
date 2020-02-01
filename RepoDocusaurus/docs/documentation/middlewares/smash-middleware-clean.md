---
title: smash-middleware-clean
sidebar_label: smash-middleware-clean
---

<a class="link-npm-version" href="https://www.npmjs.com/package/smash-middleware-clean" target="_blank" title="npm">
    <img src="https://img.shields.io/npm/v/smash-middleware-clean" alt="npm"/>
</a>

Directory cleaner.

## Usage

Add the following configuration to `.smash/task.yml` :

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

Run the tasks:

```bash
# empty directory dist and build
$ smash run empty

# remove directory dist and build
$ smash run remove
```
