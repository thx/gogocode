const $ = require('../index');
const config = require('./config');
const jc1 = require('./code/simple1');
const jc2 = require('./code/simple2');
const hc1 = require('./code/simple1.html');
test('$.match: simple js code should not throw error', () => {
    expect(() => {
        const G = $(jc1).find('var $_$');
        G.match;
    }).not.toThrow();
})
test('$.match: simple js code match should be undefined', () => {
    const G = $(jc1);
    const wc = G.match;
    expect(wc).toBe(undefined);
})
test('$.match: simple js code match should be same', () => {
    const G = $(jc1).find('var $_$');
    const wc = G.match;
    expect(wc.length && wc[0].value === 'a').toBeTruthy();
})
test('$.match: js code match should be same', () => {
    const G = $(jc2).find(`const $_$ = { name: '1' };`);
    const wc = G.match;
    expect(wc.length && wc[0].value === 'params').toBeTruthy();
})
test('$.match: html code should not throw error', () => {
    expect(() => {
        const G = $(hc1, config.html);
        const w = G.match;
    }).not.toThrow();
})
test('$.match: html code match should be undefined', () => {
    const G = $(hc1, config.html);
    const wc = G.match;
    expect(wc).toBe(undefined);
})
test('$.match: html code match should be same', () => {
    const G = $(hc1, config.html).find('<span>$_$</span>');
    const wc = G.match;
    expect(wc.length &&
        wc[0].structure.length &&
        wc[0].structure[0].nodeType === 'text' &&
        wc[0].structure[0].content.value.content === 'test'
    ).toBeTruthy();
})