// 把简单的api转换成ast
// todo await 
const recast = require('recast');
const parse = require('./parse');
const visit = recast.types.visit;
const filterProps = require('./filter-prop.js');

function getSelector(selectorCode, parseOptions, expando) {
    const selector = { nodeType: '', structure: {} };
    if (typeof selectorCode != 'string') {
        // 如果是通过builders造出来的ast结构，比如return语句
        selector.nodeType = selectorCode.type;
        filterProps(selectorCode, selector.structure, '', expando);
        selector.type = selectorCode.type; // 兼容只用type匹配的选择器
        return selector;
    } else {
        selectorCode = selectorCode.replace(/\$_\$/g, expando);
    }
    if (selectorCode.match(/^{((.|\s)+:(.|\s)+)+}$/)) {
        // 如果是对象字面量
        let ast = parse(`var o = ${selectorCode}`);
        ast = ast.program.body[0].declarations[0].init;
        selector.nodeType = 'ObjectExpression';
        filterProps(ast, selector.structure);
        return selector;
    }
    let seletorAst = parse(selectorCode, parseOptions);
    if (seletorAst.program.body.length == 0) {
        // 开头的字符串会被解析成directive
        return {
            nodeType: 'StringLiteral',
            structure: {
                value: selectorCode.slice(1, -1)
            }
        }
    }
    visit(seletorAst, {
        visitExpressionStatement(path) {
            const expression = path.value.expression;
            selector.nodeType = expression.type;
            if (!expression) return;
            filterProps(expression, selector.structure);
            this.abort();
        },
        visitStatement(path) {
            const expression = path.value;
            selector.nodeType = expression.type;
            if (!expression) return;
            filterProps(expression, selector.structure);
            this.abort();
        },
        visitDeclaration(path) {
            const declaration = path.value;
            selector.nodeType = declaration.type;
            if (!declaration) return;
            filterProps(declaration, selector.structure);
            this.abort();
        }
    });

    return selector;
}


module.exports = getSelector;