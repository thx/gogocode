const scriptUtils = require('../utils/scriptUtils');

const { appendEmitsProp } = scriptUtils;
class EmitSet {
    constructor() {
        this.set = new Set();
    }
    fillEmitSet(ast) {
        ast.find(['$emit($_$,$$$)', '$_$1.$emit($_$,$$$)','$emit($_$)', '$_$1.$emit($_$)']).each((fAst) => {
            if (fAst.match && fAst.match[0] && fAst.match[0].length) {
                let key = fAst.match[0][0].raw;
                if (key === `'input'` || key === `"input"` || key === '`input`') {
                    //https://v3.cn.vuejs.org/guide/migration/v-model.html#%E8%BF%81%E7%A7%BB%E7%AD%96%E7%95%A5
                    key = `'update:value'`;
                }
                this.set.add(key);
            }
        });
    }
    getSet() {
        return this.set;
    }
}
module.exports = function (sourceAst, { gogocode: $ }, options) {
    // 迁移指南: https://v3.cn.vuejs.org/guide/migration/emits-option.html#overview
    let emitSet = new EmitSet();
    
    const templateAst = sourceAst.find('<template></template>');

    if (templateAst.length !== 0) {
        templateAst.find('<$_$>').each(function (ast) {
            const attrs = ast.attr('content.attributes') || [];
            attrs.forEach((attr) => {
                if (!attr.value || !attr.value.content) {
                    return;
                }
                const value = attr.value.content;
                if (value.indexOf('$emit') > -1) {
                    const emitAst = $(value);
                    emitSet.fillEmitSet(emitAst);
                }
            });
        });
    }

    const scriptAST = sourceAst.parseOptions && sourceAst.parseOptions.language === 'vue'
        ? sourceAst.find('<script></script>')
        : sourceAst;

    if (scriptAST.length !== 0) {
        emitSet.fillEmitSet(scriptAST);
        if (emitSet.getSet().size === 0) {
            emitSet = null;
            return sourceAst;
        }

        appendEmitsProp(scriptAST, emitSet.getSet());
   
        emitSet = null;
    }

    return scriptAST.root();
}
