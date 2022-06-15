module.exports = function ({ script, template }) {
    if(!script) { return { script, template }; }
    script.replace(`import View from 'zs_scaffold/view'`, `import View from 'magix5-site/view';`)
    script.replace(`import * as View from '../mx-util/view';`, `import View from '../mx-base/view';`)
    return { script, template };
};

