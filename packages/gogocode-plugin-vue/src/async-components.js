const scriptUtils = require('../utils/scriptUtils');
module.exports = function(ast) {
    const script =
    ast.parseOptions && ast.parseOptions.language === 'vue'
        ? ast.find('<script></script>')
        : ast;
    scriptUtils.addVueImport(script);
    script
        .replace('() => import($_$)', 'Vue.defineAsyncComponent(() => import($_$))')
        .replace(
            `
        () => ({
          component: import($_$1),
          $$$
        })`,
            `
      Vue.defineAsyncComponent({
        loader: () => import($_$1),
        $$$
      })
        `
        );
    return ast;
};
