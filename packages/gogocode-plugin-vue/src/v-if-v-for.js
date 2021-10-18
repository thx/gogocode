module.exports = function (sourceAst, { gogocode: $ }, options) {
    // 迁移指南: https://v3.cn.vuejs.org/guide/migration/v-if-v-for.html
    // https://v3.cn.vuejs.org/guide/list.html#v-for-%E4%B8%8E-v-if-%E4%B8%80%E5%90%8C%E4%BD%BF%E7%94%A8
    const templateAst = sourceAst.find('<template></template>');
    if (templateAst.length === 0) {
        return sourceAst;
    }
    return templateAst.replace('<$_$1 v-if="$_$2" v-for="$_$3" $$$1>$$$2</$_$1>',
        `<template v-for="$_$3">
      <$_$1 v-if="$_$2" $$$1>$$$2</$_$1>
    </template>`).root();
}