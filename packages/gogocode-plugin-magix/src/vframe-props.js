module.exports = function ({ script, template }) {
    if(!template) { return { script, template }; }
    template.find(['<mx-vframe></mx-vframe>', '<mx-vframe />']).each((res) => {
        res.each((frameElement) => {
            const attrs = frameElement.attr('content.attributes') || [];
            attrs.forEach((attr) => {
                const keyName = attr?.key?.content || '';
                if (keyName && keyName !== 'src' && !keyName.startsWith('*')) {
                    attr.key.content = '*' + keyName;
                }
            });
        });
    });
    return { script, template };
};
