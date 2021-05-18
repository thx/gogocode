const { constructTree, tokenize } = require('hyntax-yx');
module.exports = (code) => {
    // 找出所有自闭合标签
    const selfClosingTag = code.replace(/{{[^{^}]+}}/g, '').match(/(?<=\<)[a-z|\.|-]+(?=[^><]+\/>)/g)
    const { tokens } = tokenize(code)
    const { ast } = constructTree(tokens, undefined, { selfClosingTag })
    return ast
}