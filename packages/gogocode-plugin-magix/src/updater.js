module.exports = function ({ script, template }) {
    if(!script) { return { script, template }; }
    ['this', 'that', 'me'].forEach(thisName => {
        script.replace(`let updater = ${thisName}.updater;`, `let updater = ${thisName};`)
        script.replace(`const updater = ${thisName}.updater;`, `const updater = ${thisName};`)
        script.replace(`${thisName}.updater.snapshot()`, ``)
        script.replace(`${thisName}.updater.altered()`, `true`)
        script.replace(`${thisName}.updater.$_$`, `${thisName}.$_$`)
    })        
    

    return {script, template}
};
