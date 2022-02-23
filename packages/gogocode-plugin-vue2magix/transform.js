const htmlRules = require('./rules/html/index');
const jsRules = require('./rules/js/index')

/**
 * 转换入口导出一个函数，按照如下函数签名
 * @param {*} fileInfo 包含 source 和 path 属性
 * @param {*} api 包含 gogocode 作为转换工具
 * @param {*} options 其他 option 由此传入
 * @returns {string} 返回转换后的代码
 */
module.exports = function (fileInfo, api, options) {
    const sourceCode = fileInfo.source;
    const $ = api.gogocode;
    if (!/\.html$|\.js$/.test(fileInfo.path) ||
        /node_modules/.test(fileInfo.path)
    ) {
        return sourceCode;
    }
    const language = fileInfo.path.match(/\.html$/) ? 'html' : 'js'
    const ast = $(sourceCode, { parseOptions: { language } });
    const rules = language == 'html' ? htmlRules : jsRules;
    const outAst = rules.reduce((ast, rule) => rule(ast, options), ast);
    return outAst.generate();
};
