/**
 * /*global describe test:true
 */

'use strict';

const smashInit = require('.');

describe('smash-init', () => {
  test('should have .task.yml file', () => {
    smashInit();
    // TODO 检查文件
  });
});
