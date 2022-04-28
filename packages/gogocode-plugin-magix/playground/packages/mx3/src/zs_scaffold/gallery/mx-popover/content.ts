/*md5:1a138c81526c3a53da413b910411e60a*/
import Magix from 'magix';
import * as View from '../mx-util/view';
Magix.applyStyle('@index.less');

export default View.extend({
    tmpl: '@content.html',
    init(extra) {
        let that = this;
        this.assign(extra);

        that.owner.oncreated = () => {
            if (!that.$init) {
                let viewOptions = that.viewOptions;
                if (viewOptions.prepare) {
                    viewOptions.prepare();
                }
                that.$init = 1;
            }
        };
        that.ondestroy = () => {
            that.owner.off('created');
        };
    },
    assign(extra) {
        this.updater.snapshot();

        this.viewOptions = extra;
        this.updater.set(extra.data);

        // altered是否有变化 true：有变化
        let altered = this.updater.altered();
        return altered;
    },
    render() {
        this.updater.digest();
    },
});