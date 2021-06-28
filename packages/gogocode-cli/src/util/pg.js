
'use strict'
const chalk = require('chalk');
const fse = require('fs-extra');

module.exports = {
    /**
     * 获取项目根目录path，根据根目录下的package.json文件来判断
     * @return {[type]} [description]
     */
    async getRootPath(name) {
       
        const gitDir = name === undefined ? 'package.json' : name + '/' + 'package.json'

        let path = fse.existsSync(gitDir);
        if (path) {
            return path
        } else {
            console.log(chalk.red('\n  ✘ 请在项目的根目录下执行本命令\n'))
            process.exit(0)
        }
    },
}