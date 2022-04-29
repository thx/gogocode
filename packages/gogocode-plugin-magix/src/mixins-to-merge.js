const scriptUtils = require('../utils/scriptUtils');
module.exports = function ({ script, template }, api) {
    const mixins = script.find('mixins: $_$0');

    if (!mixins.length) {
        return { script, template };
    }

    mixins.each((res) => {
        const mixinsStr = res.match?.[0]?.[0]?.value;
        if (mixinsStr) {
            script.replace(
                `export default $_$.extend({$$$1})`,
                `export default $_$.extend({$$$1}).merge(...${mixinsStr})`
            );
        }
    });
    return { script, template };
};
