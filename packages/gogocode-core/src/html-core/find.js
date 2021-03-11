const { isObject, hasOwn } = require('../util')
// 通过简单ast结构查找ast节点
const filterProps = require('./filter-prop.js');
const traverse = require('./html-traverse')
const NodePath = require('../NodePath');

let Expando = 'g123o456g789o';

function checkIsMatch(full, partial, extraData, strictSequence) {
    return Object.keys(partial).every(prop => {
        if (prop == 'children') {
            // 匹配一段代码
            if (partial.children.length == 1
                && partial.children[0].nodeType == 'text'
                && partial.children[0].content.value.content == Expando) {
                extraData.push({ structure: full.children, matcher: Expando })
                return true;
            }
        }
        if (!full || !partial) {
            return false;
        } else
        if (isObject(partial[prop])) {
            let res = false;
            if (Array.isArray(partial[prop]) && !strictSequence) {
                if (hasOwn(full, prop)) {
                    res = partial[prop].every(p => {
                        let a = false;
                        full[prop] && full[prop].forEach(f => {
                            if (checkIsMatch(f, p, extraData, strictSequence)) {
                                a = true;
                            }
                        });
                        return a;
                    });
                } else {
                    res = false;
                }
            } else {
                // todo
                try {
                    res = hasOwn(full, prop) && checkIsMatch(full[prop], partial[prop], extraData, strictSequence);
                } catch (e) {
                    console.log(e)
                }

            }
            return res;
        } else {
            if (partial[prop] == Expando || partial[prop].match(new RegExp(Expando))) {
                let extra = {
                    structure: full,
                    matcher: partial[prop]
                };
                if (!full) return;
                if (full[prop]) {
                    extra.value = full[prop];
                } else {
                    extra.value = {};
                    filterProps(full, extra.value);
                }
                if (partial[prop] == Expando) {
                    extraData.push(extra);
                }
                return true;
            } else if (partial[prop]) {
                // const reg = /^(?:\$\[).*(?=\]\$)/;
            }
            if (prop == 'content') {
                if (partial[prop].trim().match(new RegExp(Expando))) {
                    return true; 
                } else {
                    return full ? !!full[prop].match(partial[prop].trim()) : false;
                }
            } else {
                return full ? full[prop] == partial[prop] : false;
            }
        }
    });
}

function find(nodeType, structure, strictSequence, deep, expando = 'g123o456g789o') {
    Expando = expando
    const nodePathList = [];
    const matchWildCardList = [];
    const traverseMap = {
        tag: nodeType == 'tag' ? [{
            value: structure.content.name == Expando ? '' : structure.content.name,
            handle(tagContent, { attrMap, parentRef, nodeRef } = {}) {
                tagContent, attrMap, parentRef
                const matchWildCard = [];
                let isMatch = checkIsMatch(nodeRef, structure, matchWildCard, strictSequence);
                if (isMatch) {
                    nodePathList.push(linkParentPath(nodeRef));
                    matchWildCardList.push(matchWildCard)
                }
            }
        }] : [],
        attr: [],
        text: nodeType == 'text' ? [{
            value: [(structure.content.trim && structure.content.trim() == Expando || structure.content.value.content.trim() == Expando) ? '' : structure.content.value.content.trim()],
            type: 'containOne',
            handle(node) {
                nodePathList.push(linkParentPath(node));
                matchWildCardList.push(node.content.value.content);
            }
        }]: []
    }
    if (nodeType != 'tag' && nodeType != 'text') {
        traverseMap[nodeType] = [{
            handle(node) {
                nodePathList.push(linkParentPath(node));
                if (node.content.value) {
                    matchWildCardList.push(node.content.value.content);
                }
                
            }
        }]
    }
    traverse(this, traverseMap)
    return { nodePathList, matchWildCardList };
}

function linkParentPath(node) {
    while(node) {
        const pPath = node.parentRef ? linkParentPath(node.parentRef) : null;
        const path = new NodePath(node, pPath, pPath);
        return path;
    }
    return null
}

module.exports = { find };