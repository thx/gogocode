module.exports = function ({ script, template }) {
    if(!script) { return { script, template }; }
    return { script: script.replace(`import Magix from 'magix'`, `import Magix from 'magix5'`), template };
};
