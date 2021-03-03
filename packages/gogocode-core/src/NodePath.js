module.exports =  class NodePath {
    constructor(node, parent, parentPath) {
        this.node = node;
        this.parent = parent || null;
        this.parentPath = parentPath || null;
        this.value = node;
    }
}