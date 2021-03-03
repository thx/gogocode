const { buildAstByAstStr } = require('./core');
const generate = require('./generate')
module.exports = {
    buildObject({ properties }) {
        return {
            type: 'ObjectExpression',
            properties
        }
    },
    // buildObjectProperty({a: {b: c: $_$ }});
    // buildObjectProperty({a: 1});
    // buildObjectProperty()
    buildObjectProperty(obj) {
        const res = buildAstByAstStr(`var o = ${JSON.stringify(obj)};`);
        return res.declarations[0].init;
    },
    buildProperty({ key, value, kind = 'init', method = false, shorthand = false }) {
        return {
            type: 'Property',
            key: {
                type: 'Identifier',
                name: key
            },
            value: typeof value == 'string' ? {
                type: 'StringLiteral',
                value: value
            }: value,
            kind,
            method,
            shorthand
        }
    },
    buildJsxAttrValue(obj) {
        const res = generate(buildAstByAstStr(`<div paramObj={'$_$obj$_$'}></div>`, { obj }));
        return res.match(/(?<=:).+(?=})/ig)[0];
    }
}