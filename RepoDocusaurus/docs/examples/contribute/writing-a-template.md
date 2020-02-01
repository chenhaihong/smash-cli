---
title: Writing a template
sidebar_label: Writing a template
---

It is very easy to build your own template package.

## 1 Create a package

Create a package by running the following command:

```bash
$ mkdir smash-template-demo && cd smash-template-demo
$ npm init
```

## 2 Rename the package

Rename your template package like `smash-template-[name]` :

```json
{
  "name": "smash-template-demo",
  "keywords": ["smash", "smash-cli", "smash template", "other keyword"]
}
```

Don't forget to add your keywords.

## 3 Add your own files

Add your files into your package.

### Files with `.backup` suffix

The `.gitignore`, `.npmignore` and some other files will not be published. You can add a `.backup` suffix in the
filename to slove it.

For examples:

```
├── .gitignore        # this file will not be published
└── .gitignore.backup # this file will be publish
```

## 4 Publish it now

Run `npm publish --access public` to publish it.
