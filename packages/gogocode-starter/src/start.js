/**
 * gogocode 简单示例
 * https://gogocode.io/
 */
const $ = require('gogocode');

const from = `
import a from 'a';
console.log('get A');
var b = console.log();
console.log.bind();
var c = console.log;
console.log = func;
`;

const output = $(from)
    .replace(`var $_$ = console.log()`, `var $_$ = void 0`)
    .replace(`var $_$ = console.log`, `var $_$ = function(){}`)
    .find(`console.log()`)
    .remove()
    .generate();
console.log(output);

const to = `
import a from 'a';
var b = void 0;
console.log.bind()
var c = function(){};
console.log = func
`;

// output code and to code should be same