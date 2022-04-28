/*md5:57da7c0c111455a74b8a7fe25cd53158*/

import Magix from 'magix';
import * as $ from '$';
import * as View from '../mx-util/view';

export default View.extend({
    init(extra) {
        let that = this;
        that.updater.set({
            popId: `status_${that.id}`
        })

        that.on('destroy', () => {
            that['@{owner.node}'].off('mouseenter mouseleave');
            ['@{dealy.show.timer}', '@{dealy.hide.timer}'].forEach(key => {
                if (that[key]) {
                    clearTimeout(that[key]);
                }
            })

            let { popId } = that.updater.get();
            $(`#${popId}`).remove();
        });

        let oNode = $('#' + that.id);
        that['@{owner.node}'] = oNode;
        oNode.hover(() => {
            clearTimeout(that['@{dealy.hide.timer}']);
            that['@{dealy.show.timer}'] = setTimeout(that.wrapAsync(() => {
                //等待内容显示
                that['@{show}']();
            }), 200);
        }, () => {
            that['@{delay.hide}']();
        });

        that.assign(extra);
    },
    assign(extra) {
        // 当前数据截快照
        this.updater.snapshot();

        let originOpers = extra.opers || [];
        let selected = (extra.selected === null || extra.selected === undefined) ? '' : extra.selected,
            info = extra.info || {};

        this.updater.set({
            mode: extra.mode || 'icon',
            info,
            showInfo: !$.isEmptyObject(info), // 是否有提示信息
            originOpers,
            selected,
        });
        this['@{owner.node}'].val(selected);

        // altered是否有变化 true：有变化
        let altered = this.updater.altered();
        return altered;
    },
    render() {
        let { selected, originOpers } = this.updater.get();
        let opers = $.extend(true, [], originOpers);

        // 当前项在最前面
        let cur = {};
        if (opers.length > 0) {
            for (var i = 0; i < opers.length; i++) {
                if (opers[i].value + '' === selected + '') {
                    cur = opers[i];
                    opers.splice(i, 1);
                    break;
                }
            }
            if (!$.isEmptyObject(cur)) {
                opers.unshift(cur);
            }
        }
        this.updater.digest({
            cur,
            opers,
        });
    },
    '@{init}'() {
        let that = this;

        let { popId } = that.updater.get();
        if (!$(`#${popId}`).length) {
            $(document.body).append(`<div mx-view class="mx-shadow @base.less:status-info" id="${popId}"></div>`);
        }

        // 先实例化，绑定事件，再加载对应的view
        let vf = that.owner.mountVframe(popId, '');
        vf.on('created', () => {
            let popNode = $(`#${popId}`);
            that['@{setPos}'](popNode);

            popNode.hover(() => {
                clearTimeout(that['@{dealy.hide.timer}']);
            }, () => {
                that['@{delay.hide}']();
            });

            popNode.off('change.status').on('change.status', (e) => {
                that['@{hide}']();

                let selected = e.status.value;
                that.updater.set({ selected });
                that.render();

                $('#' + that.id).val(selected).trigger({
                    type: 'change',
                    status: e.status
                })
            })
        });
    },
    '@{delay.hide}'() {
        let that = this;
        clearTimeout(that['@{dealy.show.timer}']);
        clearTimeout(that['@{dealy.hide.timer}']);
        that['@{dealy.hide.timer}'] = setTimeout(that.wrapAsync(() => {
            that['@{hide}']();
        }), 200);
    },
    '@{hide}'() {
        let { expand, popId } = this.updater.get();
        if (expand) {
            this.updater.digest({
                expand: false
            });

            // 样式
            $(`#${popId}`).removeClass('@base.less:status-show');
        }
    }
});