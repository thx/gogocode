const $ = require('../index');
const less = ($.loadFile('packages/gogocode-core/demo/tryout/input.less')).src;
const html = $.loadFile('packages/gogocode-core/demo/html/input.html', {
    parseOptions: { html: true }
});
const res = html.append(`<style>\n${less}\n</style>`).generate();
$.writeFile(res, 'packages/gogocode-core/demo/html/output.html');
const argKeys = [
    'color',
    'make',
    'model',
    'year',
    'miles',
    'bedliner',
    'alarm'
];
const argObj = {};
const result = $(`
const moment = require('moment')
    var aa = 1;
    const bb = 2;
    function log (x, y = 'World') {
        console.log(x, y);
    }
    import a from 'a';
    console.log('get A');
    var b = console.log();
    console.log.bind();
    var c = console.log;
    console.log = func;

    import car from 'car';

    const suv = car.factory('white', 'Kia', 'Sorento', 2010, 50000, null, true);
    const truck = car.factory(
        'silver',
        'Toyota',
        'Tacoma',
        2006,
        100000,
        true,
        true
    );
`)
    .replace('const $_$ = require($_$)', 'import $_$ from $_$')
    // .find(`function $_$() {}`)
    .find('var aa = $_$')
    .attr('declarations.0.id.name', 'c')
    .root()
    .replace(`var $_$ = console.log()`, `var $_$ = void 0`)
    .replace(`var $_$ = console.log`, `var $_$ = function(){}`)
    .find(`console.log()`)
    .remove()
    .find('const $_$ = car.factory($_$)', { ignoreSequence: true })
    .each((item, i) => {
        const variableName = item.match.shift().value;
        item.match.forEach((match, j) => {
            argObj[argKeys[j]] = item.match[j].value;
        });
        item.replaceBy(
            $(`const ${variableName} = car.factory(${JSON.stringify(argObj)})`)
        );
    })
    .root()
    .generate();
result;

const replacer = $(`function a (am, x, b, {s = 1}) {} var a = 1;
var d = { c: 1, s: 2, m: { c : 'c'}}`).find('b');

const ast = $(`
function a (am, x, bm, {s = 1}) {
    var asa = 1
} 
var a = 1;
var d = { c: 1, s: 2, m: { c : 'c'}}

if (Tryout.TRYOUT_SID_212 && (sceneId === 1 || (Tryout.TRYOUT_SID_305 && sceneId === 4))) {
    curTab = 'new';
    var a = 1
} 

`);
const ifState = ast.find(`if($_$) {$_$}`);

ast.attr('program.body.0.params.0.name');

const attrDemo2 = ast.attr('program.body.0.params.0.name', 'bm');

// ifState.replaceBy($(ifState.node.consequent))

const removeDemo = ifState.remove();

const removeSelDemo = ast.remove(`if($_$) {$_$}`);

const findDemo = ast.find('x');

const hasDemo = ast.find('$_$').has('a');

const replaceDemo = ast.replace('m', replacer).root().generate();

const replaceDemo2 = ast.replace('c', 'b').root().generate();

const eachDemo = ast
    .find('s')
    .each((item, i) => {
        item.replaceBy('b');
    })
    .root()
    .generate();

const replaceByDemo = ast.find('bm').replaceBy(replacer).root().generate();

const eqDemo = ast.find('a').eq(1);

const parentDemo = ast.find('a').parent();

const parentsDemo = ast.find('a').parents();

const siblingsDemo = ast.find('a').siblings();

const nextAllDemo = ast.find('a').nextAll();

const cloneDemo = ast.find('a').clone();

const cloneRootDemo = ast.clone();

const beforeDemo = ast.find('x').before(replacer).root().generate();

const tryout = $(`
    var a = {
        s: 2,
        ss: true,
        cxko: { as: '22'  },
        try: Tryout.TRYOUT_SID_391
    }
`).find(`$_$: $_$`)

const appendDemo = ast
    .find('function $_$() {}')
    .append('body', 'var bbbb = 1;')
    .root()
    .generate();

const prependDemo = ast
    .find('function $_$() {}')
    .prepend('body', 'var cbbbb = 1;')
    .root()
    .generate();

var sc = $(`<script type="text/javascript" src="./test.js">ssss</script>
<div>test</div>`, { parseOptions: { html: true } }).generate()

var a = 1;


