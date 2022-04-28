/*md5:86a2909ec77a225a5e56fdad6b3599af*/
import Magix, { Vframe } from 'magix';
import * as $ from '$';
import Base from './base';
Magix.applyStyle('@./base.less');
export default Base.extend({
    tmpl: '@dropdown.html',
    '@{setPos}'(popNode) {
        let oNode = this['@{owner.node}'];
        let { top, left } = oNode.offset();
        popNode.css({
            top: top + oNode.outerHeight() + 10,
            left: left
        });
    },
    '@{show}'() {
        let that = this;
        let { opers, info, cur, showInfo, expand, popId } = that.updater.get();
        if (expand || (opers.length == 0 && showInfo && !info.tip && !info.tipView)) {
            return;
        }

        that.updater.digest({
            expand: true
        })

        // 初始化
        if (!that['@{pos.init}']) {
            that['@{pos.init}'] = true;
            that['@{init}']();
        }

        let vf = Vframe.get(popId);
        if (vf) {
            vf.unmountView();
        };
        vf.mountView('@./content', {
            data: {
                cur,
                info,
                opers,
                showInfo
            },
            prepare: () => {
                // 样式
                let popNode = $(`#${popId}`);
                popNode.addClass('@base.less:status-show');

                // 定位
                that['@{setPos}'](popNode);
            }
        });
    },
});