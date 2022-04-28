import Magix from 'magix5';
Magix.applyStyle('@:./parent.less');
import View from '../../../../view';

export default View.extend({
    tmpl: '@:./parent.html',
    init() {},
    assign(extra) {
        this.set({
            name: '',
            show: false,
            disabled: false,
        });
    },
    async render() {
        await this.digest();
    },
    'watchInput<input>'(e: InputEvent & Magix5.MagixKeyboardEvent) {
        let { eventTarget } = e;
        let v = (eventTarget as HTMLInputElement).value.trim();
        this.set({
            name: v,
        });
    },
    'watchKeydown<keydown>'(e: Magix5.MagixKeyboardEvent) {
        let { code } = e;
        if (code == 'Enter') {
            this.digest();
        }
    },
    // 监听事件
    async 'show<change>'() {
        await this.digest({ show: true, disabled: true });
        // 两秒后隐藏
        setTimeout(() => {
            this.digest({ show: false, disabled: false });
        }, 2000);
    },
});
