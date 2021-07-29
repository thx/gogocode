export function $children(instance) {
    function $walk(vnode, children) {
        if (vnode.component && vnode.component.proxy) {
            children.push(vnode.component.proxy)
        } else if (vnode.shapeFlag & (1 << 4)) {
            const vnodes = vnode.children
            for (let i = 0; i < vnodes.length; i++) {
                $walk(vnodes[i], children)
            }
        }
    }
    const root = instance.$.subTree
    const children = []
    if (root) {
        $walk(root, children)
    }
    return children
}
