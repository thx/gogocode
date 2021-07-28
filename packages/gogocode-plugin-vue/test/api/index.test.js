const path = require('path');
const $ = require('gogocode');
const transform = require('../../src/api');

test('api: transform mutations should not find Vue.set() function', () => {
    const jsPath = path.join(__dirname, 'mutations.js');
    const ast = $.loadFile(jsPath);
    const outAst = transform(ast, { gogocode: $ });
    const code = outAst.generate();
    const result = code.indexOf('Vue.set(') < 0;
    expect(result).toBeTruthy();
})
test('api: transform mutations result should be ok', () => {
    const jsPath = path.join(__dirname, 'mutations.js');
    const ast = $.loadFile(jsPath);
    const outAst = transform(ast, { gogocode: $ });
    const code = outAst.generate();
    const result = code.indexOf('state.items[item.id] = item') > -1;
    expect(result).toBeTruthy();
})