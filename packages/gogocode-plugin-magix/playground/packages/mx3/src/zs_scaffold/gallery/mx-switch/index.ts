/*md5:1ec77b8b654098095c1489adc1c5389d*/
import Magix from 'magix';
import * as $ from '$';
import * as View from '../mx-util/view';
import * as Dialog from '../mx-dialog/index';
Magix.applyStyle('@index.less');

export default View.extend({
    tmpl: '@index.html',
    mixins: [Dialog],
    init(extra) {
        this.updater.snapshot();
        this.assign(extra);
    },
    assign(extra) {
        let that = this;
        that.updater.snapshot();

        that['@{owner.node}'] = $('#' + that.id);

        // mx-disabled作为属性，动态更新不会触发view改变，兼容历史配置，建议使用disabled
        let disabled = (extra.disabled + '' === 'true') || $('#' + that.id)[0].hasAttribute('mx-disabled');

        // 当前状态
        let state = (extra.state + '' === 'true');

        that.updater.set({
            state,
            disabled,
            tip: extra.tip || '',
            confirmToTrue: extra.confirmToTrue || {},
            confirmToFalse: extra.confirmToFalse || {}
        });

        // 双向绑定
        that['@{owner.node}'].val(state);

        // altered是否有变化 true：有变化
        let altered = that.updater.altered();
        return altered;
    },
    render() {
        this.updater.digest();
    },
    '@{toggle}<click>'(e) {
        let that = this;
        let { disabled, state: curState, confirmToTrue, confirmToFalse } = that.updater.get();
        if (disabled) {
            return;
        }

        let state = !curState;
        let title = '', content = '';
        if (state && confirmToTrue.title && confirmToTrue.content) {
            // 切换为true，需要二次提示
            title = confirmToTrue.title;
            content = confirmToTrue.content;
        } else if (!state && confirmToFalse.title && confirmToFalse.content) {
            // 切换为false，需要二次提示
            title = confirmToFalse.title;
            content = confirmToFalse.content;
        }

        let enterCallback = () => {
            that.updater.digest({
                state
            });
            that['@{owner.node}'].val(state).trigger($.Event('change', {
                state
            }));
        };

        if (title && content) {
            that.confirm({
                title,
                content,
                enterCallback
            }, {
                type: 'warn',
                target: $(e.eventTarget)
            })
        } else {
            enterCallback();
        }
    }
});