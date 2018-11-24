/**
 * 美化路径
 */

const path = require('path');

/**
 * 美化路径
 * @param {String} _path 
 */
function PrettyPath(_path) {
    return path
        // 1.当出现多个连续的路径分隔符时，则替换为单个的路径分隔符；
        // 2.出现多种路径分隔符，使用 \ 替换。
        .normalize(_path)
        // 路径分隔符，Windows 上是 \，POSIX 上是 /。
        // 在 Windows 上，斜杠字符（/）和反斜杠字符（\）都可作为路径分隔符。 path 的方法只使用反斜杠（\）。
        // http://nodejs.cn/api/path.html#path_path_sep
        .split(path.sep)
        // 使用便于阅读的 / 作为分割符
        .join('/');
}

module.exports = PrettyPath;