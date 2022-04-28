/*md5:2da26de3cde2baf2de4d3e51b4923b10*/
import Magix from 'magix';
import * as $ from '$';
import * as View from '../mx-util/view';
import * as Monitor from '../mx-util/monitor';
import * as I18n from '../mx-medusa/util';
Magix.applyStyle('@../mx-dropdown/index.less');
Magix.applyStyle('@index.less');
const MxTaginputWidth = 10;

export default View.extend({
    tmpl: '@index.html',
    init(ops) {
        this.assign(ops);
    },
    assign(ops) {
        let me = this;
        Monitor['@{setup}']();

        let oNode = $('#' + me.id);
        me['@{owner.node}'] = oNode;

        // 全选，分组多选
        let multiple = true,
            needAll = (ops.needAll + '' !== 'false'),
            needGroup = (ops.needGroup + '' === 'true');

        // 多选上下限范围
        let min = +ops.min || 0,
            max = +ops.max || 0;
        if ((max > 0) && (min > max)) {
            min = max;
        }

        // 动态获取数据
        let dynamicList = (me.updater.get('dynamicList') + '' === 'true') || (ops.dynamicList + '' === 'true');

        let textKey = ops.textKey || 'text',
            valueKey = ops.valueKey || 'value',
            parentKey = ops.parentKey || 'pValue';
        let originList = this['@{buildList}'](ops.list || [], valueKey, textKey, parentKey),
            originParents = ops.parents || [];

        let selectedItems = [];
        let items = ops.items || [];
        if (items && items.length) {
            // 动态获取数据是，初始化list为空，可传入完整对象
            let map = Magix.toMap(this['@{buildList}'](items, valueKey, textKey, parentKey), 'value');
            items.forEach(item => {
                selectedItems.push(map[item.value]);
            })
        } else {
            // 已选中数据 数组 or 字符串
            let selected = [];
            if ($.isArray(ops.selected)) {
                // 数组，保留初始数据状态，双向绑定原样返回
                me['@{bak.type}'] = 'array';
                selected = ops.selected;
            } else {
                // 字符串
                selected = (ops.selected === undefined || ops.selected === null) ? [] : (ops.selected + '').split(',');
            }

            let map = Magix.toMap(originList, valueKey);
            selected.forEach(value => {
                let selectedItem = map[value];

                //未提供选项，或提供的选项不在列表里
                if (!$.isEmptyObject(selectedItem)) {
                    selectedItems.push(selectedItem);
                }
            });
        }

        // 多选：数据量超过20个，默认一行显示4个，若手动指定over=false，一行一个
        let over = (multiple && originList.length > 20 && ops.over + '' !== 'false');

        // mx-disabled作为属性，动态更新不会触发view改变，兼容历史配置，建议使用disabled
        me['@{ui.disabled}'] = (ops.disabled + '' === 'true') || $('#' + me.id)[0].hasAttribute('mx-disabled');

        me.updater.set({
            over,
            multiple,
            needAll,
            needGroup, // 分组全选功能
            min,
            max,
            placeholder: ops.placeholder || '请输入',
            emptyText: ops.emptyText || I18n['empty.text'],
            searchbox: false,
            dynamicList,
            textKey,
            valueKey,
            parentKey,
            originList,
            originParents,
            selectedItems,
            height: (ops.height || 280),
            submitChecker: ops.submitChecker, // 提交前自定义校验函数
        });

        me.on('destroy', () => {
            ['@{dealy.show.timer}'].forEach(timerKey => {
                if (me[timerKey]) {
                    clearTimeout(me[timerKey]);
                }
            });

            me['@{owner.node}'].off('mouseenter mouseleave');
            $('#dd_bd_' + me.id).remove();
            Monitor['@{remove}'](me);
            Monitor['@{teardown}']();
        });

        // 固定刷新
        return true;
    },

    render() {
        this['@{val}']();

        // 新更新数据再重新定位input
        this['@{updateUi}']();
    },

    '@{val}'(fire) {
        let me = this;
        let { selectedItems, inputWidth } = me.updater.get();
        let texts = [], values = [];
        selectedItems.forEach(item => {
            item.error = false;
            texts.push(item.text);
            values.push(item.value);
        })
        me.updater.digest({
            iv: '',
            inputWidth: (selectedItems.length == 0) ? '100%' : (inputWidth || (MxTaginputWidth + 'px')),
        })

        let val;
        if (me['@{bak.type}'] == 'array') {
            // 初始化为数组
            val = values;
        } else {
            // 初始化为字符串
            val = values.join(',');
        }

        me['@{owner.node}'].val(val);
        if (fire) {
            me['@{owner.node}'].trigger({
                type: 'change',
                selected: val,
                items: selectedItems,
                values,
                texts,
            });
        }
    },

    /**
     * 更新input的宽度，提示框位置，提示框数据
     */
    '@{updateUi}'() {
        let tNode = this['@{owner.node}'].find('.@index.less:trigger');
        tNode.width(MxTaginputWidth);
        let offset = tNode.position();
        let lastWidth = $(`#toggle_${this.id}`).width() - offset.left;
        let inputWidth = (lastWidth >= MxTaginputWidth ? lastWidth : MxTaginputWidth) + 'px';
        this.updater.digest({
            inputWidth,
        });
        tNode.width(inputWidth);
    },

    '@{buildList}'(originList, valueKey, textKey, parentKey) {
        let list = $.extend(true, [], originList);
        if (typeof list[0] === 'object') {
            // 本身是个对象
            // 存在分组的情况
            list = list.map(item => {
                return Magix.mix(item, {
                    value: item[valueKey],
                    text: item[textKey],
                    pValue: item[parentKey],
                });
            })
        } else {
            // 直接value列表（无分组）
            list = list.map(value => {
                return {
                    text: value,
                    value: value
                };
            })
        };

        return list;
    },

    '@{init}'() {
        let me = this;

        let toggleNode = $('#toggle_' + me.id);
        let posWidth = toggleNode.outerWidth(),
            vId = me.id;

        // 多选大尺寸展现样式上稍有差异
        let { over } = me.updater.get();
        let minWidth = over ? Math.max(posWidth, 600) : posWidth;
        let maxWidth = over ? minWidth : Math.max(minWidth * 2.5, 180);

        let ddId = `dd_bd_${vId}`;
        let ddNode = $(`#${ddId}`);
        if (!ddNode.length) {
            ddNode = $(`<div mx-view class="mx-output-bottom ${over ? '@../mx-dropdown/index.less:dropdown-menu-group' : ''}" id="${ddId}"
                style="min-width: ${minWidth}px; max-width: ${maxWidth}px;"></div>`);
            $(document.body).append(ddNode);
        }

        // 先实例化，绑定事件，再加载对应的view
        let vf = me.owner.mountVframe(ddId, '');
        vf.on('created', () => {
            me['@{setPos}']();
        });
        me['@{content.vf}'] = vf;
    },

    '@{inside}'(node) {
        return Magix.inside(node, this.id) || Magix.inside(node, 'dd_bd_' + this.id);
    },

    '@{show}'() {
        let me = this;
        clearTimeout(me['@{dealy.show.timer}']);
        if (!me['@{pos.init}']) {
            me['@{pos.init}'] = true;
            me['@{init}']();
        }

        let { iv, dynamicList, originList, originParents, loading } = me.updater.get();
        if (!loading && originList.length == 0) {
            // 动态获取数据的时候，空数据不展开
            return;
        }

        let list = $.extend(true, [], originList);
        if (!dynamicList) {
            // 非动态获取数据，根据筛选项过滤内容
            let liv = ((iv || '') + '').toLowerCase();
            for (let i = 0; i < list.length; i++) {
                let { value, text } = list[i];
                if ((value + '').toLowerCase().indexOf(liv) < 0 && (text + '').toLowerCase().indexOf(liv) < 0) {
                    list.splice(i--, 1);
                }
            }
        }

        let hasGroups = false,
            parents = $.extend(true, [], originParents);
        if (parents.length == 0) {
            // 包装成一个组，不显示组信息
            hasGroups = false;
            parents = [{ list }];
        } else {
            let groupMap = {};
            list.forEach(item => {
                let pValue = item.pValue || '';
                groupMap[pValue] = groupMap[pValue] || [];
                groupMap[pValue].push(item);
            })
            for (let i = 0; i < parents.length; i++) {
                let p = parents[i];
                p.list = groupMap[p.value] || [];
                delete groupMap[p.value];
                if (p.list.length == 0) {
                    parents.splice(i--, 1);
                }
            }
            hasGroups = (parents.length > 0);

            // 无匹配分组的，插入最前方，保留原始顺序
            let remainList = [];
            list.forEach(item => {
                if (groupMap[item.pValue]) {
                    remainList.push(item);
                }
            });
            if (remainList.length > 0) {
                parents.unshift({
                    list: remainList
                })
            }
        }
        me.updater.digest({
            expand: true,
            hasGroups,
            parents,
        })
        me['@{content.vf}'].mountView('@../mx-dropdown/content', {
            data: me.updater.get(),
            prepare: () => {
                // 每次show时都重新定位
                let ddNode = me['@{setPos}']();
                ddNode.addClass('mx-output-open');
                Monitor['@{add}'](me);
            },
            submit: (result) => {
                // 单选 or 多选选中
                me['@{hide}']();
                me.updater.set(result);
                me['@{val}'](true);
                me['@{updateUi}']();
            },
            cancel: () => {
                // 多选关闭
                me['@{hide}']();
            },
        })
    },

    '@{hide}'() {
        let me = this;
        let { expand } = me.updater.get();
        if (!expand) { return; }

        me.updater.digest({
            expand: false
        })
        let ddNode = $('#dd_bd_' + me.id);
        ddNode.removeClass('mx-output-open');
        Monitor['@{remove}'](me);
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

    '@{prevent}<contextmenu>'(e) {
        e.preventDefault();
    },

    '@{stop}<change,focusout>'(e) {
        e.stopPropagation();
    },

    /**
     * 输入框获取焦点
     */
    '@{focus}<click>'(e) {
        if (!this.updater.get('disabled')) {
            let trigger = this['@{owner.node}'].find('.@index.less:trigger');
            if (!(document.activeElement == trigger[0])) {
                trigger.focus();
            }
        }
    },

    '@{check}<focusin,paste,keyup,keydown>'(e) {
        e.stopPropagation();
        let me = this;
        if (me['@{dealy.show.timer}']) {
            clearTimeout(me['@{dealy.show.timer}']);
        }

        let val = e.eventTarget.value;
        if (me.updater.get('iv') !== val) {
            me.updater.set({
                iv: val
            })
        }

        if (e.type != 'keydown') {
            // 输入搜索
            me['@{dealy.show.timer}'] = setTimeout(me.wrapAsync(function () {
                // 外部需要动态更新时
                me['@{owner.node}'].trigger({
                    type: 'show',
                    keyword: val, // 输入的关键词
                });

                me['@{updateUi}']();
                me['@{show}']();
            }), 250);
        }

        if (!val && e.type == 'keydown' && e.keyCode == 8) {
            // 删除
            let { selectedItems } = me.updater.get();
            let index = selectedItems.length - 1;
            if (index > -1) {
                me['@{delete}<click>']({
                    params: {
                        index
                    }
                });
            }
        }
    },

    '@{delete}<click>'(e) {
        e.stopPropagation && e.stopPropagation();
        let me = this;
        if (me.updater.get('disabled')) {
            return;
        }

        let { selectedItems, expand, min } = me.updater.get();
        let index = e.params.index;
        if (min > 0 && selectedItems.length <= min) {
            selectedItems[index].error = true;
            me.updater.digest({
                selectedItems
            });
            return;
        }
        selectedItems.splice(index, 1);
        me.updater.digest({
            selectedItems
        });
        me['@{val}'](true);
        me['@{updateUi}']();
        if (expand) {
            // 展开的情况下更新列表
            me['@{focus}<click>']();
            me['@{show}']();
        }
    },

    showLoading() {
        this.updater.set({
            loading: true,
        })
        this['@{show}']();
    },

    /**
     * 历史调用，合并到update内
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
     * 外部更新可选项
     */
    update: function (list) {
        let { valueKey, textKey, parentKey } = this.updater.get();
        let originList = this['@{buildList}'](list || [], valueKey, textKey, parentKey)
        this.updater.set({
            loading: false,
            dynamicList: true,
            originList,
        })
        if (this.updater.get('expand')) {
            this['@{show}']();
        }
    }
});