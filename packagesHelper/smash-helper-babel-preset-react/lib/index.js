'use strict';

module.exports = smashHelperBabelPresetReact;

function smashHelperBabelPresetReact(context, opts = {}) {
  const nodeEnv = process.env.NODE_ENV;

  /**
   * 获取babel stage0、1、2、3的所有插件
   *
   * As of Babel v7, all the stage presets have been deprecated. Check the blog post for more information.
   * https://babeljs.io/blog/2018/07/27/removing-babels-stage-presets
   *
   * For upgrade instructions, see the README.
   * https://github.com/babel/babel/blob/master/packages/babel-preset-stage-0/README.md
   */
  const plugins = [
    // Stage 0
    require.resolve('@babel/plugin-proposal-function-bind'),

    // Stage 1
    /**
     * Old:
     *   import {v} from "mod";
     *   export {v};
     * Now:
     *   export {v} from "mod";
     */
    require.resolve('@babel/plugin-proposal-export-default-from'),
    // Old: a || (a = b);   a && (a = b);
    // Now: a ||= b;        a &&= b;
    require.resolve('@babel/plugin-proposal-logical-assignment-operators'),
    // Old: var street = user.address && user.address.street;
    // Now: var street = user.address?.street;
    [require.resolve('@babel/plugin-proposal-optional-chaining'), { loose: false }],
    /**
     * let score=25;
     * function double (x) { return x + x; }
     * function add (x, y) { return x + y; }
     * function boundScore (min, max, score) {
     *   return Math.max(min, Math.min(max, score));
     * }
     *
     * Old: let newScore = boundScore(60, 90, add(double(score), 10))
     * Now: let newScore = score
     *        |> double
     *        |> (_ => add(_, 10))
     *        |> (_ => boundScore(60, 90, _))
     */
    [require.resolve('@babel/plugin-proposal-pipeline-operator'), { proposal: 'minimal' }],
    [require.resolve('@babel/plugin-proposal-nullish-coalescing-operator'), { loose: false }],
    require.resolve('@babel/plugin-proposal-do-expressions'),

    // Stage 2
    [require.resolve('@babel/plugin-proposal-decorators'), { legacy: true }],
    require.resolve('@babel/plugin-proposal-function-sent'),
    require.resolve('@babel/plugin-proposal-export-namespace-from'),
    require.resolve('@babel/plugin-proposal-numeric-separator'),
    require.resolve('@babel/plugin-proposal-throw-expressions'),

    // Stage 3
    require.resolve('@babel/plugin-syntax-dynamic-import'),
    require.resolve('@babel/plugin-syntax-import-meta'),
    [require.resolve('@babel/plugin-proposal-class-properties'), { loose: true }],
    require.resolve('@babel/plugin-proposal-json-strings'),

    // A plugin that enables the re-use of Babel's injected helper code to save on codesize.
    // 为什么会出现这个插件，以及为什么使用它？
    // 阅读：https://babeljs.io/docs/en/babel-plugin-transform-runtime#why
    require.resolve('@babel/plugin-transform-runtime'),
  ];
  if (nodeEnv === 'production') {
    // react项目生产模式需要移除prop-types
    // https://www.npmjs.com/package/babel-plugin-transform-react-remove-prop-types
    plugins.push(require.resolve('babel-plugin-transform-react-remove-prop-types'));
  }

  const presets = [require.resolve('@babel/preset-env'), require.resolve('@babel/preset-react')];

  return {
    presets,
    plugins,
  };
}
