// <input type="checkbox" a {{ if checked }} checked {{ /if }} />
// <input type="checkbox" checked="{{=checked}}?"/>

module.exports = function ({ script, template }, api) {
    if (!template) {
        return { script, template };
    }

    const $ = api.gogocode;

    // 给所有的双大括号左右加一个空格方便parse
    const newSource = template
        .generate()
        .replace(/(\S)\{\{/g, '$1    {{')
        .replace(/\{\{(\S)/g, '{{    $1')
        .replace(/(\S)\}\}/g, '$1    }}')
        .replace(/\}\}(\S)/g, '}}    $1');

    const pureTemplate = $(newSource, { parseOptions: { language: 'html' } });

    const tags = pureTemplate.find('<$_$></$_$>');

    tags.each((tag) => {
        const attrs = tag.attr('content.attributes') || [];
        // {{                    if                  checked          }} checked      {{ /if                     }}
        // expect-if-block-start expect-if-directive expect-if-condition expect-if-value expect-if-end-directive expect-if-block-end

        let state = 'expect-if-block-start';
        let startIndex = -1;
        let ifValueList = [];
        let ifCondition = '';

        for (let i = 0; i < attrs.length; ++i) {
            const attr = attrs[i];
            const key = (attr?.key?.content || '').trim();
            const value = (attr?.value?.content || '').trim();

            const reset = () => {
                state = 'expect-if-block-start';
                startIndex = -1
                ifValueList = [];
                ifCondition = '';
            }

            switch (state) {
                case 'expect-if-block-start':
                    if (key === '{{') {
                        state = 'expect-if-directive';
                        startIndex = i
                    }
                    break;
                case 'expect-if-directive':
                    if (key === 'if') {
                        state = 'expect-if-condition';
                    } else {
                        reset()
                    }
                    break;
                case 'expect-if-condition':
                    if (key === '}}') {
                        state = 'expect-if-value';
                    } else {
                        ifCondition += key;
                    }
                    break;
                case 'expect-if-value':
                    if (key === '{{') {
                        state = 'expect-if-end-directive';
                    } else {
                        ifValueList.push({
                            key,
                            value
                        })
                    }
                    break;
                case 'expect-if-end-directive':
                    if (key === '/if') {
                        state = 'expect-if-block-end';
                    } else {
                        reset()
                    }
                    break;
                case 'expect-if-block-end':
                    if (key === '}}') {
                        state = 'expect-if-block-end';

                        const newAttrs = ifValueList.map(({key,value}) => ({
                            key: {
                                type: 'token:attribute-key',
                                content: key
                            },
                            value: {
                                type: 'token:attribute-value',
                                content: `"{{=${ifCondition}}}?${value}"`
                            }
                        }))

                        attrs.splice(startIndex, i - startIndex + 1, ...newAttrs)

                        tag.attr('content.attributes', attrs);

                        reset()
                    }
                    break;
                default:
                    break;
            }
        }
    });


    // 还原大括号
    const removeWhiteSpace = pureTemplate
        .generate()
        .replace(/(\s){4}\{\{/g, '{{')
        .replace(/\{\{(\s){4}/g, '{{')
        .replace(/(\s){4}\}\}/g, '}}')
        .replace(/\}\}(\s){4}/g, '}}');

    return { script, template: $(removeWhiteSpace, { parseOptions: { language: 'html' } }) };
};
