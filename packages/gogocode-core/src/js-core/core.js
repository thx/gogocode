const getSelector = require('./get-selector');
const { find, visit } = require('./find/general');
const parse = require('./parse');
const generate = require('./generate');
const nodeLinkMap = require('./node-link-map');
const buildMap = require('./build-map');

const core = {
    // 通过选择器获取，返回ast片段
    getAstsBySelector(ast, selector, { strictSequence, deep, parseOptions, expando = 'g123o456g789o' } = {}) { 
        //strictSequence作用：
        // 有的时候数组不要求顺序，如{a:$_$}匹配{b:1, a:2}
        // 有的时候需要，如function($_$, $_$)匹配function(a, b) {}
        
        if (!Array.isArray(selector)) {
            selector = [selector];
        }
        let nodePathList = [];
        let matchWildCardList = [];
        const selectorAst = [];
        selector.forEach(item => {
            let sels = getSelector(item, this.parseOptions || parseOptions, expando);
            !Array.isArray(sels) && (sels = [sels])
            sels.forEach(sel => {
                if (!sel.nodeType) {
                    throw new Error('语句类型缺失，请在 https://github.com/thx/gogocode/issues 上提供您的代码样例')
                }
                selectorAst.push(sel);
            })
        })
        const posStrList = [];
        selectorAst.forEach(item => {
            const res = find.call(ast, item.nodeType, item.structure, strictSequence, deep, expando);
            res.nodePathList.forEach((p, i) => {
                const posStr = `${p.node.start},${p.node.end}`;
                if (posStrList.indexOf(posStr) == -1 || item.nodeType.match('Comment')) { // 去重
                    nodePathList.push(p);
                    matchWildCardList.push(res.matchWildCardList[i]);
                    posStrList.push(posStr);
                }
            });
        });
        return {
            nodePathList,
            matchWildCardList,
            pathList: nodePathList,
            extraDataList: matchWildCardList
        };
    },
    getParentListByAst(path) {
        const list = [];
        while(path && path.parentPath) {
            list.push(path.parentPath);
            path = path.parentPath;
        }
        return list
    },
    getPrevAst(path) {
        let parent = path.parentPath;
        while(parent.value && !Array.isArray(parent.value)) {
            path = parent;
            parent = parent.parentPath;
        }
        parent = parent.value;
        if (parent) {
            const index = parent.indexOf(path.node);
            if (index > 0) {
                return parent[index - 1];
            } else return null;
        }
        return null;
    },
    getNextAst(path) {
        let parent = path.parentPath;
        while(parent.value && !Array.isArray(parent.value)) {
            path = parent;
            parent = parent.parentPath;
        }
        parent = parent.value;
        if (parent) {
            const index = parent.indexOf(path.node);
            if (parent[index + 1]) {
                return parent[index + 1];
            } else return null;
        }
        return null;
    },
    hasChildrenSelector(path, childSelector, expando) {
        const childCache = path.__childCache || {};
        for (const childKey in childCache) {
            if (['type', 'directives'].indexOf(childKey) > -1) {
                continue;
            }
            const child = childCache[childKey];
            const { nodePathList } = core.getAstsBySelector(child, childSelector, { deep: 'nn', expando });
            if (nodePathList.length > 0) {
                return true;
            }
        }
    },
    buildAstByAstStr(str, astPatialMap = {}, { isProgram = false, parseOptions } = {}) {
        try {
            let ast;
            try {
                ast = parse(str, parseOptions);
                const program = core.replaceStrByAst(ast, astPatialMap);
                if (program) {
                    if (isProgram) {
                        return program;
                    } else {
                        if (program.program.body.length > 1) {
                            return program.program.body
                        } else if (program.program.body.length == 1) {
                            return program.program.body[0];
                        } else if (program.program.comments && program.program.comments[0]) {
                            return program.program.comments[0];
                        } else if (program.program.directives 
                            && program.program.directives[0]
                            && program.program.directives[0].value 
                            && program.program.directives[0].value.value) {
                            return {
                                type: 'StringLiteral',
                                value: program.program.directives[0].value.value
                            }
                        } else {
                            return program.program
                        }
                    }
                } else {
                    return null;
                }
            } catch(e) {
                if (str.match(/^{(\s|.)+\}$/)) {
                    if (str.match('...') && str.match('=')) {
                        // 解构入参
                        ast = buildMap.DestructuringParam(str)
                    } else {
                        // 对象字面量
                        ast = buildMap.ObjectExpression(str)
                    }
                    return ast;
                } else if (e.message.match('Missing semicolon')) {
                    // 可能是对象属性
                    ast = buildMap.ObjectProperty(str)
                    return ast
                } else if (e.message.match('Leading decorators must be attached to a class declaration')) {
                    // 是decorator
                    ast = buildMap.Decorators(str)
                    return ast
                } else {
                    throw new Error(`buildAstByAstStr failed:${str}`)
                }
            }
        } catch(error) {
            throw new Error(`buildAstByAstStr failed:${str}`)
        }
    },
    replaceStrByAst(ast, astPatialMap = {}) {
        for (let key in astPatialMap) {
            const valueAst = astPatialMap[key];
            const { nodePathList } = core.getAstsBySelector(ast, [
                { type: 'Identifier', name: `$_$${key}$_$` },
                { type: 'StringLiteral', value: `$_$${key}$_$` }
            ]);
            if (nodePathList.length > 0) {
                nodePathList[0].replace(valueAst)
            }
        }
        return ast;
    },
    replaceAstByAst(oldAst, newAst) {
        if (Array.isArray(newAst)) {
            const { arrPath = {}, index } = getArrPath(oldAst);
            if (Array.isArray(arrPath.value) && index > -1) {
                arrPath.value.splice(index, 1, ...newAst);
                return;
            }
        }
        if (newAst.type == 'BlockStatement' && Array.isArray(oldAst.parentPath.value)) {
            const parentNode = oldAst.parentPath.value;
            const oldIndex = parentNode.indexOf(oldAst.node);
            parentNode.splice(oldIndex, 1);
            newAst.body.forEach((replacer, index) => {
                oldAst.parentPath.value.splice(oldIndex + index, 0, replacer)
            })
        } else if (!oldAst.parent && oldAst.node.type == 'File' ) {
            oldAst.node.program.body = [ newAst ]
        } else {
            oldAst.replace(newAst)
        }
    },
    replaceSelBySel(ast, selector, replacer, strictSequence, parseOptions, expando = 'g123o456g789o') {
        // 用于结构不一致的，整体替换
        const { nodePathList, matchWildCardList } = core.getAstsBySelector(ast, selector, { strictSequence, deep: 'nn', parseOptions: this.parseOptions || parseOptions, expando });
        const originReplacer = replacer
        nodePathList.forEach((path, i) => {
            const extra = matchWildCardList[i];
            replacer = originReplacer
            if (typeof replacer == 'function') {
                replacer = replacer(extra, path);
                if (replacer === null) {
                    return;
                }
            }
            if (Object.keys(extra).length > 0 && typeof replacer == 'string') {
                let newReplacer = replacer;
                for(let key in extra) {
                    if (key.match(/\$\$\$/)) {
                        let key$$$ = key.replace(/\$\$\$/, '');
                        key$$$ == '$' && (key$$$ = '');
                        let join = '\n'

                        let wildCardCode = extra[key].map(item => {
                            let codeStr = generate(item);
                            try {
                                // 嵌套replace
                                const childAst = core.buildAstByAstStr(codeStr, {}, { parseOptions });
                                core.replaceSelBySel(childAst, selector, replacer, strictSequence, parseOptions, expando);
                                codeStr = generate(childAst)
                            } catch(e) { // 
                            }
                            nodeLinkMap[item.type] && (join = nodeLinkMap[item.type])
                            return codeStr
                            // 
                        }).join(join)
                        // 不能都用,连接，需要找到$_$

                        if (!wildCardCode) {
                            // 通配符匹配为空时，去掉通配符后面可能出现的逗号
                            newReplacer = newReplacer.replace(new RegExp(`\\$\\$\\$${key$$$}\\s*,`), '')
                        }
                        newReplacer = newReplacer.replace('$$$' + key$$$, wildCardCode.replace(/\$/g,'$$$$'));
                        // 如果wildCardCode存在`$'`，会被命中替换，因此对$进行处理(https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/replace)
                    } else {
                        let realKey = key == '0' ? '' : key;
                        const matchLength = (newReplacer.match(new RegExp(`\\$_\\$${realKey}`, 'g')) || []).length;
                        if (matchLength == extra[key].length) {
                            extra[key].forEach(ext => {
                                newReplacer = newReplacer
                                    .replace(`'$_$${realKey}'`, `'${ext.value}'`)
                                    .replace(`"$_$${realKey}"`, `"${ext.value}"`)
                                    .replace('$_$' + realKey, ext.raw || ext.value);
                            })
                        } else {

                            // 删除代码块外部{},find里前置处理了，不需要在这里做了
                            let wildCardCode = extra[key].map(item => 
                                typeof item.value !== 'object' ? (item.raw || item.value) : ``
                            ).join(', ')

                            let wildCardCodeNoQuot = extra[key].map(item => 
                                typeof item.value !== 'object' ? (item.value) : ``
                            ).join(', ')

                            newReplacer = newReplacer
                                .replace(new RegExp(`'\\$_\\$${realKey}'`, 'g'), `'` + wildCardCodeNoQuot.replace(/\$/g,'$$$$') + `'`)
                                .replace(new RegExp(`"\\$_\\$${realKey}"`, 'g'), `"` + wildCardCodeNoQuot.replace(/\$/g,'$$$$') + `"`)
                                .replace(new RegExp(`\\$_\\$${realKey}`, 'g'), wildCardCode.replace(/\$/g,'$$$$'));
                            // 通过选择器替换ast，返回完整ast
                            // 如果wildCardCode存在`$'`，会被命中替换，因此对$进行处理(https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/replace)
                        }
                    }
                }
                if (!replacer) {
                    core.removePathSafe(path)
                } else {
                    let replacerAst = null;
                    try {
                        replacerAst = core.buildAstByAstStr(newReplacer, {}, { parseOptions });
                    } catch(e) { 
                        //
                    }
                    if (buildMap[path.node.type]) {
                        try {
                            if (buildMap[path.node.type](newReplacer)) {
                                replacerAst = buildMap[path.node.type](newReplacer)
                            }
                        } catch(e) {
                            //
                        }
                    }
                    if (!replacerAst) {
                        throw new Error(`replace failed: ${newReplacer} cannot be parsed!`)
                    }
                    if (replacerAst.expression && replacerAst.expression.type != 'AssignmentExpression' && path.parentPath.name != 'body') {
                        replacerAst = replacerAst.expression
                    }
                    path && core.replaceAstByAst(path, replacerAst);
                }
            } else {
                if (!replacer) {
                    core.removePathSafe(path);
                } else if (typeof replacer == 'string') {
                    let replacerAst = replacer.type ? replacer : core.buildAstByAstStr(replacer, { }, { parseOptions });
                    if (!replacer.type && buildMap[path.node.type]) {
                        try {
                            if (buildMap[path.node.type](replacer)) {
                                replacerAst = buildMap[path.node.type](replacer)
                            }
                        } catch(e) {
                            //
                        }
                    }
                    if (replacerAst.expression && replacerAst.expression.type != 'AssignmentExpression' && path.parentPath.name != 'body') {
                        replacerAst = replacerAst.expression
                    }
                    path && core.replaceAstByAst(path, replacerAst);
                } else {
                    if (replacer[0] && replacer[0].nodePath) {
                        path.replace(replacer[0].nodePath.node)
                    } else {
                        core.replaceAstByAst(path, replacer);
                    }
                }
            }
        });
    },
    insertAstListBefore(path, nodeList) {
        if (!Array.isArray(nodeList)) {
            nodeList = [nodeList]
        }
        for (let i = 0; i< 3; i++) {
            const pNode = path.parentPath;
            if (pNode && pNode.value && Array.isArray(pNode.value)) {
                const index = pNode.value.indexOf(path.value);
                nodeList.reverse().forEach(item => {
                    pNode.value.splice(index, 0, item);
                });
                i = 3
            } else {
                path = pNode;
            }
        }
    },
    insertAstListAfter(path, nodeList) {
        if (!Array.isArray(nodeList)) {
            nodeList = [nodeList]
        }
        for (let i = 0; i< 3; i++) {
            const pNode = path.parentPath;
            if (pNode && pNode.value && Array.isArray(pNode.value)) {
                const index = pNode.value.indexOf(path.value) + 1;
                nodeList.reverse().forEach(item => {
                    pNode.value.splice(index, 0, item);
                });
                i = 3
            } else {
                path = pNode;
            }
        }
    },
    removeAst(ast, selector, { strictSequence, parseOptions, expando } = {}) {
        if (!ast || typeof ast !== 'object') {
            throw new Error('remove failed! first argument mast be object')
        }
        if (!selector || (typeof selector !== 'object' && typeof selector !== 'string' && !Array.isArray(selector))) {
            throw new Error('remove failed! first argument mast be object、string or string array')
        }
        // const selectorAst = getSelector(selector, this.parseOptions);
        // console.log(selectorAst)
        const { nodePathList } = core.getAstsBySelector(ast, selector, { strictSequence, parseOptions, expando })
        // const { nodePathList } = find.call(ast, selectorAst.nodeType, selectorAst.structure, true, 'nn');
        // console.log(nodePathList)
        nodePathList.forEach(path => {
            // 多条语句逗号分割的话，只删除一个；一条语句的话，删除父节点
            if ((!path.parentPath.value.length) || path.parentPath.value.length == 1) {
                core.removePathSafe(path.parent);
            } else {
                core.removePathSafe(path)
            }
        });
    },
    remove(path) {
        try {
            core.removePathSafe(path)
        } catch(e) {
            throw `remove failed: ${e}`
        }
    },
    removePathSafe(path) {
        // 对于expression 删除之后，父节点 expressionStatement 还在，输出会多个分号。所以应该删除 expressionStatement
        if (path.name == 'expression') {
            path.parent.replace();
        } else {
            path.replace();
        }
    },
    appendJsxAttr(ast, obj) {
        if (!ast || typeof ast !== 'object') {
            throw new Error('appendJsxAttr failed! first argument mast be object')
        }
        if (!obj || typeof obj !== 'object') {
            throw new Error('appendJsxAttr failed! second argument mast be object')
        }
        const attrs = [];
        for (let o in obj) {
            attrs.push(`${o}=${obj[o]}`.replace(/'\$'/g, "$"));
        }
        try {
            const jsxPartial = core.buildAstByAstStr(`<div ${attrs.join(' ')}></div>`);
            const newAttrs = jsxPartial.expression.openingElement.attributes;
            if (ast.value) {
                ast.value.openingElement.attributes = ast.value.openingElement.attributes.concat(newAttrs);
            } else {
                ast.expression.openingElement.attributes = ast.expression.openingElement.attributes.concat(newAttrs);
            }
            
        } catch(e) {
            throw new Error('appendJsxAttr failed!' + e)
        }
        
    },
    visit() {
        visit.call(this, ...Array.from(arguments));
    },
    traverse(node, cb, parentNode) {
        if(!node || typeof node !== 'object'){
            throw new Error('traverse failed! first argument mast be object')
        }
        if(!cb || typeof cb !== 'function'){
            throw new Error('traverse failed! second argument mast be function')
        }
        if (node.type && typeof node.type == 'string') {
            // 是一个ast节点,且不是token
            if (['File', 'Program'].indexOf(node.type) == -1) {
                cb(node, { parentNode });
            }
            for (let attr in node) {
                const child = node[attr];
                if (child) {
                    if (Array.isArray(child)) {
                        let i = 0;
                        while(child[i]) {
                            const c = child[i];
                            core.traverse(c, cb, child);
                            i = child.indexOf(c);
                            i++
                        }
                        // child.forEach(c => core.traverse(c, cb, node));
                    } else if (child.type) {
                        core.traverse(child, cb, node);
                    }
                }
            }
        }
    },
    initComment(ast) {
        core.traverse(ast, ((node, {parentNode}) => {
            if (Array.isArray(parentNode)) {
                const index = parentNode.indexOf(node);
                if (index == parentNode.length - 1) {
                    if (node.trailingComments) {
                        node.trailingComments.forEach(comment => {
                            parentNode.push(comment);
                        })
                    }
                }
                if (node.leadingComments) {
                    node.leadingComments.reverse().forEach(comment => {
                        parentNode.splice(index, 0, comment);
                    })
                }
            }
        }))
    },
    removeComments(ast) {
        core.traverse(ast, ((node, {parentNode}) => {
            if (Array.isArray(parentNode)) {
                if (!parentNode.every(item => typeof item.type == 'string' && item.type.match('Comment'))) {
                    let i = 0;
                    while (parentNode[i]) {
                        const node = parentNode[i];
                        if (node && typeof node.type == 'string' && node.type.match('Comment')) {
                            parentNode.splice(i, 1);
                            i--
                        }
                        i++
                    }
                }
            }
        }))
    }
}
function getArrPath(path) {
    let arrPath = path
    if (!arrPath) return;
    let lastNode = path.node;
    let i = 0;
    while(!Array.isArray(arrPath.value) && i < 3) {
        lastNode = arrPath.node;
        arrPath = arrPath.parentPath;
        i++
    }
    if (Array.isArray(arrPath.value)) {
        return { arrPath: arrPath, index : arrPath.value.indexOf(lastNode) }
    } else {
        return { arrPath: {}, index: -1 };
    }
}
module.exports = core;