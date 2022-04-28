/*md5:0fba59ca4c4ee650dfbda29fb43d92ca*/
/**
 * 单选卡片 https://done.alibaba-inc.com/file/BfeHD00VvQXv/SJDvcfm5NxOygPFO/preview
 */
import Magix, { Vframe } from 'magix';
import * as $ from '$'
import * as View from '../mx-util/view';
Magix.applyStyle('@cards.less');

export default View.extend({
    tmpl: '@cards.html',
    init(extra) {
        this.assign(extra);

        this.on('destroy', () => {
            if (this['@{anim.timer}']) {
                clearTimeout(this['@{anim.timer}']);
            }
        });
    },
    assign(extra) {
        // 当前数据截快照
        this.updater.snapshot();

        let textKey = extra.textKey || 'text',
            valueKey = extra.valueKey || 'value',
            tipKey = extra.tipKey || 'tip';

        let disabled = extra.disabled + '' === 'true', // 整体是否禁用，默认false
            list = $.extend(true, [], extra.list || []);

        // selected = 0的情况
        let selected = '';
        if (extra.hasOwnProperty('selected')) {
            selected = extra.selected;
        }

        // 是否有标签
        let hasTags = false;
        list.forEach(item => {
            Magix.mix(item, {
                selected: false,
                tag: item.tag || '', // 右上角打标
                tagColor: item.tagColor || 'var(--color-red)',
                tags: item.tags || [],
                disabled: disabled || (item.disabled + '' === 'true') || false // 整体禁用 > 单个禁用
            });

            // 打标样式
            if (item.tags.length > 0) {
                hasTags = true;
            }

            // 统一处理成子选项的形式
            item.subs = item.subs || [];
            if (item.subs.length <= 1) {
                item.subs = [{
                    [textKey]: item[textKey],
                    [valueKey]: item[valueKey]
                }]
            }
            item.subs.forEach(sub => {
                // 0 undefined null '' 等异常情况
                sub.selected = (sub[valueKey] + '' === selected + '');
                if (sub.selected) {
                    item.selected = true;
                }
            })
        })

        // 展示尺寸
        // normal：正常尺寸，默认宽度288
        // small：小尺寸，默认宽度216
        let mode = extra.mode || 'small';
        let width;
        switch (mode) {
            case 'small':
                width = +extra.width || 216;
                break;

            case 'normal':
                width = +extra.width || 288;
                break;
        }

        // 默认两行文案长度，支持0
        let textLines = isNaN(+extra.textLines) ? 2 : +extra.textLines;

        // hover的显示样式
        // common 背景为品牌色透明度
        // brand 背景为品牌色
        let hoverType = extra.hoverType || 'common';

        // 是否显示radio
        // 不支持子项的隐藏
        let hideRadio = (extra.hideRadio + '' === 'true');

        // radio得name
        let radioName = extra.radioName || `${this.id}_radioes`;

        let gaps = {
            mt: 8, mr: 16, mb: 8, ml: 0
        }
        for (let d in gaps) {
            if (extra.hasOwnProperty(d)) {
                gaps[d] = +extra[d];
            }
        }

        this.updater.set({
            ...gaps,
            mode,
            hoverType,
            textLines,
            width,
            list,
            textKey,
            valueKey,
            tipKey,
            selected,
            hasTags,
            hideRadio,
            radioName,
        });

        this['@{owner.node}'] = $(`#${this.id}`);

        // altered是否有变化 true：有变化
        let altered = this.updater.altered();
        return altered;
    },

    render() {
        this.updater.digest();
        this['@{fire}']();
    },

    '@{select}<click>'(e) {
        e.stopPropagation();

        let that = this;
        // 父节点
        let cur = e.params.item;
        if (cur.disabled || that.updater.get('animing')) {
            return;
        }

        let { valueKey } = that.updater.get();

        // 只记录状态不digest
        let ms = that['@{get.css.var}']('--mx-comp-expand-amin-timer');
        let card = document.querySelector(`#${that.id}_card_${cur[valueKey]} .@cards.less:card-label`);
        that.updater.set({ animing: true })
        card.setAttribute('mx-comp-expand-amin', 'animing');
        that['@{anim.timer}'] = setTimeout(() => {
            card.setAttribute('mx-comp-expand-amin', 'animend');
            that.updater.set({ animing: false })
        }, ms.replace('ms', ''));

        let { list } = that.updater.get();
        let selected = '';
        list.forEach(item => {
            item.selected = (item[valueKey] + '' === cur[valueKey] + '');
            item.subs.forEach((sub, subIndex) => {
                // 默认选中第一个
                sub.selected = item.selected && (subIndex == 0);
                if (sub.selected) {
                    selected = sub[valueKey];
                }
            })
        });
        let oldSelected = that.updater.get('selected');
        that.updater.digest({
            list,
            selected
        })
        that['@{fire}'](oldSelected + '' !== selected + '');
    },

    /**
     * 子项选择
     */
    '@{select.sub}<click>'(e) {
        e.stopPropagation();

        let that = this;
        let { item: cur, sub: curSub } = e.params;
        if (cur.disabled || that.updater.get('animing')) {
            return;
        }

        let { valueKey } = that.updater.get();

        // 只记录状态不digest
        let card = document.querySelector(`#${that.id}_card_${cur[valueKey]} .@cards.less:card-label`);
        that.updater.set({ animing: true })
        card.setAttribute('mx-comp-expand-amin', 'animing');
        that['@{anim.timer}'] = setTimeout(() => {
            card.setAttribute('mx-comp-expand-amin', 'animend');
            that.updater.set({ animing: false })
        }, 300);

        let { list } = that.updater.get();
        list.forEach(item => {
            item.selected = (item[valueKey] + '' === cur[valueKey] + '');
            item.subs.forEach(sub => {
                sub.selected = (item.selected && (sub[valueKey] + '' === curSub[valueKey] + ''));
            })
        })

        let oldSelected = that.updater.get('selected');
        that.updater.digest({
            list,
            selected: curSub[valueKey],
        })
        that['@{fire}'](oldSelected + '' !== curSub[valueKey] + '');
    },

    /**
     * 双向绑定处理
     */
    '@{fire}'(fire) {
        let { selected } = this.updater.get();
        this['@{owner.node}'].val(selected);
        if (fire) {
            this['@{owner.node}'].trigger({
                type: 'change',
                selected
            })

            let { radioName } = this.updater.get();
            let cardComps = $(`[mx-view*="mx-radio/cards"][mx-view*="radioName=${radioName}"]`);
            for (let i = 0; i < cardComps.length; i++) {
                if (cardComps[i].id !== this.id) {
                    // 同name组件
                    let vf = Vframe.get(cardComps[i].id);
                    if (vf) {
                        vf.invoke('@{sync.name}', [selected]);
                    }
                }
            }
        }
    },

    /**
     * 同名不同mx-radio.cards更新同步
     */
    '@{sync.name}'(selected) {
        let { list, valueKey } = this.updater.get();
        list.forEach(item => {
            item.selected = false;
            item.subs.forEach(sub => {
                // 0 undefined null '' 等异常情况
                sub.selected = (sub[valueKey] + '' === selected + '');
                if (sub.selected) {
                    item.selected = true;
                }
            })
        })

        this.updater.digest({
            list,
            selected,
        })
    },
});
