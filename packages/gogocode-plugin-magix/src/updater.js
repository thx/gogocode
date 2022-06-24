module.exports = function ({ script, template }) {
    if(!script) { return { script, template }; }
    ['this', 'that', 'me'].forEach(thisName => {
        script.replace(`let $_$1 = ${thisName}.updater;`, `let $_$1 = ${thisName};`)
        script.replace(`const $_$1 = ${thisName}.updater;`, `const $_$1 = ${thisName};`)
        script.replace(`${thisName}.updater.snapshot()`, ``)
        script.replace(`${thisName}.updater.altered()`, `true`)
        script.replace(`${thisName}.updater.$_$`, `${thisName}.$_$`)
    })        
    

    return {script, template}
};
