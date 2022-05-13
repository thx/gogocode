const scriptUtils = require('../utils/scriptUtils');
module.exports = function ({ script, template }, api) {
    if(!script) { return { script, template }; }

    const assign = script.find(['assign($_$0) {}', 'assign: function($_$0) {}'])

    if(!assign.length) {
        scriptUtils.addCodeToLifeCycle(script, 'assign', 'this.set({props})', 'front', 'props');
    }

    return { script, template };
};
