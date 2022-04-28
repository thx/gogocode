/*md5:b355f69cc764f1971fd172bc130ec677*/
/**
 * 锚点tab
 */
import Magix from 'magix';
import * as $ from '$';
import * as View from '../mx-util/view';
Magix.applyStyle('@anchor.less');

export default View.extend({
    tmpl: '@anchor.html',
    init(extra) {
        this.assign(extra);
    },
    assign(data) {
        let that = this;
        that.updater.snapshot();

        //你可以在这里对数据data进行加工,然后通过set方法放入到updater中
        let textKey = data.textKey || 'text';
        let valueKey = data.valueKey || 'value';

        let originList;
        try {
            originList = (new Function('return ' + data.list))();
        } catch (e) {
            originList = data.list;
        }
        let list = (originList || []).map((item) => {
            return {
                ...item,
                tip: item.tips || item.tip || '', // 提示：兼容tips和tip
                text: item[textKey],
                value: item[valueKey]
            }
        });
        let selected = data.selected || (list[0] || {})['value'];

        that.updater.set({
            list,
            selected,
            left: 0,
            width: 0,
            anchorLogo: data.anchorLogo || '',
            anchorWidth: data.anchorWidth || '',
            anchorRightView: data.anchorRightView,
            anchorRightData: data.anchorRightData || {},
        });

        that['@{owner.node}'] = $('#' + that.id);
        that['@{owner.node}'].val(selected);

        // altered是否有变化 true：有变化
        let altered = that.updater.altered();
        return altered;
    },

    render() {
        let that = this;
        that.updater.digest();
        let { selected, list } = that.updater.get();
        that['@{sync.line}'](selected);

        let index = 0;
        for (let i = 0; i < list.length; i++) {
            if (list[i].value == selected) {
                index = i;
                break;
            }
        }
        if (index > 0) {
            // 显示第一个时不处理，>1才默认定位到相应位置
            that['@{init.delay.timer}'] = setTimeout(that.wrapAsync(() => {
                let cont = $(`#${list[index].value}`);
                if (cont && cont.length) {
                    let mainNode = $(`#${that.id}`);
                    $(window).scrollTop(Math.ceil(cont.offset().top - mainNode.outerHeight()));
                }
            }), 50);
        }
    },

    '@{sync.line}'(hover) {
        let that = this;
        that['@{data.hover}'] = hover;
        let node = $('#' + that.id + '_' + hover);
        if (!node || !node.length) {
            that.updater.digest();
            return;
        }
        let nodeOffsetLeft = node.offset().left;
        let owner = node.parent();
        let ownerOffsetLeft = owner.offset().left;
        let left = nodeOffsetLeft - ownerOffsetLeft;
        let width = node.outerWidth();
        that.updater.digest({
            left,
            width
        })
    },

    '@{select}<click>'(e) {
        let item = e.params.item;
        let { value } = item;
        this['@{select}'](item);

        // 内容滚定到可视范围之内
        let cont = $(`#${value}`);
        if (cont && cont.length) {
            let mainNode = $(`#${this.id}`);
            // 向上取整
            $(window).scrollTop(Math.ceil(cont.offset().top - mainNode.outerHeight()));
        }
    },

    '@{select}'(item) {
        let that = this;
        let value = item.value;
        let { selected } = that.updater.get();
        if (selected == value) {
            return;
        }

        let event = $.Event('change', {
            item: item,
            value: value,
            text: item.text,
            selected: value
        });
        that['@{owner.node}'].val(value).trigger(event);

        that.updater.digest({
            selected: value,
            hover: value
        })
    },

    '@{over}<mouseover>'(e) {
        this['@{sync.line}'](e.params.value);
    },

    /**
     * 恢复到选中项
     */
    '@{out}<mouseout>'(e) {
        let { selected } = this.updater.get();
        this['@{sync.line}'](selected);
    },

    '$win<scroll>'(e) {
        let that = this;
        clearTimeout(that['@{init.delay.timer}']);

        let { list, fixed, selected } = that.updater.get();
        let mainNode = $('#' + that.id);
        let width = mainNode.outerWidth(),
            height = mainNode.outerHeight();
        let scrollTop = $(window).scrollTop();
        let offset = mainNode.offset();
        let top = offset.top;

        if (scrollTop > top) {
            if (!fixed) {
                that.updater.digest({
                    fixed: true,
                    fixedStyle: {
                        left: offset.left,
                        right: $(window).width() - offset.left - width
                    }
                })
            }
        } else {
            if (fixed) {
                that.updater.digest({
                    fixed: false
                })
            }
        }

        let index = -1;
        for (let i = 0; i < list.length; i++) {
            let item = list[i];
            let { value } = item;
            let cont = $(`#${value}`);
            if (cont && cont.length) {
                let contTop = cont.offset().top,
                    contHeight = cont.outerHeight();
                let h = scrollTop + height;
                if ((h >= contTop) &&
                    (h < contTop + contHeight)) {
                    index = i;
                } else if (h >= contTop + contHeight) {
                    // 下一个
                    index = i + 1;
                }
            }
        }

        if ((index >= 0) && (index <= list.length - 1)) {
            let match = list[index];
            if (selected != match.value) {
                // 双向绑定
                that['@{select}'](match);

                // 更新线的位置
                that['@{sync.line}'](match.value);
            }
        } else {
            // 所有模块不在可视范围内，恢复到默认态
            that.updater.digest({
                fixed: false
            })

        }
    }
});