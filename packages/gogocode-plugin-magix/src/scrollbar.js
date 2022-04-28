module.exports = function (ast) {
    const template = ast
        .find('<template></template>')
    const script = ast.parseOptions && ast.parseOptions.language === 'vue' ? ast.find('<script></script>') : ast;

    let scrollBarRefNameList = []
    template
        .find(`<el-scrollbar ref="$_$1"></el-scrollbar>`)
        .each(item => {
            scrollBarRefNameList.push(item.match[1][0].value)
        })
    scrollBarRefNameList.forEach(refName => {
        script.find(['$_$1.wrap', '$_$1["wrap"]'])
            .each(item => {
                if (item.match[1][0].value.match(refName)) {
                    item.replaceBy(`${item.match[1][0].value}.wrap$`)
                }
            })
    })

    return ast
}