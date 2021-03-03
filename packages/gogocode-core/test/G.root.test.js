const $ = require('../index');
const config = require('./config');
const jc1 = require('./code/simple1');
const jc2 = require('./code/simple2');
const hc1 = require('./code/simple1.html');
test('$.root: simple code', () => {
    expect(()=>{
       const G = $('var a = 1;');
       G.root();
    }).not.toThrow();
})
test('$.root: simple code remove node', () => {
    expect(()=>{
       const G = $('var a = 1;');
       G[0] = null
       G.root();
    }).not.toThrow();
})
test('$.root: simple1 code', () => {
    expect(()=>{
       const G = $(jc1);
       G.root();
    }).not.toThrow();
})
test('$.root: simple1 code result should be ok', () => {
    const G = $(jc1);
    const code = G.root().generate();
    expect(code.indexOf('const h = height();') > -1).toBeTruthy();
})
test('$.root: simple2 code result should be ok', () => {
    const G = $(jc2);
    const code = G.root().generate();
    expect(code.indexOf(`this.observeLocation(['start', 'end'])`) > -1).toBeTruthy();
})
test('$.root: simple2 code result should be ok', () => {
    const G = $(jc2);
    const code = G.find('View.extend($_$)').root().generate();
    expect(code.indexOf(`this.observeLocation(['start', 'end'])`) > -1).toBeTruthy();
})
test('$.root: simple1 html code', () => {
    expect(() => {
        const G = $(hc1, config.html);
        G.root();
    }).not.toThrow();
})
test('$.root: simple1 html code result should be ok', () => {
    expect(() => {
        const G = $(hc1, config.html);
        G.root();
    }).not.toThrow();
})
test('$.root: simple1 html code result should be ok', () => {
    const G = $(hc1, config.html);
    const code = G.root().generate();
    expect(code.indexOf('<html>') > -1).toBeTruthy();
})
test('$.root: simple1 html code result should be ok', () => {
    const G = $(hc1, config.html);
    const code = G.find('<title>title</title>').root().generate();
    expect(code.indexOf('<html>') > -1).toBeTruthy();
})