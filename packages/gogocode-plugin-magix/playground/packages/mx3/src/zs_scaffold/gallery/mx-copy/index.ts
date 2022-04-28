/*md5:72164b7de0b4aacc7821858c3e054c64*/
'top@./vendor/_clipboard.js';
import Magix from 'magix';
import * as $ from '$';
import * as View from '../mx-util/view';
Magix.applyStyle('@index.less');

export default View.extend({
    init(extra) {
        let that = this;
        that.assign(extra);

        let owner = $('#' + that.id);
        let options = {};
        if (that['@{copy.node}']) {
            // 复制另外一个节点
            options = {
                target() {
                    return Magix.node(that['@{copy.node}']);
                }
            };

        } else {
            // 复制本节点信息
            options = {
                text(trigger) {
                    return extra.copyText;
                }
            };
        }

        let clipboard = new window.Clipboard(owner[0], options);
        clipboard.on('success', (e) => {
            e.clearSelection();
            owner.trigger('success');
        });
        clipboard.on('error', () => {
            owner.trigger('error');
        });
        that.capture('@{clipboard}', clipboard);
    },
    assign(extra) {
        this['@{copy.node}'] = extra.copyNode;
        return true;
    }
});