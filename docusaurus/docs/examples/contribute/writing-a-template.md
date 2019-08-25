---
title: Writing a template
sidebar_label: Writing a template
---

It is very easy to write your own template.

## 1. Create a package

Create a package by executing the following command:

```bash
$ mkdir smash-template-demo && cd smash-template-demo
$ npm init
```

Change your template's name into `smash-template-[name]`:

```json
{
  "name": "smash-template-demo",
  "keywords": ["smash", "smash-cli", "smash template", "other keyword"]
}
```

Don't forget to add your keywords meanwhile.

## 2. Add your files

Add what your want into your package.

### Files with `.backup` suffix

The `.gitignore`, `.npmignore` and some other files will not be published. Add
`.backup` suffix into the filename to slove it.

For examples:

```
├── .gitignore        # this file will not be published
└── .gitignore.backup # this file will be publish
```

## 3. Publish it now

Execute `npm publish --access public` to publish it.
