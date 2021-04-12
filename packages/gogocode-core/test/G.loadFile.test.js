const $ = require('../index');
const fs = require('fs');
const config = require('./config');
const CODE = `
function test(){
    let a = 1;
    let b = 2;
}
test();
`
const HTML_CODE = `
<script type="text/javascript" src="./test.js"></script>
<div>test</div>
`
const ERROR_CODE  = `function(){ console.log('error')`;

const PATH = './test.js';
const HTML_PATH = './test.html';
const ERROR_CODE_PATH = './error.js';



beforeEach(() => {
    fs.writeFileSync(PATH, CODE);
    fs.writeFileSync(HTML_PATH, HTML_CODE);
    fs.writeFileSync(ERROR_CODE_PATH, ERROR_CODE);
});

afterEach(() => {
    fs.unlinkSync(PATH);
    fs.unlinkSync(HTML_PATH);
    fs.unlinkSync(ERROR_CODE_PATH);
});

test('$.loadFile: js code should not throw error', () => {
    expect(() => {
        $.loadFile(PATH);
    }).not.toThrow();
})

test('$.loadFile: js code should be same', () => {
    const G = $.loadFile(PATH);
    const newG = $(CODE);
    expect(G.generate()).toEqual(newG.generate());
})

test('$.loadFile: non-existent file should throw error', () => {
    expect(() => {
        const G = $.loadFile('./non-existent.js');
    }).toThrow();
})
test('$.loadFile: error code file should throw error', () => {
    const G = $.loadFile(ERROR_CODE_PATH);
    expect(G.error).toEqual('Only correct js / html / vue could be parse successfully, please check the code or parseOptions!');
})

test('$.loadFile: html code should not throw error', () => {
    expect(() => {
        $.loadFile(HTML_PATH, config.html);
    }).not.toThrow();
})

test('$.loadFile: html code should be same', () => {
    const G = $.loadFile(HTML_PATH, config.html);
    const newG = $(HTML_CODE, config.html);
    expect(G.node).toEqual(newG.node);
})
