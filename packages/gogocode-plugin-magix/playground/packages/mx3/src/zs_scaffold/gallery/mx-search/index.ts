/*md5:5378696366a9506edc63410aa967021d*/
import Magix from 'magix';
import * as $ from '$';
import * as View from '../mx-util/view';
import * as Monitor from '../mx-util/monitor';
Magix.applyStyle('@index.less');

export default View.extend({
    tmpl: '@index.html',
    init(extra) {
        let that = this;
        that.updater.snapshot();
        that.assign(extra);

        Monitor['@{setup}']();

        that.on('destroy', () => {
            Monitor['@{remove}'](that);
            Monitor['@{teardown}']();

            if (that['@{search.delay.timer}']) {
                clearTimeout(that['@{search.delay.timer}']);
            }
        })
    },
    assign(data) {
        let that = this;
        let altered = that.updater.altered();

        //当前选中的key值
        that['@{search.key}'] = data.searchKey || '';

        // 上下键切换缓存
        that['@{search.key.bak}'] = that['@{search.key}'];

        //当前填入的搜索内容
        that['@{search.value}'] = data.searchValue || '';

        that['@{dis.placeholder}'] = data.placeholder || '';
        that['@{dis.align}'] = data.align || 'left';

        // 多种类型搜索的时候
        let list = [];
        if (data.list) {
            let listText = data.listText || 'text';
            let listValue = data.listValue || 'value';
            try {
                list = (new Function('return ' + data.list))();
            } catch (e) {
                list = data.list
            }
            list = list.map((item) => {
                let tpls = (item.tmpl || ('搜索含有 “${content}” 的' + item[listText])).split('${content}');
                return {
                    prefix: tpls[0],
                    suffix: tpls[1],
                    text: item[listText],
                    value: item[listValue]
                }
            })
            if (!that['@{dis.placeholder}']) {
                let ts = list.map(item => {
                    return item.text;
                });
                that['@{dis.placeholder}'] = ts.join('/');
            }
        } else {
            if (!that['@{dis.placeholder}']) {
                that['@{dis.placeholder}'] = '搜索';
            }
        }
        that['@{data.list}'] = list;

        that.updater.set({
            list: that['@{data.list}'],
            searchKey: that['@{search.key}'],
            searchValue: that['@{search.value}'],
            placeholder: that['@{dis.placeholder}'],
            align: that['@{dis.align}']
        });
        that['@{owner.node}'] = $('#' + that.id);

        // 双向绑定初始化
        that['@{owner.node}'].val(that['@{search.value}']);

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

    '@{hide}'() {
        let that = this;
        if (that['@{search.key}'] != that['@{search.key.bak}']) {
            // 上下键切换未选择
            that['@{search.key}'] = that['@{search.key.bak}'];
        }

        that.updater.digest({
            searchKey: that['@{search.key}'],
            searchValue: that['@{search.value}'],
            show: false
        })

        Monitor['@{remove}'](that);
    },

    '@{show}'() {
        let that = this;
        that.updater.digest({
            searchKey: that['@{search.key}'],
            searchValue: that['@{search.value}'],
            show: true
        })

        Monitor['@{add}'](that);
    },

    '@{inside}'(node) {
        return Magix.inside(node, this.id);
    },

    '@{search}<focusin,keyup,paste>'(e) {
        e.stopPropagation();
        let that = this;
        if (that['@{search.delay.timer}']) {
            clearTimeout(that['@{search.delay.timer}']);
        }

        let show = that.updater.get('show'),
            list = that['@{data.list}'];
        if (e.keyCode == 40 || e.keyCode == 38) {
            // 下移 || 上移
            if (show) {
                let idx = -1,
                    searchKey = that['@{search.key}'];
                for (let index = 0; index < list.length; index++) {
                    if (list[index].value == searchKey) {
                        idx = index;
                        break;
                    }
                }
                if (e.keyCode == 40) {
                    // 下移
                    idx += 1;
                    if (idx >= list.length) {
                        idx = 0;
                    }
                }
                if (e.keyCode == 38) {
                    // 下移
                    idx -= 1;
                    if (idx < 0) {
                        idx = list.length - 1;
                    }
                }
                that.updater.digest({
                    searchKey: that['@{search.key}'] = list[idx].value
                })
            }
        } else if (e.keyCode == 13) {
            // 未选中时，回车默认第一个，已选中的情况下还是当前选项
            if (!that['@{search.key}'] && list && list.length > 0) {
                that['@{search.key}'] = list[0].value;
            }
            that['@{search.key.bak}'] = that['@{search.key}'];
            that['@{search.value}'] = $.trim(e.eventTarget.value);
            that['@{hide}']();
            that['@{fire}']();
        } else {
            that['@{search.delay.timer}'] = setTimeout(that.wrapAsync(() => {
                that['@{search.value}'] = $.trim(e.eventTarget.value);
                that['@{show}']();
            }), 250);
        }

    },

    '@{stop}<change,focusout>'(e) {
        e.stopPropagation();
    },

    '@{select}<click>'(e) {
        e.stopPropagation();

        let that = this;
        let item = e.params.item;
        that.updater.digest({
            searchKey: that['@{search.key}'] = that['@{search.key.bak}'] = item.value,
            show: false
        })
        that['@{fire}']();
    },

    '@{fire}'() {
        let that = this;
        let searchValue = that['@{search.value}'];

        // 双向绑定，多key值直接从event上取
        // 组件入参search-key：event上为驼峰searchKey
        // 取值时注意转换
        that['@{owner.node}'].val(searchValue).trigger({
            type: 'change',
            searchKey: that['@{search.key}'],
            searchValue,
            selected: searchValue,
        });

        // 兼容老的事件处理
        that['@{owner.node}'].trigger({
            type: 'search',
            searchKey: that['@{search.key}'],
            searchValue
        })
    }
});

