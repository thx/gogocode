const fs = require('fs');
const path = require('path');
const $ = require('gogocode');
const transform = require('../../src/v-model-pro');
test('v-model: test remove .sync attr', () => {
    expect(() => {
        const vuePath = path.join(__dirname,'Comp.vue');
        const ast = $.loadFile(vuePath, { parseOptions: { language: 'vue' } })
        transform(ast, { gogocode: $ });
    }).not.toThrow();
})
test('v-model: test rename value props', () => {
    expect(() => {
        const vuePath = path.join(__dirname, 'ChildValComp.vue');
        const ast = $.loadFile(vuePath, { parseOptions: { language: 'vue' } })
        transform(ast, { gogocode: $ });
    }).not.toThrow();
})

test('v-model: test rename value props', () => {
    expect(() => {
        const vuePath = path.join(__dirname, 'ChildComp.vue');
        const ast = $.loadFile(vuePath, { parseOptions: { language: 'vue' } })
        transform(ast, { gogocode: $ });
    }).not.toThrow();
})
test('v-model: test remove .sync attr result should be ok', () => {
    const vuePath = path.join(__dirname, 'Comp.vue');
    const ast = $.loadFile(vuePath, { parseOptions: { language: 'vue' } })
    transform(ast, { gogocode: $ });
    const code = ast.generate();
    const result = code.indexOf('.sync') < 0;
    expect(result).toBeTruthy();
})

test('v-model: test rename value props result should be ok', () => {

    const vuePath = path.join(__dirname, 'ChildValComp.vue');
    const ast = $.loadFile(vuePath, { parseOptions: { language: 'vue' } })
    transform(ast, { gogocode: $ });
    let result = true;
    ast.find('<script></script>').find('props:$_$').each((fAst) => {

        if (!(fAst.match[0].length > 0 &&
            fAst.match[0][0].value &&
            fAst.match[0][0].value.indexOf('value: String') > -1)) {
            result = false;
        }
    })
    expect(result).toBeTruthy();

})