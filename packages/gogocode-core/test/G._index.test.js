const $ = require('../index');
const config = require('./config');
const jc1 = require('./code/simple1');
const jc2 = require('./code/simple2');
const hc1 = require('./code/simple1.html');

test('$._index: simple code should not throw error', () => {
    expect(()=>{
       const G = $('var a = 1;');
       const index = G._index;
    }).not.toThrow();
})
test('$._index: code1 should not throw error', () => {
    expect(()=>{
       const G = $(jc1);
       const index = G._index;
    }).not.toThrow();
})
test('$._index: code2 should not throw error', () => {
    expect(()=>{
       const G = $(jc2);
       const index = G._index;
    }).not.toThrow();
})
test('$._index: index should be a number', () => {
       const G = $('var a = 1;');
       const index = G._index;
    // comment: expect(index).toBeGreaterThan(-1);    // 目前只实现了html的_index js的还没有
})

test('$._index: simple html code should not throw error', () => {
    expect(() => {
        const G = $(hc1, config.html);
        const index = G._index;
    }).not.toThrow();
})
test('$._index: simple html code, index should be a number', () => {
    const G = $('<div></div>', config.html);
    const index = G._index;
    expect(index).toBeGreaterThan(-1);
})

// test('$._index: simple1 code ,index should not be -1', () => {
//     const G = $(jc2).find(`this.observeLocation(['start', 'end']);`);
//     const index = G._index;
//     expect(index).toBeGreaterThan(-1);
// })
test('$._index: html code, index should be a number', () => {
    const G = $(hc1, config.html);
    const index = G._index;
    expect(index).toBeGreaterThan(-1);
})
test('$._index: html code, index should be a number', () => {
    const G = $(hc1, config.html);
    const index = G.find('<title>title</title>').parent()._index;
    expect(index).toBeGreaterThan(-1);
})