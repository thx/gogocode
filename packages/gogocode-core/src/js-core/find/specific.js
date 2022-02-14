const generate = require('../generate')
module.exports = function handleSpecific({ full, partial, prop, extraData, Expando, find$$$ } = {}) {
    let specific, result;
    if (prop == 'body') {
        // 匹配一块代码
        try {
            let bodyContent = partial.body;
            if (Array.isArray(partial.body)) {
                bodyContent = partial.body[0] || partial.body.body[0];
            } else if (partial.body && partial.body.body) {
                bodyContent = partial.body.body[0]
            }
            let name = ''
            if (bodyContent) {
                name = bodyContent.expression ? bodyContent.expression.name : bodyContent.name ? bodyContent.name : ''
            }
            if (name && name.match) {
                if (name.match(Expando)) {
                    const expandoKey = name.replace(Expando, '') || '0';
                    extraData[expandoKey] = extraData[expandoKey] || [];
                    // 去掉首尾花括号
                    let bodyStr = generate(full.body) || '';
                    if (bodyStr.trim()[0] == '{') {
                        bodyStr = bodyStr.slice(1, -2);
                    }
                    extraData[expandoKey].push({ node: full.body, value: bodyStr });
                    specific = 'body';
                    result = true;
                }
            }
        } catch (e) {
            // console.log(e)
        }
    }
    if (partial && partial.typeName && !partial.typeParameters) {
        if (partial.typeName.name.match(Expando)) {
            specific = 'TypeAnnotation';
            const expandoKey = partial.typeName.name.replace(Expando, '') || '0';
            extraData[expandoKey] = extraData[expandoKey] || [];
            extraData[expandoKey].push(full);
            result = true;
        }
    }
    if (prop == 'specifiers') {
        if ((!full[prop] || full[prop].length == 0) && partial[prop].length > 0) {
            specific = 'specifiers',
            result = false;
        }
    }
    return { specific, result }
}