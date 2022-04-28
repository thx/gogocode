module.exports = function ({ script, template }) {
    return { script: script.replace(`import Magix from 'magix'`, `import Magix from 'magix5'`), template };
};
