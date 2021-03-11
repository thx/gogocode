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
    const match = G.match;
    expect(match).toBe(undefined);
})
test('$.match: simple js code match should be same', () => {
    const G = $(jc1).find('var $_$');
    const match = G.match;
    expect(match[0][0].value === 'a').toBeTruthy();
})
test('$.match: js code match should be same', () => {
    const G = $(jc2).find(`const $_$ = { name: '1' };`);
    const match = G.match;
    expect(match[0][0].value === 'params').toBeTruthy();
})
test('$.match: html code should not throw error', () => {
    expect(() => {
        const G = $(hc1, config.html);
        const w = G.match;
    }).not.toThrow();
})
test('$.match: html code match should be undefined', () => {
    const G = $(hc1, config.html);
    const match = G.match;
    expect(match).toBe(undefined);
})
test('$.match: html code match should be same', () => {
    const G = $(hc1, config.html).find('<span>$_$</span>');
    const match = G.match;
    expect(match.length &&
        match[0].structure.length &&
        match[0].structure[0].nodeType === 'text' &&
        match[0].structure[0].content.value.content === 'test'
    ).toBeTruthy();
})

test('$.match: html code attr value match should be same', () => {
    const G = $(hc1, config.html).find('<div id=$_$>');
    const match = G.match;
    expect(match.length &&
        match[0].structure &&
        match[0].structure.content === '1'
    ).toBeTruthy();
})
test('$.match: html code attr key match should be same', () => {
    const G = $(hc1, config.html).find('<div $_$="1">');
    const match = G.match;
    expect(match.length &&
        match[0].structure &&
        match[0].structure.content === 'id'
    ).toBeTruthy();
})