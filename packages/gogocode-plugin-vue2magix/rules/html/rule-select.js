module.exports = function (ast) {
    const useLessAttrNames = ['data-class', 'bx-search', 'data-searchbox', 
        'bx-name', 'va-required']
    return ast
        .replace(`<select $$$1>$$$2</select>`, `
        <mx-dropdown $$$1>
            $$$2
        </mx-dropdown>`)
        .find(`<mx-dropdown></mx-dropdown>`)
        .each(item => {
            const attrs = item.node.content.attributes || []
            attrs.forEach((attr, index) => {
                if (attr.key.content == ':disabled') {
                    attr.key.content = 'disabled'
                }
                if (attr.key.content == 'v-model') {
                    attr.key.content = 'selected'
                    attr.value.content = `{{= ${attr.value.content}}}`
                }
                if (attr.key.content.match('mx-')) {
                    attr.value.content = attr.value.content + '()'
                }

                if (useLessAttrNames.indexOf(attr.key.content) > -1) {
                    attrs[index] = null
                }
            })
            item.node.content.openStart.content.replace('select', 'mx-dropdown')
            item.node.content.close.content.replace('select', 'mx-dropdown')
            item.node.content.attributes = attrs.filter(a => !!a)

            item.replace(`<option $$$1>$$$2</option>`
                , `<mx-dropdown.item $$$1>$$$2</mx-dropdown.item>`)
        })
        .root()
};
