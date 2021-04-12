let { parse } = require('vue3-browser-compiler-yx');
module.exports = (code) => {
    const ast = parse(code, { filename: String(+new Date()) }).descriptor;
    return ast
}