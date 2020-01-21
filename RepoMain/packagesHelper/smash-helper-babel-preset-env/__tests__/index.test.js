'use strict';
const preset = require('../lib');

// 偷懒型测试，只验证了输出必须包含的字段和长度。
// 没有严格测试各个提案的输入和输出是否正确。
describe('smash-helper-babel-preset-react', function() {
  test('with NODE_ENV=production', () => {
    const opts = preset();
    expect(opts).toHaveProperty('plugins');
    expect(opts).toHaveProperty('presets');

    expect(opts.plugins.length).toEqual(17);
    expect(opts.presets.length).toEqual(1);
  });
});
