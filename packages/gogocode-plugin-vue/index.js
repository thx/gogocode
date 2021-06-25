const rules = require('./src/rules');
const prettier = require('prettier');

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

    if (!/\.vue$|\.js$|\.ts$|\.json$|node_modules/.test(fileInfo.path)) {
        return sourceCode;
    }
    const ast = /\.json$/.test(fileInfo.path)
        ? sourceCode
        : /\.vue$/.test(fileInfo.path)
            ? $(sourceCode, { parseOptions: { language: 'vue' } })
            : $(sourceCode);

    const outAst = rules.reduce((ast, ruleCfg) => {
        if (!ruleCfg.test.test(fileInfo.path)) {
            return ast;
        }
        try {
            return ruleCfg.rule(ast, api, { ...options, filePath: fileInfo.path });
        } catch (error) {
            console.log(
                `文件转换异常，规则：${ruleCfg.name}，文件：${fileInfo.path}`,
                error
            );
            return ast;
        }
    }, ast);
    return /\.json$/.test(fileInfo.path)
        ? outAst
        : prettier.format(outAst.generate(), {
            trailingComma: 'es5',
            tabWidth: 2,
            semi: false,
            singleQuote: true,
            printWidth: 80,
            parser: /\.vue$/.test(fileInfo.path) ? 'vue' : 'typescript',
        });
};
