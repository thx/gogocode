const $ = require('../index');
const config = require('./config');
const jc1 = require('./code/simple1');
const jc2 = require('./code/simple2');
const hc1 = require('./code/simple1.html');

test('$.each: simple code', () => {
    expect(()=>{
       const G = $('var a = 1;');
       G.each(()=>{

       });
    }).not.toThrow();
})
test('$.each: simple code', () => {
    const G = $('var a = 1;');
    let i = 0;
    G.each((ast) => {
        i++;
    });
    expect(i).toBe(1);
})
test('$.each: simple code', () => {
    const G = $(jc1).find('window.addEventListener($_$,$_$)');
    let i = 0;
    G.each((ast) => {
        i++;
    });
    expect(i).toBe(1);
})
test('$.each: simple1 code, result should be ok', () => {
    const G = $(jc1).find('window.addEventListener($_$,$_$)');
    let code = 0;
    G.each((ast) => {
        code = ast.generate();
    });
    expect(code.indexOf('window.addEventListener') > -1).toBeTruthy();
})
test('$.each: simple2 code, result should be ok', () => {
    const G = $(jc2).find('View.extend($_$)');
    let code = 0;
    G.each((ast) => {
        code = ast.generate();
    });
    expect(code.indexOf(`tmpl: '@test.html'`) > -1).toBeTruthy();
})
test('$.each: simple1 html code', () => {
    expect(() => {
        const G = $(hc1, config.html);
        G.each(()=>{

        });
    }).not.toThrow();
})
test('$.each: simple1 html code', () => {

    const G = $(hc1, config.html);
    let i = 0;
    G.each((ast) => {
        i++;
    });
    expect(i).toBe(1);

})
test('$.each: simple1 html code', () => {

    const G = $(hc1, config.html).find('<body>');
    let i = 0;
    G.each((ast) => {
        i++;
    });
    expect(i).toBe(1);

})