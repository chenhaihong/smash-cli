# smash-middleware-eslint

An ESLint middleware for smash-cli.

# 使用

在 `.smash/task.yml` 文件中加入以下配置，

```yaml
# 初始化ESLint配置
init:
  - name: smash-middleware-eslint
    options: --init

# 查找错误
check:
  - name: smash-middleware-eslint
    options:
      - ./
      - --ext .jsx,.js

# 查找并修复错误
lint:
  - name: smash-middleware-eslint
    options: ./ --ext .jsx,.js --fix
```

然后，执行以下命令来运行任务：

```shell
$ smash run lint # 也可以是init、check任务
```

options 参数与 ESLint 的 [ESLint 命令行 options 规则](https://cn.eslint.org/docs/user-guide/command-line-interface) 一致
。

# 链接

- [smash-cli](https://github.com/chenhaihong/smash-cli)
- [开发 smash-cli 中间件](https://github.com/chenhaihong/smash-cli/wiki/%E5%BC%80%E5%8F%91%E4%B8%AD%E9%97%B4%E4%BB%B6)
- [ESLint 命令行文档](https://cn.ESLint.org/docs/user-guide/command-line-interface)
- [ESLint 规则文档](https://cn.ESLint.org/docs/rules/)
