module.exports = function ({ script, template }, api) {
    if(!template) { return { script, template }; }
    const reg = /\{\{\s*!\s*([^\s\{\}]+)\s*\}\}/g;
    const $ = api.gogocode;
    const newHtml = template.generate().replace(reg, '<tag x-html="{{=$1}}"></tag>')
    const newTemplate = $(newHtml, { parseOptions: { language: 'html' } })
    return { script, template: newTemplate };
};
