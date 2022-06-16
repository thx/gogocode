const rules = require('./rules');
const classnames = require('./gallery/classnames');
const importFix = require('./gallery/import-fix');
const scriptReg = /\.\.js$|\.ts$/;
const templateReg = /\.html$/;

module.exports = [
    ...rules,
    { name: 'gallery-classnames', rule: classnames, test: templateReg },
    { name: 'gallery-import-fix', rule: importFix, test: scriptReg },
];
