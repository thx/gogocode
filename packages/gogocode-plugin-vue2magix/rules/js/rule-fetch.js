module.exports = function (ast) {
    return ast
        .find(`$_$1.fetchAll($_$2, $_$3)`)
        .each(item => {
            const param = item.match[2][0].node
            param.elements.forEach(ele => {
                ele.properties.forEach(prop => {
                    if (prop.key.name == 'urlParams') {
                        prop.key.name = 'params'
                    }
                })
            })

        })
        .root()
};
