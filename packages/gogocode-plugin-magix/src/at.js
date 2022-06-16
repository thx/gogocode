module.exports = function ({ script, template }, api) {
    const $ = api.gogocode;
    const reg = /'(\S*)@(\S+)'/g;
    const regDoubleQuote = /"(\S*)@(\S+)"/g;

    let newScript, newTemplate;
    if (script) {
        const newCode = script.generate().replace(reg, `'$1@:$2'`).replace(regDoubleQuote, `"$1@:$2"`);
        newScript = $(newCode);
    }

    if (template) {
        const newHTML = template.generate().replace(reg, `'$1@:$2'`).replace(regDoubleQuote, `"$1@:$2"`);
        newTemplate = $(newHTML, { parseOptions: { language: 'html' } });
    }

    return { script: newScript, template: newTemplate };
};
