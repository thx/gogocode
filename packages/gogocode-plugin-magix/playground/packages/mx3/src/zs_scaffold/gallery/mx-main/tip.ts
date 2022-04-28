/*md5:3c2d2e0ce9092b2b98d9dfb6cc6b2827*/
import Magix from 'magix';
import * as View from '../mx-util/view';
Magix.applyStyle('@tip.less');

export default View.extend({
    tmpl: '@tip.html',
    init(extra) {
        this.assign(extra);
    },
    assign(extra) {
        // 当前数据截快照
        this.updater.snapshot();

        let data = extra.data || {};
        this.updater.set(data);

        // altered是否有变化 true：有变化
        let altered = this.updater.altered();
        return altered;
    },
    render() {
        this.updater.digest();
    }
});