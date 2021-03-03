const $ = require('../index');
const generate = require('../src/js-core/generate');
const htmlGenerate = require('../src/html-core/serialize-node');
const config = require('./config');
const jc1 = require('./code/simple1');
const jc2 = require('./code/simple2');
const hc1 = require('./code/simple1.html');
test('$.node: simple code', () => {
    expect(()=>{
       const G = $('var a = 1;');
       const node = G.node;
    }).not.toThrow();
})

test('$.node: simple code result should be ok', () => {
    const G = $('var a = 1;');
    const node = G.node;
    const code = generate(node);
    expect(code).toBe('var a = 1;');
})
test('$.node: simple1 code result should be ok', () => {
    const G = $(jc1).find('var a = 1;');
    const node = G.node;
    const code = generate(node);
    expect(code).toBe('var a = 1;');
})
test('$.node: simple1 code result should be ok', () => {
    const G = $(jc2).find('this.render()');
    const node = G.node;
    const code = generate(node);
    expect(code).toBe('this.render()');
})
test('$.node: simple1 html code', () => {
    expect(() => {
        const G = $(hc1, config.html);
        const node = G.node;
    }).not.toThrow();
})
test('$.node: simple1 html code', () => {
    const G = $(hc1, config.html);
    const node = G.node;
    const code = htmlGenerate(node);
    expect(code.indexOf(`<meta name="renderer" content="webkit"/>`) > -1).toBeTruthy();
})