const parse = require('./parse');
module.exports = {
    ObjectExpression(str) {
        return parse(`var o = ${str}`).program.body[0].declarations[0].init;
    },
    DestructuringParam(str) {
        return parse(`(${str}) => {}`).program.body[0].expression.params[0];
    },
    ObjectProperty(str) {
        return parse(`({${str}})`).program.body[0].expression.properties[0]
    },
    ObjectMethod(str) {
        return parse(`({${str}})`).program.body[0].expression.properties[0]
    },
    Decorators(str) {
        return parse(
            `${str}
            class A {}`)
            .program.body[0].decorators;
    },
    ClassMethod(str) {
        return parse(`class a$ {
            ${str}
        }`).program.body[0].body.body[0]
    },
    ClassProperty(str) {
        return parse(`class a$ {
            ${str}
        }`).program.body[0].body.body[0]
    }
}
