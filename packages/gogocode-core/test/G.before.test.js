const $ = require('../index');
const config = require('./config');
const jc1 = require('./code/simple1');
const jc2 = require('./code/simple2');
const hc1 = require('./code/simple1.html');

test('$.before: empty string should throw error', () => {
    expect(() => {
        const G = $('var a = 1;');
        G.before('');
    }).toThrow();
})
test('$.before: null should throw error', () => {
    expect(() => {
        const G = $('var a = 1;');
        G.before(null);
    }).toThrow();
})
test('$.before: undefined should throw error', () => {
    expect(() => {
        const G = $('var a = 1;');
        G.before(undefined);
    }).toThrow();
})
test('$.before: simple code', () => {
    expect(() => {
        const code = `
        function a(){
            var a = 1;
        }
        `;
        const node = $('var a = 1;').node;
        $(code).before(node);
    }).not.toThrow();
})
test('$.before: insert string code', () => {
    expect(() => {
        const code = `
        function a(){
            var a = 1;
        }
        `;
        $(code).before('var a = 1;');
    }).not.toThrow();
})
test('$.before: insert string code ,result to equal', () => {

    const code = `
        function a(){
            var a = 1;
        }
        `;
    const newCode = $(code).before('var a = 1;').generate();
    const compareCode = `
        var a = 1;
        function a(){
            var a = 1;
        }
        `;
    expect(newCode).toBe(compareCode);
})
test('$.before: insert node object', () => {
    expect(() => {
        const code = `
        function a(){
            var a = 1;
        }
        `;
        $(code).before($('var a = 1;').node);
    }).not.toThrow();
})
test('$.before: insert node object,result to equal', () => {

    const code = `
        function a(){
            var a = 1;
        }
        `;
    const newCode = $(code).before($('var a = 1;').node).generate();
    const compareCode = `
        var a = 1;
        function a(){
            var a = 1;
        }
        `;
    expect(newCode).toBe(compareCode);

})
test('$.before: insert $ object', () => {
    expect(() => {
        const code = `
        function a(){
            var a = 1;
        }
        `;
        $(code).before($('var a = 1;'));
    }).not.toThrow();
})
test('$.before: insert node object,result to equal', () => {

    const code = `
        function a(){
            var a = 1;
        }
        `;
    const newCode = $(code).before($('var a = 1;').node).generate();
    const compareCode = `
        var a = 1;
        function a(){
            var a = 1;
        }
        `;
    expect(newCode).toBe(compareCode);
})
test('$.before: undefined html code', () => {
    const code = `<div>test</div>`;
    expect(() => {
        const G = $(code, config.html);
        G.before(undefined);
    }).toThrow();
})
test('$.before: empty simple html code', () => {
    const code = `<div>test</div>`;
    expect(() => {
        const G = $(code, config.html);
        G.before('');
    }).toThrow();
})
test('$.before: simple html code', () => {
    const code = `<div>test</div>`;
    expect(() => {
        const G = $(code, config.html);
        G.before('<span>span</span>');
    }).not.toThrow();
})
test('$.before: simple html code,result to equal', () => {
    const code = `<div>test</div>`;

    const G = $(code, config.html);
    const newCode = G.before('<span>span</span>').generate();
    const compareCode = `<span>span</span><div>test</div>`;
    expect(newCode).toBe(compareCode);

})
test('$.before: insert node', () => {
    const code = `<div>test</div>`;
    expect(() => {
        const G = $(code, config.html);
        G.before($('<span>span</span>', config.html).node);
    }).not.toThrow();
})
test('$.before: insert node,result to equal', () => {
    const code = `<div>test</div>`;

    const G = $(code, config.html);
    const newCode = G.before($('<span>span</span>', config.html).node).generate();
    const compareCode = `<span>span</span><div>test</div>`;
    expect(newCode).toBe(compareCode);

})
test('$.before: insert $ object', () => {
    const code = `<div>test</div>`;
    expect(() => {
        const G = $(code, config.html);
        G.before($('<span>span</span>', config.html));
    }).not.toThrow();
})
test('$.before: insert $ object,result to equal', () => {
    const code = `<div>test</div>`;
    const G = $(code, config.html);
    const newCode = G.before($('<span>span</span>', config.html)).generate();
    const compareCode = `<span>span</span><div>test</div>`;
    expect(newCode).toBe(compareCode);

})
test('$.before: simple1 html code', () => {
    expect(() => {
        const G = $(hc1, config.html).after('<span>after</span>');
    }).not.toThrow();
})
test('$.before: simple1 html code', () => {
    const code = $(hc1, config.html)
    .find('<span>$_$</span>')
    .before('<span>before</span>')
    .parent()
    .generate();
    expect(code.indexOf('<span>before</span>') > -1).toBeTruthy();
})