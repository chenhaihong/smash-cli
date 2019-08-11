const { resolve } = require('path');

const ROOT = resolve(__dirname);

module.exports = {
  verbose: true,
  setupFiles: [resolve(ROOT, 'scripts/setup-empty-coverage.js'), resolve(ROOT, 'scripts/setup-unit-test-timeout.js')],
  collectCoverage: true, // 收集测试时的覆盖率信息
  collectCoverageFrom: [
    // 指定收集覆盖率的目录文件，只收集每个包的lib目录
    '**/lib/**',
  ],
  coverageDirectory: resolve(ROOT, 'coverage'), // 指定输出覆盖信息文件的目录
  coveragePathIgnorePatterns: [
    // 忽略覆盖
    '/node_modules/',
    '/packagesHelper/',
    '/packagesMain/',
    '/packagesTemplate/',
  ],
  testMatch: [
    // 测试文件匹配规则
    '**/__tests__/**/*.test.js',
  ],
  testPathIgnorePatterns: [
    // 忽略测试路径
    '/node_modules/',
    '/packagesHelper/',
    '/packagesMain/',
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
