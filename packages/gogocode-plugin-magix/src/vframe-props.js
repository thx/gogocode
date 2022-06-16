module.exports = function ({ script, template }) {
    if (!template) {
        return { script, template };
    }
    template.find(['<$_$></$_$>', '<$_$ />']).each((res) => {
        res.each((tag) => {
            const tagName = tag.match?.[0]?.[0]?.value || '';
            if (tagName.startsWith('mx-')) {
                const attrs = tag.attr('content.attributes') || [];
                attrs.forEach((attr) => {
                    const keyName = attr?.key?.content || '';
                    if (
                        keyName &&
                        !['src', 'class', 'style', 'id'].includes(keyName) &&
                        !keyName.startsWith('*') &&
                        !keyName.startsWith('mx-')
                    ) {
                        attr.key.content = '*' + keyName;
                    }
                });
            }
        });
    });
    return { script, template };
};
