/*md5:5e6d1156299663d4093f306fa6e92466*/
import Magix from 'magix';
import * as $ from '$';
const Duration = 250;

export = {
    ctor() {
        let me = this;
        let maskId = me.id + '_loading';
        me.on('destroy', () => {
            me.hideLoading();

            // 删除节点
            [maskId, `${maskId}_mask`].forEach(key => {
                let node = $(`#${key}`);
                if (node && node.length) {
                    node.remove();
                }
            });

            me['@{clear.timers}']();
        });
    },

    '@{clear.timers}'() {
        // 清除timer
        ['@{show.timer}', '@{show.mask.timer}', '@{hide.timer}', '@{hide.mask.timer}'].forEach(key => {
            if (this[key]) {
                clearTimeout(this[key]);
            }
        })
    },

    hideLoading() {
        let me = this;
        let maskId = me.id + '_loading';
        let node = $('#' + maskId);
        node.css({
            opacity: 0
        });
        this['@{hide.timer}'] = setTimeout(() => {
            node.css({
                display: 'none'
            });
        }, Duration)

        let backNode = $('#' + maskId + '_mask');
        if (backNode.length > 0) {
            backNode.css({
                opacity: 0
            });
            this['@{hide.mask.timer}'] = setTimeout(() => {
                backNode.css({
                    display: 'none'
                });
            }, Duration)
        }
    }
};