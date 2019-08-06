const { resolve } = require('path');

const ROOT = resolve(__dirname);

module.exports = {
  verbose: true,
  setupFiles: [
    // 初始化smash默认配置
    // resolve(ROOT, 'scripts/setup.js'),
  ],
  collectCoverage: true, // 收集测试时的覆盖率信息
  coverageDirectory: resolve(ROOT, 'coverage'), // 指定输出覆盖信息文件的目录
  collectCoverageFrom: [
    // 指定收集覆盖率的目录文件，只收集每个包的lib目录
    '**/lib/**',
  ],
  testMatch: [
    // 测试文件匹配规则
    '**/__test__/**/*.test.js',
  ],
  testPathIgnorePatterns: [
    // 忽略测试路径
    '/node_modules/',
    '/packagesMiddleware/',
    '/packagesTemplate/',
  ],
  coverageThreshold: {
    // 配置测试最低阈值
    global: {
      branches: 90,
      functions: 90,
      lines: 90,
      statements: 90,
    },
  },
};
