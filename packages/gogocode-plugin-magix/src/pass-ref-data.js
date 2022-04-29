module.exports = function ({ script, template }, api) {
    if(!template) { return { script, template }; }
    const reg = /\{\{@\s*(\S+)\s*\}\}/g;
    const $ = api.gogocode;
    const newHtml = template.generate().replace(reg, '{{# $1 }}">')
    const newTemplate = $(newHtml, { parseOptions: { language: 'html' } })
    return { script, template: newTemplate };
};
