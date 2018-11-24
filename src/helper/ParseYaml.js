/**
 * yaml配置解析器
 */

const fs = require('fs');
const yaml = require('yaml');

/**
 * 解析配置
 * @param {String} yamlUrl 
 */
function ParseYaml(yamlUrl) {
    // Get document, or throw exception on error
    try {
        const str = fs.readFileSync(yamlUrl, 'utf8');
        const doc = yaml.parse(str);
        return doc;
    } catch (e) {
        return e;
    }
}

module.exports = ParseYaml;