# docusaurus

使用 `docusaurus` 来生成文档。

# 1 安装依赖

```bash
# 安装依赖
$ cd docusaurus/website && yarn install
```

# 2 Dev

```bash
# A browser window will open up at http://localhost:3000
$ cd docusaurus/website && yarn start
```

# 3 Build

```bash
$ cd docusaurus/website && yarn build
```

# 4 Publish to github-page

```bash
# Publish the Site
# https://chenhaihong.github.io/smash-cli/
$ npx cross-env GIT_USER=chenhaihong CURRENT_BRANCH=master npm run publish-gh-pages
```
