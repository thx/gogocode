const scriptUtils = require('../utils/scriptUtils');
module.exports = function ({ script, template }, api) {

    const init = script.find(['init($_$0) {}', 'init: function($_$0) {}'])

    if(!init.length) {
        scriptUtils.addCodeToLifeCycle(script, 'assign', 'this.set({props})', 'props');
        return { script, template }
    }

    init.each((res) => {
        const propsName = res?.match?.[0]?.[0]?.value;

        const dataSetCodeList = [];
        res.find('$_$0.updater.set($$$0)').each((dataSetAst) => {
            dataSetCodeList.push(dataSetAst.generate());
            dataSetAst.remove();
        });
        scriptUtils.addCodeToLifeCycle(script, 'assign', dataSetCodeList.join('\n'), propsName);
    });
    return { script, template };
};
