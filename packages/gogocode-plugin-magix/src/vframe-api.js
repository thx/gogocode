module.exports = function ({ script, template }) {
    if(!script) { return { script, template }; }

    ['this', 'that', 'me'].forEach(thisName => {
        script.replace(`$('#' + ${thisName}.id);`, `$(${thisName}.root)`)
        script.replace(`$(\`#\${${thisName}.id}\`);`, `$(${thisName}.root)`)
        script.replace(`Vframe.get($_$1)`, `Vframe.byNode(document.getElementById($_$1))`)
        script.replace(`$_$1.Vframe.get($_$2)`, `$_$1.Vframe.byNode(document.getElementById($_$2))`)
        script.replace(`$_$1.Vframe.get($_$2).$_$3`, `$_$1.Vframe.byNode(document.getElementById($_$2)).$_$3`)
    })

    return { script, template };
};

