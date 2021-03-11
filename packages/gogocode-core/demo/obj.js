const code = `
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
var a = {
    s: 2,
    ss: true,
    cxko: { as: '22'  },
    try: Tryout.TRYOUT_SID_391
}
`

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
const $ = require('../index');
const res = $(code)
    .find(`const $_$1 = car.factory($_$2);`)
    .each(item => {
        const variableName = item.match[1][0].value;
        item.match[2].forEach((match, j) => {
            argObj[argKeys[j]] = match.value;
        });
        item.replaceBy(
            $(`const ${variableName} = car.factory(${JSON.stringify(argObj)})`)
        );
    }).root().generate()

console.log(res)
