const recast = require('recast-yx');
const visit = recast.types.visit;
module.exports =  class NodePath {
    constructor(node, parent, parentPath) {
        if (!parent && !parentPath && node.program) {
            const nodePath = this;
            visit(node, {
                visitFile(path) {
                    ['node', 'value', 'parent', 'get', 'getValueProperty', '__childCache', '__proto__', 'name'].forEach(key => {
                        nodePath[key] = path[key]
                    })
                    this.abort();
                }
            })
        } else {
            this.node = node;
            this.parent = parent || null;
            this.parentPath = parentPath || null;
            this.value = node;
        }
    }
}