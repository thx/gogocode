/**
 * 清除临时目录
 */
const fse = require('fs-extra');
const path = require('path');

const rootPath = process.cwd();
const tempPath = path.join(rootPath, 'temp');

if (fse.existsSync(tempPath)) {
    fse.removeSync(tempPath);
}
