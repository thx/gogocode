const { isObject, hasOwn } = require('../../util')
// 通过简单ast结构查找ast节点

const recast = require('recast-yx');
const visit = recast.types.visit;
const filterProps = require('../filter-prop.js');
const generate = require('../generate')
const handleSpecific = require('./specific');
const strictSequenceAttrList = ['arguments', 'params'];

let Expando = 'g123o456g789o';

function checkIsMatch(full, partial, extraData, strictSequence) {
    return Object.keys(partial).every((prop) => {
        const { specific, result } = handleSpecific({ full, partial, prop, extraData, Expando, find$$$ });
        if (specific) {
            return result;
        }
        if (!full || !partial) {
            // full没有
            return false;
        } else if (isObject(partial[prop])) {
            let res = false;
            let has$$$ = false;
            if (Array.isArray(partial[prop])) {
                // 处理$$$这种情况
                has$$$ = find$$$(partial[prop], full[prop], extraData, strictSequence);
            }
            if (Array.isArray(partial[prop]) && !strictSequence && strictSequenceAttrList.indexOf(prop) == -1) {
                if (hasOwn(full, prop)) {
                    res = partial[prop].every((p) => {
                        let a = false;
                        if (!full[prop].length && partial[prop].length == 1 && has$$$) {
                            return true
                        }
                        full[prop] &&
                            full[prop].forEach((f) => {
                                if (f && f.type == 'ObjectProperty') {
                                    // 兼容 { a: 1 } 匹配 { 'a': 1 } 这种情况
                                    f.key.name && (f.key.value = f.key.name);
                                    f.key.value && (f.key.name = f.key.value);
                                }
                                if (
                                    checkIsMatch(
                                        f,
                                        p,
                                        extraData,
                                        strictSequence
                                    )
                                ) {
                                    a = true;
                                }
                            });
                        return a;
                    });
                } else {
                    res = false;
                }
            } else {
                try {
                    // 例如 使用{ $_$: $_$ }匹配{ a() {} }
                    let fullProp = full[prop];
                    if (!fullProp && !Array.isArray(full)) {
                        if (partial[prop] && typeof partial[prop].name == 'string' && 
                            (partial[prop].name.match(Expando) || partial[prop].name.match(new RegExp(Expando.slice(0, -1) + '\\$3')))
                        ) {
                            if (full.type == 'VariableDeclarator' && prop == 'init' && partial[prop].name.match(Expando)) {
                                // var $_$ = $_$匹配 var a这种;
                                const expandoKey = partial[prop].name.replace(Expando, '') || '0';
                                extraData[expandoKey] = extraData[expandoKey] || [];
                                extraData[expandoKey].push({ node: null, value: null })
                                return true;
                            } else {
                                fullProp = full;
                            }
                            
                        }
                    }
                    res =
                        // hasOwn(full, prop) 
                        // &&
                        checkIsMatch(
                            fullProp,
                            partial[prop],
                            extraData,
                            strictSequence
                        );
                } catch (e) {
                    console.log(e);
                }
            }
            return res;
        } else {
            if (partial[prop].match && partial[prop].match(new RegExp(Expando.slice(0, -1) + '\\$3'))) {
                return true;
            }
            if (partial[prop].match && partial[prop].match(Expando)) {
                if (!full) return;
                let extra = {
                    node: full
                };
                const expandoKey = partial[prop].replace(Expando, '') || '0';
                extraData[expandoKey] = extraData[expandoKey] || [];
                
                switch (full.type) {
                case 'Identifier':
                    extra.value = full.name;
                    break;
                case 'ThisExpression':
                    extra.value = 'this';
                    break;
                case 'StringLiteral':
                    extra.raw = `'${full.value}'`;
                    extra.value = full.value
                    break;
                case 'NumericLiteral':
                case 'BooleanLiteral':
                    extra.value = full.value;
                    break;
                case 'NullLiteral':
                    extra.value = null;
                    break;
                case 'CommentLine':
                case 'CommentBlock':
                    extra.value = full.value;
                    break;
                default:
                    try {
                        extra.value = generate(full);
                    } catch(e) {
                        if (full[prop]) {
                            extra.value = full[prop];
                        } else {
                            extra.value = {};
                            filterProps(full, extra.value);
                        }
                    }
                }
                extraData[expandoKey].push(extra);
                return true;
            } else if (partial[prop]) {
                // const reg = /^(?:\$\[).*(?=\]\$)/;
            }
            if (full && full.type == 'ObjectProperty') {
                // 兼容 { a: 1 } 匹配 { 'a': 1 } 这种情况
                full.key.name && (full.key.value = full.key.name);
                full.key.value && (full.key.name = full.key.value);
            }
            return full ? full[prop] == partial[prop] : false;
        }
    });
}

function find$$$(partial, full, extraData, strictSequence) {
    // 先考虑strctSequence = false的情况
    let key$$$;
    let index$$$ = -1;
    partial.forEach((p, i) => {
        for (const key in p) {
            const value = p[key] ? (p[key].name || p[key].value || p[key]) : null;
            if (value && value.match && value.match(new RegExp(Expando.slice(0, -1) + '\\$3'))) {
                key$$$ = value.replace(new RegExp(Expando.slice(0, -1) + '\\$3'), '') || '$'
                index$$$ = i;
          
                break;
            }
        }
    })
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
 
function find(nodeType, structure, strictSequence, deep = 'nn', expando = 'g123o456g789o') {
    const nodePathList = [];
    const matchWildCardList = [];
    let isMatch = false;
    Expando = expando
    visit(this, {
        [`visit${nodeType}`](path) {
            const extraData = {};
            
            isMatch = checkIsMatch(
                path.value,
                structure,
                extraData,
                strictSequence
            );
            if (isMatch) {
                nodePathList.push(path);
                matchWildCardList.push(extraData);
            }
            switch (deep) {
            case '1':
                this.abort();
                break;
            case 'n':
                return false;
            case 'nn':
                this.traverse(path);
                break;
            default:
                return false;
            }
        },
        visitComment() {
            return false;
        },
    });
    return { nodePathList, matchWildCardList };
}
module.exports = { find, visit };
