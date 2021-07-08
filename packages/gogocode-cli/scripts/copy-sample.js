/**
 * 拷贝sample到cli/temp 目录，init 使用。
 */
const fse = require('fs-extra');
const path = require('path');

const rootPath = process.cwd();
const tempPath = path.join(rootPath, 'temp');
const samplePath = path.join(rootPath, '../gogocode-plugin-sample');
const nodeModulePath = path.join(tempPath, 'node_modules');

if (fse.existsSync(tempPath)) {
    fse.emptyDir(tempPath);
} else {
    fse.ensureDir(tempPath);
}
fse.copySync(samplePath, tempPath);
fse.removeSync(nodeModulePath);
