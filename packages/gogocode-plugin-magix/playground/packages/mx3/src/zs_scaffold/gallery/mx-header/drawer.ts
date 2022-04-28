/*md5:aa8a7a7bd1cdfc99e00aa282a4b9c170*/
import Magix from 'magix';
import * as $ from '$';
import * as View from '../mx-util/view';
import * as Dialog from '../mx-dialog/index';
Magix.applyStyle('@drawer.less');

export default View.extend({
    tmpl: '@drawer.html',
    mixins: [Dialog],
    init(extra) {
        this.updater.set(extra.data);
    },
    render() {
        this.updater.digest({
            height: window.innerHeight
        });

        let dlg = $(`#${this.id}`).closest('.@../mx-dialog/index.less:dialog');
        if (dlg && dlg.length) {
            dlg.find('.@../mx-dialog/index.less:dialog-close').css({
                display: 'none'
            })
        }
    },
    /**
     * bizCode：各产品bizCode，用于包装登陆框逻辑
     * loginView：已废弃，用bizCode替换，根据bizCode项目包装登陆框逻辑（历史逻辑依然兼容）
     */
    'showLogin<click>'(e) {
        let { bizCode, loginView } = this.updater.get();
        if (!bizCode) {
            this.mxLoginView(loginView);
        } else {
            this.mxLoginView({
                bizCode
            });
        }
    }
});