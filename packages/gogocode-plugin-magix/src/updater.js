module.exports = function ({ script, template }) {
    if(!script) { return { script, template }; }
    script.replace('this.updater.$_$', 'this.$_$')
    return {script, template}
};
