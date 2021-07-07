const fse = require('fs-extra');
const path = require('path');
const scriptUtils = require('../utils/scriptUtils');

module.exports = function (api, options) {
    const $ = api.gogocode;
    try{
        const files = listFiles(options.rootPath);
        files.forEach(filePath => {
            if (
                !/\.vue$|\.js$|\.ts$/.test(filePath) || /node_modules/.test(filePath)
            ) {
                return;
            }
            const source = fse.readFileSync(filePath).toString();
            const ast = /\.vue$/.test(filePath)
                ? $(source, { parseOptions: { language: 'vue' } })
                : $(source);
            let scriptAst = ast.parseOptions && ast.parseOptions.language == 'vue' ? ast.find('<script></script>') : ast
    
            let components = options && Array.isArray(options.components) ? options.components : []
            scriptAst.find(`$$$.component($_$)`).each(c => {
                const args = c.attr('arguments')
                if (Array.isArray(args) && args.length > 0) {
                    if (args[0].type == 'StringLiteral' && components.indexOf(args[0].value) == -1) {
                        components.push(args[0].value)
                    }
                }
            })
            Object.assign(options,{ components })
    
            let keyCodeMap = options && options.keyCodeMap ? options.keyCodeMap : scriptUtils.DEFAULTKEYCODE
    
            scriptAst.find([`$$$.config.keyCodes = {$_$}`, `$$$.config.keyCodes.$_$ = $_$`]).each(node => {
                let customKeyCodeList = node.match[0] || []
                customKeyCodeList.reduce((prev, cur, index) => {
                    if (index % 2 != 0 && prev && keyCodeMap[cur.value]) {
                        Object.assign(keyCodeMap, {
                            [prev]: keyCodeMap[cur.value]
                        })
                    }
                    return cur.value
                }, '')
            })
            Object.assign(options, { keyCodeMap })
        });
    }
    catch(ex){ /* do nothing */ }    
    return options
}

/**
 * 列出项目所有文件
 * @param {*} rootPath 
 * @returns 
 */
function listFiles(rootPath) {
    let fileList = [];
    getFiles(rootPath, fileList);
    return fileList;
}
/**
 * 递归列出所有文件
 * @param parentPath 上一级目录
 * @param fileList 导出的文件列表
 */
function getFiles(parentPath, fileList) {
    let files = fse.readdirSync(parentPath);
    if (parentPath.indexOf('node_modules') > -1) {
        return;
    }
    files.forEach((item) => {
        item = path.join(parentPath, item);
        let stat = fse.statSync(item);
        try {
            if (stat.isDirectory()) {
                getFiles(item, fileList);
            } else if (stat.isFile() && /\.vue$|\.js$|\.ts$/.test(item)) {
                fileList.push(item);
            }
        } catch (error) {
            console.error(error);
        }
    });
}
