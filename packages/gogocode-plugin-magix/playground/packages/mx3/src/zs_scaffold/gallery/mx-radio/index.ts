/*md5:c4edb2e9e2027776b308d28fd0fe1a2c*/
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
    }
});