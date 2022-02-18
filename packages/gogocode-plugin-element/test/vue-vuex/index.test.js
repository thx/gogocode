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
    const jsPath = path.join(__dirname, 'store.js');
    const ast = $.loadFile(jsPath);
    const outAst = transform(ast, { gogocode: $ });
    const result = outAst.generate().indexOf('Vue.use(') < 0;
    expect(result).toBeTruthy();
})