const fs = require('fs');
const code = function(filename = 'src/code/input.js') {
    return fs.readFileSync(filename);
}
module.exports = code;