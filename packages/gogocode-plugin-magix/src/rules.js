const importMx = require('./import-mx')

const scriptReg = /\.\.js$|\.ts$/;
const templateReg = /\.html$/;

module.exports = [
    { name: 'import-mx', rule: importMx, test: scriptReg },

];
