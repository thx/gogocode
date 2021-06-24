const path = require('path');
const $ = require('gogocode');
const transform = require('../../src/v-bind');
test('v-bind', () => {
    expect(() => {
        const vuePath = path.join(__dirname,'Comp.vue');
        const ast = $.loadFile(vuePath, { parseOptions: { language: 'vue' } })
        transform(ast);
       
    }).not.toThrow();
})
test('v-bind', () => {
    const vuePath = path.join(__dirname, 'Comp.vue');
    const ast = $.loadFile(vuePath, { parseOptions: { language: 'vue' } })
    transform(ast);

    let result = true;
    ast.find('<template></template>')
        .find('<span>')
        .each(function (sAst) {
            const attrs = sAst.attr('content.attributes');
            if (attrs.length === 0 || attrs[0].key.content !== 'v-bind') {
                result = false;
            }
        });
    expect(result).toBeTruthy();
})