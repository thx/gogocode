const path = require('path');
const $ = require('gogocode');
const transform = require('../../src/events-api');

test('events-api', () => {
    expect(() => {
        const vuePath = path.join(__dirname, 'Comp.vue');
        const ast = $.loadFile(vuePath, { parseOptions: { language: 'vue' } });
        transform(ast);        
    }).not.toThrow();
})
test('events-api', () => {
    const vuePath = path.join(__dirname, 'Comp.vue');
    const ast = $.loadFile(vuePath, { parseOptions: { language: 'vue' } })
    transform(ast);

    let result = ast.find('<script></script>')
        .has(`import emitter from 'tiny-emitter/instance'`)        
    expect(result).toBeTruthy();
})
