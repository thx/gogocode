/*md5:271ce34326220aeeaf9f31d4bda85a6a*/
import Magix from 'magix';
import * as $ from '$';
import * as Base from './base';
Magix.applyStyle('@index.less');
const Width = 150;
const Height = 36;
const Duration = 250;
const Tmpl = '@index.html';

export = Magix.mix({
    '@{loading.build}'() {
        let me = this;
        let maskId = me.id + '_loading';
        let node = $('#' + maskId);
        if (!node.length) {
            let tmpl = $.isFunction(Tmpl) ? Tmpl({
                viewId: maskId,
                width: Width,
                height: Height
            }, me.id) : Tmpl;
            $(document.body).append(tmpl);
            node = $('#' + maskId);
        }
        return node;
    },

    showLoading(closeMask) {
        let me = this;
        me['@{clear.timers}']();

        let maskId = me.id + '_loading';
        let node = me['@{loading.build}']();
        let left = ((window.innerWidth - Width) / 2) | 0;
        let top = ((window.innerHeight - Height) / 2) | 0;
        node.css({
            display: 'block',
            left: left,
            top: top
        });
        me['@{show.timer}'] = setTimeout(() => {
            node.css({
                opacity: 1
            });
        }, Duration)

        // 是否禁止选择
        if (!closeMask) {
            let backNode = $('#' + maskId + '_mask');
            if (!backNode.length) {
                $(document.body).append('<div id="' + maskId + '_mask" class="@index.less:mask-loading-backdrop"></div>');
                backNode = $('#' + maskId + '_mask');
            }
            backNode.css({
                display: 'block'
            });
            me['@{show.mask.timer}'] = setTimeout(() => {
                backNode.css({
                    opacity: 1
                });
            }, Duration)
        }
    }
}, Base);