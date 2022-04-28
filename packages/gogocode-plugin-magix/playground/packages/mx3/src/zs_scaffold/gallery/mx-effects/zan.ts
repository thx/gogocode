/*md5:f6f203c336cfa2e6efb37c641a2a748b*/
import Magix from 'magix';
import * as $ from '$';
import * as View from '../mx-util/view';
Magix.applyStyle('@zan.less');

export default View.extend({
    tmpl: '@zan.html',
    init(extra) {
        this.updater.snapshot();
        this.assign(extra);
    },
    assign(extra) {
        let that = this;

        // 当前数据截快照
        that.updater.snapshot();
        that['@{owner.node}'] = $('#' + that.id);

        let zan = (extra.state + '' === 'true'),
            cai = (extra.state + '' === 'false');
        that.updater.set({
            zan,
            cai,
        });

        // 双向绑定
        that['@{owner.node}'].val((zan || cai) ? extra.state : '');

        // altered是否有变化 true：有变化
        let altered = that.updater.altered();
        return altered;
    },
    render() {
        this.updater.digest();
    },
    '@{toggle}<click>'(e) {
        let that = this;
        let state = e.params.state + '';
        let zan = state === 'true';
        that.updater.digest({
            zan,
            cai: !zan,
        });
        that['@{owner.node}'].val(state).trigger($.Event('change', {
            state: zan
        }));
    }
});