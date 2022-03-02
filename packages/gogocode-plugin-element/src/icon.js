const scriptUtils = require('../utils/scriptUtils');
const _ = require('lodash');

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

const iconMap = {
    icon: ':icon',
    'prefix-icon': ':prefix-icon',
    'clear-icon': ':clear-icon',
    'suffix-icon': ':suffix-icon',
    'icon-class': ':icon',
};

const iconKeys = Object.keys(iconMap);

function addIconImport(scriptAst, icons) {
    if (icons.length) {
        scriptAst.prepend(
            `import { ${icons
                .map((icon) => `${capitalizeFirstLetter(icon)} as ElIcon${capitalizeFirstLetter(icon)}`)
                .join(',')} } from '@element-plus/icons'`
        );
    }

    return scriptAst;
}

module.exports = function (ast) {
    const script = ast.parseOptions && ast.parseOptions.language === 'vue' ? ast.find('<script></script>') : ast;
    const template = ast.find('<template></template>');
    let compIcons = [];
    let dataIcons = [];
    template.find('<$_$></$_$>').each((ast) => {
        const tagName = _.get(ast.node, `content.name`);
        // 是 icon 组件
        //  <i class="el-icon-edit"></i> => <el-icon><el-icon-edit></el-icon>
        if (tagName === 'i') {
            const attrs = ast.attr('content.attributes') || [];
            const clsAttr = attrs.find(
                (attr) => attr.key.content === 'class' && attr.value.content.indexOf('el-icon-') !== -1
            );
            if (clsAttr) {
                const styleAttr = attrs.find((attr) => attr.key.content === 'style');
                const key = clsAttr.key.content;
                const value = clsAttr.value.content;
                if (key === 'class' && value.indexOf('el-icon-') !== -1) {
                    const iconClass = _.get(value.match(/el-icon[-\w]+/), `[0]`, '');
                    const restClass = value.replace(/el-icon[-\w]+/, '').trim();
                    const iconName = capitalizeFirstLetter(scriptUtils.toCamelCase(iconClass.replace(/^el-icon-/, '')));
                    compIcons.push(iconName);
                    ast.replaceBy(
                        `<el-icon ${restClass ? `class="${restClass}"` : ''} ${
                            styleAttr ? `style="${styleAttr.value.content}"` : ''
                        } ><${iconClass} /></el-icon>`
                    );
                }
            }
        }
        // 是 element 组件
        // <button icon="el-icon-edit"></button> => <el-button :icon="ElIconEdit"></el-button>
        else if (tagName.indexOf('el-') === 0) {
            const attrs = ast.attr('content.attributes') || [];
            attrs.every((attr) => {
                const key = _.get(attr, `key.content`);
                const value = _.get(attr, `value.content`);
                if (value && iconKeys.includes(key)) {
                    const iconName = capitalizeFirstLetter(scriptUtils.toCamelCase(value.replace(/^el-icon-/, '')));
                    dataIcons.push(iconName);
                    attr.key.content = iconMap[key];
                    attr.value.content = `ElIcon${iconName}`;
                    return false;
                }
                return true;
            });
        }
    });

    addIconImport(script, _.uniq([...compIcons, ...dataIcons]));
    let compKV = {};
    compIcons.forEach((icon) => {
        compKV[`ElIcon${icon}`] = `ElIcon${icon}`;
    });
    scriptUtils.addComponents(script, compKV);
    let dataKV = {};
    dataIcons.forEach((icon) => {
        dataKV[`ElIcon${icon}`] = `ElIcon${icon}`;
    });
    scriptUtils.addData(script, dataKV);

    return ast;
};
