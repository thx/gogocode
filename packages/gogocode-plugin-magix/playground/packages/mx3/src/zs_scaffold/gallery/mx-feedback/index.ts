/*md5:0f414ec86e947d595067d4da2fa11493*/
/**
 * UXRader包装
 * 详见：https://yuque.antfin-inc.com/uxradar/openapi/idgcdi
 */
import Magix from 'magix';
import * as $ from '$';
import * as View from '../mx-util/view';

export default View.extend({
    init(extra) {
        this.updater.set({
            config: extra
        })
        this['@{owner.node}'] = $(`#${this.id}`);
        this.on('destroy', () => {
            this['@{hide}']();
        })
    },
    render() {
        let that = this;
        let { config } = that.updater.get();

        let triggerType = config.triggerType || 'click';
        switch (triggerType) {
            case 'click':
                that['@{owner.node}'].off('click.feedback').on('click.feedback', () => {
                    that['@{prev.show}']();
                })
                break;
            case 'auto':
                that['@{prev.show}']();
                break;
        }

    },
    '@{prev.show}'() {
        let that = this;
        if (window.FeedBackLoader) {
            that['@{show}']();
        } else {
            seajs.use('//g.alicdn.com/mm/feedback-plus-loader/index.js', () => {
                that['@{show}']();
            })
        }
    },
    '@{show}'() {
        this['@{hide}']();

        // frequency
        // all：每次弹出
        // one：只弹出一次
        let { config } = this.updater.get();
        let styles = {};
        if ($.isEmptyObject(config.fdStyle)) {
            let triggerNode = this['@{owner.node}'];
            let offset = triggerNode.offset();
            let w = triggerNode.outerWidth(),
                h = triggerNode.outerHeight();
            styles = {
                position: 'absolute',
                top: `${offset.top + h + 10}px`,
                left: `${offset.left - 100}px`,
                zIndex: 10000000000
            };
        } else {
            styles = config.fdStyle;
        }

        this.$feedback = new FeedBackLoader({
            // version: '0.3.0',
            id: config.fdId,
            placement: config.placement,
            align: config.align,
            parentConId: this.id,
            frequency: config.fdFrequency || 'one',
            closeBtn: true,
            style: styles,
            needMask: (config.needMask + '' === 'true')
        });
    },
    '@{hide}'() {
        let instance = this.$feedback;
        if (instance) {
            if (instance.then) {
                instance.then(function (one) {
                    one.destroy()
                })
            } else {
                instance.destroy();
            }
        }
        // 带蒙层场景，destroy时蒙层没有删除掉，先修复下
        // $('.feedback_outer_contain_mask').remove();
    }
});