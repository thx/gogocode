const $ = require('../index');
const config = require('./config');
const jc1 = require('./code/simple1');
const jc2 = require('./code/simple2');
const hc1 = require('./code/simple1.html');
test('$.match: simple js code should not throw error', () => {
    expect(() => {
        const G = $(jc1).find('var $_$');
        G.match;
    }).not.toThrow();
})
test('$.match: simple js code match should be undefined', () => {
    const G = $(jc1);
    const match = G.match;
    expect(match).toBe(undefined);
})
test('$.match: simple js code match should be same', () => {
    const G = $(jc1).find('var $_$');
    const match = G.match;
    expect(match[0][0].value === 'a').toBeTruthy();
})
test('$.match: js code match should be same', () => {
    const G = $(jc2).find(`const $_$ = { name: '1' };`);
    const match = G.match;
    expect(match[0][0].value === 'params').toBeTruthy();
})
test('$.match: html code should not throw error', () => {
    expect(() => {
        const G = $(hc1, config.html);
        const w = G.match;
    }).not.toThrow();
})
test('$.match: html code match should be undefined', () => {
    const G = $(hc1, config.html);
    const match = G.match;
    expect(match).toBe(undefined);
})
test('$.match: html code match should be same', () => {
    const G = $(hc1, config.html).find('<span>$_$</span>');
    const match = G.match;
    expect(match[0] &&
        match[0][0].node.length &&
        match[0][0].node[0].nodeType === 'text' &&
        match[0][0].node[0].content.value.content === 'test'
    ).toBeTruthy();
})

test('$.match: html code attr value match should be same', () => {
    const G = $(hc1, config.html).find('<div id=$_$>');
    const match = G.match;
    expect(match[0] &&
        match[0][0].node &&
        match[0][0].node.content === '1'
    ).toBeTruthy();
})
test('$.match: html code attr key match should be same', () => {
    const G = $(hc1, config.html).find('<div $_$="1">');
    const match = G.match;
    expect(match[0] &&
        match[0][0].node &&
        match[0][0].node.content === 'id'
    ).toBeTruthy();
})

test('$.match: html code attr key match should be same', () => {
    let res = [];
    $(`(function(param_1, param_2) {
        // Code that runs in your function
    })({"config": {a:1}, "data": {b:2}}, {"actions": {c:3}, "misc": {d:4}});

    (function(param_1, param_2) {
        // Code that runs in your function
    })({"config": {a:1}, "data": {b:2}}, {"actions": {c:3}, "misc": {d:4}});
    
    (function() {
        // Code that runs in your function
    })({"config2": {a:1}});
    
    
    (somethingelse)(111);`)
    .find(`(function(){})($_$2)`)
    .each(item => {
        res.push(item.match[2].map(m => m.value))
    })
    expect(res.length == 3).toBeTruthy();
})

test('$.match: match params', () => {
    const res = $(`foo(a)`)
    .find(`foo($_$1, $_$2)`)
    expect(!res.length).toBeTruthy();
})

test('$.match: match params', () => {
    const res = $(`
    function xx(){
        var a =5;
        return 6666
    }`)
    .find([
        'function $_$xx(){return $_$return}',
    ])
    
    expect(res.match['return'].length == 1).toBeTruthy();
})

// test('$.match: match params', () => {
//     const res = $(`
//     var tt = this, a = 1;`)
//     .find('var $_$thisName = this')
    
//     expect(res.match['thisName'].length == 1).toBeTruthy();
// })

test('$.match: match params', () => {
    expect(() => {
        const AST = $('iii');
        const b = AST.find('a')
        console.log(b.match)
    }).not.toThrow()
})