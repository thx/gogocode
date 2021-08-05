const $ = require('../index');
const config = require('./config');
const jc1 = require('./code/simple1');
const jc2 = require('./code/simple2');
const hc1 = require('./code/simple1.html');
test('$.append: empty code should not throw error', () => {
    expect(() => {
        const G = $('var a = 1;');
        G.append('');
    }).not.toThrow();
})
test('$.append: null should not throw error', () => {
    expect(() => {
        const G = $('var a = 1;');
        G.append(null);
    }).not.toThrow();
})
test('$.append: undefined should not throw error', () => {
    expect(() => {
        const G = $('var a = 1;');
        G.append(undefined);
    }).not.toThrow();
})
test('$.append: simple code should not throw error', () => {
    expect(() => {
        const CODE = `
        function a(){
            var a = 1;
        }
        `;
        $(CODE).append('var a = 1;');
    }).not.toThrow();
})
test('$.append: simple code with $ object should not throw error', () => {
    expect(() => {
        const CODE = `
        var a = 1;
        `;
        $(CODE).append($(` function a(){
            var a = 1;
        }`));
    }).not.toThrow();
})
test('$.append: simple code result should be ok', () => {

    const CODE = `
        var b = 1;
        `;
    const code = $(CODE).append($(` function a(){
            var a = 1;
        }`)).generate();

    const compareCode = '\n        var b = 1;\n        function a(){\n                   var a = 1;\n               }\n        ';
    expect(code).toBe(compareCode);

})
test('$.append: simple code result should be ok', () => {
    const CODE = `
    function a(){
        var a = 1;
    }
    `;
    const code = $(CODE).append($('var b = 1;').node).generate();
    const compareCode = '\n    function a(){\n        var a = 1;\n    }\n    var b = 1;\n    ';
    expect(code).toBe(compareCode);
})
test('$.append: simple2 code result should to be passed', () => {
    const G = $(jc2).append($('{test:function(){}}').node);
    const result = G.node.program.body[G.node.program.body.length - 1].properties[0].key.name === 'test';
    expect(result).toBeTruthy();
});
test('$.append: simple code result should to be passed', () => {
    const code = $(`Page({
        onShow() { },
        data: { }
      })`).find(`Page({})`)
        .each(item => {
            // `init() {}` parse 抛异常
            $(item.attr('arguments.0')).append('properties', `init() {}`)
            // page的arguments[0]是第一个入参对象，通过attr获取到这个节点之后用$()转为AST实例，
            // 就可以链式调用进行后续操作，append第一个参数是第二个参数指定插入的位置
        })
        .root()
        .generate();
    const result = code.indexOf(`init()`) > -1;
    expect(result).toBeTruthy();
});
test('$.append: append simple code result should to be passed', () => {
    const C = `
    function create() {
        console.log('this is function')
    }
    `;
    const code = $(C)
        .find(`function create() {}`)
        .each(item => {
            $(item.attr('body')).append('body', `
          let type = 'success'
          console.log('success')
      `)
        })
        .root()
        .generate();
    const result = code.indexOf(`let type = 'success'`) > -1;
    expect(result).toBeTruthy();
});
test('$.append: simple html code', () => {
    const code = `<div>test</div>`;
    expect(() => {
        const G = $(hc1, config.html);
        G.append('<span>span</span>');
    }).not.toThrow();
})
test('$.append: simple1 html code', () => {
    expect(() => {
        const G = $(hc1, config.html);
    }).not.toThrow();
})
test('$.append: simple1 html code result should to be ok', () => {

    const CODE = '<div>test append</div>'
    const G = $(hc1, config.html);
    const result = G.find('<html>').append(CODE).generate();
    expect(result.indexOf(CODE) > -1).toBeTruthy();

})

test('$.append: append rest param', () => {

    const result = 
    $(`function a(b) {}`)
    .append('params', `{ options = {}, ...rest }`)
    .generate();
    expect(result.indexOf('options') > -1).toBeTruthy();

})


test('$.empty: simple1 html code', () => {
    const G = $(`
    <view class="abc">
        <view> {{ message }} </view>
        <view> {{ message }} </view>
        <view> {{ message }} </view>
        <view> {{ message }} </view>
    </view>
    `, config.html);
    const newG = G.find('<$_$tag class="abc"></$_$tag>')
    .each(function (item) {

      var list = 
        `<view>1111</view>
        <view>1111</view>
        <view>1111</view>`
      item.append(list)
    })
    .root()
    .generate()
    expect(newG.match(/1111/g).length == 3).toBeTruthy();
})