module.exports = function ({ script, template }) {
    if(!script) { return { script, template }; }

    ['this', 'that', 'me'].forEach(thisName => {
        script.replace(`$('#' + ${thisName}.id);`, `${thisName}.root`)
        script.replace(`$(\`#\${${thisName}.id}\`);`, `${thisName}.root`)
        script.replace(`Vframe.get($_$1)`, `Vframe.byNode(document.getElementById($_$1))`)
    })

    return { script, template };
};

