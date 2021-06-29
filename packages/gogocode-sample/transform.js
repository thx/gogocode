const rules = require('./rules/index');

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
    const ast = $(sourceCode, { parseOptions: { language: 'vue' } });
    const outAst = rules.reduce((ast, rule) => rule(ast, options), ast);
    return outAst.generate();
};
