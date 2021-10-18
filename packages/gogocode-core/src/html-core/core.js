const getSelector = require('./get-selector');
const { find } = require('./find');
const parse = require('./parse');
const generate = require('./serialize-node');
const core = {
    // 通过选择器获取，返回ast片段
    getAstsBySelector(
        ast,
        selector,
        { strictSequence, deep, parseOptions, expando = 'g123o456g789o' } = {}
    ) {
        //strictSequence作用：
        // 有的时候数组不要求顺序，如{a:$_$}匹配{b:1, a:2}
        // 有的时候需要，如function($_$, $_$)匹配function(a, b) {}

        if (!Array.isArray(selector)) {
            selector = [selector];
        }
        let nodePathList = [];
        let matchWildCardList = [];
        const selectorAst = selector.map((item) => {
            const sel = getSelector(
                item,
                this.parseOptions || parseOptions,
                expando
            );
            if (!sel.nodeType) {
                throw new Error(
                    '语句类型缺失，请在 https://github.com/thx/gogocode/issues 上提供您的代码样例'
                );
            }
            return sel;
        });
        // const posStrList = [];
        const reachedNodeList = [];
        selectorAst.forEach((item) => {
            const res = find.call(
                ast,
                item.nodeType,
                item.structure,
                strictSequence,
                deep,
                expando
            );
            res.nodePathList.forEach((p, i) => {
                // let posStr = '';
                // if (p.node.content.openStart) {
                //     posStr = `${p.node.content.openStart.startPosition},${p.node.content.openEnd.endPosition}`;
                // } else if (p.node.content.value) {
                //     posStr = `${p.node.content.value.startPosition},${p.node.content.value.endPosition}`;
                // }
                // if (posStrList.indexOf(posStr) == -1) {
                //     // 去重
                //     nodePathList.push(p);
                //     matchWildCardList.push(res.matchWildCardList[i]);
                //     posStrList.push(posStr);
                // }
                if (reachedNodeList.indexOf(p.node.content) == -1) {
                    nodePathList.push(p);
                    matchWildCardList.push(res.matchWildCardList[i]);
                    reachedNodeList.push(p.node.content)
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
        while (path && path.parentPath) {
            list.push(path.parentPath);
            path = path.parentPath;
        }
        return list;
    },

    buildAstByAstStr(
        str,
        astPatialMap = {},
        { isProgram = false, parseOptions } = {}
    ) {
        try {
            const ast = parse(str, parseOptions);
            const program = core.replaceStrByAst(ast, astPatialMap);
            if (program) {
                if (isProgram) {
                    return program;
                } else {
                    if (program.content.children && program.content.children[0]) {
                        if (program.content.children.length > 1) {
                            return program.content.children
                        } else if (program.content.children.length == 1) {
                            return program.content.children[0];
                        } else {
                            return null
                        }
                    }
                }
            } else {
                return null;
            }
        } catch (e) {
            console.log('buildAstByAstStr failed:' + e);
        }
    },
    replaceStrByAst(ast, astPatialMap = {}) {
        for (let key in astPatialMap) {
            const valueAst = astPatialMap[key];
            const { nodePathList } = core.getAstsBySelector(
                ast,
                `'$_$${key}$_$'`
            );
            if (nodePathList.length > 0) {
                nodePathList[0].replace(valueAst);
            }
        }
        return ast;
    },
    replaceAstByAst(oldAst, newAst, _index) {
        if (oldAst.parent && oldAst.parent.node && oldAst.parent.node.content) {
            oldAst.parent.node.content.children.splice(
                _index,
                1,
                newAst
            );
        } else if (oldAst.node.nodeType == 'document') {
            oldAst.node.content.children = [newAst];
        }
    },
    replaceSelBySel(
        ast,
        selector,
        replacer,
        strictSequence,
        parseOptions,
        expando = 'g123o456g789o'
    ) {
        // 用于结构不一致的，整体替换
        if (ast.node) {
            ast = ast.node;
        }
        const { nodePathList, matchWildCardList } = core.getAstsBySelector(
            ast,
            selector,
            {
                strictSequence,
                deep: 'nn',
                parseOptions: this.parseOptions || parseOptions,
                expando
            }
        );
        const originReplacer = replacer;
        nodePathList.forEach((path, i) => {
            const extra = matchWildCardList[i];
            replacer = originReplacer;
            if (typeof replacer == 'function') {
                replacer = replacer(extra, path);
            }
            if (Object.keys(extra).length > 0 && typeof replacer == 'string') {
                let newReplacer = replacer;
                for (let key in extra) {
                    if (key.match(/\$\$\$/)) {
                        let key$$$ = key.replace(/\$\$\$/, '');
                        key$$$ == '$' && (key$$$ = '');
                        let join = '\n';

                        let wildCardCode = extra[key]
                            .map((item) => {
                                let codeStr = '';
                                if (item.key) {
                                    if (item.value) {
                                        codeStr = `${item.key.content}="${item.value.content}"`;
                                    } else {
                                        codeStr = item.key.content;
                                    }
                                } else if (item.nodeType == 'text') {
                                    codeStr = item.content.value.content;
                                } else if (item.nodeType == 'tag') {
                                    codeStr = generate(item);
                                }
                                try {
                                    // 嵌套replace
                                    const childAst = core.buildAstByAstStr(
                                        generate(item), {}, { isProgram: true }
                                    );
                                    core.replaceSelBySel(
                                        childAst,
                                        selector,
                                        replacer,
                                        strictSequence,
                                        parseOptions,
                                        expando
                                    );
                                    codeStr = generate(childAst);
                                } catch (e) {
                                    //
                                }
                                return codeStr;
                            })
                            .join(join);
                        // 不能都用,连接，还是需要找到$_$
                        newReplacer = newReplacer.replace(
                            '$$$' + key$$$,
                            wildCardCode
                        );
                    } else {
                        let wildCardCode = extra[key][0].value;
                        key == '0' && (key = '');
                        newReplacer = newReplacer
                            .replace(new RegExp(`\\$_\\$${key}`, 'g'), wildCardCode);
                        // 通过选择器替换ast，返回完整ast
                    }
                }
                core.replace(path, newReplacer)
            } else {
                core.replace(path, replacer)
            }
        });
    },
    replace(oldPath, newReplacer) {
        let parentContent, index, isDoc, newNodes;
        if (oldPath.node.nodeType == 'document') {
            isDoc = true;
        } else {
            parentContent = oldPath.parent.node.content.children || [];
            index = parentContent.indexOf(oldPath.node);
        }
        if (!newReplacer) {
            // 删除节点
            if (index > -1) {
                if (isDoc) {
                    oldPath.node.content.children = []
                } else {
                    parentContent.splice(index, 1);
                }
            }
            return;
        } else if (newReplacer.nodeType == 'document') {
            newNodes = newReplacer.content.children || []
        } else if (typeof newReplacer == 'string') {
            // 通过字符串解析为node
            if (index > -1) {
                newNodes = core.buildAstByAstStr(
                    newReplacer,
                    {},
                    { isProgram: true }
                ).content.children;
            }
        } else if (newReplacer[0] && newReplacer[0].nodePath) {
            // AST实例
            newNodes = [newReplacer.node]
        } else if (newReplacer.type) {
            // AST node
            newNodes = [newReplacer]
        }
        if (isDoc) {
            oldPath.node.content.children = newNodes
        } else {
            newNodes.forEach(newNode => {
                newNode.parentRef = oldPath.parent.node;
                parentContent.splice(index, 1, newNode);
            })
        }
    },
    removeAst(ast, selector, { strictSequence, parseOptions, expando } = {}) {
        if (!ast || typeof ast !== 'object') {
            throw new Error('remove failed! first argument mast be object');
        }
        if (
            !selector ||
            (typeof selector !== 'object' &&
                typeof selector !== 'string' &&
                !Array.isArray(selector))
        ) {
            throw new Error(
                'remove failed! first argument mast be object、string or string array'
            );
        }
        // const selectorAst = getSelector(selector, this.parseOptions);
        // console.log(selectorAst)
        const { nodePathList } = core.getAstsBySelector(ast, selector, {
            strictSequence,
            parseOptions,
            expando
        });
        // const { nodePathList } = find.call(ast, selectorAst.nodeType, selectorAst.structure, true, 'nn');
        // console.log(nodePathList)
        nodePathList.forEach((path) => {
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
            });
        } catch (e) {
            throw `remove failed! ${e}`;
        }
    }
};

module.exports = core;
