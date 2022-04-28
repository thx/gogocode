/*md5:bc535eca5f8cd8c55049aaf145fb5abc*/
import Magix, { Vframe } from 'magix';
import * as $ from '$';
import * as View from '../mx-util/view';
Magix.applyStyle('@sub.less');

export default View.extend({
    tmpl: '@sub.html',
    init(extra) {
        this.updater.snapshot();
        this.assign(extra);

        // 样式修正，自然撑开
        let pop = $(`#${this.id}`).closest('.@../mx-popover/index.less:popover');
        pop.css({
            width: 'auto',
            minWidth: pop.outerWidth()
        })
    },
    assign(extra) {
        let that = this;
        let altered = that.updater.altered();

        let data = $.extend(true, {}, extra.data);
        let { valueKey, linkKey, outerKey, nav, child } = data;

        let info = nav.hasInfo ? (nav.info || {}) : {};
        nav.groups.forEach(group => {
            group.cur = false;
            group.subs.forEach(sub => {
                if (child == sub[valueKey]) {
                    group.cur = true;

                    if (sub.info) {
                        info = sub.info;
                    }
                }
            })
        })

        that.updater.set({
            info,
            ...data,
            linkFn: (item) => {
                let t = ` href=${item[linkKey]} `;
                if (item[outerKey] + '' !== 'false') {
                    // 默认true 外链打开
                    t += ' target=_blank ';
                }
                return t;
            },
        });

        if (!altered) {
            altered = that.updater.altered();
        }
        if (altered) {
            that.updater.snapshot();
            return true;
        }
        return false;
    },

    render() {
        this.updater.digest();
    },

    'showInfo<mouseover>'(event) {
        if (Magix.inside(event.relatedTarget, event.eventTarget)) {
            return;
        }

        let that = this;
        let { groupIndex, subIndex } = event.params;
        let { nav } = that.updater.get();
        if (nav.hasInfo) {
            that.updater.digest({
                info: nav.groups[groupIndex].subs[subIndex].info || {}
            })
        }
    },

    'change<click>'(event) {
        let { ownerId, nav } = this.updater.get();
        let { sub } = event.params;
        let navVf = Vframe.get(ownerId);
        navVf.invoke('changeSub<click>', [{
            params: {
                nav,
                sub
            }
        }])
    },
});