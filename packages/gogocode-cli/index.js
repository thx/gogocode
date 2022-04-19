#!/usr/bin/env node

'use strict'
const chalk = require('chalk');
const program = require('commander');
const pkg = require('./package.json');
const check = require('./src/util/check');
const transform = require('./src/commands/transform');


(async () => {

    await check.checkUpdate();

    program
        .command(`init`)
        .description('init a plugin project')
        .action((options) => {
            require('./src/commands/init')(options)
        });

    program.option('-t, --transform <package name or path>', 'plugin path or npm package name, supports multiple plugins, separated by commas')
        .option('-o, --out <path>', 'output file path, if not input use src path instead')
        .option('-s, --src <path>', 'source file path')
        .option('-d, --dry', 'dry run (no changes are made to files)')
        .option('-p, --params <key=value>','params direct to plugin, eg: format=true#test=false, use \'#\' to join params')
        .option('-i, --info', 'show transform log info')
        .action((options) => {
            transform(options).then(() => { console.log(); }).catch(() => {
                process.exit(1);
            });
        })

    program
        .version(pkg.version)
        .description(chalk.green('GoGoCode  代码转换从未如此简单  https://gogocode.io'));

    //默认展示帮助信息
    if (process.argv && process.argv.length < 3) {
        program.help();
    }
   
    program.parse(process.argv);

   
})();
