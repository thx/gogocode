const $ = require('gogocode')

const transformVarToLetVitePlugin = () => {
    return {
        name: 'transformVarToLetVitePlugin',
        transform (code) {
            return {
                code: $(code).replace('var $_$1 = $_$2', 'let $_$1 = $_$2').generate()
            }
        },
    }
}
module.exports = transformVarToLetVitePlugin