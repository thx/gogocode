module.exports = function ({ script, template }) {
    if(!script) { return { script, template }; }
    ['this', 'that', 'me'].forEach(thisName => {
        script.replace(`${thisName}.updater.snapshot()`, ``)
        script.replace(`${thisName}.updater.altered()`, `true`)
        script.replace(`${thisName}.updater.$_$`, `${thisName}.$_$`)
    })
    return {script, template}
};
