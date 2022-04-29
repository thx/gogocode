module.exports = function ({ script, template }) {
    script.replace('this.updater.$_$', 'this.$_$')
    return {script, template}
};
