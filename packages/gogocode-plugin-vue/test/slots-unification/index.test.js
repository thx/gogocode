const path = require('path');
const $ = require('gogocode');
const transform = require('../../src/slots-unification');

test('slots-unification', () => {
    expect(() => {
        const vuePath = path.join(__dirname, 'Comp.vue');
        const ast = $.loadFile(vuePath, { parseOptions: { html: true } });
        transform(ast);
    }).not.toThrow();
})

test('slots-unification', () => {
    const vuePath = path.join(__dirname, 'Comp.vue');
    const ast = $.loadFile(vuePath, { parseOptions: { language: 'vue' } })
    transform(ast);    
    expect(ast.find('<script></script>').has(`$scopedSlots`)).toBeTruthy();
})
