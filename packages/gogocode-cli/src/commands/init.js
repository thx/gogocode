'use strict'

const chalk = require('chalk');
const path = require('path');
const fse = require('fs-extra');
const cmd = require('../util/cmd');

module.exports = async () => {

    const rootPath = process.cwd();
    const tempPath = path.join(__dirname, '../../temp');

    try {
        fse.copySync(tempPath, rootPath);
        await installPackage();
    } catch (err) {
        console.log(chalk.red('installation failed'));
        console.error(err);
    }


    async function installPackage() {
        console.log(chalk.cyan('🕑  start install npm packages，waiting...'));
        try {
            cmd.runSync('npm', ['install'], {
                cwd: rootPath,
                stdio: 'inherit'
            })
            console.log(chalk.green('    init success！'));
            console.log();
            console.log(chalk.blue('    npm run start'));
            console.log();
            console.log(chalk.green('    to enjoy !!!'));
        } catch (error) {
            console.error(error);
        }
    }

}