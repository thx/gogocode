/*md5:01c679900bd4bf6edc6d515819cef24e*/
import Magix from 'magix';
import * as View from '../mx-util/view';
import * as $ from '$';
Magix.applyStyle('@index.less');

export default View.extend({
    tmpl: '@index.html',
    init(extra) {
        let that = this;
        that['@{owner.node}'] = $('#' + that.id);

        that.owner.oncreated = () => {
            // 所有子view加载完成后
            if (!that.$init) {
                that.$init = 1;

                // 计算实际高度
                let { viewId, list } = that.updater.get();
                list.forEach((item, index) => {
                    let content = $('#' + viewId + '_content_' + index);
                    item.height = content.outerHeight();
                })
                that.updater.digest({
                    list
                })
            }
        };
        that.ondestroy = () => {
            that.owner.off('created');
        }

        that.assign(extra);
    },
    assign(extra) {
        let that = this;
        that.updater.snapshot();

        that.updater.set({
            onlyOne: (extra.onlyOne + '' !== 'false'), // 是否只展示一个：默认为true
            originList: extra.list || [] // 初始展示列表
        });

        let altered = that.updater.altered();
        return altered;
    },
    render() {
        // trigger oncreated
        // 每次重新render的时候重新触发
        this.$init = null;

        let { originList } = this.updater.get();
        let list = $.extend(true, [], originList);
        let hasExpand = false;
        list.forEach((item, index) => {
            if (!item.arrow) {
                item.arrow = '<span class="mc-iconfont" style="font-size: 14px;">&#xe602;</span>';
            }
            if (!item.view) {
                item.view = '@./content';
            }
            item.expand = item.expand || false;
            if (item.disabled) {
                // 禁用的不展开
                item.expand = false;
            }
            hasExpand = hasExpand || item.expand;
        })
        if (!hasExpand) {
            // 默认展开非禁用第一个
            for (let i = 0; i < list.length; i++) {
                if (!list[i].disabled) {
                    list[i].expand = true;
                    break;
                }
            }
        }
        this.updater.digest({
            list
        });
        if (!hasExpand) {
            // 组件内默认展开的情况，外抛事件通知展开状态变更
            this['@{fire}']();
        }
    },

    '@{fire}'() {
        let { list } = this.updater.get();
        this['@{owner.node}'].trigger({
            type: 'change',
            expands: list.map(item => {
                return item.expand
            })
        })
    },

    'toggle<click>'(event) {
        let cur = event.params.index;
        let { list, onlyOne } = this.updater.get();
        list.forEach((item, index) => {
            if (index == cur) {
                item.expand = !item.expand;
            } else {
                if (onlyOne) {
                    item.expand = false;
                }
            }
        })
        this.updater.digest({
            list
        })
        this['@{fire}']();
    }
});