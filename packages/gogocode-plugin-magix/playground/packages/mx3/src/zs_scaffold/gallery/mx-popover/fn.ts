/*md5:87026e656d64c6260d542fa8adabc697*/

/**
 * 支持事件处理的popover
 * 只支持纯文本类型
 */
import Magix, { Vframe } from 'magix';
import * as $ from '$';
import Base from './index';
Magix.applyStyle('@index.less');

export default Base.extend({
    '@{setPos}'() {
        let me = this;
        let popNode = $('#popover_' + me.id);
        if (!popNode || !popNode.length) {
            return;
        };

        let oNode = me['@{owner.node}'];
        let placement = me['@{pos.placement}'],
            align = me['@{pos.align}'];
        let place = placement + '_' + align;
        let pWidth = popNode.outerWidth(),
            pHeight = popNode.outerHeight(),
            oWidth = oNode.outerWidth(),
            oHeight = oNode.outerHeight(),
            { left: oLeft, top: oTop } = oNode.offset();

        // {scroll.wrapper} 需要设置为relative
        let sNode = $(me['@{scroll.wrapper}']);
        let top = oTop - sNode.offset().top,
            left = oLeft - sNode.offset().left;

        // 可选组合：
        //     下：右中左
        //     上：右中左
        //     右：上中下
        //     左：上中下
        switch (place) {
            case 'top_left':
                top = top - pHeight - 10;
                break;
            case 'top_center':
                top = top - pHeight - 10;
                left = left - (pWidth - oWidth) / 2
                break;
            case 'top_right':
                top = top - pHeight - 10;
                left = left + oWidth - pWidth;
                break;
            case 'bottom_left':
                top = top + oHeight + 10;
                break;
            case 'bottom_center':
                top = top + oHeight + 10;
                left = left - (pWidth - oWidth) / 2
                break;
            case 'bottom_right':
                top = top + oHeight + 10;
                left = left + oWidth - pWidth;
                break;
            case 'left_top':
                left = left - pWidth - 10;
                break;
            case 'left_center':
                top = top - (pHeight - oHeight) / 2;
                left = left - pWidth - 10;
                break;
            case 'left_bottom':
                top = top - (pHeight - oHeight);
                left = left - pWidth - 10;
                break;
            case 'right_top':
                left = left + oWidth + 10;
                break;
            case 'right_center':
                top = top - (pHeight - oHeight) / 2;
                left = left + oWidth + 10;
                break;
            case 'right_bottom':
                top = top - (pHeight - oHeight);
                left = left + oWidth + 10;
                break;
        }

        // 相对位移
        let customOffset = me['@{pos.offset}'] || {};
        if (!$.isEmptyObject(customOffset)) {
            left += (customOffset.left || 0);
            top += (customOffset.top || 0);
        }
        popNode.css({
            textAlign: me['@{text.align}'],
            left,
            top
        });
        return popNode;
    },
    '@{init}'() {
        let me = this;
        let vId = me.id;

        let popId = `popover_${vId}`;
        $(`#${popId}`).remove();

        let owner = $(me['@{scroll.wrapper}']);
        if (!owner || !owner.length) {
            console.error('请指定事件节点scroll-wrapper');
            return;
        }
        $(me['@{scroll.wrapper}']).css({
            position: 'relative'
        }).append(`<div id="${popId}" class="@index.less:popover-hide ${me['@{pos.class}']}" 
            style="width: ${me['@{width}']}px; z-index: 99999;">
            <div class="@index.less:popover-content">${me['@{content}']}</div>
        </div>`);

        let popNode = me['@{setPos}']();
        popNode.hover(() => {
            clearTimeout(me['@{dealy.hide.timer}']);
        }, () => {
            me['@{hide}']();
        });
    },
    '@{show}'() {
        let me = this;
        clearTimeout(me['@{dealy.show.timer}']);
        me['@{init}']();

        let popNode = $(`#popover_${me.id}`);
        popNode.removeClass('@index.less:popover-hide');
        popNode.addClass('@index.less:show-out');

        // trigger
        me['@{owner.node}'].trigger('focusin');
    },
    '@{hide}'() {
        let me = this;

        clearTimeout(me['@{dealy.show.timer}']);
        clearTimeout(me['@{dealy.hide.timer}']);
        let { hideDelay } = me.updater.get('constants');
        me['@{dealy.hide.timer}'] = setTimeout(me.wrapAsync(() => {
            // 样式
            let popNode = $('#popover_' + me.id);
            popNode.removeClass('@index.less:show-out');

            // trigger
            me['@{owner.node}'].trigger('focusout');
        }), hideDelay);
    }
});