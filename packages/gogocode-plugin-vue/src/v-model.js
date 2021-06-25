const scriptUtils = require('../utils/scriptUtils');

const { appendEmitsProp } = scriptUtils;

module.exports = function (sourceAst, { gogocode: $ }, options) {
    // 迁移指南: https://v3.cn.vuejs.org/guide/migration/v-model.html
    // 找到 .sync 属性
    // 删除 .sync 属性，使用:title 和 @update:title 替代
    const templateAst = sourceAst.find('<template></template>');
    if (templateAst.length !== 0) {
        templateAst.find('<$_$>').each(function (ast) {
            const attrs = ast.attr('content.attributes') || [];
            attrs.forEach((attr) => {
                let key = attr.key.content;
                const syncIndex = key.indexOf('.sync');
                if (syncIndex > -1) {
                    const mIndex = key.indexOf(':');
                    if (mIndex > -1) {
                        //有 : 代表有参数绑定
                        attr.key.content = `v-model${key.replace('.sync', '')}`;
                    } else {
                        attr.key.content = 'v-model';
                    }
                }

                key = attr.key.content;
                if (!attr.value || !attr.value.content) {
                    return;
                }

                const value = attr.value.content;

                if (value.indexOf('value') > -1 && key.indexOf('v-model') > -1) {
                    attr.value.content = value.replace(/value/g, 'modelValue');
                } else {
                    attr.value.content = value.replace(`$emit('input'`, `$emit('update:modelValue'`);
                }
            });
        });
    }
  

    const scriptAST = sourceAst.find('<script></script>');
    if (scriptAST.length === 0) {
        return scriptAST.root();
    }
    let needAddEmits = false;

    scriptAST.find([`$_$1.$emit('input',$$$)`, `$_$1.$emit("input",$$$)`]).each((fAst) => {
        if (fAst &&
            fAst.node &&
            fAst.node.arguments &&
            fAst.node.arguments.length > 0) {
            const newArg0 = $(`let a = 'modelValue'`).node.program.body[0].declarations[0].init;
            fAst.node.arguments[0] = newArg0;
        }
        needAddEmits = true;
    })

    scriptAST.find('{ props:$_$ }').each(fAst => {
        if (!fAst || !fAst.match || !fAst.match[0] || fAst.match[0].length === 0) {
            return;
        }
        if (fAst.match[0][0].node.type === 'ArrayExpression') {

            const arr = fAst.match[0][0].value.replace('[', '').replace(']', '').replace(/\"/g, '\'').split(',');
            for (let i = 0; i < arr.length; i++) {
                if (arr[i] === `'value'`) {
                    arr[i] = `'modelValue'`;
                    needAddEmits = true;
                }
            }
            if (needAddEmits) {
                const emitsArrCode = arr.join(',');
                fAst.replace(`props:$_$`, `props:[${emitsArrCode}]`);
            }
        } else if (fAst.match[0][0].node.type === 'ObjectExpression') {
            const props = fAst.match[0][0].node.properties;
            props.forEach((prop) => {
                if (!prop.key) {
                    return;
                }
                if (prop.key.name === 'value') {
                    prop.key.value = 'modelValue';
                    prop.key.name = 'modelValue';
                }
            });
        }
        
    });

    //replace watch properties which key is 'value'
    scriptAST.find('watch: { $_$ }').each((ast) => {
        const props = ast.attr('value.properties');
        props.forEach((prop) => {
            if (!prop.key || !prop.value || !prop.value.properties) {
                return;
            }
            const innerProps = prop.value.properties;
            const immediateProp = innerProps.find(ip => (ip.key.name === 'immediate'));

            if (immediateProp && prop.key.name === 'value') {
                prop.key.value = 'modelValue';
                prop.key.name = 'modelValue';
            }
        });
    });

    if (!needAddEmits) {
        return scriptAST.root();
    }

    appendEmitsProp(scriptAST,[`'update:modelValue'`]);


    return scriptAST.root();

};