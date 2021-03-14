const { isObject, hasOwn } = require('../util')
// 通过简单ast结构查找ast节点

const recast = require('recast');
const visit = recast.types.visit;
const filterProps = require('./filter-prop.js');
const generate = require('./generate')

let Expando = 'g123o456g789o';

function checkIsMatch(full, partial, extraData, strictSequence) {
    return Object.keys(partial).every((prop) => {
        if (prop == 'body') {
            // 匹配一块代码
            try {
                const bodyContent = partial.body[0] || partial.body.body[0];
                if (bodyContent && bodyContent.expression.name && bodyContent.expression.name.match) {
                    if (bodyContent.expression.name.match(Expando)) {
                        const expandoKey = bodyContent.expression.name.replace(Expando, '') || '0';
                        extraData[expandoKey] = extraData[expandoKey] || [];
                        // 去掉首尾花括号
                        const bodyStr = generate(full.body).slice(1, -2);
                        extraData[expandoKey].push({ node: full.body, value: bodyStr });
                        return true;
                    }
                }
            } catch (e) {
                // console.log(e)
            }
        }
        if (!full || !partial) {
            // full没有
            return false;
        } else if (isObject(partial[prop])) {
            let res = false;
            if (Array.isArray(partial[prop])) {
                // 处理$$$这种情况
                find$$$(partial[prop], full[prop], extraData, strictSequence);
            }
            if (Array.isArray(partial[prop]) && !strictSequence) {
                if (hasOwn(full, prop)) {
                    res = partial[prop].every((p) => {
                        let a = false;
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
                    // 兼容某些情况例如 使用{ $_$: $_$ }匹配{ a() {} }
                    let fullProp = full[prop];
                    if (!fullProp) {
                        if (partial[prop] && partial[prop].name && partial[prop].name.match(Expando)) {
                            fullProp = full;
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
                let extra = {
                    node: full
                };
                const expandoKey = partial[prop].replace(Expando, '') || '0';
                extraData[expandoKey] = extraData[expandoKey] || [];
                if (!full) return;
                
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
                // partial.splice(i, 1);
                // // 存疑🤨
                break;
            }
        }
    })
    if (!key$$$) {
        return;
    }
    const extraNodeList = full.slice(0);
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
}
 
function find(nodeType, structure, strictSequence, deep = 'nn', expando = 'g123o456g789o') {
    const nodePathList = [];
    const matchWildCardList = [];
    let isMatch = false;
    Expando = expando
    visit(this, {
        [`visit${nodeType}`](path) {
            const extraData = {};
            if (deep != 'n' || path.parent.name == 'program') {
                isMatch = checkIsMatch(
                    path.value,
                    structure,
                    extraData,
                    strictSequence
                );
            } else {
                isMatch = false;
            }
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
        }
    });
    return { nodePathList, matchWildCardList };
}
module.exports = { find, visit };
