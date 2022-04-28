/*md5:16c2347928c1517cad66d49ed83a9569*/
const Magix = require('magix');
const Rules = require('@./rule');
const Util = require('./util');
const Vframe = Magix.Vframe;
const $ = require('$');
Magix.applyStyle('@index.less');
const FormMsgTypes = {
    error: {
        icon: '&#xe727;'
    },
    warn: {
        icon: '&#xe72a;'
    },
    highlight: {
        icon: '&#xe728;'
    },
    pass: {
        icon: '&#xe729;'
    },
}

const isValid = (type, actions, val) => {
    let valid = true,
        action, rule, tip;
    for (let a in actions) {
        if (Magix.has(actions, a)) {
            if (Rules[a]) {
                let check = Rules[a](val, rule = actions[a]);
                valid = check.valid;
                tip = check.tip;
            } else {
                // 过滤掉不在校验规则内的
                valid = true;
                tip = '过滤掉不在校验规则内的'
            }
            if (!valid) {
                action = a;
                break;
            }

        }
    }
    return {
        type, //错误还是警告
        style: actions.style, // 展现样
        placement: actions.placement, //样式定位
        valid, //校验是否通过
        action, //校验失败的规则 min: [20, tip]中min
        rule, //原始校验配置 min: [20, tip]中20
        val, //用户输入值
        tip //校验失败错误提示
    };
};

const mxFormGetNodes = (view, ssId) => {
    let node = $(`#${view.id} [mxe="${ssId}"]`);

    // checkbox和radio类型，非数组循环出来的mxe不一致，需要重新找一遍同name节点
    if (node.prop('type') == 'checkbox' || node.prop('type') == 'radio') {
        let name = node.attr('name');
        if (name) {
            node = $('input[name="' + name + '"]');
        }
    } else if (node.attr('mx-view') && (node.attr('mx-view').indexOf('mx-checkbox/index') > -1)) {
        let name = node.find('input[type="checkbox"]').attr('name');
        if (name) {
            node = $('input[name="' + name + '"]').closest('[mx-view*="mx-checkbox/index"]');
        }
    } else if (node.attr('mx-view') && (node.attr('mx-view').indexOf('mx-radio/index') > -1)) {
        let name = node.find('input[type="radio"]').attr('name');
        if (name) {
            node = $('input[name="' + name + '"]').closest('[mx-view*="mx-radio/index"]');
        }
    }

    return node;
}

const mxFormHideMsg = (view, ssId) => {
    view.updater.$form = view.updater.$form || {};

    let node = mxFormGetNodes(view, ssId);
    let cns = 'names@index.less', rs = [];
    for (let t in FormMsgTypes) {
        rs.push(cns[t]);
    }
    node.removeClass(rs.join(' '));
    node.each((i, n) => {
        n = $(n);

        // 清楚缓存
        let mxe = n.attr('mxe');
        delete view.updater.$form[mxe];

        // 提示文案节点
        let msgId = n.attr('id') + '_msg';
        $('#' + msgId).hide();
    });
};

const mxFormShowMsg = (view, ssId, type, checkInfo) => {
    let node = mxFormGetNodes(view, ssId);
    if (!node.length) { return; };

    // 错误类型
    if (!FormMsgTypes[type]) {
        return;
    }

    // 样式
    let cns = 'names@index.less';

    // 关联节点样式同步
    view.updater.$form = view.updater.$form || {};
    node.each((i, n) => {
        n = $(n);

        // 缓存
        let mxe = n.attr('mxe');
        view.updater.$form[mxe] = checkInfo;

        let as = [], rs = [];
        for (let t in FormMsgTypes) {
            if (t == type) {
                as.push(cns[t]);
            } else {
                rs.push(cns[t]);
            }
        }
        if (as.length > 0) { n.addClass(as.join(' ')); };
        if (rs.length > 0) { n.removeClass(rs.join(' ')); };
    });

    // checkbox radio 提示文案只显示在第一个节点上
    if (node.prop('type') == 'checkbox'
        || (node.attr('mx-view') && (node.attr('mx-view').indexOf('mx-checkbox/index') > -1))
        || node.prop('type') == 'radio'
        || (node.attr('mx-view') && (node.attr('mx-view').indexOf('mx-radio/index') > -1))) {
        node = $(node[0]);
    }

    // 展现样式 纯文案（text） or 盒状样式（ box）
    let style = checkInfo.style || 'text';
    if (!({ text: true, box: true, icon: true })[style]) {
        style = 'text';
    }

    // 提示信息位置 bottom / right
    let placement = checkInfo.placement || 'bottom';
    if (!({ bottom: true, right: true })[placement]) {
        placement = 'bottom';
    }

    node.each((i, n) => {
        n = $(n);
        let prt = n.parent();
        let id = n.attr('id');
        if (!id) {
            id = Magix.guid();
            n.attr('id', id);
        }
        let msgId = id + '_msg';
        let msgNode = $('#' + msgId);
        if (!msgNode.length) {
            let pos = prt.css('position');
            if (pos == 'static') {
                prt.css({
                    position: 'relative'
                })
            }
            n.after('<div id="' + msgId + '"/>');
            msgNode = $('#' + msgId);
        }

        // 相对定位节点
        let width = n.outerWidth(),
            height = n.outerHeight(),
            offset = n.offset(),
            pOffset = prt.offset(),
            gap = 8;

        switch (style) {
            case 'text':
                msgNode[0].className = cns[`${type}-text-msg`];
                msgNode.html(checkInfo.tip).show();

                switch (placement) {
                    case 'right':
                        msgNode.css({
                            lineHeight: 'var(--input-height)',
                            top: (offset.top - pOffset.top),
                            left: (offset.left - pOffset.left) + width + gap
                        });
                        break;

                    case 'bottom':
                        let mlh = '18px', ml = (offset.left - pOffset.left) + gap;
                        if (n.attr('mx-view') && (n.attr('mx-view').indexOf('mx-radio/cards') > -1)) {
                            // mx-radio.cards特殊处理
                            let lastCard = n.find('.@../mx-radio/cards.less:card:last-child');
                            msgNode.css({
                                top: (lastCard.offset().top + lastCard.outerHeight() - pOffset.top),
                                lineHeight: mlh,
                                left: ml
                            });
                        } else if (n.attr('mx-view') && (n.attr('mx-view').indexOf('mx-checkbox/cards') > -1)) {
                            // mx-checkbox.cards特殊处理
                            let lastCard = n.find('.@../mx-checkbox/cards.less:card:last-child');
                            msgNode.css({
                                top: (lastCard.offset().top + lastCard.outerHeight() - pOffset.top),
                                lineHeight: mlh,
                                left: ml
                            });
                        } else {
                            // 是否是表格内的场景
                            let ctd = n.closest('td');
                            msgNode.css({
                                top: (offset.top - pOffset.top) + height,
                                lineHeight: (ctd && ctd.length) ? 'calc(var(--mx-table-ceil-v-gap, 12px) + 2px)' : mlh,
                                left: ml
                            });
                        }
                        break;
                }
                break;

            case 'box':
                // 只支持下方提示
                msgNode[0].className = cns[`${type}-box-msg`];
                msgNode.html(checkInfo.tip).show();

                let ml = offset.left - pOffset.left;
                if (n.attr('mx-view') && (n.attr('mx-view').indexOf('mx-radio/cards') > -1)) {
                    // mx-radio.cards特殊处理
                    let lastCard = n.find('.@../mx-radio/cards.less:card:last-child');
                    msgNode.css({
                        top: (lastCard.offset().top + lastCard.outerHeight() - pOffset.top + gap),
                        left: ml
                    });
                } else if (n.attr('mx-view') && (n.attr('mx-view').indexOf('mx-checkbox/cards') > -1)) {
                    // mx-checkbox.cards特殊处理
                    let lastCard = n.find('.@../mx-checkbox/cards.less:card:last-child');
                    msgNode.css({
                        top: (lastCard.offset().top + lastCard.outerHeight() - pOffset.top + gap),
                        left: ml
                    });
                } else {
                    msgNode.css({
                        top: (offset.top - pOffset.top) + height + gap,
                        left: ml
                    });
                }
                break;

            case 'icon':
                msgNode[0].className = cns[`${type}-icon-msg`];
                msgNode.html(`<i class="mc-iconfont">${FormMsgTypes[type].icon}</i>`).show();

                msgNode.css({
                    height,
                    top: 0,
                    left: offset.left - pOffset.left + width - 16 - gap
                });
                break;
        }
    });
    return true;
};

module.exports = {
    isValid(config, ref) {
        config = Magix.mix({
            element: null, //单独校验某个节点
            scrollIntoView: true, //校验有错误的情况下是否要滚动到错误节点
            checkSubs: true //是否调用子view校验，children isValid
        }, config || {});

        let me = this;
        let result = true;
        let children = me.owner.children();
        let topLevel = false;
        if (!ref) {
            ref = [];
            topLevel = true;
        }
        // 递归调用子view校验
        if (config.checkSubs) {
            for (let i = 0; i < children.length; i++) {
                let vf = Vframe.get(children[i]);
                let r = vf.invoke('isValid', [ref]);
                if (r === false) {
                    result = false;
                }
            }
        }
        let elements;
        if (config.sizzle) {
            // 选择器
            elements = $(config.sizzle);
            let ssId = elements.attr('mxe');
            if (!ssId) {
                // 本身不是校验节点则查找该节点下所有的校验节点
                elements = elements.find('[mxe^="' + me.id + '"]');
            } else {
                // 该节点本身为校验节点
            }
        } else if (config.element) {
            // 历史配置的兼容
            // 1. 传入字符串，默认为id（这时候传入选择器会判断失误，api中已不透出）
            // 2. #id，.class格式
            // 3. dom
            if ((typeof config.element == 'string') && !(/^#/.test(config.element)) && !(/^\./.test(config.element))) {
                elements = $('#' + config.element);
            } else {
                elements = $(config.element);
            }
            let ssId = elements.attr('mxe');
            if (!ssId) {
                // 本身不是校验节点则查找该节点下所有的校验节点
                elements = elements.find('[mxe^="' + me.id + '"]');
            } else {
                // 该节点本身为校验节点
            }
        } else {
            // 不传单个节点，遍历所有的
            elements = $('#' + me.id + ' [mxe^="' + me.id + '"]');
        }

        let keys = []
        elements.each((i, e) => {
            // 通过查找节点的方式会查到子view的节点：过滤掉非本view的节点
            // 该方法的问题：组件的vf != me.id，导致组件的校验都失效了
            // let start = e;
            // while (true) {
            //     let id = start.id;
            //     if (id) {
            //         let vf = Vframe.get(id);
            //         if (vf) {
            //             // 最近的vframe
            //             if (me.id == vf.id) {
            //                 me['@{check}']($(e));
            //                 keys.push($(e).attr('mxe'));
            //             }
            //             break;
            //         } else {
            //             start = start.parentNode;
            //         }
            //     } else {
            //         start = start.parentNode;
            //     }
            // }

            // 只取本view的节点
            let mxo = $(e).attr('mxo');
            if (!mxo || (mxo && (me.id == mxo))) {
                me['@{check}']($(e));
                keys.push($(e).attr('mxe'));
            }
        });

        // 缓存所有的错误，只提取type=error类型的
        let form = me.updater.$form;
        if (form) {
            for (var i = 0; i < keys.length; i++) {
                let key = keys[i];
                if (form[key] && (form[key].type == 'error')) {
                    ref.push(key);
                    result = false;
                    break;
                }
            }
        }

        // 父view 滚动到错误位置
        if (topLevel && config.scrollIntoView) {
            let minTop = 1e20,
                node;
            for (let i = ref.length, n, f; i--;) {
                n = $('[mxe="' + ref[i] + '"]');
                if (n.length) {
                    f = n.offset();
                    if (f.top < minTop) {
                        node = n[0];
                        minTop = f.top;
                    }
                }
            }
            if (node) {
                if (node.scrollIntoViewIfNeeded) {
                    node.scrollIntoViewIfNeeded();
                } else if (node.scrollIntoView) {
                    node.scrollIntoView();
                }
            }
        }
        return result;
    },

    '$[mxc]<keyup,change,focusout>'(e) {
        let me = this,
            node = $(e.eventTarget);
        let mxe = node.attr('mxe'),
            mxo = node.attr('mxo'),
            viewId = me.id;

        //交给真正的view处理元素
        if ((mxo && mxo == viewId) || (mxe && mxe.startsWith(viewId))) {
            me['@{check}'](node);
        }
    },

    '@{check}'(node) {
        let me = this;
        let updater = me.updater;
        let mxc = node.attr('mxc');
        let exprs = updater.parse(mxc);
        let valid = true; //校验信息
        for (let ctrl of exprs) {
            let actions = ctrl.f || {};
            let ps = ctrl.p.split('.');
            let key = ps.pop(),
                temp,
                value;
            let object = updater.get();
            while (object && ps.length) {
                temp = ps.shift();
                object = object[temp];
            }
            if (node.prop('type') == 'checkbox') {
                let src = object[key];
                let checked = node.prop('checked');
                if (src === true || src === false) {
                    value = checked;
                } else {
                    value = node.val();
                    if ($.isArray(src)) {
                        let checkboxName = node.prop('name');
                        if (checkboxName) {
                            src = [];
                            Util.addCheckbox(checkboxName, src, actions);
                        } else {
                            let idx = Util.indexOf(src, value);
                            if (checked) {
                                if (idx === -1) {
                                    src.push(value);
                                }
                            } else {
                                if (idx > -1) {
                                    src.splice(idx, 1);
                                }
                            }
                        }
                        value = src;
                    } else if ($.isPlainObject(src)) {
                        if (checked) {
                            src[value] = value;
                        } else {
                            delete src[value];
                        }
                        value = src;
                    } else {
                        value = checked ? value : '';
                    }
                }
            } else if (node.attr('mx-view') && (node.attr('mx-view').indexOf('mx-checkbox/index') > -1)) {
                // mx-checkbox
                let src = object[key];
                let checked = node.find('input[type="checkbox"]').prop('checked');
                if (src === true || src === false) {
                    value = checked;
                } else {
                    value = node.find('input[type="checkbox"]').val();
                    if ($.isArray(src)) {
                        let checkboxName = node.find('input[type="checkbox"]').prop('name');
                        if (checkboxName) {
                            src = [];
                            Util.addCheckbox(checkboxName, src, actions);
                        } else {
                            let idx = Util.indexOf(src, value);
                            if (checked) {
                                if (idx === -1) {
                                    src.push(value);
                                }
                            } else {
                                if (idx > -1) {
                                    src.splice(idx, 1);
                                }
                            }
                        }
                        value = src;
                    } else if ($.isPlainObject(src)) {
                        if (checked) {
                            src[value] = value;
                        } else {
                            delete src[value];
                        }
                        value = src;
                    } else {
                        value = checked ? value : '';
                    }
                }
            } else if (node.prop('type') == 'radio') {
                // 原生radio处理
                let radioName = node.prop('name');
                value = $('input[name=' + radioName + ']:checked').val();
            } else if (node.attr('mx-view') && (node.attr('mx-view').indexOf('mx-radio/index') > -1)) {
                // mx-radio组件处理
                let radioName = node.find('input[type="radio"]').prop('name');
                value = $('input[name=' + radioName + ']:checked').val();
            } else {
                value = node.val();
            }
            if (valid) {
                let checkInfo = isValid('error', actions, value);
                let ssId = node.attr('mxe');
                if (checkInfo.valid) {
                    mxFormHideMsg(me, ssId);

                    // 校验成功的前提下，其他展现样式的提示信息
                    for (let t in FormMsgTypes) {
                        if (t != 'error' && Magix.has(actions, t)) {
                            let tCheckInfo = isValid(t, actions[t], value);

                            if (tCheckInfo.valid) {
                                // 不需要警告
                                mxFormHideMsg(me, ssId);
                            } else {
                                mxFormShowMsg(me, ssId, t, tCheckInfo);
                            }
                        }
                    }
                } else {
                    valid = false;
                    mxFormShowMsg(me, ssId, 'error', checkInfo);
                }
            }
        }
    },

    /**
     * 清空当前所有校验
     */
    clearValid() {
        let me = this;
        let form = me.updater.$form;
        if (form) {
            for (let f in form) {
                mxFormHideMsg(me, f);
            }
        }
    },
    '$doc<htmlchanged>'(e) {
        let me = this;
        let form = me.updater.$form;
        if ((e.vId == me.id) && form) {
            for (let f in form) {
                let v = form[f];
                if (!mxFormShowMsg(me, f, v.type, v)) {
                    delete form[f];
                }
            }
        }
    }
};