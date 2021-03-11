const getSelector = require('./get-selector');
const { find } = require('./find');
const parse = require('./parse');
const generate = require('./serialize-node');
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
                let posStr = '';
                if (p.node.content.openStart) {
                    posStr = `${p.node.content.openStart.startPosition},${p.node.content.openEnd.endPosition}`;
                } else if (p.node.content.value) {
                    posStr = `${p.node.content.value.startPosition},${p.node.content.value.endPosition}`;
                }
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

    buildAstByAstStr(str, astPatialMap = {}, { isProgram = false, parseOptions } = {}) {
        try {
            const ast = parse(str, parseOptions);
            const program = core.replaceStrByAst(ast, astPatialMap);
            if (program) {
                if (isProgram) {
                    return program;
                } else {
                    if (program.content.children && program.content.children[0]) {
                        return program.content.children[0]
                    }
                }
            } else {
                return null;
            }
        } catch(e) {
            console.log('buildAstByAstStr failed:' + e)
        }
    },
    replaceStrByAst(ast, astPatialMap = {}) {
        for (let key in astPatialMap) {
            const valueAst = astPatialMap[key];
            const { nodePathList } = core.getAstsBySelector(ast, `'$_$${key}$_$'`);
            if (nodePathList.length > 0) {
                nodePathList[0].replace(valueAst)
            }
        }
        return ast;
    },
    replaceAstByAst(oldAst, newAst) {
        if (oldAst.parent && oldAst.parent.node && oldAst.parent.node.content) {
            oldAst.parent.node.content.children.splice(oldAst.node._index, 1, newAst)
        } else if (oldAst.node.nodeType == 'document') {
            oldAst.node.content.children = [newAst];
        }
    },
    replaceSelBySel(ast, selector, replacer, strictSequence, parseOptions) {
        // 用于结构不一致的，整体替换
        if (ast.value && ast.node) {
            ast = ast.value
        }
        const { nodePathList, matchWildCardList } = core.getAstsBySelector(ast, selector, strictSequence, 'nn', this.parseOptions || parseOptions);
        nodePathList.forEach((path, i) => {
            const extra = matchWildCardList[i];
            if (extra.length > 0 && typeof replacer == 'string') {
                let newReplacer = replacer;
                extra.forEach(v => {
                    let wildCardCode = ''
                    // TODO
                    if (Array.isArray(v.structure)) {
                        v.structure.forEach(item => {
                            wildCardCode += ('\n' + generate(item))
                        })
                    } else {
                        wildCardCode = generate(v.structure)
                    }
                    newReplacer = newReplacer.replace('$_$', wildCardCode);
                    // 通过选择器替换ast，返回完整ast
                });
                if (!replacer) {
                    core.replaceAstByAst(path, null)
                } else {
                    let replacerAst = core.buildAstByAstStr(newReplacer);
                    if (replacerAst.expression && replacerAst.expression.type != 'AssignmentExpression') {
                        replacerAst = replacerAst.expression
                    }
                    path && core.replaceAstByAst(path, replacerAst);
                }
            } else {
                if (!replacer) {
                    core.replaceAstByAst(path, null);
                } else if (typeof replacer == 'string') {
                    let replacerAst = replacer.type ? replacer : core.buildAstByAstStr(replacer);
                    if (replacerAst.expression && replacerAst.expression.type != 'AssignmentExpression') {
                        replacerAst = replacerAst.expression
                    }
                    path && core.replaceAstByAst(path, replacerAst);
                } else {
                    if (replacer[0] && replacer[0].nodePath) {
                        core.replaceAstByAst(path, replacer[0].nodePath.node)
                    } else {
                        core.replaceAstByAst(path, replacer)
                    }
                }
            }
        });
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
            const parentChildList = path.parent.node.content.children;
            const index = parentChildList.indexOf(path.node);
            parentChildList.splice(index, 1);
        });
    },
    remove(ast) {
        try {
            ast.node.parentRef.content.children.forEach((item, index) => {
                if (item == ast.node) {
                    ast.node.parentRef.content.children.splice(index, 1);
                }
            })
        } catch(e) {
            throw `remove failed! ${e}`
        }
    },
   
}

module.exports = core;