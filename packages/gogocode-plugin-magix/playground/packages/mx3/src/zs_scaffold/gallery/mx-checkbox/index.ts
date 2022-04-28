/*md5:13c261c4044ffe2b80c9f5a752a39d32*/
import Magix from 'magix';
import * as View from '../mx-util/view';
Magix.applyStyle('@index.less');

export default View.extend({
    tmpl: '@index.html',
    init(extra) {
        this.assign(extra);
    },
    assign(extra) {
        let that = this;

        // 当前数据截快照
        that.updater.snapshot();

        // 影响参数
        that.updater.set({
            checked: (extra.checked + '') === 'true',
            disabled: (extra.disabled + '') === 'true',
            indeterminate: (extra.indeterminate + '') === 'true',
            name: extra.name || '',
            value: extra.value || '',
            text: extra.text || '',
            tip: extra.tip || '',
            tagContent: extra.tagContent || '',
            tagColor: extra.tagColor || 'var(--color-red)',
        })

        // altered是否有变化
        let altered = this.updater.altered();
        return altered;
    },
    render() {
        this.updater.digest();
    },
    /**
     * 外部mx-stickytable里调用
     */
    setData(data) {
        this.updater.digest(data);

        let { disabled } = this.updater.get();
        document.getElementById(this.id).setAttribute('mx-checkbox-disabled', disabled);
    },
    /**
     * 外部mx-stickytable里调用
     */
    getData() {
        return this.updater.get();
    },
    '@{change}<change>'(e) {
        this.updater.digest({
            checked: e.target.checked,
            indeterminate: false
        })
    }
});