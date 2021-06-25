function addCodeToLifeCycle(scriptAst, lifeCycle, code) {
    const hasLifeCycle = scriptAst.has(`${lifeCycle}() {}`);

    if (hasLifeCycle) {
        scriptAst.replace(
            `
    export default {
      ${lifeCycle}() {
        $$$2
      },
      $$$1
    }`,
            `
    export default {
      $$$1,
      ${lifeCycle}() {
        $$$2;
        ${code}
      }
    }`
        );
    } else {
        scriptAst.replace(
            `
      export default {
        $$$1
      }`,
            `
      export default {
        ${lifeCycle}() {
          ${code}
        },
        $$$1
      }
      `
        );
    }
    return scriptAst;
}

function addMethod(scriptAst, methodCode) {
    // 如果原本没有methods属性，就连method一起插入
    if (!scriptAst.has(`methods: {}`)) {
        scriptAst.replace(
            `export default {
        $$$1
      }`,
            `export default {
        methods: {
        },
        $$$1
      }`
        );
    }
    scriptAst.replace(
        `
  export default {
    $$$1,
    methods: {
      $$$2
    }
  }`,
        `
  export default {
    $$$1,
    methods: {
      ${methodCode},
      $$$2
    }
  }`
    );
    return scriptAst;
}

function getVueName(scriptAst) {
    try {
        const match = scriptAst.find('import $_$1 from "vue"').match;
        let vueName = 'Vue';
        if (match &&
      match[1] &&
      match[1].length > 0 &&
      match[1][0] &&
      match[1][0].value) {
            vueName = match[1][0].value;
        }
        return vueName;
    } catch (error) {
        return 'Vue';
    }
}

function addVueImport(scriptAst) {
    if (scriptAst.has(`import $_$ from 'vue';`)) {
        scriptAst.replace(`import $_$ from 'vue';`, `import * as $_$ from 'vue';`);
    }

    if (!scriptAst.has(`import * as $_$ from 'vue';`)) {
        scriptAst.prepend(`import * as Vue from 'vue';`);
    }

    return scriptAst;
}

function appendEmitsProp(scriptAst, emitsArr) {
    const hasEmits = scriptAst.has('{ emits:$_$ }');
    if (hasEmits) {
        scriptAst.find('{ emits:$_$ }').each(fAst => {
            const match = fAst.match;
            if (!match ||
        !match[0] ||
        match[0].length === 0 ||
        !match[0][0] ||
        !match[0][0].value) { return; }
            const originEmits = match[0][0].value.replace('[', '').replace(']', '').replace(/\"/g, '\'').split(',');
            const newSet = new Set(originEmits);
            emitsArr.forEach(emit => {
                newSet.add(emit);
            });
            const emitsArrCode = [...newSet].join(',');
            fAst.replace(`emits:$_$`, `emits:[${emitsArrCode}]`);
        })
    } else {
        const emitList = [...emitsArr];
        const emitsArrCode = emitList
            .join(',');
        scriptAst.replace(`export default {$$$}`, `export default {$$$, 
                emits:[${emitsArrCode}]
            }`);
        scriptAst.replace(`Vue.extend({$$$})`, `Vue.extend({$$$, 
                emits:[${emitsArrCode}]
            })`);
    }
}

module.exports = {
    addCodeToLifeCycle,
    addMethod,
    getVueName,
    addVueImport,
    appendEmitsProp
};
