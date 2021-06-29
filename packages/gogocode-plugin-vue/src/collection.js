const fse = require('fs-extra');
const path = require('path');

module.exports = function (api, options) {

    const files = listFiles(options.rootPath);
    files.forEach((srcFilePath) => {
        
     
        const { success } = execTransforms(tranFns, srcFullPath, srcFilePath, outFilePath);
        if (!success) { result = success; }
        
        
    });
    return files
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
