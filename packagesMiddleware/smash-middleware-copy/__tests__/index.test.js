const copy = require('../lib');

// const { ctx, config, next } = {
//   ctx: Object.create(null),
//   config: {
//     files: ['./*.js -> ./dist/glob', './test/a.js -> ./dist/b.js', './test -> ./dist/a'],
//     tplData: {
//       name: 'copy',
//     },
//   },
//   next() {
//     console.log('[next] Hello next.');
//   },
// };

// copy(ctx, config, next);

const ctx = {};
const filesKnown = [
  // files
  '/src/index.css -------> /dist/style/index.css',
  // dirs
  '/src/images -------> /dist/images',
];
const filesGlog = [
  // glob
  '/src/lib/*.js ---> /dist/lib',
];
const filesWithTplData = [
  // with tplData
  '/src/withTpl.txt ---> /dist/withTpl.txt',
];
const filesUnknown = [
  // unknown files
  '/src/unknown-files.txt -> /dist/unknown-files.txt',
];
const next = () => {};

const mockCopy = jest.fn(copy);
const mockNext = jest.fn(next);

describe('smash-middleware-copy', () => {
  it('should copy known files well', (done) => {
    mockCopy(ctx, { filesKnown }, mockNext);
    done();
  });
  // it('should copy glog files well', (done) => {
  //   done();
  // });
  // it('should copy with-tpl-data files well', (done) => {
  //   done();
  // });
  // it('should copy unknown files well', (done) => {
  //   done();
  // });
});
