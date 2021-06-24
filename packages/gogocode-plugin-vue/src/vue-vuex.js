module.exports = function (sourceAst) {
    // https://next.vuex.vuejs.org/zh/guide/migrating-to-4-0-from-3-x.html
    sourceAst.replace(`import Vuex from 'vuex'`, `import * as Vuex from 'vuex'`);
    sourceAst.replace(`import Vuex from "vuex"`, `import * as Vuex from "vuex"`);
    sourceAst.remove('Vue.use(Vuex)');
    sourceAst.replace(`new Vuex.Store($_$)`, `Vuex.createStore($_$)`);
    sourceAst.replace(`Vue.set($_$1,$_$2,$_$3)`, `$_$1[$_$2] = $_$3`);
    sourceAst.replace(`Vue.delete($_$)`, `delete $_$`);
    return sourceAst
}