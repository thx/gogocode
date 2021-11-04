const { escapeRegExp } = require('../util');
module.exports = (ast, transformMap = {}, filePath, deleteComment) => {
    if (ast.nodeType) {
        handleNode(ast)
    } else if (ast.content && ast.content.children && ast.content.children.length > 0) {
        traversChildnode(ast.content.children);
    }
    if (Array.isArray(ast)) {
        ast.forEach(a => { 
            handleNode(a)
        });
    }
    function handleNode(node) {
        const posIndex = node.parentRef && node.parentRef.content.children && Array.isArray(node.parentRef.content.children)
            ? node.parentRef.content.children.indexOf(node)
            : undefined;
            
        const extra = {
            document: ast,
            nodeRef: node,
            posIndex,
            parentRef: node.parentRef,
            filePath
        }
        if (node.nodeType == 'tag' || node.nodeType == 'script') {  // 标签处理
            // 属性处理
            const attrs = node.content.attributes || [];
            const attrMap = {};
            
            attrs.forEach(attr => {
                // 处理属性值的引号
                // let content = attr.value.content.trim();
                // if (content[0] == content[content.length - 1]) {
                //     if (content.match(content[0]))
                // }
                attrMap[attr.key.content] = attr;
            });

            const tagHandle = transformMap.tag || [];
            tagHandle.forEach(h => {
                if (h.value) {
                    if (h.value == node.content.name) {
                        h.handle(node.content, Object.assign({ attrs, attrMap }, extra));    
                    }
                } else {
                    h.handle(node.content, Object.assign({ attrs, attrMap }, extra));
                }
            });

            const attrHandle = transformMap.attr || [];
            
            attrHandle.forEach(h => {
                const { key, value } = h;
                if (value) { // 某个属性有确定的key和value)
                    if (attrMap[key] && attrMap[key].value && (attrMap[key].value.content.replace(/\s/g, '') == value)) {
                        h.handle(node.content, 
                            Object.assign({ attrs, attrMap }, extra)
                        );
                    }
                } else if (key) {
                    if (attrMap[key]) { // 只要有某个属性
                        h.handle(node.content, 
                            Object.assign({ attrs, attrMap }, extra)
                        );
                    }
                } else {
                    h.handle(node.content, 
                        Object.assign({ attrs, attrMap }, extra)
                    );
                }
                
            });

            const eventHandle = transformMap.event || [];
            const attrKeys = Object.keys(attrMap);
            const eventAttr = attrKeys.filter(k => k.match('mx-'))[0];
            if (eventAttr) {
                eventHandle.forEach(h => {
                    h.handle(node.content, 
                        Object.assign({ }, extra)
                    );
                });
            }

            if (transformMap.abandonAttr) {
                for (let i = 0; i< attrs.length; i++) {
                    const attr = attrs[i];
                    if (attr && transformMap.abandonAttr.indexOf(attr.key.content) > -1) {
                        attrs.splice(i, 1);
                        i--;
                    }
                }
            }
        } else if (node.nodeType == 'text') { // 字符串处理
            const handle = transformMap.text || [];
            handle.forEach(h => {
                let isContain = false;
                switch (h.type) {
                case 'containOne':
                    isContain = h.value.some(v => node.content.value.content.match(escapeRegExp(v)))
                    if (isContain) {
                        h.handle(node, extra);
                    }
                    break;
                case 'containAll':
                    isContain = h.value.every(v => node.content.value.content.match(escapeRegExp(v)))
                    if (isContain) {
                        h.handle(node, extra);
                    }
                    break;
                case 'equal': 
                    if (node.content.value.content == h.value) {
                        h.handle(node, extra);
                    }
                    break;
                default:
                    h.handle(node, extra)
                }
            });
        } else {
            // 其他节点类型
            const handle = transformMap[node.nodeType];
            handle && handle.forEach(h => {
                h.handle(node, extra);
            })

            if (deleteComment && node.nodeType == 'comment') {
                // 删除所有注释
                extra.parentRef.content.children.splice(extra.posIndex, 1)
            }
        }

        if (node.content.children && node.content.children.length) {
            traversChildnode(node.content.children)
        }
    }
    function traversChildnode(list) {
        let index = 0;
        while(list[index]) {
            const node = list[index];
            node._index = index;
            node.reached || handleNode(node);
            node.reached = true;
            index++;
        }
        list.forEach(item => item.reached = false)
    }
    return ast;
}