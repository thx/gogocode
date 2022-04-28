const _ = require('lodash')

/* eslint-disable indent */
module.exports = function (ast) {
    const template = ast.find('<template></template>');

    // vue转换插件会把 :visible.sync 改成 v-model:visible, :visible 和 visible 则保持不变
    // 转换逻辑：
    // for dialog: v-model:visible="x" -> v-model="x"
    // :visible="x" -> :model-value="x" :value="x" -> :model-value="x"
    // visible="x" -> value="x" value="x" -> model-value="x"

    template.find('<$_$></$_$>').each((ast) => {
        const tagName = _.get(ast, `node.content.name`);
        // 是 element 组件
        if (tagName.indexOf('el-') === 0) {
            const attrs = ast.attr('content.attributes') || [];

            attrs.forEach((kv) => {
                const key = _.get(kv, `key.content`);

                if (tagName === 'el-dialog') {
                    switch (key) {
                        case 'visible':
                            kv.key.content = 'model-value';
                            break;
                        case ':visible':
                            kv.key.content = ':model-value';
                            break;
                        case 'v-model:visible':
                            kv.key.content = 'v-model';
                            break;
                        default:
                            break;
                    }
                // el-option 无 v-model 不转换，待补充
                } else if(tagName !== 'el-option') {
                    switch (key) {
                        case 'value':
                            kv.key.content = 'model-value';
                            break;
                        case ':value':
                            kv.key.content = ':model-value';
                            break;
                        case 'v-model:value':
                            kv.key.content = 'v-model';
                            break;
                        default:
                            break;
                    }
                }
                
            });
        }
    });

    return ast;
};
