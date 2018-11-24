#!/usr/bin/env node

const PrettyPath = require('../../src/helper/PrettyPath');

const path1 = '/foo/bar//baz/asdf/quux/..';
console.log(PrettyPath(path1), PrettyPath(path1) == '/foo/bar/baz/asdf');

const path2 = 'C:\\temp\\\\foo\\bar\\..\\';
console.log(PrettyPath(path2), PrettyPath(path2) == 'C:/temp/foo/');

const path3 = 'C:////temp\\\\/\\/\\/foo/bar';
console.log(PrettyPath(path3), PrettyPath(path3) == 'C:/temp/foo/bar');

const path4 = '\\./../../../';
console.log(PrettyPath(path4), PrettyPath(path4) == '/');
