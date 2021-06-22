const path = require('path');
const $ = require('gogocode');
const transform = require('../../src/v-if-v-for');
test('v-if-v-for', () => {
    expect(() => {
        const vuePath = path.join(__dirname, 'Comp.vue');
        const ast = $.loadFile(vuePath, { parseOptions: { language: 'vue' } });
        transform(ast, { gogocode: $ });
    }).not.toThrow();
})
test('v-if-v-for', () => {
    const vuePath = path.join(__dirname, 'Comp.vue');
    const ast = $.loadFile(vuePath, { parseOptions: { language: 'vue' } });
    transform(ast , { gogocode: $ });
    let result = true;
    ast.find('<template></template>')
        .find('<$_$1 v-for=$_$2>').each(function (tAst) {
            const attrs = tAst.attr('content.attributes');
            if (attrs.find(attr => attr.key.content === 'v-if')) {
                result = false;
            }
        });
    expect(result).toBeTruthy();
})
test('v-if-v-for', () => {
    const vuePath = path.join(__dirname, 'Comp.vue');
    const ast = $.loadFile(vuePath, { parseOptions: { language: 'vue' } });
    transform(ast , { gogocode: $ });
    let result = true;
    ast.find('<template></template>')
        .find('<$_$1 v-for=$_$2>').each(function (tAst) {
            const children = tAst.attr('content.children');
            if (children.length === 0) {
                result = false;
            }
        });
    expect(result).toBeTruthy();
})