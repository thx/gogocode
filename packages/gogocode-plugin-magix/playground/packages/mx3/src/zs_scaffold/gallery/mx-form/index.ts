/*md5:233dd23946815d0f3890b25efc572610*/
import Magix from 'magix';
import * as $ from '$';
import * as Util from './util';
export = {
    ctor() {
        let me = this;
        let domReady = e => {
            // 初始化双向绑定，原生节点
            let list = $([
                `input[type="checkbox"][mxe^="${me.id}"]`,
                `input[type="radio"][mxe^="${me.id}"]`,
            ].join(','));
            for (let e of list) {
                e = $(e);

                // 配置属性
                let mxc = e.attr('mxc');
                let exprs = me.updater.parse(mxc);
                for (let ctrl of exprs) {
                    let ps = ctrl.p.split('.');
                    let key = ps.pop();

                    // 校验规则
                    let data = me.updater.get();
                    while (data && ps.length) {
                        let temp = ps.shift();
                        data = data[temp];
                    }
                    if (!ps.length) {
                        // find aim object
                        // 处理对应的key
                        if (data === undefined || data === null) {
                            // fix https://aone.alibaba-inc.com/issue/18911004
                            break;
                        }
                        let src = data[key];
                        if (src === true) {
                            e.prop('checked', src);
                        } else {
                            let value = e.val();
                            if ($.isArray(src)) {
                                e.prop('checked', Util.indexOf(src, value) >= 0);
                            } else if ($.isPlainObject(src)) {
                                e.prop('checked', !!src[value]);
                            } else if (src == value) {
                                e.prop('checked', true);
                            }
                        }
                    }
                }
            }

            // 组件双向绑定,只取本view的组件
            let comps = $([
                `[mx-view*="mx-checkbox/index"][mxe^="${me.id}"][mxo="${me.id}"]`,
                `[mx-view*="mx-radio/index"][mxe^="${me.id}"][mxo="${me.id}"]`,
            ].join(','));
            for (let e of comps) {
                e = $(e);
                let r = e.find('input[type="radio"],input[type="checkbox"]');

                // 配置属性
                let mxc = e.attr('mxc');
                let exprs = me.updater.parse(mxc);
                for (let ctrl of exprs) {
                    let ps = ctrl.p.split('.');
                    let key = ps.pop();

                    // 校验规则
                    let data = me.updater.get();
                    while (data && ps.length) {
                        let temp = ps.shift();
                        data = data[temp];
                    }
                    if (!ps.length) {
                        // find aim object
                        // 处理对应的key
                        if (data === undefined || data === null) {
                            // fix https://aone.alibaba-inc.com/issue/18911004
                            break;
                        }
                        let src = data[key];
                        if (src === true) {
                            r.prop('checked', src);
                        } else {
                            let value = r.val();
                            if ($.isArray(src)) {
                                r.prop('checked', Util.indexOf(src, value) >= 0);
                            } else if ($.isPlainObject(src)) {
                                r.prop('checked', !!src[value]);
                            } else if (src == value) {
                                r.prop('checked', true);
                            }
                        }
                    }
                }
            }
        }
        me.on('domready', domReady);

        // 动态加载时，domready子view不一定渲染完成
        // 待所有子view渲染完成
        me.owner.oncreated = domReady;
        me.ondestroy = () => {
            me.owner.off('created');
        };
    },
    fromKeys(data, keys) {
        keys = (keys + '').split(',');
        let r = {};
        for (let i = 0, key; i < keys.length; i++) {
            key = keys[i];
            r[key] = Magix.has(data, key) ? data[key] : '';
        }
        return r;
    },
    /**
     * 多key值绑定的情况说明
     * https://aone.alibaba-inc.com/req/33340254
     */
    '$[mxc]<change,focusout>'(e) {
        let me = this,
            node = $(e.eventTarget);
        let mxe = node.attr('mxe');
        // 交给真正的处理元素，只处理本view的
        // 避免所有view都挂载isValid的时候触发所有校验
        if (!mxe || !mxe.startsWith(me.id)) {
            return;
        }

        // 划线转换驼峰
        let toHump = (name) => {
            if (name === undefined || name === null) {
                return '';
            }
            name = name + '';
            return name.replace(/\-(\w)/g, function (all, letter) {
                return letter.toUpperCase();
            });
        }

        // 配置属性
        let mxc = node.attr('mxc');
        let updater = me.updater;
        let exprs = updater.parse(mxc);
        let keys = updater.$k;
        let refresh = false;
        for (let ctrl of exprs) {
            // 绑定节点
            let ps = ctrl.p.split('.');

            // 校验规则
            let actions = ctrl.f || {};
            let key = ps.pop(),
                temp,
                value,
                rootKey;
            let object = updater.get();
            while (object && ps.length) {
                temp = ps.shift();
                if (!rootKey) {
                    //解决设置数据后，再调用updater.digest()不刷新的问题
                    rootKey = temp;
                }
                object = object[temp];
            }
            rootKey = rootKey || key;
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
                // mx-checkbox组件处理
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
            };
            if (object) {
                // 处理多绑定时，值从event对象上读取
                // event上为驼峰如searchKey，配置字段是search-key，先转成驼峰
                let aHump = toHump(ctrl.a);
                if (!ctrl.a || Magix.has(e, aHump) || value) {
                    if (Magix.has(e, aHump)) {
                        value = e[aHump];
                    }
                    object[key] = value;
                    //统一在change事件中标记更新
                    if (e.type == 'change') {
                        if (actions.refresh) {
                            refresh = true;
                        }
                        if (refresh || !actions.silent) { //如果刷新或未标记沉默更新
                            if (keys) {
                                keys[rootKey] = 1; //标记改变;
                            }
                            updater.$c = 1;
                        }
                    }
                }
            } else {
                console.warn('can not set by path:', ctrl.p);
            }
        }
        if (refresh && e.type === 'change') {
            //解决在updater已经digesting时，再次digest带来的不稳定问题
            clearTimeout(me['@{digest.timer}']);
            me['@{digest.timer}'] = setTimeout(() => {
                updater.digest();
            }, 0);
        }
    }
};