const path = require('path');
const $ = require('gogocode');
const transform = require('../../src/emits-option');
test('emits-option: not has emits properties', () => {
    expect(() => {
        const vuePath = path.join(__dirname, 'Child.vue');
        const ast = $.loadFile(vuePath, { parseOptions: { language: 'vue' } });
        transform(ast, { gogocode: $ });
    }).not.toThrow();
})
test('emits-option: has emits properties', () => {
    expect(() => {
        const vuePath = path.join(__dirname, 'Child2.vue');
        const ast = $.loadFile(vuePath, { parseOptions: { language: 'vue' } });
        transform(ast, { gogocode: $ });
    }).not.toThrow();
})
test('emits-option: not has emits properties result should be ok', () => {
    const vuePath = path.join(__dirname, 'Child.vue');
    const ast = $.loadFile(vuePath, { parseOptions: { language: 'vue' } });
    transform(ast, { gogocode: $ });
    const scriptAST = ast.find('<script></script>');
    const match = scriptAST.find('{ emits:$_$ }').match;
    const value = match['0'][0].value;
    expect(value).toBe(`['accepted','forward','callback']`);
})
test('emits-option: has emits emits properties result should be ok', () => {

    const vuePath = path.join(__dirname, 'Child2.vue');
    const ast = $.loadFile(vuePath, { parseOptions: { language: 'vue' } });
    transform(ast, { gogocode: $ });
    const scriptAST = ast.find('<script></script>');
    const match = $(scriptAST.generate()).find('{ emits:$_$ }').match;
    const value = match['0'][0].value;
    expect(value).toBe(`['click', e1,'accepted','forward','callback']`);

})