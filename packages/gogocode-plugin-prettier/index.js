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

    if (options.period == 'preTransform') {
        return;
    }
    if (options.period == 'postTransform') {
        return;
    }

    if (
        !/\.vue$|\.js$|\.ts$|\.json$/.test(fileInfo.path) ||
        /node_modules/.test(fileInfo.path)
    ) {
        return sourceCode;
    }

    return prettier.format(sourceCode, {
        trailingComma: 'es5',
        tabWidth: 2,
        semi: false,
        singleQuote: true,
        printWidth: 80,
        parser: /\.vue$/.test(fileInfo.path) ? 'vue' : 'typescript',
    });
};
