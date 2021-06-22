module.exports = function (sourceAst, { gogocode: $ } ,options) {
    /* 迁移指南: https://v3.cn.vuejs.org/guide/migration/watch.html */
    // vue2 https://cn.vuejs.org/v2/guide/list.html#%E6%95%B0%E7%BB%84%E6%9B%B4%E6%96%B0%E6%A3%80%E6%B5%8B
    const scriptAst = sourceAst.find('<script></script>');
    if (scriptAst.length === 0) {
        return sourceAst;
    }
    return scriptAst.find('watch: { $_$ }').each((ast) => {
        const props = ast.attr('value.properties');
        props.forEach((prop) => {
            if (!prop.value || !prop.value.properties) {
                return;
            }
            if (!isWatchObj(prop)) {
                return;
            }
            const innerProps = prop.value.properties;
            const deepProp = innerProps.find(ip => (ip.key.name === 'deep'));
            if (deepProp) {
                deepProp.value = buildDeepProp($).value;
            } else {
                const p = buildDeepProp($);
                innerProps.unshift(p);
            }
        });
    }).root();
};

function isWatchObj(prop) {
    const props = prop.value.properties;
    const fPs = props.filter(p => ( p.key && p.key.name === 'handler'));
    return fPs.length > 0;
}

function buildDeepProp($){
    return $(`const t = {
        deep: true
    }`).attr('program.body.0.declarations.0.init.properties.0');
}
