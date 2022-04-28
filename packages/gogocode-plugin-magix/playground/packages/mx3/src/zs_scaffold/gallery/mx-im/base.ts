/*md5:6744fda69d39cad6df041e1dbf7fcf68*/
/**
 * 包装新版万象组件
 * https://yuque.antfin-inc.com/nue/everywhere/gdb60g
 */
import Magix, { Router } from 'magix';
import * as $ from '$';
import * as View from '../mx-util/view';
import * as Dialog from '../mx-dialog/index';

export default View.extend({
    mixins: [Dialog],
    getCurSourceId() {
        let data = this.updater.get();
        let sourceList = data.sourceList,
            defaultSourceId = data.defaultSourceId;

        let loc = Router.parse();
        let path = loc.path;
        let params = loc.params;
        let cur = {};
        for (let i = 0; i < sourceList.length; i++) {
            let hash = sourceList[i].hash;
            // 比较路径
            let equal = (hash.path == path);

            // 比较参数：当前参数包含配置参数即匹配中
            for (let key in hash.params) {
                equal = equal && (hash.params[key] == params[key]);
            }

            if (equal) {
                cur = sourceList[i];
                break;
            }
        }
        return $.isEmptyObject(cur) ? defaultSourceId : cur.id;
    },

    'openDlg<click>'() {
        let { url } = this.updater.get();
        this.mxDialog('@./dlg', {
            data: {
                url
            }
        }, {
            width: 960,
            height: 700,
            mask: true
        });

    }
});