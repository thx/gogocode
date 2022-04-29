module.exports = function ({ script, template }, api) {
    const $ = api.gogocode;
    const reg = /'@(\S+)'/g;
    const regDoubleQuote = /"@(\S+)"/g;

    let newScript, newTemplate;
    if (script) {
        const newCode = script.generate().replace(reg, `'@:$1'`).replace(regDoubleQuote, `"@:$1"`);
        newScript = $(newCode);
    }

    if (template) {
        const newHTML = template.generate().replace(reg, `'@:$1'`).replace(regDoubleQuote, `"@:$1"`);
        newTemplate = $(newHTML, { parseOptions: { language: 'html' } });
    }

    return { script: newScript, template: newTemplate };
};
