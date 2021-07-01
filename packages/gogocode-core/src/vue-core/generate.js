const indentString = require('indent-string');
const jsGenerate = require('../js-core/generate')
const htmlGenerate = require('../html-core/serialize-node')
/**
 * The following function is adapted from https://github.com/psalaets/vue-sfc-descriptor-to-string/blob/master/index.js
 */

/**
 * The MIT License (MIT)
 * Copyright (c) 2018 Paul Salaets
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */

module.exports = function toString(sfcDescriptor, options = {}) {
    let { template, script, scriptSetup, styles = [], customBlocks = [], templateAst, scriptAst, scriptSetupAst } = sfcDescriptor;
    if (templateAst && templateAst.node) {
        template.content = htmlGenerate(templateAst.node);
    } 
    if (scriptAst && scriptAst.node) {
        script.content = jsGenerate(scriptAst.node);
    }

    if (scriptSetupAst && scriptSetupAst.node) {
        scriptSetup.content = jsGenerate(scriptSetupAst.node);
    }

    const indents = Object.assign(
        {
            template: 2,
            script: 0,
            style: 0
        },
        options.indents
    );

    return (
        [template, script, scriptSetup, ...styles, ...customBlocks]
            // discard blocks that don't exist
            .filter((block) => block != null)
            // sort blocks by source position
            .sort((a, b) => a.start - b.start)
            // figure out exact source positions of blocks
            .map((block) => {
                const openTag = makeOpenTag(block);
                const closeTag = makeCloseTag(block);

                return Object.assign({}, block, {
                    openTag,
                    closeTag,

                    startOfOpenTag: block.start - openTag.length,
                    endOfOpenTag: block.start,

                    startOfCloseTag: block.end,
                    endOfCloseTag: block.end + closeTag.length
                });
            })
            // generate sfc source
            .reduce((sfcCode, block, index, array) => {
                const first = index === 0;

                let newlinesBefore = 0;

                if (first) {
                    newlinesBefore = block.startOfOpenTag;
                } else {
                    const prevBlock = array[index - 1];
                    newlinesBefore =
                        block.startOfOpenTag - prevBlock.endOfCloseTag;
                }

                newlinesBefore = newlinesBefore || 1

                return (
                    sfcCode +
                    '\n'.repeat(newlinesBefore) +
                    block.openTag +
                    indentString(block.content, indents[block.type] || 0) +
                    block.closeTag
                );
            }, '')
    );
}

function makeOpenTag(block) {
    let source = '<' + block.type;

    source += Object.keys(block.attrs)
        .sort()
        .map((name) => {
            const value = block.attrs[name];

            if (value === true) {
                return name;
            } else {
                return `${name}="${value}"`;
            }
        })
        .map((attr) => ' ' + attr)
        .join('');

    return source + '>';
}

function makeCloseTag(block) {
    return `</${block.type}>\n`;
}
