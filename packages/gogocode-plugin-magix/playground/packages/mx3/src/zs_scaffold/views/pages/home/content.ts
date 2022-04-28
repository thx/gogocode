import Magix from 'magix';
import View from 'zs_scaffold/view';

export default View.extend({
    tmpl: '@content.html',
    init(extra) {
        this.assign(extra);
    },
    assign(extra, configs) {
        let that = this;

        // 当前数据截快照
        that.updater.snapshot();

        // 影响当前view的参数
        that.updater.set({
            ...extra
        });

        // altered是否有变化 true：有变化
        let altered = that.updater.altered();
        return altered;
    },
    render() {
        this.updater.digest();
    }
});
