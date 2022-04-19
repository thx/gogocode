'use strict'

const chalk = require('chalk');
const ProgressBar = require('progress');
const path = require('path');
const fse = require('fs-extra');
const $ = require('gogocode');
const fileUtil = require('../util/file');
const check = require('../util/check');
const cmd = require('../util/cmd');
const inquirer = require('inquirer');

let PWD_PATH, CLI_INSTALL_PATH, SHOW_INFO;
const EXCLUDE_FILES = ['.gif', '.jpg', '.png', '.jpeg', '.css', '.less', '.map', '.ico', '.ttf', '.woff', '.woff2'];
const FILE_LIMIT_SIZE = 1024 * 200;

function checkPath(srcPath, outPath, transform) {
    return new Promise((resolve, reject) => {
        if (!srcPath) {
            console.error(`command error: need -s or --src`);
            reject();
            return;
        }
        if (srcPath == 'rc') {
            console.error(`command error: must be ${chalk.green('--src')} or ${chalk.green('-s')}`);
            reject();
            return;
        }
        const srcAbsPath = path.resolve(PWD_PATH, srcPath);
        if (!fse.existsSync(srcAbsPath)) {
            console.error(`error:source file not exists：${srcAbsPath}`);
            reject();
            return;
        }

        if (!transform) {
            console.error(`command error: need -t or --transform`);
            reject();
            return;
        }
        //transform 支持多个，逗号分隔
        const tempArr = transform.split(',');
        for (let i = 0; i < tempArr.length; i++) {
            const tPath = tempArr[i];
            if (tPath.lastIndexOf('.') > -1) {
                const tranFilePath = path.resolve(PWD_PATH, tPath);
                if (!fse.existsSync(tranFilePath)) {
                    console.error(`error: plugin or transform file not exists：${tranFilePath}`);
                    reject();
                    return;
                }
            }
        }

        if (!outPath) {
            console.error(`command error: need -o or--out `);
            reject();
            return;
        }
        if (outPath == 'ut') {
            console.error(`command error: must be ${chalk.green('--out')} or ${chalk.green('-o')}`);
            reject();
            return;
        }

        const outAbsPath = path.resolve(PWD_PATH, outPath);

        const srcIsDir = fse.statSync(srcAbsPath).isDirectory();

        let outIsDir;
        if (fse.existsSync(outAbsPath)) {
            outIsDir = fse.statSync(outAbsPath).isDirectory()
        } else {
            outIsDir = !path.extname(outAbsPath);
        }

        if (srcIsDir && !outIsDir) {
            console.error('transform error：source is folder，output is the file');
            reject();
            return;
        }
        //check same path
        if (srcAbsPath === outAbsPath) {
            inquirer.prompt([
                {
                    type: 'confirm',
                    name: 'samePath',
                    message: 'source path and output path is same. source file will be rewrite! to be continue?',
                    default: false,
                }
            ]).then(answers => {
                if (answers.samePath) {
                    resolve();
                } else {
                    reject();
                }
            }).catch(() => {
                reject();
            });
        } else {
            resolve();
        }

    });
}
function tryLoadPackage(packageName, resolve, reject) {
    try {
        const tranFn = require(packageName);
        resolve({ name: packageName, fn: tranFn });
    } catch (err) {
        console.error(err);
        reject(err);
    }
}
function prePostTransform(tranFns, period, options) {
    tranFns.forEach((tran) => {
        const { fn } = tran;
        if (typeof fn === 'function' || !fn[period]) {
            return;
        }
        console.log(chalk.green(`${period} operating ...`));
        try {
            const api = { gogocode: $ };
            fn[period](api, options);
        } catch (err) {
            console.error(err);
        }
    });
}
/**
 * 在插件转换之前
 * @param {*} tranFns 
 * @param {*} options 
 */
function preTransform(tranFns, options) {
    prePostTransform(tranFns, 'preTransform', options);
}
/**
 * 插件转换之后
 * @param {*} tranFns 
 * @param {*} options 
 */
function postTransform(tranFns, options) {
    prePostTransform(tranFns, 'postTransform', options);
}
/**
 * 
 * @param {*} tranFns plugin main function
 * @param {*} options options
 * @param {*} srcFilePath srcFilePath
 * @param {*} outFilePath outFilePath
 * @returns {success or failed}
 */
function execTransforms(tranFns, options, srcFilePath, outFilePath) {
    
    options.outFilePath = outFilePath;

    let source = null;
    try {
        source = fse.readFileSync(srcFilePath).toString();
    } catch (err) {
        console.log('transform error: ' + srcFilePath);
        console.error(err);
        return { success: false };
    }
    if (source === null) {
        return { success: false };
    }
    //空文件处理
    if (source.trim() === '') {
        fse.writeFileSync(outFilePath, source);
        return { success: true };
    }
    let success = true;
    tranFns.forEach((tran, index) => {
        const { name, fn } = tran;
        let transform;
        if (typeof fn === 'function') {
            //插件导出的是函数，则直接调用
            transform = fn;
        } else {
            //插件导出的是对象，则调用里面的transform方法，支持生命周期
            transform = fn['transform'];
            if (!transform) {
                console.error(`can not find transform function for ${name}`);
                return;
            }
        }
        try {
            // 多个transform 时候会多次写入outFullPath。outFullPath即是源文件也是输出文件
            const fileInfo = { source, path: index === 0 ? srcFilePath : outFilePath };
            const api = { gogocode: $ };
          
            source = transform(fileInfo,
                api,
                options);
            if (typeof source === 'string') {
                fse.writeFileSync(outFilePath, source);
            } else {
                throw new Error(`plugin error：${name} ,must return string content`);
            }
        } catch (err) {
            console.log('transform error: ' + srcFilePath);
            console.error(err);
            success = false;
        }
    });
    return { success };
}

function requireTransforms(transform) {
    return new Promise((resolve, reject) => {
        const tranFullPath = path.resolve(PWD_PATH, transform);

        if (path.extname(tranFullPath)) {
            // 本地文件
            try {
                const dotIndex = tranFullPath.lastIndexOf('.');
                const tPath = tranFullPath.substring(0, dotIndex);
                const tranFn = require(tPath);
                resolve({ name: transform, fn: tranFn });
            } catch (err) {
                reject(err);
            }
        } else {
            // npm包
            const nodeModulesDir = check.getGlobalPath();

            check.needUpdate(transform, nodeModulesDir).then((need) => {
                const pkPath = path.join(nodeModulesDir, transform);
                if (need) {
                    try {
                        console.log(`${chalk.green(transform)} installing ......`);
                        cmd.runSync('npm', ['install', transform + '@latest', '-g']);
                        console.log(`${chalk.green(transform)} install complete`);
                    } catch (error) {
                        reject(error);
                        return;
                    }
                    tryLoadPackage(pkPath, resolve, reject);
                } else {
                    tryLoadPackage(pkPath, resolve, reject);
                }
            }).catch(err => reject(err));
        }
    });
}
function mkDirForFile(outFile) {
    let outDir = outFile;
    const lastSepIndex = outFile.lastIndexOf(path.sep);
    if (lastSepIndex > -1) {
        outDir = outFile.substring(0, lastSepIndex);
    }

    if (!fse.existsSync(outDir)) {
        fse.mkdirsSync(outDir);
    }
}
function logSuccess(result) {
    if (result) {
        console.log();
        console.log(chalk.green(`transform success!!`));
        console.log();
    } else {
        console.log();
        console.log(chalk.yellow(`transform failed!`));
        console.log();
    }
}
function confirmTransformLargeFiles(files) {
    return new Promise((resolve, reject) => {
        //排除图片等其他类型文件。并且文件大小小于FILE_LIMIT_SIZE
        const count = files.filter(f => (f.size > FILE_LIMIT_SIZE && EXCLUDE_FILES.indexOf(path.extname(f.path)) < 0)).length;
        if (count > 0) {
            inquirer.prompt([
                {
                    type: 'confirm',
                    name: 'largeFiles',
                    message: `there ${count > 1 ? 'are' : 'is'} ${count} ${count > 1 ? 'files' : 'file'} larger than ${FILE_LIMIT_SIZE / 1024}KB, do you want to transform ${count > 1 ? 'them' : 'it'} ?`,
                    default: false,
                }
            ]).then(answers => {
                resolve(answers.largeFiles);
            }).catch(() => {
                reject();
            });
        } else {
            resolve(false);
        }
    });
}
/**
 * 将命令行工具的自定义参数传入到plugin的options参数里面
 */
function paramsToOptions(params, options) {
    if (!params) {
        return;
    }
    const arr = params.split('#');
    arr.forEach(kv => {
        const kvArr = kv.split('=');
        if (kvArr.length === 1) {
            const key = kvArr[0];
            options[key] = '';
        } else if (kvArr.length === 2) {
            const key = kvArr[0];
            const value = kvArr[1].trim();
            if (typeof value === 'boolean') {
                options[key] = value;
            } else if (value === 'true') {
                options[key] = true;
            } else if (value === 'false') {
                options[key] = false;
            } else {
                options[key] = value;
            }
        }
    });
}
/**
 * 处理转换逻辑
 * @param {*} tranFns 
 * @param {*} srcPath 
 * @param {*} outPath 
 * @param {*} resolve 
 * @param {*} reject 
 */
function handleTransform(tranFns, srcPath, outPath, params, resolve, reject) {
    try {
        const srcFullPath = path.resolve(PWD_PATH, srcPath);
        const outFullPath = path.resolve(PWD_PATH, outPath);
        const srcIsDir = fse.statSync(srcFullPath).isDirectory();

        const options = {
            pwdPath: PWD_PATH,
            rootPath: srcFullPath,
            outRootPath: outFullPath
        };

        paramsToOptions(params, options);

        if (srcIsDir) {
            const files = fileUtil.listFiles(srcFullPath);
            confirmTransformLargeFiles(files).then((canTransformLargeFiles) => {
                //canTransformLargeFiles 是否大文件转换，true：转换
                preTransform(tranFns, options);

                let result = true;
                const total = files.length;
                const bar = SHOW_INFO ? undefined : new ProgressBar('transform in progress: [:bar] :current/:total    ', { total });
                files.forEach(({ path: srcFilePath, size }, index) => {
                    try {
                        let filePath = srcFilePath.substring(srcFullPath.length, srcFilePath.length);
                        let outFilePath = path.join(outFullPath, filePath);
                        mkDirForFile(outFilePath);
                        if (SHOW_INFO) {
                            console.log(`${chalk.blue(`${index}/${total}`)} ${srcFilePath} ${chalk.green(`${size} B`)}`);
                        }
                        const ext = path.extname(srcFilePath);
                        if (EXCLUDE_FILES.indexOf(ext) > -1 || (!canTransformLargeFiles && size > FILE_LIMIT_SIZE)) {
                            fse.copyFileSync(srcFilePath, outFilePath);
                        } else {
                            const { success } = execTransforms(tranFns, options, srcFilePath, outFilePath);
                            if (!success) { result = success; }
                        }
                    } catch (error) {
                        console.error(error);
                        result = false;
                    }
                    bar && bar.tick();
                });
                
                postTransform(tranFns, options);
                logSuccess(result);
            }).catch((error) => {
                reject(error);
            })
        } else {
            //转换单个文件
            preTransform(tranFns, options);
            mkDirForFile(outFullPath);

            const { success } = execTransforms(tranFns, options, srcFullPath, outFullPath);
            
            postTransform(tranFns, options);
            logSuccess(success);
        }
        resolve();

    } catch (error) {
        console.error(error);
        reject(error);
    }
}
function handleCommand({ srcPath, outPath, transform, params, resolve, reject }) {

    console.log();
    console.log(chalk.green(`transform start`));
    console.log();

    const tempArr = transform.split(',');

    Promise.all(tempArr.map((tPath) =>
        requireTransforms(tPath)
    )).then((tranFns) => {
        handleTransform(tranFns, srcPath, outPath, params ,resolve, reject);
    }).catch((error) => {
        console.error(error);
        reject(error);
    });
}
module.exports = ({ src: srcPath, out, transform, dry, params, info }) => {
    // 没有输出路径，使用输入路径代替。做替换操作
    let outPath = out || srcPath;
    if (!out && srcPath) {
        console.log();
        console.log(chalk.yellow('warn: --out or -o not input , use src path instead'));
        console.log();
    }
    
    PWD_PATH = process.cwd();
    CLI_INSTALL_PATH = path.resolve(__dirname, '../../');
    SHOW_INFO = info !== undefined;

    // 临时目录，dry==true 的时候使用
    const tempPath = path.resolve(CLI_INSTALL_PATH, './temp_out');
    if (fse.existsSync(tempPath)) {
        fse.removeSync(tempPath);
    }
    if (dry) {
        outPath = tempPath;
    }
    return new Promise((resolve, reject) => {
        checkPath(srcPath, outPath, transform).then(() => {
            handleCommand({ srcPath, outPath, transform, params ,resolve, reject });
        }).catch(() => {
            reject();
        });
    });
}