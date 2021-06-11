const { constructTree, tokenize } = require('hyntax-yx');
module.exports = (code) => {
    // const selfClosingTag = code.replace(/{{[^{^}]+}}/g, '').match(/(?<=\<)[a-z|\.|-]+(?=[^><]+\/>)/g)
    const { tokens } = tokenize(code)
    const { ast } = constructTree(tokens)
    return ast
}