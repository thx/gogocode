const code = 
`
const $ = require('../index');
const XXMonitor = require('../monitor');

var a = 1;
var b = 2;

function add() {
    return a + b;
}

const c = add();

function height() {
    return $('#1').height();
}

const h = height();


let xxMonitor = new XXMonitor({
    appId: '123',
    env: 'test',
    userId: '123',
    plugins: ['p1'],
});

xxMonitor.start();

window.addEventListener('load', function () {
    console.log('loaded');
});

function parent(){
    function test(){
        let a = 1;
    }
    const obj = { name: 'test' };
}

parent().test();

const s = 'this is string';
`;
module.exports = code;