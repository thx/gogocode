const path = require('path');
const $ = require('gogocode');
const transform = require('../../src/transition-group');
test('transition-group', () => {
    expect(() => {
        const vuePath = path.join(__dirname, 'Comp.vue');
        const ast = $.loadFile(vuePath, { parseOptions: { language: 'vue' } });
        transform(ast);
    }).not.toThrow();
})
test('transition-group', () => {
    const vuePath = path.join(__dirname, 'Comp.vue');
    const ast = $.loadFile(vuePath, { parseOptions: { language: 'vue' } });
    transform(ast);
    let result = true;
    ast.find('<template></template>')
        .find('<transition-group>').each(function (tAst) {
            const attrs = tAst.attr('content.attributes');
            if (attrs.length === 0 || !attrs.find(attr => attr.key.content === 'tag')) {
                result = false;
            }
        });
    expect(result).toBeTruthy();
})