const initToAssign = require('./init-to-assign')
const importMx = require('./import-mx')
const updater = require('./updater')
const at = require('./at')
const vframeProps = require('./vframe-props')
const passRefData = require('./pass-ref-data')
const rawHTML = require('./raw-html')
const syncToAsync = require('./sync-to-async')
const replaceView = require('./replace-view')
const vframeApi = require('./vframe-api')

const scriptReg = /\.\.js$|\.ts$/;
const templateReg = /\.html$/;

module.exports = [
    { name: 'init-to-assign', rule: initToAssign, test: scriptReg },
    { name: 'import-mx', rule: importMx, test: scriptReg },
    { name: 'updater', rule: updater, test: scriptReg },
    { name: 'at', rule: at, test: scriptReg },
    { name: 'vframe-props', rule: vframeProps, test: scriptReg },
    { name: 'pass-ref-data', rule: passRefData, test: scriptReg },
    { name: 'raw-html', rule: rawHTML, test: scriptReg },
    { name: 'sync-to-async', rule: syncToAsync, test: scriptReg },
    { name: 'replace-view', rule: replaceView, test: scriptReg },
    { name: 'vframe-api', rule: vframeApi, test: scriptReg },
];
