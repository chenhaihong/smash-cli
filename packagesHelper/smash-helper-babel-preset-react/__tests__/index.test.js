'use strict';

const { transform } = require('@babel/core');
const presetUrl = require.resolve('../lib');
const presets = [presetUrl];
// TODO 完成测试用例
test('@babel/plugin-syntax-dynamic-import', () => {
  const { code } = transform(`import('./a');`, { presets });
  const expected = `
"use strict";
import('./a');
    `.trim();
  expect(code).toEqual(expected);
});
