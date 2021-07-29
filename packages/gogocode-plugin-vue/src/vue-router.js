const { forceReplace } = require('../utils/scriptUtils');

module.exports = function (ast, { gogocode: $ }) {
    // v3: https://router.vuejs.org/zh/installation.html
    // v4: https://next.router.vuejs.org/zh/guide/
    // https://next.router.vuejs.org/zh/guide/migration/index.html
    const sourceAst =
        ast.parseOptions && ast.parseOptions.language === 'vue'
            ? ast.find('<script></script>')
            : ast;
    if (sourceAst.length > 0) {
        let routerName = 'Router';
        sourceAst.find(`import $_$ from 'vue-router'`).each((fAst) => {
            if (fAst.match[0] && fAst.match[0].length > 0 && fAst.match[0][0].value) {
                routerName = fAst.match[0][0].value;
                sourceAst.remove(`Vue.use(${routerName})`);
            }
        });
        sourceAst.replace(`import $_$ from 'vue-router'`, `import * as VueRouter from 'vue-router';`);

        sourceAst.replace(`new ${routerName}($_$)`, `VueRouter.createRouter($_$)`);
        sourceAst.replace(`router.onReady.bind($_$)`, `router.isReady.bind($_$)`);
        sourceAst.replace(`router.onReady($_$)`, `router.isReady().then($_$)`);
        sourceAst.replace(`router.onReady($_$1,$_$2)`, `router.isReady().then($_$1).catch($_$2)`);
        sourceAst.remove('router.app = $_$');

        sourceAst.find(`VueRouter.createRouter($_$)`).each((fAst) => {
            if (!fAst.match[0] || !fAst.match[0].length || !fAst.match[0][0].node) {
                return;
            }
            handleMode(fAst ,$);
            handleScrollBehavior(fAst);
        });
    }


    const templateAst = ast.find('<template></template>');
    if (templateAst.length > 0) {
        templateAst.find('<router-link>').each((fAst) => {
            handleAppend(fAst);
            handleTagAndEvents(fAst);
        })
        handleTransition(templateAst);
        handleInnerView(templateAst);

        return templateAst.root();
    }
    return sourceAst.root();
}
function handleAppend(fAst) {
    const attrs = fAst.attr('content.attributes') || [];
    //remove append attr
    const appendIndex = attrs.findIndex(attr => attr.key.content === 'append');
    attrs.forEach((attr) => {
        const key = attr.key.content;
        if (appendIndex > -1 && key === 'to') {
            const value = attr.value.content;
            attr.key.content = ':to';
            attr.value.content = `routerAppend($route.path, '${value}')`;
        }
    });
    if (appendIndex > -1) {
        attrs.splice(appendIndex, 1);
        fAst.attr('content.attributes', attrs);
    }
}
function handleTagAndEvents(fAst) {
    const attrs = fAst.attr('content.attributes') || [];
    //remove tag attr
    const attrTag = attrs.find(attr => attr.key.content === 'tag');
    if (attrTag) {
        const tagValue = attrTag.value.content;
        fAst.replace(`<router-link tag=$_$1 event=$_$2 $$$1>$$$2</router-link>`,
            `<router-link custom v-slot="{ navigate }" $$$1>
            <${tagValue} @click="navigate" @keypress.enter="navigate" role="link">$$$2</${tagValue}>
            </router-link>`);
    }
}
function handleTransition(fAst) {
    fAst.replace(`<transition $$$1><router-view $$$2>$$$3</router-view></transition>`,
        `<router-view v-slot="{ Component }" $$$2>
    <transition $$$1>
        <component :is="Component" >$$$3</component>
    </transition>
  </router-view>`);
}
function handleInnerView(fAst) {

    fAst.find(`<router-view>`).each((ast) => {
        const attrs = ast.attr('content.attributes') || [];
        const hasVSlot = attrs.find(attr => attr.key.content === 'v-slot');
        const children = ast.attr('content.children');
        const hasEl = children && children.length > 0;
        if (!hasVSlot && hasEl) {
            ast.replace(`<router-view $$$1>$$$2</router-view>`,
                `<router-view v-slot="{ Component }" $$$1>
                <component :is="Component" >$$$2</component>
          </router-view>`);
        }
    });

}
function handleMode(fAst, $) {
    const { type } = fAst.match[0][0].node;
    if (type === 'Identifier') {
        // todo
    } else if (type === 'ObjectExpression') {
        if (fAst.has(`{mode:$_$}`)) {
            forceReplace($, fAst, `mode:'history'`, `history: VueRouter.createWebHistory()`);
            forceReplace($, fAst, `mode:'hash'`, `history: VueRouter.createWebHashHistory()`);
            forceReplace($, fAst, `mode:'abstract'`, `history: VueRouter.createMemoryHistory()`);
        } else {
            forceReplace($, fAst, `({routes:$_$,$$$})`, `({history: VueRouter.createWebHashHistory(),routes:$_$,$$$})`);
        }

        forceReplace($, fAst, `({history: VueRouter.createWebHistory(), base: $_$1, $$$})`, `({history: VueRouter.createWebHistory($_$1),$$$})`);
        forceReplace($, fAst, `({history: VueRouter.createWebHashHistory(), base: $_$1, $$$})`, `({history: VueRouter.createWebHashHistory($_$1),$$$})`);
        forceReplace($, fAst, `({history: VueRouter.createMemoryHistory(), base: $_$1, $$$})`, `({history: VueRouter.createMemoryHistory($_$1),$$$})`);
    }
}
function handleScrollBehavior(fAst) {
    fAst.find('{scrollBehavior:$_$}').each(ast => {
        ast.replace(`({y:$_$,$$$})`, `({top:$_$,$$$})`);
        ast.replace(`({x:$_$,$$$})`, `({left:$_$,$$$})`);
    });
}
