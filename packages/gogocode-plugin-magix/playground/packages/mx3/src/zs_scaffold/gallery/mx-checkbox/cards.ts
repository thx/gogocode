/*md5:e19b16c372eaaf86310a5949b01182ae*/
/**
 * 单选卡片 https://done.alibaba-inc.com/file/BfeHD00VvQXv/SJDvcfm5NxOygPFO/preview
 */
import Magix from 'magix';
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

        // 数组or逗号分隔，默认逗号分隔
        this['@{bak.type}'] = (extra.selected instanceof Array) ? 'array' : 'comma';
        let selected = ((extra.selected instanceof Array) ? extra.selected : (extra.selected ? (extra.selected + '').split(',') : [])).map(v => v + '');

        // 是否有标签
        let hasTags = false;
        list.forEach(item => {
            Magix.mix(item, {
                disabled: disabled || (item.disabled + '' === 'true') || false, // 整体禁用 > 单个禁用
                selected: selected.indexOf(item[valueKey] + '') > -1,
                tags: item.tags || [],
                tag: item.tag || '', // 右上角打标
                tagColor: item.tagColor || 'var(--color-red)',
            });

            if (item.tags.length > 0) {
                hasTags = true;
            }
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
            hasTags
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
        let cur = e.params.item;
        if (cur.disabled) {
            return;
        }

        let { valueKey, list } = that.updater.get();
        if (!cur.selected) {
            // 取消选择不加动画
            if (that.updater.get('animing')) {
                return;
            };

            // 只记录状态不digest
            let ms = that['@{get.css.var}']('--mx-comp-expand-amin-timer');
            let card = document.querySelector(`#${that.id}_card_${cur[valueKey]} .@cards.less:card-label`);
            that.updater.set({ animing: true, animItem: cur })
            card.setAttribute('mx-comp-expand-amin', 'animing');
            that['@{anim.timer}'] = setTimeout(() => {
                card.setAttribute('mx-comp-expand-amin', 'animend');
                that.updater.set({ animing: false })
            }, ms.replace('ms', ''));
        }

        let selected = [];
        list.forEach(item => {
            if (item[valueKey] == cur[valueKey]) {
                item.selected = !item.selected;
            }
            if (item.selected) {
                selected.push(item[valueKey]);
            }
        })
        that.updater.digest({
            list,
            selected
        })
        that['@{fire}'](true);
    },

    /**
     * 双向绑定处理
     */
    '@{fire}'(fire) {
        let { selected } = this.updater.get();
        let type = this['@{bak.type}'];
        let val = (type == 'array') ? selected : selected.join(',');
        this['@{owner.node}'].val(val);
        if (fire) {
            this['@{owner.node}'].trigger({
                type: 'change',
                selected: val
            })
        }
    }
});
