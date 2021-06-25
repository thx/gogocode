const scriptUtils = require('../utils/scriptUtils');

const code = `
function inheriltClassAndStyle() {
  const attrs = this.$attrs;
  attrs.class && this.$el.classList.add(attrs.class);
  attrs.style &&
    Object.entries(attrs.style).forEach(([k, v]) => {
      this.$el.style[k] = v;
    });
}`;
module.exports = function (ast) {
    const script = ast.find('<script></script>');

    if (script.has(`inheritAttrs: false`)) {
        const importStatements = script.find([
            `import $$$1 from '$_$1'`,
            `import { $$$1 } from '$_$1'`,
            `import * as $_$ from '$_$1'`
        ]);

        if (importStatements.length) {
            importStatements.eq(importStatements.length - 1).after(code);
        } else {
            script.prepend(code);
        }

        scriptUtils.addCodeToLifeCycle(
            script,
            'mounted',
            `inheriltClassAndStyle.call(this);`
        );
    }
    return ast;
};
