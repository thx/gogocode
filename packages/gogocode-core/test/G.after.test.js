const $ = require('../index');
const config = require('./config');
const jc1 = require('./code/simple1');
const jc2 = require('./code/simple2');
const hc1 = require('./code/simple1.html');

test('$.after: empty input', () => {
    expect(() => {
        $('var a = 1;').after();
    }).toThrow();
})
test('$.after: empty object', () => {
    expect(() => {
        $('var a = 1;').after({});
    }).toThrow();
})
test('$.after: empty string', () => {
    expect(() => {
        $('var a = 1;').after('');
    }).toThrow();
})
test('$.after: null', () => {
    expect(() => {
        $('var a = 1;').after(null);
    }).toThrow();
})

test('$.after: undefined', () => {
    expect(() => {
        $('var a = 1;').after(undefined);
    }).toThrow();
})
test('$.after: input is node type', () => {
    expect(() => {
        const code = `
        function a(){
            var a = 1;
        }
        `;
        const node = $('var a = 1;').node;
        $(code).after(node);
    }).not.toThrow();
})
test('$.after: input is node type equal', () => {
    const code = `
        function a(){
            var a = 1;
        }
        `;
    const node = $('var a = 1;').node;
    const newCode = $(code).after(node).generate();
    const compareCode = '\n        function a(){\n            var a = 1;\n        }\n        var a = 1;\n        ';
    expect(compareCode).toBe(newCode);
})
test('$.after: insert string code', () => {
    expect(() => {
        const code = `
        function a(){
            var a = 1;
        }
        `;
        $(code).after('var a = 1;');
    }).not.toThrow();
})
test('$.after: insert string code to equal', () => {

    const code = `
        function a(){
            var a = 1;
        }
        `;
    const newCode = $(code).after('var a = 1;').generate();
    const compareCode = '\n        function a(){\n            var a = 1;\n        }\n        var a = 1;\n        ';
    expect(compareCode).toBe(newCode);
})
test('$.after: insert empty row code to equal', () => {
    const C = `function add(){
    console.log('test');
}`
    const placeholder = `placeholder${+new Date()}`;
    const code = $(C)
        .find('function add(){}')
        .after(placeholder)
        .root()
        .generate()
        .replace(new RegExp(placeholder, 'g'), '\n')
    expect(code.split('\n').length === 4).toBeTruthy();
})

test('$.after: insert $ object', () => {
    expect(() => {
        const code = `
        function a(){
            var a = 1;
        }
        `;
        $(code).after($('var a = 1;'));
    }).not.toThrow();
})
test('$.after: insert $ object code to equal', () => {

    const code = `
        function a(){
            var a = 1;
        }
        `;
    const newCode = $(code).after($('var a = 1;')).generate();
    const compareCode = '\n        function a(){\n            var a = 1;\n        }\n        var a = 1;\n        ';
    expect(compareCode).toBe(newCode);
})
test('$.after: simple2 code result should be ok', () => {
    const G = $(jc2)
        .find(` Magix.Router.to({ page, pageSize: size })`);
    const newG = G.after('this.updater.digest({ page, pageSize: size })');
    const newCode = newG.parent(1).generate();
    const compareCode = `{
    Magix.Router.to({ page, pageSize: size })
    this.updater.digest({ page, pageSize: size })
}`;
    expect(compareCode).toBe(newCode);
})
test('$.after: undefined html code', () => {
    const code = `<div>test</div>`;
    expect(() => {
        const G = $(code, config.html);
        G.after(undefined);
    }).toThrow();
})
test('$.after: empty html code', () => {
    const code = `<div>test</div>`;
    expect(() => {
        const G = $(code, config.html);
        G.after('');
    }).toThrow();
})
test('$.after: simple html code', () => {
    const code = `<div>test</div>`;
    expect(() => {
        const G = $(code, config.html);
        G.after('<span>span</span>');
    }).not.toThrow();
})
test('$.after: simple html code to equal', () => {
    const code = `<div>test</div>`;
    const G = $(code, config.html);
    const newCode = G.after('<span>span</span>').generate();
    const compareCode = '<div>test</div><span>span</span>';
    expect(newCode).toEqual(compareCode)
})
test('$.after: simple html code,insert node', () => {
    const code = `<div>test</div>`;
    expect(() => {
        const G = $(code, config.html);
        G.after($('<span>span</span>', config.html).node);
    }).not.toThrow();
})
test('$.after: simple html node object to equal', () => {
    const code = `<div>test</div>`;
    const G = $(code, config.html);
    const newCode = G.after($('<span>span</span>', config.html).node).generate();
    const compareCode = '<div>test</div><span>span</span>';
    expect(newCode).toEqual(compareCode)
})
test('$.after: simple html code,insert $ object', () => {
    const code = `<div>test</div>`;
    expect(() => {
        const G = $(code, config.html);
        G.after($('<span>span</span>', config.html));
    }).not.toThrow();
})
test('$.after: simple html $ node to equal', () => {
    const code = `<div>test</div>`;
    const G = $(code, config.html);
    const newCode = G.after($('<span>span</span>', config.html)).generate();
    const compareCode = '<div>test</div><span>span</span>';
    expect(newCode).toEqual(compareCode)
})
test('$.after: simple1 html code', () => {
    expect(() => {
        const G = $(hc1, config.html).after('<span>after</span>');
    }).not.toThrow();
})
test('$.after: simple1 html code', () => {
    const code = $(hc1, config.html)
    .find('<span>$_$</span>')
    .after('<span>after</span>')
    .parent()
    .generate();
    expect(code.indexOf('<span>after</span>') > -1).toBeTruthy();
})

test('$.after: simple1 html code', () => {
    const code = $(`var a = 1;
    var b = 1;`)
        .find(`var a = 1`)
        .after('// aaaaaaaa')
        .root()
        .generate()
    expect(code.indexOf('// aaaaaa') > -1).toBeTruthy();
})

test('$.after: simple1 html code', () => {
    const code = $(`var a = 1;
    var b = 1;`)
        .after('// aaaaaaaa')
        .generate()
    expect(code.indexOf('// aaaaaa') > -1).toBeTruthy();
})