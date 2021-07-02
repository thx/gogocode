module.exports =  class NodePath {
    constructor(node, parent, parentPath, get) {
        this.node = node;
        this.parent = parent || null;
        this.parentPath = parentPath || null;
        this.value = node;
        get && (this.get = get)
    }
}