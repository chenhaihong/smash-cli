/**
 * 模板查找器。
 */

// 模板内容格式如下
// const templatesList = [
//     [
//         { name: 'smash-template-fe' },
//         { name: 'smash-template-react' },
//         { name: 'smash-template-vue' },
//     ],
//     [
//         { name: 'smash-template-helloworld' },
//     ],
// ];

const ParseYaml = require('../helper/ParseYaml');

class TemplateFinder {
    /**
     * 构造器
     * @param {String} templatesYmlUrl 模板列表配置文件的地址
     */
    constructor(templatesYmlUrl) {
        this.templatesYmlUrl = templatesYmlUrl;
    }

    /**
     * 拿到模板（默认||用户自定义设置）列表文件的内容
     */
    getTemplateList() {
        const templates = ParseYaml(this.templatesYmlUrl);
        return templates;
    }
}

/**
 * 构造器
 * @param {String} templateYmlUrl 
 */
module.exports = (templateYmlUrl) => {
    return new TemplateFinder(templateYmlUrl);
};