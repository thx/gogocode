const generate = require('./js-core/generate');
const htmlGenerate = require('./html-core/serialize-node');
const vueGenerate = require('./vue-core/generate');
const core = require('./js-core/core');
const htmlCore = require('./html-core/core')
const vueCore = require('./vue-core/core')
const NodePath = require('./NodePath');
const filterProp = require('./js-core/filter-prop')
const { isObject } = require('./util')

const languageMap = {
    'js': { 
        generate,
        core
    },
    'html': { 
        generate: htmlGenerate,
        core: htmlCore
    },
    'vue': { 
        generate: vueGenerate,
        core: vueCore
    }
}

class AST {
    constructor(nodePath, { parseOptions, match, rootNode } = {}) {
        if (nodePath) {
            this[0] = {
                nodePath, match
            }
        }
        this.rootNode = rootNode;
        this.expando = 'g' + ('' + Math.random()).replace( /\D/g, "" ) + 'g';
        this.parseOptions = parseOptions;
    }
    get node() {
        return this[0] ? this[0].nodePath.node : null
    }
    get value() {
        return this[0] ? this[0].nodePath.value : null
    }
    get match() {
        return this[0] ? this[0].match : []
    }
    get isHtml() {
        return this.parseOptions && (this.parseOptions.html || this.parseOptions.language == 'html');
    }
    get language() {
        return (this.parseOptions && this.parseOptions.language) || 'js';
    }
    get core() {
        return languageMap[this.language].core
    }
    get _index() {
        initParent(this);
        // todo js
        return this[0]._index;
    }
    get length() {
        let i = 0;
        while(this[i]) {
            i++
        }
        return i;
    }
    each(callback) {
        let i = 0;
        const newAST = cloneAST(this)
        while (this[i]) {
            const { nodePath, match } = this[i]
            const eachNode = new AST(nodePath, { parseOptions: this.parseOptions, match, rootNode: this.rootNode})
            callback(eachNode, i);
            newAST[i] = eachNode[0] || null
            i++;
        }
        return newAST
    }
    find(selector, options = {}) {
        if (!selector) {
            throw new Error('find failed! first argument should not be null!')
        }
        if (!this[0]) {
            return this;
        }
        const { nodePath } = this[0];
        // if (typeof selector !== 'string' && !Array.isArray(selector)) {
        //     throw new Error('find failed! Nodepath is null!');
        // }
        const pOptions = options.parseOptions || this.parseOptions;
        const {nodePathList, matchWildCardList, extra = {} } = this.core.getAstsBySelector(
            nodePath.node,
            selector, {
                strictSequence: options.ignoreSequence === false,
                parseOptions: pOptions,
                expando: this.expando,
                deep: options.deep
            }
        );
        const newAST = cloneAST(this)
        if (!newAST.rootNode) {
            newAST.rootNode = this[0].nodePath;
        }
        nodePathList.forEach((nodePath, i) => {
            // 把this里的parentPath接到nodePath上
            if (this.language == 'js') {
                let theNodePath = nodePath;
                while(theNodePath.parentPath) {
                    if (theNodePath.parentPath && theNodePath.parentPath.name == 'root') {
                        if (theNodePath.parentPath.node.type != 'File') {
                            theNodePath.parentPath = this[0].nodePath;
                        }
                        break;
                    }
                    theNodePath = theNodePath.parentPath;
                }
            }
            newAST[i] = { nodePath, parseOptions: extra.parseOptions || pOptions, match: matchWildCardList[i] };
        })
        if (extra.parseOptions) {
            newAST.parseOptions = extra.parseOptions
        }
        return newAST;
    }
    parent(option) {
        let level = 0;
        if (typeof option == 'number') {
            level = option
        }
        if (!this[0]) {
            return this;
        }
        // if (!this[0].parentList) {
        initParent(this)
        // }

        let parent = [this[0].parentList[level]]
        function parentMatch (full, partial) {
            return Object.keys(partial).every(prop => {
                if (!full || !partial) return false
                if (!full[prop]) return false;
                if (isObject(partial[prop])) {
                    return parentMatch(full[prop], partial[prop])
                } else {
                    return full[prop] == partial[prop]
                }
            })
        }

        if (isObject(option)) {
            parent = [];
            this[0].parentList.forEach(p => {
                if (parentMatch(p.node, option)) {
                    parent.push(p)
                }
            })
        }
        
        const newAST = cloneAST(this)
        if (parent[0]) {
            parent.forEach((p, i) => {
                newAST[i] = { nodePath: p, parseOptions: this.parseOptions };
            })
            return newAST;
        } else {
            return this;
        }
    }
    parents() {
        if (!this[0]) {
            return this;
        }
        // if (!this[0].parentList) {
        initParent(this)
        // }
        const { parentList } = this[0];
        const newAST = cloneAST(this)
        parentList.forEach((nodePath, i) => {
            newAST[i] = { nodePath, parseOptions: this.parseOptions, match: null };
        })
        return newAST;
    }
    root(option) {
        if (!this.rootNode) {
            return this;
        }
        const newAST = cloneAST(this)
        newAST[0] = { nodePath: this.rootNode }
        newAST.rootNode = null;
        if (this.parseOptions && this.parseOptions.rootLanguage == 'vue') {
            if (option == 'template') {
                newAST[0] = { nodePath: this.rootNode.node.templateAst }
            } else if (option == 'script') {
                newAST[0] = { nodePath: this.rootNode.node.scriptAst }
            } else {
                newAST.parseOptions = Object.assign(
                    {}, 
                    this.parseOptions, 
                    { language: 'vue', rootLanguage: undefined });
            }
        }
        return newAST;
    }
    has(selector, options) {
        return !!this.find(selector, options)[0]
    }
    siblings() {
        if (!this[0]) {
            return this;
        }
        // if (!Array.isArray(this[0].siblings)) {
        initSiblings(this);
        // }
        const siblings = this[0].siblings || [];
        const newAST = cloneAST(this)
        siblings.forEach((sibling, i) => {
            newAST[i] = sibling
        });
        return newAST;
    }
    prevAll() {
        if (!this[0]) {
            return this;
        }
        // if (!Array.isArray(this[0].siblings)) {
        initSiblings(this);
        // }
        const prevAll = this[0].prevAll || [];
        const newAST = cloneAST(this)
        prevAll.forEach((prev, i) => {
            newAST[i] = prev
        });
        return newAST;
    }
    prev() {
        if (!this[0]) {
            return this;
        }
        // if (!Array.isArray(this[0].siblings)) {
        initSiblings(this);
        // }
        const prevAll = this[0].prevAll || [];
        const newAST = cloneAST(this)
        newAST[0] = prevAll[prevAll.length - 1];
        return newAST;
    }

    nextAll() {
        if (!this[0]) {
            return this;
        }
        // if (!Array.isArray(this[0].siblings)) {
        initSiblings(this);
        // }
        const nextAll = this[0].nextAll || [];
        const newAST = cloneAST(this)
        nextAll.forEach((next, i) => {
            newAST[i] = next
        });
        return newAST;
    }
    next() {
        if (!this[0]) {
            return this;
        }
        // if (!Array.isArray(this[0].siblings)) {
        initSiblings(this);
        // }
        const nextAll = this[0].nextAll || [];
        const newAST = cloneAST(this)
        newAST[0] = nextAll[0];
        return newAST;
    }
    eq(index) {
        index = index || 0;
        const { nodePath, match } = this[index] || {}
        const newAST = cloneAST(this)
        newAST[0] = { nodePath, parseOptions: this.parseOptions, match }
        return newAST;
    }
    attr(arg1, arg2) {
        if (!this[0] || !this[0].nodePath || !this[0].nodePath.node) {
            return this;
        }
        let attrMap = {};
        if (arg2) {
            // arg1是key arg2是value
            if (typeof arg1 == 'string') {
                attrMap = { [arg1]: arg2 }
            } else {
                throw new Error('attr failed! args[0] should be string!')
            }
        } else {
            if (typeof arg1 == 'string') {
                // 取某个属性
                return getAttrValue(this[0].nodePath.node, arg1);
            } else if (typeof arg1 == 'object') {
                attrMap = arg1;
            }
        }
        setAttrValue(this[0].nodePath.node, attrMap);
        return this;
    }
    child(attrName) {
        if (!this[0] || !this[0].nodePath || !this[0].nodePath.node) {
            return this;
        }
        const keyList = attrName.split('.');
        let currentNode = this.node;
        let nodePath = this[0].nodePath;
        let parentPath = this[0].nodePath.parentPath;
        let newNodeAST;
        let deep = 0;
        if (this.node.program) {
            nodePath = nodePath.get('program', 'body', '0')
            currentNode = currentNode.program.body[0];
        }
        keyList.forEach(attr => {
            const node = currentNode[attr];
            if (node) {
                if (this.language == 'js') {
                    newNodeAST = cloneAST(this);
                    nodePath = nodePath.get(attr)
                    newNodeAST[0] = { nodePath, parseOptions: this.parseOptions }
                } else {
                    newNodeAST = cloneAST(this);
                    parentPath = nodePath
                    nodePath = new NodePath(currentNode[attr], nodePath, nodePath)
                    newNodeAST[0] = { nodePath, parseOptions: this.parseOptions }
                }
                currentNode = node
                deep++
            }
        })
        if (deep == keyList.length) {
            return newNodeAST;
        } else {
            return null
        }
    }
    clone() {
        if (!this[0]) {
            return this;
        }
        let nodePath;
        // html深度克隆时需要忽略parentRef
        if (this.isHtml) {
            const parentRefList = []
            markParent(this[0].nodePath.node)
            const newNode = JSON.parse(JSON.stringify(this[0].nodePath.node));
            resetParent(newNode);
            resetParent(this[0].nodePath.node);
            nodePath = new NodePath(
                newNode, 
                this[0].nodePath.parent, 
                this[0].nodePath.parentPath 
            )
            function resetParent(node) {
                for (let key in node) {
                    if (key == 'parentRef') {
                        node[key] = parentRefList[node[key]]
                    } else if (isObject(node[key])) {
                        if (Array.isArray(node[key])) {
                            node[key].forEach(n => {
                                resetParent(n)
                            });
                        } else {
                            resetParent(node[key]);
                        }
                    }
                }
            }
            function markParent(node) {
                for (let key in node) {
                    if (key == 'parentRef') {
                        parentRefList.push(node[key]);
                        node[key] = parentRefList.length - 1;
                    } else if (isObject(node[key])) {
                        if (Array.isArray(node[key])) {
                            node[key].forEach(n => {
                                markParent(n)
                            });
                        } else {
                            markParent(node[key]);
                        }
                    }
                }
            }
            
        } else {
            const node = {};
            // js需要做一层属性过滤，否则会有环形依赖
            filterProp(this[0].nodePath.node, node, [
                'computed',
                'range',
                'leadingComments',
                'shorthand',
                'extra',
                'static',
                'typeParameters',
                'tokens'
            ]);
            nodePath = new NodePath(
                // JSON.parse(JSON.stringify(this[0].nodePath.node)), 
                JSON.parse(JSON.stringify(node)), 
                this[0].nodePath.parent, 
                this[0].nodePath.parentPath
            )
        }
        const { match } = this[0]
        const newAST = cloneAST(this)
        newAST[0] = { nodePath, parseOptions: this.parseOptions, match }
        return newAST;
    }
    replace(selector, replacer, { ignoreSequence, parseOptions } = {}) {
        if (!this[0]) {
            // throw new Error('replace failed! Nodepath is null!');
            return this;
        }
        parseOptions = parseOptions || this.parseOptions
        this.core.replaceSelBySel(this[0].nodePath, selector, replacer, ignoreSequence === false, parseOptions, this.expando)
        return this;
    }
    replaceBy(replacer) {
        if (!this[0]) {
            return this.root();
        }
        if (replacer[0] && replacer[0].nodePath) {
            replacer = replacer[0].nodePath.node
        }
        if (typeof replacer == 'string') {
            replacer = this.core.buildAstByAstStr(replacer);
        }
        if (replacer.type == 'File') {
            replacer = replacer.program.body[0]
        }
        let i = 0;
        while(this[i]) {
            this.core.replaceAstByAst(this[i].nodePath, replacer, this._index)
            i++
        }
        
        return this;
    }
    insertSiblingNode(node, type) {
        if (!this[0]) {
            return this;
        }
        if (!node.type && !node.nodeType) {
            throw new Error('insert failed! Unexpected node for insert!')
        }

        if (node.type && node.type.match('Comment')) {
            // 处理注释
            let targetNode = this;
            // if (this.node.type == 'File') {
            //     targetNode = $(this.node.program.body)
            // }
            node.trailing = type == 'after';
            node.leading = type == 'before';
            this.insertChildNode(
                'comments', 
                node, 
                type == 'after' ? 'append' : 'prepend')
            return;
        }
        // if (!this[0].parentList) {
        initParent(this)
        // }
        if (this.isHtml) {
            let p;
            let index = -1
            if (this.node.nodeType == 'document') {
                p = this.node.content.children;
                index = type == 'before' ? 0 : p.length - 1
            } else {
                const parent = this.parent();
                // todotodo
                p = parent.attr('content.children') || [];
                p.forEach((item, i) => {
                    if (item == this.node) {
                        index = i
                    }
                })
            }
            if (type == 'before') {
                p.splice(index, 0, node)
            } else {
                p.splice(index + 1, 0, node)
            }
        } else {
            const parentList = this[0].parentList;
            if ((!parentList || parentList.length == 0) && this.node.type == 'File') {
                if (type == 'before') {
                    this.attr('program.body').unshift(node)
                } else {
                    this.attr('program.body').push(node)
                }
                return;
            }
            let getArrayParent = false;
            let i = 0;
            let selfPathNode = this[0].nodePath.value;
            let selfIndex = -1;
            while(!getArrayParent) {
                if (!parentList[i] || !parentList[i].value) {
                    getArrayParent = true;
                } else if (Array.isArray(parentList[i].value)) {
                    getArrayParent = true;
                    parentList[i].value.forEach((nodePath, index) => {
                        if (nodePath == selfPathNode) {
                            selfIndex = index;
                        }
                    })
                    if (type == 'after') {
                        parentList[i].value.splice(selfIndex + 1, 0, node)
                    } else {
                        parentList[i].value.splice(selfIndex, 0, node)
                    }
                }
                selfPathNode = parentList[i].value;
                i++
            }
        }
    }
    after(node) {
        if (!node) {
            throw new Error('after failed! Unexpected node for insert!')
        }
        if (typeof node == 'string') {
            node = this.core.buildAstByAstStr(node)
        }
        if (node[0] && node[0].nodePath) {
            node = node[0].nodePath.value
        }
        if (node.type == 'File') {
            if (node.program.body.length > 0) {
                node.program.body.forEach(item => {
                    this.insertSiblingNode(item, 'after');
                })
                return this;
            } else {
                return this;
            }
        }
        if (!Array.isArray(node)) {
            node = [node]
        }
        node.forEach(n => {
            this.insertSiblingNode(n, 'after');
        })
        return this;
    }
    before(node) {
        if (!node) {
            throw new Error('before failed! Unexpected node for insert!')
        }
        if (typeof node == 'string') {
            node = this.core.buildAstByAstStr(node)
        }
        if (node[0] && node[0].type == 'Decorator') {
            this.node.decorators = (this.node.decorators || []).concat(node);
            return this;
        }
        if (node[0] && node[0].nodePath) {
            node = node[0].nodePath.value
        }
        if (node.type == 'File') {
            if (node.program.body.length > 0) {
                node.program.body.reverse().forEach(item => {
                    this.insertSiblingNode(item, 'before');
                })
                return this;
            } else {
                return this;
            }
        }
        if (!Array.isArray(node)) {
            node = [node]
        }
        node.reverse().forEach(n => {
            this.insertSiblingNode(n, 'before');
        })
        return this;
    }
    insertChildNode(attr, node, type) {
        if (!this[0] || !this[0].nodePath) {
            return;
        }
        let selfNode = this[0].nodePath.value;
        let bodyIndex = selfNode.program && type == 'append' ? selfNode.program.body.length - 1 : 0
        if (!Array.isArray(selfNode)) {
            // for(let key in selfNode) {
            //     if (Array.isArray(selfNode[key])) {
            //         selfNode = selfNode[key]
            //     }
            // }
            if (attr == 'content.children') {
                selfNode.content.children = selfNode.content.children || [];
                selfNode = selfNode.content.children;
            } else if (selfNode.program && selfNode.program.body) {
                if (attr == 'program.body') {
                    selfNode = selfNode.program.body;
                } else {
                    selfNode.program.body[bodyIndex][attr] = selfNode.program.body[bodyIndex][attr] || []
                    selfNode = selfNode.program.body[bodyIndex][attr]
                }
            } else {
                selfNode[attr] = selfNode[attr] || [];
                selfNode = selfNode[attr];
                if (!Array.isArray(selfNode)) {
                    selfNode = selfNode.body
                }
            }
            
        }

        if (node.type == 'File' && node.program.body) {
            node = node.program.body[bodyIndex]
            if (!node) return;
        }
        if (selfNode) {
            if (type == 'append') {
                selfNode.push(node);
            } else {
                selfNode.unshift(node);
            }
        }
    }
    append(attr, node) {
        if (!attr) {
            return this;
        }
        if (this.isHtml) {
            node = attr;
            attr = 'content.children';
        }
        if (!node) {
            node = attr;
            attr = 'program.body'
        }
        if (typeof node == 'string') {
            node = this.core.buildAstByAstStr(node)
        }
        if (node[0] && node[0].nodePath) {
            node = node[0].nodePath.value
        }
        if (!Array.isArray(node)) {
            node = [node]
        }
        node.forEach(n => {
            this.insertChildNode(attr, n, 'append');
        })
        return this;

    }
    prepend(attr, node) {
        if (this.isHtml) {
            node = attr;
            attr = 'content.children';
        }
        if (!node) {
            node = attr;
            attr = 'program.body'
        }
        if (typeof node == 'string') {
            node = this.core.buildAstByAstStr(node)
        }
        if (node[0] && node[0].nodePath) {
            node = node[0].nodePath.value
        }
        if (!Array.isArray(node)) {
            node = [node]
        }
        node.reverse().forEach(n => {
            this.insertChildNode(attr, n, 'prepend');
        })
        return this;
    }
    empty() {
        this.each(item => {
            if (item.language == 'html') {
                if (Array.isArray(item.attr('content.children'))) {
                    item.attr('content.children', []);
                }
            } else if (item.language == 'js') {
                if (Array.isArray(item[0].nodePath.value)) {
                    item[0].nodePath.value = [];
                } else if (item.node.type == 'File') {
                    item.attr('program.body', [])
                }
            }
        })
        return this
    }
    remove(selector, options = {}) {
        if (!this[0]) {
            return this.root()
        }
        if (typeof selector == 'string' || Array.isArray(selector)) {
            const pOptions = options.parseOptions || this.parseOptions;
            let i = 0;
            while(this[i]) {
                this.core.removeAst(this.node, selector, { 
                    strictSequence: options.ignoreSequence === false, 
                    parseOptions: pOptions, 
                    expando: this.expando
                });
                i++
            }
        } else {
            let i = 0;
            while(this[i]) {
                this.core.remove(this[i].nodePath)
                i++
            }
            
        }
        return this.root()
    }
    generate({ isPretty = false } = {}) {
        if (!this[0]) {
            return '';
        }
        if (this.language == 'js') {
            return generate(this[0].nodePath.node, isPretty)
        } else {
            return (languageMap[this.language].generate)(this[0].nodePath.value);
        }
    }
}

function cloneAST(ast) {
    const newAST = new AST('', { parseOptions: ast.parseOptions, rootNode: ast.rootNode})
    if (ast.sfc) {
        newAST.sfc = ast.sfc
    }
    return newAST
}

function getAttrValue(node, attr) {
    const keyList = attr.split('.');
    let currentNode = node;
    let deep = 0;
    keyList.forEach(attr => {
        if (currentNode[attr]) {
            currentNode = currentNode[attr];
            deep++
        }
    })
    if (deep == keyList.length) {
        return currentNode;
    } else {
        return null
    }
}

function initParent(ast) {
    if (ast.isHtml) {
        ast[0].parentList =  ast.core.getParentListByAst(ast[0].nodePath)
        ast[0]._index = ast[0].parentList[0] ? ast[0].parentList[0].node.content.children.indexOf(ast[0].nodePath.node) : 0;
    } else {
        ast[0].parentList =  core.getParentListByAst(ast[0].nodePath)
    }
    return ast[0].parentList
}

function initSiblings(ast) {
    if (ast.language == 'html') {
        const parent = ast.parent();
        const siblings = (parent.attr('content.children') || []).map((node, index) => {
            return {
                _index: index,
                nodePath: new NodePath(node, parent[0].nodePath, parent[0].nodePath),
                parseOptions: ast.parseOptions
            }
        });
        
        ast[0].siblings = siblings;
        ast[0].prevAll = siblings.filter(s => s._index < ast._index);
        ast[0].nextAll = siblings.filter(s => s._index > ast._index);
    } else {
        const parentList = initParent(ast);
        if (!parentList || parentList.length == 0) {
            return;
        }
        const parseOptions = ast.parseOptions;
        let getArrayParent = false;
        let i = 0;
        const siblings = [];
        const prevAll = [];
        const nextAll = [];
        let selfPathNode = ast[0].nodePath.value;
        while(!getArrayParent) {
            if (!parentList[i] || !parentList[i].value) {
                getArrayParent = true;
            } else if (Array.isArray(parentList[i].value)) {
                getArrayParent = true;
                let isPrev = true;
                let childIndex = 0
                while (parentList[i].__childCache[childIndex]) {
                    const nodePath = parentList[i].__childCache[childIndex]
                    if (nodePath.value == selfPathNode) {
                        // find self
                        isPrev = false;
                    } else {
                        siblings.push({ nodePath, parseOptions })
                        if (isPrev) {
                            prevAll.push({ nodePath, parseOptions })
                        } else {
                            nextAll.push({ nodePath, parseOptions })
                        }
                    }
                    childIndex++
                }
                ast[0].siblings = siblings;
                ast[0].prevAll = prevAll;
                ast[0].nextAll = nextAll;
            }
            selfPathNode = parentList[i].value;
            i++
        }
    }   
}
function setAttrValue(node, attrMap) {
    for(const key in attrMap) {
        const value = attrMap[key];
        const keyList = key.split('.');
        let currentNode = node;
        keyList.forEach((attr, index) => {
            if (index == keyList.length - 1) {
                currentNode[attr] = value;
            } else if (currentNode[attr]) {
                currentNode = currentNode[attr]
            }
        })
    }
    
}
module.exports = AST;
