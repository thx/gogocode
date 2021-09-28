// 写入code
const fs = require('fs');
const writeCode = function(code, filename = 'src/code/output.js', showLog = true) {
    fs.writeFileSync(filename, code);
    if(showLog){
        console.log(`write code to ${filename} success!`);
    }
}

module.exports = writeCode;
