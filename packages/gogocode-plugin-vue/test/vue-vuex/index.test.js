const path = require('path');
const $ = require('gogocode');
const transform = require('../../src/vue-vuex');
test('vue-vuex: transform store not has error', () => {
    expect(() => {
        const jsPath = path.join(__dirname, 'store.js');
        const ast = $.loadFile(jsPath);
        transform(ast, { gogocode: $ });
    }).not.toThrow();
})
test('vue-vuex: transform store should not find Vue.use() function', () => {
    const jsPath = path.join(__dirname, 'mutations.js');
    const ast = $.loadFile(jsPath);
    const outAst = transform(ast, { gogocode: $ });
    const result = outAst.generate().indexOf('Vue.use(') < 0;
    expect(result).toBeTruthy();
})
test('vue-vuex: transform mutations not has error', () => {
    expect(() => {
        const jsPath = path.join(__dirname, 'mutations.js');
        const ast = $.loadFile(jsPath);
        transform(ast, { gogocode: $ });
    }).not.toThrow();
})
test('vue-vuex: transform mutations should not find Vue.set() function', () => {
    const jsPath = path.join(__dirname, 'mutations.js');
    const ast = $.loadFile(jsPath);
    const outAst = transform(ast, { gogocode: $ });
    const code = outAst.generate();
    const result = code.indexOf('Vue.set(') < 0;
    expect(result).toBeTruthy();
})
test('vue-vuex: transform mutations result should be ok', () => {
    const jsPath = path.join(__dirname, 'mutations.js');
    const ast = $.loadFile(jsPath);
    const outAst = transform(ast, { gogocode: $ });
    const code = outAst.generate();
    const result = code.indexOf('state.items[item.id] = item') > -1;
    expect(result).toBeTruthy();
})