const $ = require('../index');

const code = `
<template>
  <div>
    <p>迁移：{{ name }}</p>
    <p>Vue版本：{{ version }}</p>
    <div>
      <div>arr:</div>
      <ul>
        <li :key="num" v-for="num in arr" ref="arr">
        <a :key="num"></a>
          {{ num }}
        </li>
      </ul>
    </div>
    <div>
      <div>arr from ref:</div>
      <ul>
        <li :key="ele.innerText" v-for="ele in arrFromRef">
          {{ ele.innerText }}
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
var a = 1;
  
function c(  sd) {
     s
}
</script>
<style>
  .class11{
    color: #333;
  }
</style>
`;
test('replace vue', () => {
    const output = $(code, { parseOptions: { language: 'vue' } })
        .find('<template></template>')
        .replace(
            `<$_$ :key="num" $$$1>$$$2</$_$>`,
            `<$_$ key="num:" $$$1>$$$2</$_$>`
        )
        .root()
        .find('<script></script>')
        .replace(`var a = 1;`, `var aaaaaaa = 1;`)
        .root()
        .generate();

    const res = output.match('key="num:"') && output.match('aaaaaaa');
    expect(res).toBeTruthy();
});

const keyCodeDemo = `
  <template>
    <div>
      <p>迁移：按键修饰符</p>
      <p>迁移策略：
            1.Vue3不再支持使用数字 (即键码) 作为 v-on 修饰符 
            2.不再支持 config.keyCodes</p>
      <div te s="" class="mt20 text-left">
      // te todo
        <div>space:<input type="text" te s="" @keyup.space="keys('space')" /></div>
        <div>space:<input type="text" @keyup.32="keys('keycode 32 space')" /> </div>
        <div>space:<input type="text" @keyup.customSpace="keys('keycode 32 space')" /> </div>
      </div>
    </div>
  </template>
  <script>
    import Vue from 'vue';
    Vue.config.keyCodes = {
        customSpace: 32,
        customDelete: 46
    };
    export default {
      name: '按键修饰符',
      props: {},
      data() {},
      methods: {
        keys(key) {
          alert('您按下的是' + key);
        },
      },
    };
  </script>
`;
// 全量的keyCode对照表,基于篇幅这里只列出3个
// https://developer.mozilla.org/zh-CN/docs/Web/API/KeyboardEvent/keyCode
const keyCodeMap = { 46: 'delete', 32: 'space', 112: 'f1' };

test('replace vue', () => {
    const ast = $(keyCodeDemo, {
        parseOptions: { language: 'vue' }
    });

    const scriptAst = ast.find('<script></script>');
    // 匹配取出自定义的keyCode，Node数组
    const customKeyCodeList = scriptAst.find(`Vue.config.keyCodes = {$_$}`)
        .match[0];
    //加上自定义keyCode构造汇总所有的keyCodeMap,待会替换template内容的时候需要使用
    for (let i = 0; i < customKeyCodeList.length; i = i + 2) {
        Object.assign(keyCodeMap, {
            [customKeyCodeList[i].value]:
                keyCodeMap[customKeyCodeList[i + 1].value]
        });
        //结果:{46: 'delete',32: 'space',112: 'f1', customSpace: 'space', customDelete: 'delete'}
    }
    scriptAst
        .find(`Vue.config.keyCodes = $_$`)
        .remove()

    const template = ast.find('<template></template>')
      .find(['<$_$></$_$>', '<$_$ />'])
      .each((node) => {
          //如果节点含有属性,则遍历它的属性
          if (Array.isArray(node.attr('content.attributes'))) {
              node.attr('content.attributes').forEach((attr) => {
                  //使用上文构造出来的汇总keyCodeMap,替换匹配到的属性名 如@keyup.32 -> @keyup.space
                  for (let keyItem in keyCodeMap) {
                      if (attr.key.content.endsWith(`.${keyItem}`)) {
                          attr.key.content = attr.key.content.replace(
                              `.${keyItem}`,
                              `.${keyCodeMap[keyItem]}`
                          );
                      }
                  }
              });
          }
      })
      .root()
      .generate();
    const res = template.match(/keyup.space\="keys\('keycode 32 space'\)"/g).length == 2 && !template.match(`Vue.config.keyCodes`);
    expect(res).toBeTruthy();
});

const asyncDemo =  `
<template>
  <ul>
    <li :key="num" v-for="num in arr" ref="arr">
      {{ num }}
    </li>
  </ul>
</template>

<script>
import Vue from 'vue';
export default {
  name: 'v-for 中的 Ref 数组',
  data() {
    return {
      arr: [1, 2, 3, 4, 5]
    };
  }
};
</script>
`

test('replace ref', () => {
  // 先处理template，针对带有v-for且ref属性的标签，把ref属性名改为:ref,属性值改为函数调用getRefSetter(）
    let ast = $(asyncDemo, { parseOptions: { language: 'vue' } })
    let templateRes = ast
    .find('<template></template>')
    .replace(`<$_$ v-for="$_$1" ref="$_$2" $$$1>$$$2</$_$>`,
    `<$_$ v-for="$_$1" :ref="getRefSetter('$_$2')" $$$1>$$$2</$_$>`)

  // 处理script，在method里加入getRefSetter函数定义
  let scriptRes = ast
  .find('<script></script>')
  .replace(`export default {
    $$$1,
    methods: {
      $$$2
    }
  }`, `
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
  }`)

  // 判断如果原本没有methods属性，就连method一起插入
  if (!scriptRes.has(`methods: {}`)) {
    scriptRes.replace(`export default {
      $$$1
    }`, `export default {
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
    }`)
  }

  // 在判断原来有没有beforeUpdate
  if (scriptRes.has('beforeUpdate')) {
    scriptRes.find(`beforeUpdate() {}`)
    .append('body', $(`this.$arrRefs && (this.$arrRefs.arr = []);`, { isProgram: false }).node)
  } else {
    scriptRes.find(`export default {}`)
    .attr('declaration.properties').push($(`beforeUpdate() {
      this.$arrRefs && (this.$arrRefs.arr = []);
    }`, { isProgram: false }).node)
  }

  /**
   * open-delay changed to show-after
   * close-delay changed to hide-after
   * hide-after changed to auto-close
  **/
  expect(scriptRes.generate()).toBeTruthy();
});

const popoverDemo = `
<template>
<el-popover
  open-delay="10"
  hide-after="500"
  title="标题"
  width="200"
  content="这是一段内容,这是一段内容,这是一段内容,这是一段内容。"
  v-model="visible">
  <el-button slot="reference" @click="visible = !visible">手动激活</el-button>
</el-popover>
</template>
`
test('replace ref', () => {

  const res = $(popoverDemo, { parseOptions: { language: 'vue' }})
  .find('<template></template>')
  .replace(`<el-popover open-delay="$_$" $$$1>$$$2</el-popover>`, `<el-popover show-after="$_$" $$$1>$$$2</el-popover>`)
  .replace(`<el-popover close-delay="$_$" $$$1>$$$2</el-popover>`, `<el-popover hide-after="$_$" $$$1>$$$2</el-popover>`)
  .replace(`<el-popover hide-after="$_$" $$$1>$$$2</el-popover>`, `<el-popover auto-close="$_$" $$$1>$$$2</el-popover>`)
  .root()
  .generate()
  expect(res.match(`show-after`)).toBeTruthy();
});

const asyncDemo1 =  `
<template fu>
    <li v-for="num in a" ref="arr">
      {{ num }}
    </li>
</template>
`
test('replace ref', () => {
  // 先处理template，针对带有v-for且ref属性的标签，把ref属性名改为:ref,属性值改为函数调用getRefSetter(）
  function tesssst(c) {
    let ast = $(c, { parseOptions: { language: 'vue' } });
    let templateRes = ast.find('<template></template>')
    .replace(`<$_$ v-for="$_$1" ref="$_$2" $$$1>$$$2</$_$>`,
    `<$_$ v-for="$_$1" :ref="getRefSetter('$_$2')" $$$1>$$$2</$_$>`)
    .root()
    const tAttr = templateRes.attr('template.attrs');
    delete tAttr.functional

    templateRes = templateRes
    .generate();  // gennerate会返回完整的sfc
    console.log(templateRes)
  }
  tesssst(asyncDemo1)
  tesssst(asyncDemo1)
  tesssst(asyncDemo1)
})


test('import', () => {
  const res = $(`
  <template>
  <div>
    <p>迁移：{{ name }}</p>
    <p>Vue版本：{{ version }}</p>
    <AsyncComp msg="异步组件加载成功"/>
    <AsyncCompOption msg="异步组件Option加载成功"/>
  </div>
  </template>

  <script>
  import Vue from 'vue';
  /* () => import() 会识别出错 */
  const AsyncComp = () => import('./Async');
  const AsyncCompOption = () => ({
    component: import('./Async'),
    delay: 500
  })
  export default {
    name: 'async-components',
    props: {
      msg: String,
    },
    data() {
      return {
        name: '异步组件',
        version: Vue.version,
      };
    },
    components: {
      AsyncComp,
      AsyncCompOption
    },
  };
  </script>

  <!-- Add "scoped" attribute to limit CSS to this component only -->
  <style scoped>
  h1 {
    color: #64b587;
  }
  </style>
`, { parseOptions: { language: 'vue' }})
  .find('<script></script>')
  .generate()

  expect(res.match(`AsyncCompOption`)).toBeTruthy();
})


test('import', () => {
  const res = $(`
  <template>
  <div>
    <p>迁移：{{ name }}</p>
    <p>Vue版本：{{ version }}</p>
    <p v-if="visible" v-highlight="color">hehe</p>
    <p>vmForDirective:{{vmForDirective}}</p>
    <button @click="changeColor">更换颜色</button>
    <button @click="changeVisible">加载/卸载</button>
  </div>
</template>

<script>
import Vue from 'vue';
/* 加上 directives 解析就有问题了 */
/* 迁移指南: https://v3.cn.vuejs.org/guide/migration/custom-directives.html */
export default {
  name: 'custom-directives',
  props: {
    msg: String,
  },
  data() {
    return {
      name: 'custom-directives',
      version: Vue.version,
      color: 'yellow',
      visible: true,
      vmForDirective: 'before'
    };
  },
  methods: {
    changeColor() {
      this.color = this.color === 'yellow' ? 'red' : 'yellow';
    },
    changeVisible() {
      this.visible = !this.visible;
    },
  },
  directives: {
    highlight: {
      bind(el, binding, vnode) {
        el.style.background = binding.value;
        const vm = vnode.context
        vm.vmForDirective = 'after'
      },
      inserted(el, binding) {
        el.parentNode.style.border = \`1px solid \${binding.value}\`;
      },
      // and update
      componentUpdated(el, binding) {
        el.style.background = binding.value;
        el.parentNode.style.border = \`1px solid \${binding.value}\`;
      },
      unbind(el, binding) {
        alert('Vue2-directive-highlight 已经卸载');
      },
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1 {
  color: #64b587;
}
</style>
<template>
  <div>
    <p>迁移：{{ name }}</p>
    <p>Vue版本：{{ version }}</p>
    <p v-if="visible" v-highlight="color">hehe</p>
    <p>vmForDirective:{{vmForDirective}}</p>
    <button @click="changeColor">更换颜色</button>
    <button @click="changeVisible">加载/卸载</button>
  </div>
</template>

<script>
import Vue from 'vue';
/* 加上 directives 解析就有问题了 */
/* 迁移指南: https://v3.cn.vuejs.org/guide/migration/custom-directives.html */
export default {
  name: 'custom-directives',
  props: {
    msg: String,
  },
  data() {
    return {
      name: 'custom-directives',
      version: Vue.version,
      color: 'yellow',
      visible: true,
      vmForDirective: 'before'
    };
  },
  methods: {
    changeColor() {
      this.color = this.color === 'yellow' ? 'red' : 'yellow';
    },
    changeVisible() {
      this.visible = !this.visible;
    },
  },
  directives: {
    highlight: {
      bind(el, binding, vnode) {
        el.style.background = binding.value;
        const vm = vnode.context
        vm.vmForDirective = 'after'
      },
      inserted(el, binding) {
        el.parentNode.style.border = \`1px solid \${binding.value}\`;
      },
      // and update
      componentUpdated(el, binding) {
        el.style.background = binding.value;
        el.parentNode.style.border = \`1px solid \${binding.value}\`;
      },
      unbind(el, binding) {
        alert('Vue2-directive-highlight 已经卸载');
      },
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1 {
  color: #64b587;
}
</style>

`, { parseOptions: { language: 'vue' }})
  .find('<script></script>')
  .generate()

  expect(res.match(`Vue2-directive-highlight`)).toBeTruthy();
})



test('test no template', () => {
  const res = $(`
    <script>
    export default {
      name: 'components', 
      data() {
        return {
          name: '组件'     
        };
      }  
    };
    </script>
  `, { parseOptions: { language: 'vue' }})
    .generate()

  expect(res.match(`<script>`)).toBeTruthy();
})

test('test script setup', () => {
  const res = $(`
  <template>
  <Layout :key="updateKey">
    <div>{{ $t('测试') }}</div>
    <div>哈哈哈</div>
  </Layout>
</template>

<script setup>
var a = 1;
</script>

<script>
var a = 1;
</script>

<style>
#app {
  color: var(--theme-font-color);
}
</style>

  `, { parseOptions: { language: 'vue' }})
  .find('<script setup></script>')
  .replace('var a = 1', 'var b = 1')
  .root()
  .find('<script></script>')
  .replace('var a = 1', 'var c = 1')
  .root()
  .generate()
expect(res.match(`var b = 1`) && res.match(`var c = 1`)).toBeTruthy();
})


test('test tag', () => {
  const res = $(`
  <template>
    <Notice
      v-for="notice in notices"
      :prefix-cls="prefixCls"
    >
    </Notice>
  </template>
  `, { parseOptions: { language: 'vue' }})
    .find('<template></template>')
    .has('<$_$ v-for="$_$1" ref="$_$2" $$$1>$$$2</$_$>')

  expect(!res).toBeTruthy();
})



test('test tag attr buttons', () => {
  const res = $(`
  <template>
    <Layout :key="\`buttons\`+ buttons + a.buttons + a.buttons.b + a.b.buttons">
    <div v-if="buttons.length">{{ 测试buttons }}</div>
    <div v-for="(item, index) in buttons">{{ buttonsbuttons }}</div>
    <div>哈哈哈</div>
  </Layout>
</template>
<script>

</script>
  `, { parseOptions: { language: 'vue' }})
  .find('<template></template>')
  .find('<$_$1 $_$2="$_$3"></$_$1>')
  .each(tag => {
    tag.match[3].forEach(m => {
      if (!m.node.content.match('buttons')) return; // 不包含buttons就return
      m.node.content =  // 给属性值赋新值
      $(m.node.content).find('buttons') // 将属性值处理为js表达式
      .each(item => {
        if (item.parent().node.type == 'MemberExpression' && item.parent().node.property.name == 'buttons') {
          // 如果buttons是被调用方，不改变
          return;
        }
        // 改变buttons变量为abc
        item.attr('name', 'abc')
      })
      .root()
      .generate()
    })
  })
  .generate()
  expect(res.match(/abc/g).length == 3).toBeTruthy();
})


test('test tag', () => {
  const ast = $(`
      <template>
      <div class="a">1</div>
      <div class="a">2</div>
    </template>

    <script>
    function getAbsoluteUrl(url) {
      import.meta.env.VITE_APP_BASE_URL
      console.log(url)
      if (!url) return ''
    }
    </script>`, { parseOptions: { language: 'vue', sourceType: 'module' } })
  const script = ast.find('<script></script>')
  script.replace('const a = $_$', 'const a = 2').generate()
  const res = ast.generate()
  expect(res.match('import.meta.env.VITE_APP_BASE_URL')).toBeTruthy()
})

test('test vue parseoptions', () => {
  const ast = $(`
      <template>
      <div class="a">1</div>
      <div class="a">2</div>
    </template>

    <script>
    function getAbsoluteUrl(url) {
      import.meta.env.VITE_APP_BASE_URL
      console.log(url)
      if (!url) return ''
    }
    </script>`, { parseOptions: { language: 'vue', sourceType: 'module' } })
  const script = ast
  .find('<template></template>').root()
  .find('<script></script>')
  const res = script.generate()
  expect(res.match('import.meta.env.VITE_APP_BASE_URL')).toBeTruthy()
})

test('test vue parseoptions', () => {
  const ast = $(
    `<template>
  <div v-if="a && b > 1">
      foo
  </div>
</template>`,
    { parseOptions: { language: 'vue' } }
  )
  const res = ast.generate()
  expect(res.match('&&')).toBeTruthy()
})
