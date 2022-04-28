/*md5:41b7b45980452d5c6fff852803b45e01*/
import Magix from 'magix';
import * as $ from '$';
import * as View from '../mx-util/view';
import * as Dialog from '../mx-dialog/index';
Magix.applyStyle('@base.less');

export default View.extend({
    tmpl: '@content.html',
    mixins: [Dialog],
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
    'select<click>'(e) {
        let that = this;
        let item = e.params.item;
        let cur = that.updater.get('cur');
        if (cur.value == item.value) {
            return;
        }

        let enterCallback = () => {
            $('#' + that.id).trigger({
                type: 'change',
                status: item
            })
        }

        if (item.confirmTitle && item.confirmContent) {
            that.confirm({
                title: item.confirmTitle,
                content: item.confirmContent,
                enterCallback
            })
        } else {
            enterCallback();
        }
    }
});