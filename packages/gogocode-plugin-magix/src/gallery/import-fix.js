module.exports = function ({ script, template }) {
    if (!script) {
        return { script, template };
    }
    script.replace(`let Base = require('__test__/example')`, `import View from 'magix5-gallery/views/pages/base/demo';`);
    script.replace(`Base.extend($_$)`, `View.extend($_$)`);
    return { script, template };
};
