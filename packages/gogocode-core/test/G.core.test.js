const $ = require('../index');
const core = require('../src/js-core/core');
const htmlCore = require('../src/html-core/core');
const config = require('./config');

test('$.core: simple code should not throw error', () => {
    expect(()=>{
       const G = $('var a = 1;');
       const node = G.core;
    }).not.toThrow();
})
test('$.core: js core', () => {
    const G = $('var a = 1;');
    expect(G.core).toBe(core);
})
test('$.core: html core', () => {
    const G = $('<div></div>', config.html);
    expect(G.core).toBe(htmlCore);
})
