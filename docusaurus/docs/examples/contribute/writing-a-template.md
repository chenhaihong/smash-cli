---
title: Writing a template
sidebar_label: Writing a template
---

It is very easy to publish your own template.

## How to pulish your own template?

### 1. Change `name` in `package.json`

```json
{
  "name": "smash-template-[name]"
}
```

### 2. Add `keywords` to `package.json`

```json
{
  "keywords": ["smash", "smash-cli", "smash template"]
}
```

### 3. Publish it now

```bash
$ npm publish --access public
```

##

## Files with `.backup` suffix

The `.gitignore`, `.npmignore` and other files in the template package may not
be published.<br> We can slove this by adding `.backup` suffix to the filename.

```
├── .gitignore        # this file will not be published.
├── .gitignore.backup # this file will be publish.
```
