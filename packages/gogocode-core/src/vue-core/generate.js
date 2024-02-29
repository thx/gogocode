const jsGenerate = require('../js-core/generate');
const htmlGenerate = require('../html-core/serialize-node');

module.exports = function toString(sfcDescriptor) {
    const { source } = sfcDescriptor
    return ['template', 'script', 'scriptSetup'].reduce((acc, blockType) => {
        const block = sfcDescriptor[blockType]
        const ast = sfcDescriptor[blockType + 'Ast']
        if (!block || !ast?.node) {
            return acc
        }
        const offset = source.length - acc.length
        const transform = blockType === 'template' ? htmlGenerate : jsGenerate
        const before = acc.slice(0, block.loc.start.offset - offset)
        const after = acc.slice(block.loc.end.offset - offset, acc.length)
        return before + transform(ast.node) + after
    }, source)
}
