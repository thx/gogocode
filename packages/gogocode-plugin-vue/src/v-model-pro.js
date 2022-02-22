const scriptUtils = require('../utils/scriptUtils');

const { appendEmitsProp } = scriptUtils;
const nativeInput = ['input', 'textarea', 'select'];

module.exports = function (sourceAst, { gogocode: $ }, options) {
    // 迁移指南: https://v3.cn.vuejs.org/guide/migration/v-model.html
    // 找到 .sync 属性
    // 删除 .sync 属性，使用:title 和 @update:title 替代
    // 不需要将props 里面的 value 替换成modelValue，只需要将v-model="" 替换成 v-model:value=""
    const templateAst = sourceAst.find('<template></template>');
    if (templateAst.length !== 0) {
        templateAst.find('<$_$>').each(function (ast) {
            const attrs = ast.attr('content.attributes') || [];
            attrs.forEach((attr) => {
                let key = attr.key.content;
                const syncIndex = key.indexOf('.sync');
                const compName = (ast.attr('content.name') || '').toLowerCase();
                if (syncIndex > -1) {
                    const mIndex = key.indexOf(':');
                    if (mIndex > -1) {
                        //有 : 代表有参数绑定
                        attr.key.content = `v-model${key.replace('.sync', '')}`;
                    } else {
                        attr.key.content = 'v-model:value';
                    }
                } else {
                    if (key === 'v-model' && nativeInput.indexOf(compName) < 0) {
                        attr.key.content = 'v-model:value';
                    }
                }

                key = attr.key.content;
                if (!attr.value || !attr.value.content) {
                    return;
                }

                const value = attr.value.content;
                attr.value.content = value.replace(`$emit('input',$$$)`, `$emit('update:value',$$$)`);

            });
        });
    }

    //开始处理js逻辑
    const scriptAST = sourceAst.parseOptions && sourceAst.parseOptions.language === 'vue'
        ? sourceAst.find('<script></script>')
        : sourceAst;
    if (scriptAST.length === 0) {
        return scriptAST.root();
    }

    let needAddEmits = false;

    scriptAST.find([`$_$1.$emit('input',$$$)`, `$_$1.$emit("input",$$$)`]).each((fAst) => {
        if (fAst &&
            fAst.node &&
            fAst.node.arguments &&
            fAst.node.arguments.length > 0) {
            const newArg0 = $(`let a = 'update:value'`).node.program.body[0].declarations[0].init;
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
                    needAddEmits = true;
                }
            }

        } else if (fAst.match[0][0].node.type === 'ObjectExpression') {
            const props = fAst.match[0][0].node.properties;
            props.forEach((prop) => {
                if (!prop.key) {
                    return;
                }
                if (prop.key.name === 'value') {
                    needAddEmits = true;
                }
            });
        }

    });

    if (!needAddEmits) {
        return scriptAST.root();
    }

    appendEmitsProp(scriptAST, [`'update:value'`]);

    return scriptAST.root();

};