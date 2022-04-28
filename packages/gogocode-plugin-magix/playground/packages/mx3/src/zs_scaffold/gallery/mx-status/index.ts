/*md5:79d64cb00e83cfedf67960d913d083ac*/
import Magix, { Vframe } from 'magix';
import * as $ from '$';
import Base from './base';
Magix.applyStyle('@./base.less');
export default Base.extend({
    tmpl: '@index.html',
    '@{setPos}'(popNode) {
        let oNode = this['@{owner.node}'];
        let { top, left } = oNode.offset();
        let iconNode = popNode.find('.@./base.less:status-icon');
        let popOffset = popNode.offset(),
            iconOffset = $(iconNode[0]).offset();
        popNode.css({
            top: top - (iconOffset.top - popOffset.top),
            left: left - (iconOffset.left - popOffset.left)
        });
    },
    '@{show}'() {
        let that = this;
        let { opers, info, cur, showInfo, expand, mode, popId } = that.updater.get();
        if (expand || (opers.length == 0 && mode == 'text' && showInfo && !info.tipView && !info.tip)) {
            // 不显示的特殊场景
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