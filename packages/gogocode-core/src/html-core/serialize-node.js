const {
    NODE_DOCUMENT,
    NODE_DOCTYPE,
    NODE_TAG,
    NODE_TEXT,
    NODE_COMMENT,
    NODE_SCRIPT,
    NODE_STYLE
} = require('hyntax-yx/lib/constants/ast-nodes')
  
function serializeDoctypeNode (node) {
    let attributes = serializeDoctypeAttributes(node.content.attributes)
  
    if (attributes !== '') {
        attributes = ` ${ attributes }`
    }
  
    return `<!doctype${ attributes }>`
}
  
function serializeCommentNode (node) {
    return `<!--${ node.content.value.content }-->`
}
  
function serializeTagNode (nodeName, attributes, serializedChildren, selfClosing, node) {
    let serializedAttributes = serializeTagAttributes(attributes, node)
  
    if (serializedAttributes !== '') {
        serializedAttributes = ` ${ serializedAttributes }`
    }
    selfClosing = (selfClosing === false ? false : node.content.selfClosing);
    if (selfClosing) {
        return `<${ nodeName }${ serializedAttributes }/>`
    }
  
    return (
        `<${ nodeName }${ serializedAttributes }>` +
      serializedChildren +
      `</${ nodeName }>`
    )
}
  
function serializeTagAttributes (attributes = []) {
    // if (node.content.openEnd.content.replace(/\s/g, '').match('/if')) {
      
    // }
    return attributes.map((item) => {
        let serialized = ''
  
        if (item.key !== undefined) {
            serialized += item.key.content
        }
  
        if (item.value !== undefined) {
        // 处理属性中的引号
            let quota = ['"', '"'];
            if (item.startWrapper && item.startWrapper.content) {
                quota[0] = item.startWrapper.content
            } else {
                quota[0] = ''
            }
            if (item.endWrapper && item.endWrapper.content) {
                quota[1] = item.endWrapper.content
            } else {
                quota[1] = ''
            }
            if (item.value.content && item.value.content.match && item.value.content.match(quota)) {
                quota = ["'", "'"];
            }

            if (item.value.content && item.value.content.trim && item.value.content.trim()[0] == '=') {
                // 处理属性中的if语句{{#if(xx == bb)}}xxx{{/if(xx == bb)}}
                quota = ['', '']
                // serialized += `=${ item.value.content }`
            } else if (item.value.content && item.value.content.match && item.value.content.match(/\(/) && item.value.content.match(/\)/) && item.key.content.match(/\{\{/)) {
                // 处理属性中的function语句{{ = body_updateState(this,crowd) }}
                quota = ['', '']
                // serialized += `=${ item.value.content }`
            }
            serialized += `=${quota[0]}${ item.value.content }${quota[1]}`
        }
  
        return serialized
    }).join(' ')
}
  
function serializeDoctypeAttributes (attributes = []) {
    return attributes.map((item) => {
        let wrapper = ''
  
        if (item.startWrapper !== undefined) {
            wrapper = item.startWrapper
        }
  
        return `${ wrapper }${ item.value.content }${ wrapper }`
    }).join(' ')
}
  
function serializeTextNode (node) {
    return node.content.value.content
}
  
function serializeNode (node, serializedChildren = '') {
    if (node.content && node.content.children && node.content.children.length > 0) {
        serializedChildren = node.content.children.map(child => {
            return serializeNode(child, '');
        }).join('');
    }
    switch (node.nodeType) {
    case NODE_DOCUMENT: {
        return serializedChildren
    }
  
    case NODE_DOCTYPE: {
        return serializeDoctypeNode(node)
    }
  
    case NODE_TAG: {
        return serializeTagNode(
            node.content.name,
            node.content.attributes,
            serializedChildren,
            undefined,
            node
        )
    }
  
    case NODE_TEXT: {
        return serializeTextNode(node)
    }
  
    case NODE_COMMENT: {
        return serializeCommentNode(node)
    }
  
    case NODE_SCRIPT: {
        return serializeTagNode(
            'script',
            node.content.attributes,
            node.content.value ? node.content.value.content : '',
            false,
            node
        )
    }
  
    case NODE_STYLE: {
        return serializeTagNode(
            'style',
            node.content.attributes,
            node.content.value ? node.content.value.content : '',
            false,
            node
        )
    }
  
    default: {
        throw new Error(
            `generate failed! Unexpected node type for serialization: ${ node.nodeType }`
        )
    }
    }
}
  
module.exports = serializeNode