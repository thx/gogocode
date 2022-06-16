module.exports = function ({ script, template }, api) {
    if (!template) {
        return { script, template };
    }

    const classNameMap = {
        'mc-iconfont': 'mx5-iconfont',
        clearfix: 'mx5-clearfix',
        'mx-': 'mx5-',
    };

    const classNameKeys = Object.keys(classNameMap);

    template.find(['<$_$></$_$>', '<$_$/>']).each((ast) => {
        const attrs = ast.attr('content.attributes') || [];
        const clsAttr = attrs.find((attr) => attr.key.content === 'class');
        if(clsAttr?.value?.content) {
            classNameKeys.forEach((className) => {
                clsAttr.value.content = clsAttr.value.content.replace(className, classNameMap[className]);
            });
        }
    });
    return { script, template };
};
