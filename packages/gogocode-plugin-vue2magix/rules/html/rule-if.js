module.exports = function (ast) {
    return ast
        .find(`<$_$1 v-if="$_$2"></$_$1>`)
        .each(item => {
            const condition = item.match[2][0].value
            item.before(`{{ if ${condition} }}`)
            item.after('{{ /if }}')
            item.node.content.attributes = item.node.content.attributes
                .filter(attr => {
                    return attr.key.content != 'v-if'
                })
        })
        .root()
};
