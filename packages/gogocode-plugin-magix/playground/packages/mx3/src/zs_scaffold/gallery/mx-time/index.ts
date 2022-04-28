/*md5:b7584495b94f7197a740692290294b6a*/
import Magix from 'magix';
import * as $ from '$';
import * as View from '../mx-util/view';
import * as Monitor from '../mx-util/monitor';
let format = t => {
    if (t < 10) return '0' + t;
    return t;
};
export default View.extend({
    tmpl: '@index.html',
    init(extra) {
        let me = this;
        me['@{owner.node}'] = $('#' + me.id);

        // mx-disabled作为属性，动态更新不会触发view改变，兼容历史配置，建议使用disabled
        let disabled = (extra.disabled + '' === 'true') || $('#' + me.id)[0].hasAttribute('mx-disabled');

        Monitor['@{setup}']();
        me.on('destroy', () => {
            Monitor['@{remove}'](me);
            Monitor['@{teardown}']();

            if (me['@{anim.timer}']) {
                clearTimeout(me['@{anim.timer}']);
            }
        });

        let time = extra.time;
        if (!time) {
            let d = new Date();
            time = format(d.getHours()) + ':' +
                format(d.getMinutes()) + ':' +
                format(d.getSeconds());
        }

        me.updater.set({
            viewId: me.id,
            disabled,
            time,
            types: extra.types,
            expand: false //列表是否展开
        });
        me['@{owner.node}'].val(time);
    },
    render() {
        this.updater.digest();
    },
    '@{hide}'() {
        let me = this;
        let expand = me.updater.get('expand');
        if (expand) {
            me.updater.digest({
                expand: false
            });
            Monitor['@{remove}'](me);
        }
    },

    '@{show}'() {
        let me = this;
        let expand = me.updater.get('expand');
        if (!expand) {
            let d = {
                expand: true
            }
            let r = me.updater.get('rList');
            if (!r) {
                d.rList = true;
            }
            me.updater.digest(d);
            Monitor['@{add}'](me);
        }
    },

    '@{toggle}<click>'(e) {
        let me = this;
        if (me.updater.get('animing')) {
            return;
        };

        // 扩散动画时长变量
        let ms = me['@{get.css.var}']('--mx-comp-expand-amin-timer');

        // 只记录状态不digest
        let node = e.eventTarget;
        me.updater.set({ animing: true })
        node.setAttribute('mx-comp-expand-amin', 'animing');
        me['@{anim.timer}'] = setTimeout(() => {
            node.setAttribute('mx-comp-expand-amin', 'animend');
            me.updater.set({ animing: false })
        }, ms.replace('ms', ''));

        let expand = me.updater.get('expand');
        if (expand) {
            me['@{hide}']();
        } else {
            me['@{show}']();
        }
    },
    '@{inside}'(node) {
        return Magix.inside(node, this.id);
    },
    '@{hide}<click>'(e) {
        let me = this;

        let oldTime = me.updater.get('time');
        let newTime = oldTime;
        if (e.params.enter) {
            // 确定
            let vf = Magix.Vframe.get(me.id + '_content');
            newTime = vf.invoke('val');
        }
        me['@{hide}']();
        if (e.params.enter) {
            // 确定
            if (oldTime != newTime) {
                me.updater.digest({
                    time: newTime
                });
                me['@{owner.node}'].val(newTime).trigger({
                    type: 'change',
                    time: newTime
                });
            }
        }
    },
    '@{stop}<change,focusin,focusout>'(e) {
        e.stopPropagation();
    }
});