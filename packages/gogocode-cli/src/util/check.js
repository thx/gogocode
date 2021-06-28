'use strict'

const path = require('path');
const chalk = require('chalk');
const pkg = require('../../package.json');
const semver = require('semver');
const cmdUtil = require('./cmd');
const packageUtil = require('./pg');
const fse = require('fs-extra');

const checkUtil = {
    
    /**
     * 获取npm包最新版本
     */
    getNpmPackage(packageName) {
        try {
            const output = cmdUtil.getCmdOutput('npm', ['view', packageName, 'version']);
            return output;
        } catch (error) {
            console.error(error);
            return null;
        }
    },
    getGlobalPath() {
        try {
            const output = cmdUtil.getCmdOutput('npm', ['root', '-g']);
            return output.trim();
        } catch (error) {
            console.error(error);
            return null;
        }
    },
    /**
     * 获取工具的最新版本号，跟本地对比，提示升级
     */
    checkUpdate() {
        return new Promise((resolve) => {
            const latestVersion = this.getNpmPackage('gogocode-cli');
            if (!latestVersion) {
                resolve(true);
            }
            const localVersion = pkg.version;

            if (semver.lt(localVersion, latestVersion)) {
                console.log(chalk.yellow(`\n♨ gogocode-cli工具升级提示：`));
                console.log(chalk.white(`  当前版本: ${chalk.grey(localVersion)}`));
                console.log(chalk.white(`  最新版本: ${chalk.cyan(latestVersion)}`));
                console.log(`  运行 ${chalk.green(`npm install -g gogocode-cli`)} 即可更新`);
                console.log(chalk.grey(`  ChangeLog: https://github.com/thx/gogocode/commits/main\n`));
                resolve(true);
            } else {
                resolve(false);
            }
        })
    },
    
    needUpdate(packageName, nodeModulesDir) {
        if (!nodeModulesDir) {
            return Promise.resolve(true);
        }
        const nodeModuleDir = path.resolve(nodeModulesDir, packageName);
        
        return new Promise((resolve, reject) => {
            try {
                const pkgJsonPath = path.resolve(nodeModuleDir, 'package.json');
               
                if (!fse.existsSync(pkgJsonPath)) {
                    resolve(true);
                    return;
                }
                const pkgInfo = fse.readJSONSync(pkgJsonPath);
                const latestVersion = this.getNpmPackage(packageName);
                if (!latestVersion) {
                    reject(true);
                }
                const localVersion = pkgInfo.version;

                if (semver.lt(localVersion, latestVersion)) {
                    resolve(true);
                } else {
                    resolve(false);
                }
            } catch (error) {
                reject(error);
            }

        });
    },
    /**
     * 判断目录下有没有node_modules，如果没有则先执行npm install安装包
     */
    checkHasNodeModules() {
        // eslint-disable-next-line no-async-promise-executor
        return new Promise(async (resolve, reject) => {
            //获取根目录来确定npm install的路径
            const root = await packageUtil.getRootPath()
            const nodeModulesDir = path.resolve(root.join('/'), 'node_modules')

            //判断目录下有没有node_modules，如果没有则先执行npm install安装包
            fse.stat(nodeModulesDir, async (err, stats) => {
                if (err && err.code === 'ENOENT') {
                    console.log(chalk.yellow('ⓘ 检测到项目还未npm install，将先安装本地依赖包'))
                    //没有node_modules的先安装
                    console.log(chalk.cyan('🕑项目npm安装中，请稍候...'));
                    cmdUtil.runAsync('npm', ['install'], {
                        stdio: 'inherit'
                    })
                    console.log(chalk.green('✔ npm依赖包安装完毕！'));
                }
                resolve()
            })
        })
    },

};
module.exports = checkUtil