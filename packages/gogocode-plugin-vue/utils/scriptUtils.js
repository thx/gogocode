const path = require('path');
const fs = require('fs')
const prettier = require('prettier');

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
function addUtils(rootPath, filePath, extFunCode, $) {
    const importFile = 'utils/gogocodeTransfer.js'
    const inputPath = path.resolve(rootPath, importFile)
    if (!fs.existsSync(inputPath)) {
        inputPath.split('/').reduce((prev, curr) => {
            if (prev && !prev.endsWith(importFile) && fs.existsSync(prev) === false) {
                fs.mkdirSync(prev);
            }
            return prev + '/' + curr;
        });
    }
    const code = fs.existsSync(inputPath) ? fs.readFileSync(inputPath, 'utf-8') : ''
    let ast = $(code)
    if (!ast.has(extFunCode)) {
        ast.append('program.body', extFunCode)
        try {
            const prettierOutPut = prettier.format(ast.generate(), {
                trailingComma: 'es5',
                tabWidth: 4,
                semi: false,
                singleQuote: true,
                printWidth: 80,
                parser: 'typescript',
            });
            fs.writeFileSync(inputPath, prettierOutPut);
        }
        catch (ex) {
            console.log('error ', ex);
        }
    }
    return path.relative(filePath.substring(0,filePath.lastIndexOf('/')), inputPath);
}


module.exports = {
    addCodeToLifeCycle,
    addMethod,
    getVueName,
    addVueImport,
    appendEmitsProp,
    addUtils
};
