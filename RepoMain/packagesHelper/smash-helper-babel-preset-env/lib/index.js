'use strict';

module.exports = smashHelperBabelPresetEnv;

function smashHelperBabelPresetEnv(context, opts = {}) {
  const plugins = [
    // Stage 0
    require.resolve('@babel/plugin-proposal-function-bind'),

    // Stage 1
    require.resolve('@babel/plugin-proposal-export-default-from'),
    require.resolve('@babel/plugin-proposal-logical-assignment-operators'),
    [require.resolve('@babel/plugin-proposal-optional-chaining'), { loose: false }],
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

  const presets = [require.resolve('@babel/preset-env')];

  return {
    presets,
    plugins,
  };
}
