const $ = require('../index');
const config = require('./config');
const jc1 = require('./code/simple1');
const hc1 = require('./code/simple1.html');
test('$.length: simple code', () => {
    expect($('var a = 1;').length).toBe(1)
})
test('$.length: js code index overflow should not show error', () => {
    expect($(jc1).find(`a`).length).toBe(4)
})
test('$.length: simple1 html code', () => {
    expect($(hc1, config.html).find('<$_$></$_$>').length).toBe(14)
})