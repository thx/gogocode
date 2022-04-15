// 把简单的api转换成ast
// todo await 
const recast = require('recast-yx');
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
        selectorCode = selectorCode
            .replace(/\$_\$/g, expando)
            .replace(/\$\$\$/g, expando.slice(0, -1) + '$3')
            .replace(/\/\$_\/\$/g, '$_$')
            .replace(/\/\$\/\$\/\$/g, '$$$$$$')
    }
    if (selectorCode.match(/^{((.|\s)+(:|\(\))(.|\s)+)+}$/)) {
        // 如果是对象字面量
        let ast = parse(`var o = ${selectorCode}`);
        ast = ast.program.body[0].declarations[0].init;
        selector.nodeType = 'ObjectExpression';
        filterProps(ast, selector.structure);
        return selector;
    }
    let seletorAst;
    try {
        seletorAst = parse(selectorCode, parseOptions);
        if (seletorAst.program.body.length == 0) {
            // 开头的字符串会被解析成directive
            if (seletorAst.program.directives.length) {
                return {
                    nodeType: 'StringLiteral',
                    structure: {
                        value: selectorCode ? selectorCode.slice(1, -1) : ''
                    }
                }
            } else if (seletorAst.program.comments.length) {
                let ast = seletorAst.program.comments[0]
                selector.nodeType = ast.type;
                filterProps(ast, selector.structure);
                return selector;
            }
            
        } else if (seletorAst.program.body[0] && seletorAst.program.body[0].type == 'LabeledStatement') {
            throw new Error('Missing semicolon')
        }
    } catch(e) {
        // 可能是对象属性
        try {
            seletorAst = parse(`({${selectorCode}})`, parseOptions);
            seletorAst = seletorAst.program.body[0].expression.properties[0]
        } catch(e) {
            seletorAst = null;
        }
        
        // 可能是类属性
        let clsSelectorAst = null;
        try {
            clsSelectorAst = parse(`class a$_$ { ${selectorCode} }`, parseOptions)
            clsSelectorAst = clsSelectorAst.program.body[0].body.body[0]
        } catch(e) {
            //
        }
        
        const result = [seletorAst, clsSelectorAst]
            .filter(s => !!s)
            .map(sel => {
                const selector = {
                    nodeType: sel.type,
                    structure: {}
                }
                filterProps(sel, selector.structure)
                return selector;
            })
        if (result.length) {
            return result;
        } else {
            throw new Error('parse error!' + e.message);
        }
    }
    visit(seletorAst, {
        visitExpressionStatement(path) {
            const expression = path.value.expression;
            if (!expression) return;
            selector.nodeType = expression.type;
            filterProps(expression, selector.structure);
            this.abort();
        },
        visitStatement(path) {
            const expression = path.value;
            if (!expression) return;
            selector.nodeType = expression.type;
            filterProps(expression, selector.structure);
            this.abort();
        },
        visitDeclaration(path) {
            const declaration = path.value;
            if (!declaration) return;
            selector.nodeType = declaration.type;
            filterProps(declaration, selector.structure);
            this.abort();
        }
    });
    if (selector.nodeType == 'AssignmentExpression') {
        // class中的属性
        try {
            const selectorAstList = [selector]
            const classPropSelector = { nodeType: '', structure: {} };
            const classPropSelectorAst = parse(`class A { ${selectorCode } }`, parseOptions).program.body[0].body.body[0]
            classPropSelector.nodeType = classPropSelectorAst.type;
            filterProps(classPropSelectorAst, classPropSelector.structure);
            selectorAstList.push(classPropSelector);
            return selectorAstList;
        } catch(e) {
            //
        }
    } else if (selector.nodeType == 'MemberExpression') {
        try {
            const selectorAstList = [selector]
            const classPropSelector = { nodeType: '', structure: {} };
            const classPropSelectorAst = parse(`type a = ${selectorCode}`, parseOptions).program.body[0].typeAnnotation.typeName
            classPropSelector.nodeType = classPropSelectorAst.type;
            filterProps(classPropSelectorAst, classPropSelector.structure);
            selectorAstList.push(classPropSelector);
            return selectorAstList;
        } catch(e) {
            // maybe selectorCode = this.xxx
        }
        
    }
    return selector;
}


module.exports = getSelector;