const $ = require('../index');
const config = require('./config');
const jc1 = require('./code/simple1');
const jc2 = require('./code/simple2');
const hc1 = require('./code/simple1.html');
test('$.empty: simple code', () => {
    expect(()=>{
       const G = $('var a = 1;');
       G.empty();
    }).not.toThrow();
})

test('$.empty: array', () => {
    const G = $('var a = 1;');
    const newG = G.empty();
    expect(newG.generate() == '');
})
test('$.empty: simple1 code', () => {
    const G = $(jc1);
    const newG = G.empty();
    expect(newG.generate() == '');
})
test('$.empty: simple2 code', () => {
    const G = $(jc2);
    const newG = G.empty();
    expect(newG.generate() == '');
})
test('$.empty: simple2 code result should be ok', () => {
    const G = $(jc2).find('View.extend($_$)');
    const newG = G.empty();
    expect(newG.generate() == '');
})
test('$.empty: array should be empty', () => {
    const G = $('var a = 1;');
    const newG = G.empty();
    const { value } = newG.node;
    expect(value).not.toBeTruthy();
})
test('$.empty: simple1 html code', () => {
    expect(() => {
        const G = $(hc1, config.html);
        G.empty();
    }).not.toThrow();
})
test('$.empty: simple1 html code', () => {
    const G = $(hc1, config.html);
    const newG = G.empty();
    expect(newG.generate() == '');
})
test('$.empty: simple1 html code', () => {
    const G = $(hc1, config.html);
    const newG = G.find('<span>$_$</span>').empty();
    expect(newG.generate() == '');
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
    const newG = G.find('<view class="abc"></view>').empty();
    expect(newG.generate().match('message')).not.toBeTruthy();
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
    const newG = G.empty();
    expect(newG.generate() == '').toBeTruthy();
})