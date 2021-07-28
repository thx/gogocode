
module.exports = function (sourceAst) {
    // 迁移指南: https://v3.cn.vuejs.org/guide/migration/introduction.html#%E7%A7%BB%E9%99%A4-api

    //开始处理js逻辑
    const scriptAST = sourceAst.parseOptions && sourceAst.parseOptions.language === 'vue'
        ? sourceAst.find('<script></script>')
        : sourceAst;

    scriptAST.replace(`Vue.set($_$1,$_$2,$_$3)`, `$_$1[$_$2] = $_$3`);
    scriptAST.replace(`Vue.delete($_$)`, `delete $_$`);

    scriptAST.replace(`this.$set($_$1,$_$2,$_$3)`, `$_$1[$_$2] = $_$3`);
    scriptAST.replace(`this.$delete($_$)`, `delete $_$`);

    return scriptAST.root();

};