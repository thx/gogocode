const $ = require('../index');
const config = require('./config');
const jc1 = require('./code/simple1');
const jc2 = require('./code/simple2');
const hc1 = require('./code/simple1.html');
test('$.remove: no selector', () => {
    expect(()=>{
       const G = $('var a = 1;');
       G.remove();
    }).toThrow();
})

test('$.remove: siple code', () => {
    expect(()=>{
       const G = $('var a = 1;');
       G.remove('var $_$ ');
    }).not.toThrow();
})
test('$.remove: this[0] is null', () => {
    expect(()=>{
       const G = $('var a = 1;');
       G[0] = null
       G.remove();
    }).toThrow();
})
test('$.remove: simple code 2', () => {
    expect(() => {
        const code = `
        function parent(){
            let name = 'jerry';
            let city = 'bj';
            function eat(){
                console.log('do eat');
            }
        }
        parent();
        `
        const G = $(code).remove('let $_$ = \'$_$\'');
    }).not.toThrow()
})
test('$.remove: simple code 2', () => {
    expect(() => {
        const code = `
        function parent(){
            let name = 'jerry';
            let city = 'bj';
            function eat(){
                console.log('do eat');
            }
        }
        parent();
        `
        const G = $(code).remove('let $_$ = \'$_$\'');
    }).not.toThrow()
})
test('$.remove: simple code 2 result should be ok', () => {

    const code = `
        function parent(){
            let name = 'jerry';
            let city = 'bj';
            function eat(){
                console.log('do eat');
            }
        }
        parent();
        `
    const G = $(code).remove('let $_$ = \'$_$\'');
    const result = G.generate();
    expect(result.indexOf(`let name = 'jerry'` < 0)).toBeTruthy();
})
// test('$.remove: simple2 code result should be ok', () => {
//     const G = $(jc2);
//     // G.remove('await this.fetchData();');
//     const result = G.generate();
//     expect(result.indexOf(`await this.fetchData()` < 0)).toBeTruthy();
// })
test('$.remove: simple1 html code', () => {
    expect(() => {
        const G = $(hc1, config.html);
        G.remove('<span>test</span>')
    }).not.toThrow();
})
test('$.remove: simple1 html code result should be ok', () => {

    const G = $(hc1, config.html);
    G.remove('<span>test</span>');
    const code = G.generate();
    expect(code.indexOf('<span>test</span>') < 0).toBeTruthy();
})