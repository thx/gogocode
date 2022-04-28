/*md5:d327329de3bcc54d8289b013940641d9*/
import Magix from 'magix';
import * as $ from '$';
import * as View from '../mx-util/view';
Magix.applyStyle('@../mx-main/hor.less');
Magix.applyStyle('@pipeline.less');

export default View.extend({
    tmpl: '@pipeline.html',
    init(e) {
        this.updater.snapshot();
        this.assign(e);
    },
    assign(e) {
        let that = this;
        let altered = that.updater.altered();

        let list = e.list || [];
        let selected = e.selected; // 不需要默认匹配
        let cur = list[selected] || {};

        let len = list.length;
        let pd = parseInt(50 / len); //间隔

        let color = e.color || '#FF0036';
        that.updater.set({
            mode: e.mode || 'circle',
            logo: e.logo,
            color,
            colorGradient: e.colorGradient || color,
            selected,
            cur,
            list,
            len,
            pd
        });

        if (!altered) {
            altered = that.updater.altered();
        }
        if (altered) {
            that.updater.snapshot();
            return true;
        }
        return false;
    },
    render() {
        this.updater.digest();
    }
});