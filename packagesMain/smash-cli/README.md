# smash-cli

[![npm](https://img.shields.io/npm/v/smash-cli)](https://www.npmjs.com/package/smash-cli)
[![npm](https://img.shields.io/npm/dm/smash-cli)](https://www.npmjs.com/package/smash-cli)
[![codecov](https://codecov.io/gh/chenhaihong/smash-cli/branch/master/graph/badge.svg)](https://codecov.io/gh/chenhaihong/smash-cli)
![workflows-macOS](https://github.com/chenhaihong/smash-cli/workflows/macOS/badge.svg)
![workflows-windows](https://github.com/chenhaihong/smash-cli/workflows/windows/badge.svg)
![workflows-ubuntu](https://github.com/chenhaihong/smash-cli/workflows/ubuntu/badge.svg)

A tiny task manager for modern JavaScript projects.

- Easy to get started.
- Reuse middlewares without repeated downloads.
- Help to purify your JavaScript projects.

[Document and examples](https://www.smash-cli.com).

- Examples
  1. [Using a template](https://www.smash-cli.com/docs/examples/usage/using-a-template.html)
  1. [Using a middleware](https://www.smash-cli.com/docs/examples/usage/using-a-middleware.html)
- Contribute
  1. [Writing a template](https://www.smash-cli.com/docs/examples/contribute/writing-a-template.html)
  1. [Writing a middleware](https://www.smash-cli.com/docs/examples/contribute/writing-a-middleware.html)

## Install

```bash
$ npm i -g smash-cli
```

## Usage

```bash
# Generate a .smash/task.yml file.
$ smash init

# Download a template package
$ smash install smash-template-react

# Run a task.
$ smash run helloworld
```

## Examples

- template
  - [smash-template-react](https://www.npmjs.com/package/smash-template-react)
  - [smash-template-react-component](https://www.npmjs.com/package/smash-template-react-component)
  - [smash-template-revealjs](https://www.npmjs.com/package/smash-template-revealjs)
- middleware
  - [smash-middleware-clean](https://www.npmjs.com/package/smash-middleware-clean)
  - [smash-middleware-copy](https://www.npmjs.com/package/smash-middleware-copy)
  - [smash-middleware-eslint](https://www.npmjs.com/package/smash-middleware-eslint)
  - [smash-middleware-jest](https://www.npmjs.com/package/smash-middleware-jest)
  - [smash-middleware-shell](https://www.npmjs.com/package/smash-middleware-shell)
  - [smash-middleware-webpack-v4](https://www.npmjs.com/package/smash-middleware-webpack-v4)
