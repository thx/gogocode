// 写入code
const fs = require('fs');
const writeCode = function(code, filename = 'src/code/output.js') {
    fs.writeFileSync(filename, code);
    console.log(`write code to ${filename} success!`);
}

module.exports = writeCode;