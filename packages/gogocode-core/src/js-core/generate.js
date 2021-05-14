const recast = require('recast');
module.exports = function(ast, isPretty) {
    return isPretty ? recast.prettyPrint(ast).code : recast.print(ast).code;
}