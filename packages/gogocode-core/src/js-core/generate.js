const recast = require('recast');
module.exports = function(ast) {
    return recast.print(ast).code;
}