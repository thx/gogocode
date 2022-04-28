/*md5:1288b11bd016e71bbf85dedf74e932e3*/
import Magix from 'magix';
import * as $ from '$';
import * as View from '../mx-util/view';
Magix.applyStyle('@index.less');

export default View.extend({
    tmpl: '@index.html',
    init(extra) {
        this.assign(extra);
    },
    assign(extra) {
        let that = this;
        that.updater.snapshot();

        that['@{origin.list}'] = JSON.parse(JSON.stringify(extra.list || []));
        let textKey = extra.textKey || 'text',
            valueKey = extra.valueKey || 'value',
            linkKey = extra.linkKey || 'link',
            selected = extra.selected || '';
        let selectedIndex = that['@{origin.list}'].length - 1;
        let list = that['@{origin.list}'].map((item, i) => {
            if (item[valueKey] == selected) {
                selectedIndex = i;
            }
            return {
                ...item,
                text: item[textKey],
                value: item[valueKey],
                link: item[linkKey],
            }
        });
        this.updater.set({
            showHomeIcon: extra.showHomeIcon + '' !== 'false', // 默认true
            homeIcon: extra.homeIcon,
            gapIcon: extra.gapIcon,
            list,
            selectedIndex,
        });

        that['@{owner.node}'] = $('#' + that.id);
        that['@{owner.node}'].val(selected);

        // altered是否有变化 true：有变化
        let altered = that.updater.altered();
        return altered;
    },

    render() {
        this.updater.digest();
    },

    '@{select}<click>'(e) {
        let that = this;
        let item = e.params.item;
        let { selected } = that.updater.get();
        if (selected == item.value) {
            return;
        }

        let { value, text } = item;
        let event = $.Event('change', {
            item: item,
            value,
            text,
            selected: value,
        });
        that['@{owner.node}'].trigger(event);
        if (!e.isDefaultPrevented()) {
            // 支持外部同步校验，event.preventDefault()
            that['@{owner.node}'].val(value);

            let originList = that['@{origin.list}'];
            let selectedIndex = originList.length - 1;
            for (let i = 0; i < originList.length; i++) {
                if (originList[i].value == value) {
                    selectedIndex = i;
                    break;
                }
            }
            that.updater.digest({
                selectedIndex,
            });
        }
    }
});
