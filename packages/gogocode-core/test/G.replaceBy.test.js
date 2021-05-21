const $ = require('../index');
const config = require('./config');
const jc1 = require('./code/simple1');
const jc2 = require('./code/simple2');
const hc1 = require('./code/simple1.html');
test('$.replaceBy: simple code', () => {
    expect(()=>{
       const G = $('var a = 1;');
       G.replaceBy('function test(){}')
    }).not.toThrow();
})

test('$.replaceBy: this[0] is null', () => {
    expect(()=>{
       const G = $('var a = 1;');
       G[0] = null
       G.replaceBy();
    }).not.toThrow();
})


test('$.replaceBy: simple code', () => {
    expect(()=>{
       const G = $('var a = 1;');
       G.replaceBy($('function test(){}'))
    }).not.toThrow();
})

test('$.replaceBy: simple code replaceBy function result should be ok', () => {
    const G = $('var a = 1;');
    const result = G.replaceBy('function test(){}');
    const code = result.generate();
    expect(code).toBe('function test(){}');
})

test('$.replaceBy: simple code', () => {
    expect(()=>{
       const G = $('var a = 1;');
       G.replaceBy('var b = 1;');
    }).not.toThrow();
})
test('$.replaceBy: simple code result should be ok', () => {
    const G = $('var a = 1;');
    const result = G.replaceBy('var b = 1;');
    const code = result.generate();
    expect(code).toBe('var b = 1;');
})
test('$.replaceBy: simple1 code result should be ok', () => {
    const G = $(jc1);
    const result = G.replaceBy('var b = 1;');
    const code = result.generate();
    expect(code).toBe('\nvar b = 1;\n');
})
test('$.replaceBy: simple2 code result should be ok', () => {
    const G = $(jc2);
    //整个ast替换
    const result = G.replaceBy('var b = 1;');
    const code = result.generate();
    expect(code).toBe('\nvar b = 1;\n');
})
test('$.replaceBy: simple2 code2 result should be ok', () => {
    const G = $(jc2).find('this.updater.digest(loc)');
    const result = G.replaceBy('this.updater.set(loc)');
    const code = result.generate();
    expect(code.indexOf('this.updater.set(loc)') > -1).toBeTruthy();
})

test('$.replaceBy: replace use $_$ result should be ok', () => {
    const CODE = `alert({
        type: 'error',
        content: '请填写必填项',
        done: () => {}
      })`;
    const code = $(CODE)
    .find(`alert({ type: $_$1, content: $_$2, done: $_$3 })`)
    .each(item => {
      const typeValue = item.match[1][0].value,
            contentValue = item.match[2][0].value,
            doneValue = item.match[3][0].value
      item.replaceBy($(`
        alert( ${typeValue}, ${contentValue}, ${doneValue} )
      `))
    }).generate();
    const result = code.indexOf(`alert( error, 请填写必填项, () => {} )`) > -1 ;
    expect(result).toBeTruthy();
})
test('$.replaceBy: simple1 html code', () => {
    expect(() => {
        const G = $(hc1, config.html);
        G.replaceBy('<span>test</span>');
    }).not.toThrow();
})
test('$.replaceBy: simple1 html code result should be ok', () => {
    const G = $(hc1, config.html);
    G.replaceBy('<span>test</span>');
    const code = G.generate();
    expect(code).toBe('<span>test</span>');
})
test('$.replaceBy: simple1 html code  use find result should be ok', () => {
    const G = $(hc1, config.html);
    const result = G.find('<head>$_$</head>').replaceBy('<span>test</span>');
    const code = result.root().generate();
    expect(code.indexOf('<head>') < 0).toBeTruthy();
})

test('$.replaceBy: simple1 html code  use find result should be ok', () => {
    const res = $(`
    export default {
        a: 1,
        b: 2,
        render() {}
    }`).find(`render() {

    }`)
    .parent(1)
    .replaceBy(`function render() {}`)
    .root()
    .generate();
    expect(res.indexOf(`function render`) > -1).toBeTruthy();
})

test('$.replaceBy: simple1 html code  use find result should be ok', () => {
    const res = $(`
    export default {
        name: 'HComp',
        props: {
          msg: String,
        },
        functional: true,
        render(h, { props }) {
          return h('p', \`render by h: \${props.msg}\`);
        },
    };`)
        .find('{ functional: true }')
        .each((ast) => {
            if (ast.has('render() {}')) {
                const renderFunction = ast.find('render() {}');
                let renderFunctionStr = `function ${renderFunction.generate()}`;
                renderFunction.parent(1).replaceBy(renderFunctionStr);
            }
        })
        .root()
        .generate();
    expect(!!res.match('function render')).toBeTruthy();
})