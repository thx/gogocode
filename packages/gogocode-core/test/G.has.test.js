const $ = require('../index');
const config = require('./config');
const jc1 = require('./code/simple1');
const jc2 = require('./code/simple2');
const hc1 = require('./code/simple1.html');
test('$.has: simple code', () => {
    expect(() => {
        const G = $('var a = 1;');
        G.has('var $_$ ');
    }).not.toThrow();
})
test('$.has: simple code', () => {
    expect(() => {
        const G = $('var a = 1;');
        G.has('var $_$ ');
    }).not.toThrow();
})
test('$.has: simple code result should be ok', () => {
    const G = $('var a = 1;');
    const result = G.has('var $_$ ');
    expect(result).toBeTruthy();
})
test('$.has: simple1 code result should be ok', () => {
    const G = $(jc1);
    const result = G.has('xxMonitor.start()');
    expect(result).toBeTruthy();
})
test('$.has: simple1 code result should be ok', () => {
    const G = $(jc1);
    const result = G.has('var a = 1234');
    expect(result).not.toBeTruthy();
})
test('$.has: simple2 code result should be ok', () => {
    const G = $(jc2);
    const result = G.has('var a = 1234');
    expect(result).not.toBeTruthy();
})
test('$.has: simple2 code result should be ok', () => {
    const G = $(jc2);
    const result = G.find('View.extend($_$)').has('var a = 1234');
    expect(result).not.toBeTruthy();
})
test('$.has: simple2 code result should be ok', () => {
    const G = $(jc2);
    const result = G.find('View.extend($_$)').has(`this.observeLocation(['start', 'end'])`);
    expect(result).toBeTruthy();
})
test('$.has: simple1 html code', () => {
    expect(() => {
        const G = $(hc1, config.html);
        G.has('<span>test</span>');
    }).not.toThrow();
})

test('$.has: simple1 html code result should be ok', () => {
    const G = $(hc1, config.html);
    const result = G.has('<span>test</span>');
    expect(result).toBeTruthy();
})

test('$.has: simple1 html code result should be ok', () => {
    const G = $(hc1, config.html);
    const result = G.has('<title>$_$</title>');
    expect(result).toBeTruthy();
})

test('$.has: simple1 html code result should be ok', () => {
    const G = $(hc1, config.html);
    const result = G.has('<title id="title1">$_$</title>');
    expect(result).not.toBeTruthy();
})
test('$.has:  code result should be ok', () => {
    const G = $(hc1, config.html);
    const result = G.has('<!DOCTYPE html>');
    expect(result).toBeTruthy();
})
test('$.has: script code result should be ok', () => {
    const G = $(hc1, config.html);
    const result = G.has('<script>$_$</script>');
    expect(result).toBeTruthy();
})
test('$.has: style code result should be ok', () => {
    const G = $(hc1, config.html);
    const result = G.has('<style>$_$</style>');
    expect(result).toBeTruthy();
})
test('$.has: comment code result should be ok', () => {
    const G = $(hc1, config.html);
    const result = G.has('<!-- $_$ -->');
    expect(result).toBeTruthy();
})

test('$.has: vue has', () => {
    const result = $('<template></template>', { parseOptions: { language: 'vue' } })
    .has('var a = 1')
    expect(!result).toBeTruthy();
})