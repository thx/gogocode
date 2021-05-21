const $ = require('gogocode')

const transformVarToLetRollupPlugin = () => {
    return {
        name: 'transformVarToLetRollupPlugin',
        transform(code) {
            return {
                code: $(code).replace('var $_$1 = $_$2', 'let $_$1 = $_$2').generate()
            }
        },
    }
}
module.exports = transformVarToLetRollupPlugin