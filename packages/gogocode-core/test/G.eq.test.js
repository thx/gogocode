const $ = require('../index');
const config = require('./config');
const jc1 = require('./code/simple1');
const jc2 = require('./code/simple2');
const hc1 = require('./code/simple1.html');
test('$.eq: simple code', () => {
    expect(() => {
        const G = $('var a = 1;');
        G.eq(0);
    }).not.toThrow();
})
test('$.eq: simple code result should be ok', () => {
    const G = $('var a = 1;');
    const node = G.eq(0);
    expect(node.generate()).toBe('var a = 1;');
})
test('$.eq: js code index overflow should not show error', () => {
    expect(() => {
        const G = $('var a = 1;');
        G.eq(100);
    }).not.toThrow();
})
test('$.eq: simple1 code result should be ok', () => {
    const G = $(jc1).find('var a = 1');
    const node = G.eq(0);
    expect(node.generate()).toBe('var a = 1;');
})
test('$.eq: simple1 html code', () => {
    expect(() => {
        const G = $(hc1, config.html);
        G.eq(1);
    }).not.toThrow();
})
test('$.eq: simple html code  should be ok', () => {
    const G = $('<div></div>', config.html);
    const node = G.eq(0);
    expect(node.generate()).toBe('<div></div>');
})
test('$.eq: simple1 html code  should be ok', () => {
    const G = $(hc1, config.html).find('<span>$_$</span>');
    const node = G.eq(0);
    expect(node.generate()).toBe('<span>test</span>');
})
test('$.eq: html code index overflow should not show error', () => {
    expect(() => {
        const G = $('<div></div>', config.html);
        G.eq(100);
    }).not.toThrow();
})