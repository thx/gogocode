const code = 
`
const $ = require('../index');
const XXMonitor = require('../monitor');

var a = 1;
var b = 2;
a = 3;
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
const car = {
    color: 'red'
};
car.color = 'green';

const arr = [];
arr = [1,2];

const af = () => {
    console.log('this is arrow function' );
}
export sth from '@path/sth'
`;
module.exports = code;