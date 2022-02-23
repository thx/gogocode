const { isObject, hasOwn, escapeRegExp } = require('../util')
// 通过简单ast结构查找ast节点
const filterProps = require('./filter-prop.js');
const traverse = require('./html-traverse')
const NodePath = require('../NodePath');
const generate = require('./serialize-node');

let Expando = 'g123o456g789o';

function checkIsMatch(full, partial, extraData, strictSequence) {
    return Object.keys(partial).every(prop => {
        if (prop == 'children') {
            // 匹配一段代码
            if (full.children && partial.children.length == 1
                && partial.children[0].nodeType == 'text'
                && (partial.children[0].content.value.content.match 
                )) {
                if (partial.children[0].content.value.content.match(Expando)) {
                    const expandoKey = partial.children[0].content.value.content.replace(Expando, '') || '0';
                    extraData[expandoKey] = extraData[expandoKey] || [];
                    extraData[expandoKey].push({ node: full.children, value: full.children.map(c => generate(c)).join('\n') })
                    return true;
                } else if (partial.children[0].content.value.content.match(new RegExp(Expando.slice(0, -1) + '\\$3'))) {
                    find$$$(partial[prop], full[prop], extraData, strictSequence);
                    return true;
                }
            }
        }
        if (!full || !partial) {
            return false;
        } else if (isObject(partial[prop])) {
            let res = false;
            let has$$$ = false;
            if (Array.isArray(partial[prop])) {
                // 处理$$$这种情况
                has$$$ = find$$$(partial[prop], full[prop], extraData, strictSequence);
            }
            if (Array.isArray(partial[prop]) && !strictSequence) {
                if (hasOwn(full, prop)) {
                    res = partial[prop].every(p => {
                        let a = false;
                        if (!full[prop].length && partial[prop].length == 1 && has$$$) {
                            return true
                        }
                        full[prop] && full[prop].forEach(f => {
                            if (checkIsMatch(f, p, extraData, strictSequence)) {
                                a = true;
                            }
                        });
                        return a;
                    });
                } else {
                    if (partial[prop].length == 1 && has$$$) {
                        return true
                    }
                    return false
                }
            } else {
                // todo
                try {
                    if (partial[prop].type == 'token:attribute-value' && !full[prop]) {
                        if (partial[prop].content.match && partial[prop].content.match(Expando)) {
                            const expandoKey = partial[prop].content.replace(Expando, '') || '0';
                            extraData[expandoKey] = extraData[expandoKey] || [];
                            extraData[expandoKey].push({ node: null, value: null })
                            return true;
                        }
                    }
                    res = hasOwn(full, prop) && checkIsMatch(full[prop], partial[prop], extraData, strictSequence);
                } catch (e) {
                    console.log(e)
                }

            }
            return res;
        } else {
            if (partial[prop].match && partial[prop].match(new RegExp(Expando.slice(0, -1) + '\\$3'))) {
                return true;
            }
            if (partial[prop] == Expando || (partial[prop].match && partial[prop].match(Expando))) {
                let extra = {
                    node: full
                };
                const expandoKey = partial[prop].replace(Expando, '') || '0';
                extraData[expandoKey] = extraData[expandoKey] || [];
                if (!full) return;
                if (full[prop] !== undefined) {
                    extra.value = full[prop] || '';
                } else {
                    extra.value = {};
                    filterProps(full, extra.value);
                }
                extraData[expandoKey].push(extra);
                return true;
            } else if (partial[prop]) {
                // const reg = /^(?:\$\[).*(?=\]\$)/;
            }
            if (prop == 'content') {
                if (partial[prop].trim().match(new RegExp(Expando))) {
                    return true; 
                } else {
                    if (partial.type == 'token:attribute-key') {
                        return full ? full[prop] == partial[prop].trim() : false;
                    }
                    return full ? !!full[prop].match(escapeRegExp(partial[prop].trim())) : false;
                }
            } else {
                return full ? full[prop] == partial[prop] : false;
            }
        }
    });
}

function find$$$(partial, full, extraData, strictSequence) {
    // 先考虑strctSequence = false的情况
    let key$$$;
    let index$$$ = -1;
    let i = 0;
    while(partial[i]) {
        const p = partial[i];
        for (const key in p) {
            // 属性中包含$$$
            let value = '';
            if (p[key] && p[key].value && p[key].value.content) {
                value = p[key].value.content
            } else if (p[key] && p[key].content) {
                value = p[key].content
            }
            if (p.nodeType == 'text') {
                const start = value.indexOf(Expando.slice(0, -1) + '$3')
                if (start > -1 && value.slice(0, start).trim()) {
                    p.content.value.content = value.slice(0, start)
                    partial[i + 1] = {
                        nodeType: 'text',
                        content: {
                            value: {
                                content: value.slice(start),
                                type:'token:text'
                            }
                        }
                    }
                    value = p.content.value.content
                }
            }
            if (value && value.match && value.match(new RegExp(Expando.slice(0, -1) + '\\$3'))) {
                key$$$ = value.match(new RegExp(`(?<=${Expando.slice(0, -1)}\\$3)([0-9]|[a-z]|[A-Z])*`))[0] || '$'
                index$$$ = i;

                break;
            }
        }
        i++
    }
    if (!key$$$) {
        return false;
    }
    const extraNodeList = full ? full.slice(0) : [];
    partial.forEach((p, i) => {
        if (i == index$$$) {
            return;
        }
        let fi = 0;
        while(extraNodeList[fi]) {
            if (checkIsMatch(extraNodeList[fi], p, {}, strictSequence)) {
                extraNodeList.splice(fi, 1);
            } else {
                fi++;
            }
        }
    })
    extraData[`$$$${key$$$}`] = (extraData[`$$$${key$$$}`] || []).concat(extraNodeList);
    return true;
}

function find(nodeType, structure, strictSequence, deep, expando = 'g123o456g789o') {
    const nodePathList = [];
    const matchWildCardList = [];
    let isMatch = false;
    Expando = expando
    const traverseMap = {
        tag: (nodeType == 'tag' || nodeType == 'script') ? [{
            value: (structure.content.name || '').match(Expando) ? '' : structure.content.name,
            handle(tagContent, { attrMap, parentRef, nodeRef } = {}) {
                tagContent, attrMap, parentRef
                const matchWildCard = {};
                isMatch = checkIsMatch(nodeRef, structure, matchWildCard, strictSequence);
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
    if (nodeType != 'tag' && nodeType != 'script' && nodeType != 'text') {
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