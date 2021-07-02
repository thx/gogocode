const fse = require('fs-extra');
const path = require('path');

/**
 * 列出项目所有文件
 * @param {*} rootPath 
 * @param {*} excludePath  需要排除的目录
 * @returns 
 */
function listFiles(rootPath, excludePath) {
    let fileList = [];
    getFiles(rootPath, fileList, excludePath);
    return fileList;
}
/**
 * 递归列出所有文件
 * @param parentPath 上一级目录
 * @param fileList 导出的文件列表
 * @param excludePath 需要排除的目录
 */
function getFiles(parentPath, fileList, excludePath) {
    let files = fse.readdirSync(parentPath);

    if (excludePath && excludePath.find((exPath) => {
        return parentPath.indexOf(exPath) > -1;
    })) {
        return;
    }

    files.forEach((item) => {
        item = path.join(parentPath, item);
        let stat = fse.statSync(item);
        try {
            if (stat.isDirectory()) {
                getFiles(item, fileList, excludePath);
            } else if (stat.isFile()) {
                fileList.push({ path: item, size: stat.size });
            }
        } catch (error) {
            console.error(error);
        }
    });
}


module.exports = {
    listFiles
}