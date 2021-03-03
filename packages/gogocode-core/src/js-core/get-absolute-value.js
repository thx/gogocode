// 同时依赖api和build-node
const api = require('./core')
const { buildObjectProperty } = require('./build-node');
const getValue = {
    getAbsoluteValue(value, path) {
        // 不需要完整ast，path里有路径信息，一级一级往上找
        // 变量（作用域）、对象属性（外部引入）
        if (value.type == 'MemberExpression') {
            let obj = value;
            let t1 = null; let t2 = '$_$';
            while (obj.type == 'MemberExpression') {
                const prop = obj.property.name;
                t1 = { [prop]: t2 };
                t2 = t1;
                obj = obj.object;
            }
            return findObject(path);
            function findObject(path) {
                const { matchWildCardList: e1 } = api.getAstsBySelector(path.node, `var ${obj.name} = $_$`);
                if (e1[0] && e1[0][0]) {
                    const { matchWildCardList: e2 } = api.getAstsBySelector(e1[0][0].structure, 
                        buildObjectProperty(t1), false)
                    if (e2[0] && e2[0][0]) {
                        return getValue.getAbsoluteValue(e2[0][0].structure, path.parentPath)
                    } else return ""
                } else {
                    if (path.parentPath) {
                        return findObject(path.parentPath);   
                    } else return ""
                }
            }
        } else if (value.type == 'Identifier') {
            const name = value.name;
            const { matchWildCardList } = api.getAstsBySelector(path.node, `var ${name} = $_$`);
            if (path.parentPath) {
                if (matchWildCardList[0] && matchWildCardList[0][0]) {
                    return getValue.getAbsoluteValue(matchWildCardList[0][0].structure, path.parentPath);
                } else {
                    return getValue.getAbsoluteValue(value, path.parentPath);
                }
            } else {
                return value;
            }
        }else {
            // 几种可能：字符串、对象、数字、数组、表达式
            return value || 1;
        }
    }
}
module.exports = getValue;