const $ = require('../index');
const config = require('./config');
const jc1 = require('./code/simple1');
const jc2 = require('./code/simple2');
const hc1 = require('./code/simple1.html');
test('$.isHtml: simple code should not throw error', () => {
    expect(() => {
        const G = $('var a = 1;');
        G.isHtml;
    }).not.toThrow();
})
test('$.isHtml: simple2 js code, isHtml should not be truthy', () => {
    const G = $(jc2).find('View.extend($_$)');
    expect(G.isHtml).not.toBeTruthy();
})
test('$.isHtml: isHtml should be true ', () => {
    const G = $(hc1, config.html);
    expect(G.isHtml).toBeTruthy();
})
test('$.isHtml: simple html code should not throw error', () => {
    expect(() => {
        const G = $(hc1, config.html);
        G.isHtml;
    }).not.toThrow();
})

test('$.isHtml: simple1 html code result should be ok', () => {
    const G = $(hc1, config.html).find('<span>$_$</span>');
    expect(G.isHtml).toBeTruthy();
})

test('$.isHtml: isHtml should be false ', () => {
    const G = $('var a = 1;');
    expect(G.isHtml).not.toBeTruthy();
})