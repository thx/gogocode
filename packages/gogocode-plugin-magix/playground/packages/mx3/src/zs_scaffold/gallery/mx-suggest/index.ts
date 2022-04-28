/*md5:c1d85d2cfdbbde5734c85e971157141e*/
import Magix from 'magix';
import * as $ from '$';
import * as View from '../mx-util/view';
import * as Monitor from '../mx-util/monitor';
import * as I18n from '../mx-medusa/util';
const ShowDelay = 250;

export default View.extend({
    tmpl: '@index.html',
    init(extra) {
        let that = this;

        // 初始化列表为空默认为动态刷新列表
        let list = extra.list || [];
        that['@{dynamic.list}'] = (list.length == 0);

        that.assign(extra);

        Monitor['@{setup}']();
        that.on('destroy', () => {
            ['@{dealy.show.timer}', '@{dealy.hide.timer}'].forEach(key => {
                if (that[key]) {
                    clearTimeout(that[key]);
                }
            })

            Monitor['@{remove}'](that);
            Monitor['@{teardown}']();
        });
    },

    assign(extra) {
        let that = this;

        // 当前数据截快照
        that.updater.snapshot();

        // 动态数据时，回车是否支持搜索当前输入框的值
        that['@{dynamic.enter}'] = extra.dynamicEnter + '' === 'true';

        // text，value的key值
        that['@{key.value}'] = extra.listValue || 'value';
        that['@{key.text}'] = extra.listText || 'text';

        // 数据源
        let originList = that['@{wrap}']((extra.list || []));

        // selected：当前选中的value值
        // item：完整selected对象
        // 优先级item > selected
        let item = extra.item || {};
        let selectedText = item.text || '';
        let selectedValue = item.value || extra.selected;
        if (selectedValue === undefined || selectedValue === null) {
            selectedValue = '';
        }

        // 文案修正
        for (let index = 0; index < originList.length; index++) {
            if (originList[index].value + '' === selectedValue + '') {
                selectedText = originList[index].text;
                break;
            }
        }

        // 在哪些值中搜索关键词
        // 1. all（或者 text,value）：text或者value中包含关键词的
        // 2. text：只有text中包含关键词的
        // 3. value：只有value中包含关键词的
        let type = (extra.type || 'all') + '';
        if (type == 'all') { type = 'text,value'; };
        that['@{search.type}'] = type.split(',');

        // 搜索类型，默认两个字符位置
        let searchWidth = extra.searchWidth;
        let searchList = extra.searchList || [];
        let searchValue = (extra.searchValue === null || extra.searchValue === undefined) ? (searchList[0] ? searchList[0].value : '') : extra.searchValue;

        that.updater.set({
            searchWidth,
            searchList,
            searchValue,
            originList,
            selectedValue,
            selectedText,
            placeholder: extra.placeholder || I18n['search'],
            emptyText: extra.emptyText || I18n['empty.text'],
        });
        that['@{owner.node}'] = $('#' + that.id);

        let altered = that.updater.altered();
        return altered;
    },

    '@{wrap}'(originList) {
        let listValue = this['@{key.value}'],
            listText = this['@{key.text}'];
        originList = originList || [];
        let list = [];
        if (originList.length > 0) {
            if (typeof originList[0] === 'object') {
                // 本身是个对象
                list = originList.map(function (item) {
                    return {
                        ...item,
                        value: item[listValue],
                        text: item[listText]
                    };
                });
            } else {
                // 直接value列表
                list = originList.map(function (value) {
                    return {
                        value: value,
                        text: value
                    };
                });
            }
        }
        return list;
    },

    render() {
        this['@{val}']();
    },

    '@{val}'(fire) {
        this.updater.digest();

        let { selectedValue, selectedText, originList, searchList, searchValue } = this.updater.get();
        this['@{owner.node}'].val(selectedValue);
        if (fire) {
            let item = {
                value: selectedValue,
                text: selectedText,
            }

            // 保留完整对象
            for (let i = 0; i < originList.length; i++) {
                if (originList[i].value + '' === item.value + '') {
                    item = originList[i];
                    break;
                }
            }

            let d = {
                selected: selectedValue,
                item,
            }
            if (searchList.length > 0) {
                Magix.mix(d, {
                    searchValue
                })
            }

            this['@{owner.node}'].trigger({
                type: 'change',
                ...d,
            });

            // 兼容老的事件处理
            this['@{owner.node}'].trigger({
                type: 'suggest',
                selected: item,
            });
        }
    },

    '@{init}'() {
        let that = this;

        let toggleNode = $('#toggle_' + that.id);
        let minWidth = toggleNode.outerWidth(),
            vId = that.id;
        let maxWidth = (minWidth * 2.5);

        let ddId = `dd_bd_${vId}`;
        let ddNode = $(`#${ddId}`);
        if (!ddNode.length) {
            ddNode = $(`<div mx-view class="mx-output-bottom" id="${ddId}"
                style="min-width: ${minWidth}px; max-width: ${maxWidth}px;"></div>`);
            $(document.body).append(ddNode);
        }

        // 先实例化，绑定事件，再加载对应的view
        let vf = that.owner.mountVframe(ddId, '');
        vf.on('created', () => {
            that['@{setPos}']();
        });
        that['@{content.vf}'] = vf;
    },

    /**
     * 始终透出输入框位置
     */
    '@{setPos}'() {
        let oNode = this['@{owner.node}'];
        let ddNode = $('#dd_bd_' + this.id);
        let height = oNode.outerHeight(),
            offset = oNode.offset();
        ddNode.css({
            left: offset.left,
            top: offset.top + height,
        });
        return ddNode;
    },

    '@{getList}'() {
        let { selectedText, originList } = this.updater.get();
        let list = $.extend(true, [], originList);
        if (!this['@{dynamic.list}']) {
            // 静态数据根据关键词过滤
            let lowerText = (selectedText + '').toLowerCase();
            let types = this['@{search.type}'];
            for (let i = 0; i < list.length; i++) {
                let item = list[i];
                let has = false;
                types.forEach(type => {
                    if ((item[type] + '').toLowerCase().indexOf(lowerText) > -1) {
                        has = true;
                    }
                })
                if (!has) {
                    list.splice(i--, 1);
                }
            }
        }
        return list;
    },

    '@{show}'() {
        let that = this;
        clearTimeout(that['@{dealy.show.timer}']);
        if (!that['@{pos.init}']) {
            that['@{pos.init}'] = true;
            that['@{init}']();
        }

        let { selectedText, expand, selectedValue, originList, loading } = that.updater.get();
        if (that['@{dynamic.list}'] && !loading && !expand && (originList.length == 0)) {
            // 动态获取数据的时候，未展开的状态下，空数据不展开
            return;
        }

        let list = that['@{getList}']();
        that.updater.digest({
            expand: true,
        })
        that['@{content.vf}'].mountView('@../mx-dropdown/content', {
            data: { // 复用dropdown，包装成同样的结构
                height: 250, // 最大高度
                loading,
                hasGroups: false,
                parents: [{ list }],
                selectedItems: [{
                    value: selectedValue,
                    text: selectedText,
                }],
            },
            prepare: () => {
                // 每次show时都重新定位
                let ddNode = that['@{setPos}']();
                ddNode.addClass('mx-output-open');
                Monitor['@{add}'](that);
            },
            submit: ({ selectedItems }) => {
                that['@{hide}']();
                that.updater.set({
                    selectedValue: selectedItems[0].value,
                    selectedText: selectedItems[0].text,
                });
                that['@{val}'](true);
            }
        })
    },

    '@{delay.hide}'() {
        let that = this;
        clearTimeout(that['@{dealy.hide.timer}']);
        that['@{dealy.hide.timer}'] = setTimeout(that.wrapAsync(() => {
            that['@{hide}']();
        }), 250);
    },

    '@{hide}'() {
        let { expand } = this.updater.get();
        if (!expand) { return; }

        this.updater.digest({
            expand: false
        })
        let ddNode = $('#dd_bd_' + this.id);
        ddNode.removeClass('mx-output-open');
        Monitor['@{remove}'](this);
    },

    '@{inside}'(node) {
        return Magix.inside(node, this.id) || Magix.inside(node, 'dd_bd_' + this.id);
    },

    /**
     * 多类型时，输入框失去焦点，dropdown获取焦点
     */
    '@{focusout}<focusout>'(e) {
        e.stopPropagation();
        let { searchList } = this.updater.get();
        if (searchList.length > 0) {
            // 延迟消失，避免submit提交之前view被销毁
            this['@{delay.hide}']();
        }
    },

    /**
     * 多类型搜索，下拉类型被切换时记录切换值
     */
    '@{change}<change>'(e) {
        e.stopPropagation();
        let { searchList, searchValue } = this.updater.get();

        // 剔除原生事件
        if (searchList.length > 0 && (e.searchValue !== undefined) && (e.searchValue !== null) && (searchValue + '' !== e.searchValue + '')) {
            // 仅切换类型，不trigger事件
            this.updater.digest({
                searchValue: e.searchValue,
            });
        }
    },

    '@{suggest}<focusin,keyup,paste>'(e) {
        e.stopPropagation();
        let that = this;
        if (that['@{dealy.show.timer}']) {
            clearTimeout(that['@{dealy.show.timer}']);
        }

        // 当前输入内容
        let selectedText = e.eventTarget.value;
        if (that.updater.get('selectedText') !== selectedText) {
            that.updater.set({
                selectedText,
            })
        }

        if (e.keyCode == 13) {
            // 回车
            if (that['@{dynamic.enter}']) {
                that['@{hide}']();
                // 回车选中当前输入值
                that.updater.digest({
                    selectedValue: selectedText,
                    selectedText,
                });
                that['@{val}'](true);
            } else {
                // 回车默认选中第一个
                let list = that['@{getList}']();
                if (list.length > 0) {
                    that['@{hide}']();
                    that.updater.digest({
                        selectedValue: list[0].value,
                        selectedText: list[0].text,
                    });
                    that['@{val}'](true);
                }
            }
        } else {
            that['@{dealy.show.timer}'] = setTimeout(that.wrapAsync(() => {
                // 从不展开到展开状态，是否需要通知外部展开下拉框了
                let { searchList, searchValue } = that.updater.get();
                let sd = { keyword: selectedText };
                if (searchList.length > 0) {
                    Magix.mix(sd, { searchValue });
                }
                that['@{owner.node}'].trigger({
                    type: 'show',
                    ...sd,
                });
                that['@{show}']();
            }), ShowDelay);
        }
    },

    '@{clear}<clear>'(e) {
        e.stopPropagation();
        let that = this;
        if (that['@{dealy.show.timer}']) {
            clearTimeout(that['@{dealy.show.timer}']);
        }

        // 清空选中项
        that.updater.digest({
            selectedValue: '',
            selectedText: '',
        });
        that['@{val}'](true);

        if (that.updater.get('expand')) {
            // 展开的情况下更新列表
            that['@{show}']();
        }
    },

    /**
     * 加下拉框loading
     */
    showLoading() {
        this.updater.set({
            loading: true,
        })
        this['@{show}']();
    },

    /**
     * 去下拉框loading
     */
    hideLoading() {
        this.updater.set({
            loading: false
        });
        if (this.updater.get('expand')) {
            this['@{show}']();
        }
    },

    /**
     * 外部更新list可选项
     */
    update(list) {
        this['@{dynamic.list}'] = true;
        let originList = this['@{wrap}'](list);
        this.updater.set({
            loading: false,
            originList,
        })

        // 展开时更新
        if (this.updater.get('expand')) {
            this['@{show}']();
        }
    }
});