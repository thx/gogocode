const $ = require('../index');
const config = require('./config');
const jc1 = require('./code/simple1');
const jc2 = require('./code/simple2');
const hc1 = require('./code/simple1.html');
const CODE = `
const m = {
    a: function() {
        console.log('test a');
    },
    b: function() {
        console.log('test b');
    }
}
m.a();
`;
const COMPARE_CODE = `
const m = {
    a: function() {
        console.log('test a');
    },
    b: function() {
        console.log('test b');
    }
}
m.b();
`;
test('$.replace: simple code', () => {
    expect(() => {
        const G = $(CODE);
        G.replace('$_$.a()','$_$.b()')
    }).not.toThrow();
})

test('$.replace: simple code', () => {
    const G = $(CODE);
    G.replace('$_$.a()','$_$.b()');
    const code = G.generate();
    expect(code).toBe(COMPARE_CODE);
})
test('$.replace: this[0] is null', () => {
    expect(()=>{
       const G = $('var a = 1;');
       G[0] = null
       G.replace();
    }).toThrow();
})
test('$.replace: null', () => {
    expect(() => {
        const G = $(CODE);
        G.replace('$_$.a()',null)
    }).not.toThrow();
})
test('$.replace: no $_$', () => {
    expect(() => {
        const G = $(CODE);
        G.replace('$_$.a()','m.b()');
    }).not.toThrow();
})
test('$.replace: not find', () => {
    expect(() => {
        const G = $(CODE);
        G.replace('$_$.c()','m.b()');
    }).not.toThrow();
})
test('$.replace: simple1 js code result should be ok', () => {
    const G = $(jc1);
    const result = G.replace('const c = add();', 'const b = add();');
    const code = result.generate();
    expect(code.indexOf('const c = add()') < 0 && code.indexOf('const b = add()') > -1).toBeTruthy();
})
test('$.replace: simple2 js code result should be ok', () => {
    const G = $(jc2);
    const result = G.replace('this.updater.digest(loc);', 'this.updater.set(loc);');
    const code = result.generate();
    expect(code.indexOf('this.updater.digest(loc)') < 0 && code.indexOf('this.updater.set(loc)') > -1).toBeTruthy();
})
test('$.replace: simple1 html code', () => {
    expect(() => {
        const G = $(hc1, config.html);
        G.replace('<span>test</span>','<span>replace</span>');
    }).not.toThrow();
})
test('$.replace: simple1 html code result should be ok', () => {

    const G = $(hc1, config.html);
    G.replace('<span>test</span>','<span>replace</span>');
    const code = G.generate();
    expect(code.indexOf('<span>test</span>') < 0 && code.indexOf('<span>replace</span>') > -1).toBeTruthy();

})