const $ = require('gogocode')

module.exports = function () {
    return {
        name: 'transform-var-to-let',
        visitor: {
            Program(path) {
                $(path.node).replace('var $_$1 = $_$2;', 'let $_$1 = $_$2;')
            }
        }
    }
}
