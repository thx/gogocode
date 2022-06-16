module.exports = function ({ script, template }) {
    if(!script) { return { script, template }; }
    script.replace(`import Magix from 'magix'`, `import Magix5 from 'magix5'`);
    script.replace(`const Magix = require('magix')`, `const Magix5 = require('magix5')`);
    script.replace(`let Magix = require('magix')`, `let Magix5 = require('magix5')`);
    script.replace(`Magix`, `Magix5`);
    return { script, template };
};
