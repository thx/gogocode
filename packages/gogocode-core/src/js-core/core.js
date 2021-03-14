const getSelector = require('./get-selector');
const { find, visit } = require('./find');
const parse = require('./parse');
const generate = require('./generate');
const nodeLinkMap = require('./node-link-map')

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
        const selectorAst = selector.map(item => {
            const sel = getSelector(item, this.parseOptions || parseOptions, expando);
            if (!sel.nodeType) {
                throw new Error('语句类型缺失，请联系@叶兮')
            }
            return sel
        })
        selectorAst.forEach(item => {
            const res = find.call(ast, item.nodeType, item.structure, strictSequence, deep, expando);
            const posStrList = [];
            res.nodePathList.forEach((p, i) => {
                const posStr = `${p.node.start},${p.node.end}`;
                if (posStrList.indexOf(posStr) == -1) { // 去重
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
                const ast = parse(str, parseOptions);
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
                    // 对象字面量
                    ast = parse(`var o = ${str}`);
                    ast = ast.program.body[0].declarations[0].init;
                    return ast;
                } else if (e.message.match('Missing semicolon')) {
                    // 可能是对象属性
                    try {
                        ast = parse(`({${str}})`, parseOptions);
                        ast = ast.program.body[0].expression.properties[0]
                        return ast
                    } catch(err) {
                        throw new Error(`buildAstByAstStr failed:${str}`);
                    }
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
        nodePathList.forEach((path, i) => {
            const extra = matchWildCardList[i];
            if (typeof replacer == 'function') {
                replacer = replacer(extra, path);
            }
            if (Object.keys(extra).length > 0 && typeof replacer == 'string') {
                let newReplacer = replacer;
                for(let key in extra) {
                    if (key.match(/\$\$\$/)) {
                        let key$$$ = key.replace(/\$\$\$/, '');
                        key$$$ == '$' && (key$$$ = '');
                        let join = '\n'
                        let wildCardCode = extra[key].map(item => {
                            const codeStr = generate(item);
                            nodeLinkMap[item.type] && (join = nodeLinkMap[item.type])
                            return codeStr
                        }).join(join);
                        // 不能都用,连接，还是需要找到$_$
                        newReplacer = newReplacer.replace('$$$' + key$$$, wildCardCode);
                    } else {
                        // 删除代码块外部{},find里前置处理了，不需要在这里做了
                        let wildCardCode = extra[key].map(item => 
                            typeof item.value !== 'object' ? (item.raw || item.value) : ``
                        ).join(', ');
                        // if (v.structure.type == 'BlockStatement') {
                        //     wildCardCode = wildCardCode.slice(1, -2)
                        // }
                        key == '0' && (key = '')
                        newReplacer = newReplacer
                            .replace(`'$_$${key}'`, wildCardCode)
                            .replace(`"$_$${key}"`, wildCardCode)
                            .replace('$_$' + key, wildCardCode);
                        // 通过选择器替换ast，返回完整ast
                    }
                }
                if (!replacer) {
                    path.replace(null);
                } else {
                    let replacerAst = core.buildAstByAstStr(newReplacer);
                    if (replacerAst.expression && replacerAst.expression.type != 'AssignmentExpression' && path.parentPath.name != 'body') {
                        replacerAst = replacerAst.expression
                    }
                    path && path.replace(replacerAst);
                }
            } else {
                if (!replacer) {
                    path.replace(null);
                } else if (typeof replacer == 'string') {
                    let replacerAst = replacer.type ? replacer : core.buildAstByAstStr(replacer);
                    if (replacerAst.expression && replacerAst.expression.type != 'AssignmentExpression' && path.parentPath.name != 'body') {
                        replacerAst = replacerAst.expression
                    }
                    path && path.replace(replacerAst);
                } else {
                    if (replacer[0] && replacer[0].nodePath) {
                        path.replace(replacer[0].nodePath.node)
                    } else {
                        path.replace(replacer)
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
                path.parent.replace(null);
            } else {
                path.replace(null)
            }
        });
    },
    remove(ast) {
        try {
            ast.replace(null)
        } catch(e) {
            throw `remove failed: ${e}`
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
    traverse(node, cb) {
        if(!node || typeof node !== 'object'){
            throw new Error('traverse failed! first argument mast be object')
        }
        if(!cb || typeof cb !== 'function'){
            throw new Error('traverse failed! second argument mast be function')
        }
        if (node.type && typeof node.type == 'string') {
            // 是一个ast节点,且不是token
            if (['File', 'Program'].indexOf(node.type) == -1) {
                cb(node);
            }
            for (let attr in node) {
                const child = node[attr];
                if (child) {
                    if (Array.isArray(child)) {
                        child.forEach(c => core.traverse(c, cb));
                    } else if (child.type) {
                        core.traverse(child, cb);
                    }
                }
            }
        }
    }
}

module.exports = core;