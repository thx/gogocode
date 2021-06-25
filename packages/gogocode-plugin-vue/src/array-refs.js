module.exports = function(ast, api) {
    const $ = api.gogocode

    const template = ast.find('<template></template>')

    if(!template.has('<$_$ v-for="$_$1" ref="$_$2" $$$1>$$$2</$_$>')) {
        return ast;
    }

    // 先处理template
    template
    // 对带有v-for且有ref属性的标签，把ref属性名改为:ref,属性值改为函数调用getRefSetter(）传入之前的值
        .replace(
            `<$_$ v-for="$_$1" ref="$_$2" $$$1>$$$2</$_$>`,
            `<$_$ v-for="$_$1" :ref="getRefSetter('$_$2')" $$$1>$$$2</$_$>`
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
              !this.$arrRefs[refKey] && (this.$arrRefs.arr = []);
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
              !this.$arrRefs[refKey] && (this.$arrRefs.arr = []);
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
                $(`this.$arrRefs && (this.$arrRefs.arr = []);`, {
                    isProgram: false,
                }).node
            );
    } else {
    // 找到插入beforeUpdate的外层，找到.attr('declaration.properties')，构造beforeUpdate并插入
        const properties = scriptRes
            .find(`export default {}`)
            .attr('declaration.properties');

        properties.push(
            $(
                `beforeUpdate() {
              this.$arrRefs && (this.$arrRefs.arr = []);
            }`,
                { isProgram: false }
            ).node
        );
    }
    return ast;
};
