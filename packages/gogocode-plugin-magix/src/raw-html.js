module.exports = function ({ script, template }, api) {
    const reg = /\{\{!\s*(\S+)\s*\}\}/g;
    const $ = api.gogocode;
    const newHtml = template.generate().replace(reg, '<tag x-html="{{=$1}}">')
    const newTemplate = $(newHtml, { parseOptions: { language: 'html' } })
    return { script, template: newTemplate };
};
