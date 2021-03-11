const $ = require('../index');
const config = require('./config');
const jc1 = require('./code/simple1');
const jc2 = require('./code/simple2');
const hc1 = require('./code/simple1.html');
const jTryout = require('./code/simple-tryout');

const SIMPLE_CODE = `var a = 1;`;
const CODE = `
function test(c){
	let a = 1;
  	let b = 2;
  	return a + b + c;
}
test(11)`;
const OBJECT_CODE = `
const a = {
    name: 'jerry',
    age: 12
}`;
test('$.find: input is empty string should not throw error', () => {
    expect(()=>{
       const G = $(SIMPLE_CODE);
       G.find('');
    }).not.toThrow();
})

test('$.find: input is empty string should not throw error', () => {
    expect(()=>{
       const G = $(SIMPLE_CODE);
       const result = G.find('');
    }).not.toThrow();
})
test('$.find: input is simple selector should not throw error', () => {
    expect(()=>{
       const G = $(SIMPLE_CODE);
       G.find('var $_$ = $_$');
    }).not.toThrow();
})
test('$.find: input is simple selector result should be ok', () => {
    const G = $(SIMPLE_CODE);
    result = G.find('var $_$ = $_$').generate();
    expect(result).toBe('var a = 1;');
})
test('$.find: input is simple selector without $_$ should not throw error', () => {
    expect(()=>{
       const G = $(SIMPLE_CODE);
       G.find('var a = 1;');
    }).not.toThrow();
})
test('$.find: input is simple selector without $_$ result should be ok', () => {
    const G = $(SIMPLE_CODE);
    result = G.find('var a = 1;').generate();
    expect(result).toBe('var a = 1;');
})
test('$.find: input is string array should not throw error', () => {
    expect(()=>{
       const G = $(CODE);
       G.find(['let $_$ = $_$','test()']);
    }).not.toThrow();
})

test('$.find: input is string array result should be ok', () => {
    const G = $(CODE);
    const result = G.find(['let $_$ = $_$', 'test()']);
    const code0 = $(result.eq(0).node).generate();
    const code1 = $(result.eq(1).node).generate();
    const code2 = $(result.eq(2).node).generate();
    expect(code0 === 'let a = 1;' && code1 === 'let b = 2;' && code2 === 'test(11)').toBeTruthy();
})
test('$.find: result is return object', () => {
    expect(()=>{
       const G = $(CODE);
       G.find('return $_$');
    }).not.toThrow();
})
test('$.find: result is return object, result should be ok', () => {
    const G = $(CODE);
    const code = G.find('return $_$').generate();
    expect(code).toBe('return a + b + c;')
})
test('$.find: input is string array ,only one selector, should not throw error', () => {
    expect(()=>{
       const G = $(CODE);
       G.find(['var $_$ = $_$']);
    }).not.toThrow();
})
test('$.find: input is string array ,only one selector, result should be ok', () => {
    const G = $(CODE);
    const result = G.find(['let $_$ = $_$']).generate();
    expect(result).toBe('let a = 1;');
})
test('$.find: input is object  should not throw error', () => {
    expect(()=>{
       const G = $(jc1);
       G.find({type: 'StringLiteral', value: '$_$'});
    }).not.toThrow();
})
test('$.find: input is object result should be ok', () => {
    const G = $(jc1);
    const code = G.find({ type: 'StringLiteral', value: '$_$' }).generate();
    expect(code).toBe("'../index'");
})
test('$.find: input is object array  should not throw error', () => {
    expect(()=>{
       const G = $(CODE);
       G.find([{type: 'StringLiteral', value: '$_$'}, {type: 'Identifier', name: '$_$'}]);
    }).not.toThrow();
})
test('$.find: find properties key should not throw error', () => {
    expect(()=>{
       const G = $(OBJECT_CODE);
       G.find(`$_$:'jerry'`);
    }).not.toThrow();
})
test('$.find: find properties key result should be ok', () => {
    const G = $(OBJECT_CODE);
    // todo support key: value
    const code = G.find(`{ $_$ : 'jerry' }`).generate();
    expect(code.indexOf(`name`) > -1).toBeTruthy();
})
test('$.find: find object ', () => {
    expect(()=>{
       const G = $(OBJECT_CODE);
       G.find(`{$_$:'jerry'}`);
    }).not.toThrow();
})
test('$.find: find object result should be ok', () => {
    const G = $(OBJECT_CODE);
    const code = G.find(`{$_$:'jerry'}`).generate();
    expect(code.indexOf(`name: 'jerry',`) > -1).toBeTruthy();
})
test('$.find: find properties value should not throw error', () => {
    expect(()=>{
       const G = $(OBJECT_CODE);
       G.find(`name:$_$`);
    }).not.toThrow();
})
test('$.find: find properties value result should be ok', () => {
    const G = $(OBJECT_CODE);
    const code = G.find(`{ name: $_$ }`).generate();
    expect(code.indexOf(`jerry`) > -1).toBeTruthy();
})
test('$.find: simple tryout js code if condition result should be ok', () => {
 
    const code = $(jTryout).find('if ($_$){}')
        .each(ast => {
            ast.replace(`!Tryout.TRYOUT_SID_391`,`false`)
            .replace(`Tryout.TRYOUT_SID_391`,'true')
        })
        .root()
        .generate();
    const result = code.indexOf(`if (!Tryout.TRYOUT_SID_391`) < 0 && code.indexOf(`if (Tryout.TRYOUT_SID_391`) < 0
    expect(result).toBeTruthy();
})
test('$.find: find function name', () => {
    expect(()=>{
       const G = $(CODE);
       G.find(`function $_$(c)`);
    }).not.toThrow();
})
test('$.find: find function name result should be ok', () => {
    const G = $(CODE);
    //待定
    const code = G.find(`function $_$(c) { $_$2 }`).match[0][0].value;
    expect(code).toBe('test');
})
test('$.find: find object', () => {
    expect(()=>{
       const G = $(OBJECT_CODE);
       G.find(`const a = $_$`);
    }).not.toThrow();
})
test('$.find: find object result should be ok', () => {
    const G = $(OBJECT_CODE);
    const code = G.find(`const a = $_$`).generate();
    expect(code.indexOf(`name: 'jerry',`) > -1).toBeTruthy();
})
test('$.find: find argument', () => {
    expect(()=>{
       const G = $(CODE);
       G.find(`test($_$)`);
    }).not.toThrow();
})
test('$.find: find argument result should be ok', () => {
    const G = $(CODE);
    const code = G.find(`test($_$)`).generate();
    expect(code).toBe('test(11)');
})
test('$.find: find argument and body', () => {
    expect(()=>{
       const G = $(CODE);
       G.find(`function test($_$){$_$}`);
    }).not.toThrow();
})
test('$.find: find argument and body should be ok', () => {
    const G = $(CODE);
    const code = G.find(`function test($_$){$_$}`).generate();
    expect(code.indexOf('function test(c){') > -1 &&
        code.indexOf('let a = 1;') > -1
    ).toBeTruthy()
})
test('$.find: simple1 html code', () => {
    expect(() => {
        const G = $(hc1, config.html).find('<span>$_$</span>');
    }).not.toThrow();
})
test('$.find: simple1 html code input is object result should be ok', () => {
    const G = $(hc1, config.html);
    // 选择器构造 抛出异常报错
    const code = G.find({ nodeType: 'text', content: G.expando }).generate();
    //待定
    expect(code).toBe("\n");
})

test('$.find: simple1 html code input is object result should be ok', () => {
    const G = $(hc1, config.html);
    // 选择器构造 抛出异常报错
    const code = G.find({ nodeType: 'tag', content: G.expando }).generate();
    //待定
    expect(code.indexOf('<html>') > -1).toBeTruthy();
})

test('$.find: simple1 html code result should be ok', () => {
    const G = $(hc1, config.html).find('<span>');
    const code = G.generate();
    expect(code).toBe('<span>test</span>')
})
test('$.find: simple1 html code use $_$ result should be ok', () => {
    const G = $(hc1, config.html).find('<span>$_$</span>');
    const code = G.generate();
    expect(code).toBe('<span>test</span>')
})
test('$.find: simple1 html code use full tag result should be ok', () => {
    const G = $(hc1, config.html).find('<span>test</span>');
    const code = G.generate();
    expect(code).toBe('<span>test</span>')
})
test('$.find: simple1 html code find attr value', () => {
    const G = $(hc1, config.html).find('<div id=$_$>');
    const match = G.match;
    expect(match[0].value).toBe('1');
})
test('$.find: simple1 html code find attr key', () => {
    const G = $(hc1, config.html).find('<div $_$="1">');
    const match = G.match;
    expect(match[0].value).toBe('id');
})
test('$.find: simple1 html code find DOCTYPE ', () => {
    const G = $(hc1, config.html).find('<!DOCTYPE html>');
    const match = G.match;
    // 无$_$ 无match返回也合理
    // expect(match[0].value).toBe('');
})
test('$.find: script code result should be ok', () => {
    const G = $(hc1, config.html);
    const result = G.find('<script>$_$</script>');
    const match = result.match;
    expect(match).toBe(` var a = '1';`);
})
test('$.find: style code result should be ok', () => {
    const G = $(hc1, config.html);
    const result = G.find('<style>$_$</style>');
    const match = result.match;
    expect(match.indexOf('color: #000;') > -1).toBeTruthy();
})
test('$.find: comment code result should be ok', () => {
    const G = $(hc1, config.html);
    const result = G.find('<!-- $_$ -->');
    const match = result.match;
    expect(match).toBe(` comment test `);
})