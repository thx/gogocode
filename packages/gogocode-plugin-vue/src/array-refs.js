const _ = require('lodash');

module.exports = function (ast, api) {
    const $ = api.gogocode;

    const template = ast.find('<template></template>');

    if (!template.has('<$_$1 v-for="$_$2" ref="$_$3" $$$1>$$$2</$_$1>')) {
        return ast;
    }

    const arrRefNames = [];
    // 收集 array ref 的 名字
    template.find(`<$_$1 v-for="$_$2" ref="$_$3"></$_$1>`).each((ast) => {
        const refName = _.get(ast.match, '[3][0].value', '');
        if (refName) {
            arrRefNames.push(refName);
        }
    });

    // 先处理template
    template
        // 对带有v-for且有ref属性的标签，把ref属性名改为:ref,属性值改为函数调用getRefSetter(）传入之前的值
        .replace(
            `<$_$1 v-for="$_$2" ref="$_$3" $$$1>$$$2</$_$1>`,
            `<$_$1 v-for="$_$2" :ref="getRefSetter('$_$3')" $$$1>$$$2</$_$1>`
        );

    const scriptRes = ast // gennerate会返回完整的sfc
        // 处理script，在method里加入getRefSetter函数定义
        .find('<script></script>');

    scriptRes.replace(
        `export default {
        $$$1,
        methods: {
          $$$2
        }
      }`,
        `
      export default {
        $$$1,
        methods: {
          $$$2,
          getRefSetter(refKey) {
            return (ref) => {
              !this.$arrRefs && (this.$arrRefs = {});
              !this.$arrRefs[refKey] && (this.$arrRefs[refKey] = []);
              ref && this.$arrRefs[refKey].push(ref);
            };
          }
        }
      }`
    );

    // 如果原本没有methods属性，就连method一起插入
    if (!scriptRes.has(`methods: {}`)) {
        scriptRes.replace(
            `export default {
        $$$1
      }`,
            `export default {
        methods: {
          getRefSetter(refKey) {
            return (ref) => {
              !this.$arrRefs && (this.$arrRefs = {});
              !this.$arrRefs[refKey] && (this.$arrRefs[refKey] = []);
              ref && this.$arrRefs[refKey].push(ref);
            };
          }
        },
        $$$1
      }`
        );
    }

    // 判断原来有没有beforeUpdate
    if (scriptRes.has('beforeUpdate')) {
        scriptRes
            // 找到beforeUpdate，在函数体内部插入语句
            .find(`beforeUpdate() {}`)
            .append(
                'body',
                $(`this.$arrRefs && (this.$arrRefs = {});`, {
                    isProgram: false,
                }).node
            );
    } else {
        // 找到插入beforeUpdate的外层，找到.attr('declaration.properties')，构造beforeUpdate并插入
        const properties = scriptRes.find(`export default {}`).attr('declaration.properties');

        properties.push(
            $(
                `beforeUpdate() {
                  this.$arrRefs && (this.$arrRefs = {})
            }`,
                { isProgram: false }
            ).node
        );
    }

    // 给 js 引用改变成 $arrRefs
    arrRefNames.forEach((refName) => {
        try {
            scriptRes.replace(`$_$1.$refs.${refName}`, `$_$1.$arrRefs.${refName}`);
            scriptRes.replace(`this.$refs.${refName}`, `this.$arrRefs.${refName}`);

            // eslint-disable-next-line no-empty
        } catch (error) {}
        try {
            scriptRes.replace(`$_$1.$refs.['${refName}']`, `$_$1.$arrRefs['${refName}']`);
            scriptRes.replace(`this.$refs.['${refName}']`, `this.$arrRefs['${refName}']`);
            // eslint-disable-next-line no-empty
        } catch (error) {}
    });
    return ast;
};
