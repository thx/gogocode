module.exports = function (ast) {
    return ast
        .replace(
            [`this.data.$_$1 = $_$2`, `me.data.$_$1 = $_$2`], 
            `this.updater.set({ $_$1: $_$2 })`)
        .find(`$_$1.data.$_$2`)
        .each(item => {
            const thisName = item.match[1][0].value;
            const propertyName = item.match[2][0].value;
            if (item.parent().node.type == 'AssignmentExpression') {
                return;
            }
            item.replaceBy(`${thisName}.updater.get('${propertyName}')`)
        })
        .root()
};
