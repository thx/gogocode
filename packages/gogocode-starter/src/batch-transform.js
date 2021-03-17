/**
 * 读取js文件，利用gogocode 修改代码 
 * https://gogocode.io/
 */
const glob = require('glob');
const $ = require('gogocode');

glob('./code/**/*.js', function (err, files) {
   
    files.forEach(function (file) {
        rewrite(file);
    })
    
})
function rewrite(filePath) {
    const G = $.loadFile(filePath);
    if (G) {
        G.replace(`var $_$ = console.log()`, `var $_$ = void 0`);
        const code = G.generate();
        $.writeFile(code, filePath);
    }
}