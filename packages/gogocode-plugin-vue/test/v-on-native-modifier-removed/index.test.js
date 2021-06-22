const fs = require('fs');
const path = require('path');
const $ = require('gogocode');
const transform = require('../../src/v-on-native-modifier-removed');
test('v-on-native-modifier-removed', () => {
    expect(() => {
        const vuePath = path.join(__dirname, 'Comp.vue');
        const ast = $.loadFile(vuePath, { parseOptions: { language: 'vue' } })
        transform(ast, { gogocode: $ });
    }).not.toThrow();
})
test('v-on-native-modifier-removed: result should be ok', () => {

    const vuePath = path.join(__dirname, 'Comp.vue');
    const ast = $.loadFile(vuePath, { parseOptions: { language: 'vue' } });
    transform(ast, { gogocode: $ });
    const templateAst = ast.find('<template></template>');
    let result = true;
    templateAst.find('<$_$>').each(function (fAst) {
        const attrs = fAst.attr('content.attributes') || [];
        attrs.forEach((attr) => {
            const key = attr.key.content;
            const index = key.indexOf('.native');
            if (index > -1) {
                result = false;
            }
        });
    })

    expect(result).toBeTruthy();

})