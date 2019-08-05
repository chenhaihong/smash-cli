# smash-run

Task executing function for smash-cli.

## Usage

**1. Create `task.yml`**

Create `{cwd}/.smash/task.yml`:

```yaml
helloworld-task:
  - name: smash-middleware-helloworld
  - name: smash-middleware-helloworld
```

**2. Run task**

```javascript
const smashRun = require('smash-run');

smashRun('helloworld-task');
```

## Links

- [smash-cli](https://github.com/chenhaihong/smash-cli)
