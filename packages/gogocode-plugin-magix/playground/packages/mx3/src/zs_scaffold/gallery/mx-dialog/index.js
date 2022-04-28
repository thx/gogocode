/*md5:9c7b7b2add1c4e5f6b10bf7c3962cb17*/
let Magix = require('magix');
let $ = require('$');
let Vframe = Magix.Vframe;
let I18n = require('../mx-medusa/util');
Magix.applyStyle('@index.less');
let DialogZIndex = 99999;
let Duration = 250;

let CacheList = [];
let CalCache = (view, type) => {
    let dialogZIndex = 99999;
    if (type == 'add') {
        CacheList.push(view);
    }
    for (let i = CacheList.length - 1, cacheItem; i >= 0; i--) {
        cacheItem = CacheList[i];
        if (type == 'remove' && (cacheItem.id == view.id)) {
            CacheList.splice(i, 1);
        } else {
            // 取最大的z-index
            let dzi = +$('#' + cacheItem.id).parent().css('z-index');
            if (dzi > dialogZIndex) {
                dialogZIndex = dzi;
            }
        }
    };

    // 计算下一个浮层的z-index
    DialogZIndex = dialogZIndex + 2;
};

const GetCssVar = (key, def) => {
    let root = window.getComputedStyle(document.documentElement);
    let v = document.body.style.getPropertyValue(key) || root.getPropertyValue(key);
    if (!v) {
        return def || '';
    } else {
        return v.trim();
    }
};

module.exports = Magix.View.extend({
    tmpl: '@index.html:updateby[]',
    init(extra) {
        let me = this;
        me.on('destroy', () => {
            CalCache(me, 'remove');
            // 2 dialog + mask
            // DialogZIndex -= 2;

            // 存在非手动关闭浮层的情况，比如浮层中有一个按钮从本页面跳走
            // 这时候需要关闭浮层
            $('#' + me.id).trigger('dlg_close');

            if (me['@{resize.timer}']) {
                clearTimeout(me['@{resize.timer}']);
            }
        });

        // DialogZIndex += 2;
        // CacheList.push(me);
        CalCache(me, 'add');

        if (!Magix.has(extra, 'closable')) {
            extra.closable = true;
        }

        // 埋点处理 位置_path，不支持/处理成下划线
        let spm = extra.spm || ('gostr=/alimama_bp.4.1;locaid=d' + extra.view.replace(/\//g, '_'));

        me.updater.set({
            ...extra,
            spm,
            cntId: 'cnt_' + me.id
        });
    },
    render() {
        let me = this;
        me.updater.digest();

        setTimeout(me.wrapAsync(() => {
            let data = me.updater.get();
            let wrapper = $('#wrapper_' + me.id);
            wrapper.css(data.posTo);

            // 修正样式
            me['@{sync.style}']();

            let cntId = data.cntId;
            let mask = $('#mask_' + me.id);
            if (mask.length > 0) {
                mask.addClass('@index.less:backdrop-out');
            }
            // emptyClosable 明确指定可关闭
            if (data.closable || data.emptyClosable) {
                // 浮层可关闭时
                // 点击空白处关闭浮层
                wrapper.on('click', (e) => {
                    if (!Magix.inside(e.target, me.id)) {
                        $('#' + me.id).trigger('dlg_close');
                    }
                })
            }

            // me.owner.mountVframe(cntId, data.view, data);
            // 先实例化，绑定事件，再加载对应的view
            let cntVf = me.owner.mountVframe(cntId, '');
            cntVf.on('created', () => {
                if (data.full) {
                    // 全屏右出浮层的左侧快捷导航
                    let quickCnts = $(`#${cntId}`).find('[mx-dialog-quick]');
                    if (quickCnts && quickCnts.length) {
                        let quicks = [];
                        for (let i = 0; i < quickCnts.length; i++) {
                            let v = $(quickCnts[i]).attr('mx-dialog-quick'),
                                t = $(quickCnts[i]).attr('mx-dialog-quick-text');
                            quicks.push({ value: v, text: t });
                        }
                        $(`#${cntId}_content`).prepend(`<div class="@index.less:quick-wrapper">
                            ${quicks.map(q => `<a href="javascript:;" class="@index.less:quick" mx-dialog-modal-quick="${q.value}">${q.text}</a>`).join('')}
                        </div>`);
                    }
                }
            });
            cntVf.mountView(data.view, data);

            if (data.full) {
                // 全屏右出浮层
                $(`#${cntId}`).on('scroll', () => {
                    // popover追加到body，滚动时通知节点改动定位
                    $(document).trigger('dialogScoll');
                })
            }
        }), Duration);
    },

    '@{sync.style}'() {
        let { cntId, vId, full, card, width, height, dialogHeader, dialogFooter } = this.updater.get();
        let dlg = $(`#${vId}`);
        let clientWidth = document.documentElement.clientWidth,
            clientHeight = document.documentElement.clientHeight;
        if (full) {
            // mxModal 全屏右出浮层
            let fcss = {
                height: clientHeight - (dlg.outerHeight() - $('#' + cntId).outerHeight()),
                overflowY: 'auto',
            }
            if (card) {
                fcss.backgroundColor = 'var(--mx-dialog-color-bg, var(--app-bg))';
                fcss.padding = 'var(--mx-comp-v-gap) var(--mx-comp-h-gap)';
            }
            $('#' + cntId).css(fcss);

            // 是否需要更新宽度位置 + 左距离
            let w = Math.min(clientWidth, width);
            dlg.css({
                width: w,
                left: Math.max(0, clientWidth - w)
            })
        } else {
            // mxDialog
            if ((dialogHeader.title || dialogFooter.enter || dialogFooter.cancel) && height) {
                let h = height;
                let fh = $('#' + cntId + '_header'),
                    ff = $('#' + cntId + '_footer');
                if (fh && fh.length) {
                    h -= fh.outerHeight();
                }
                if (ff && ff.length) {
                    h -= ff.outerHeight();
                }
                // 使用自带的吊头吊尾的，处理下高度
                $('#' + cntId).css({
                    height: h,
                    overflowY: 'auto',
                });
            } else {
                // 减去边框跨度
                let btw = +dlg.css('borderTopWidth').replace('px', ''),
                    bbw = +dlg.css('borderBottomWidth').replace('px', '');
                $(`#${cntId}_loading`).css({
                    height: (height - btw - bbw) + 'px'
                });
            }
        }
    },

    '@{notify.main.view.unload}'(e) {
        let vf = Vframe.get('cnt_' + this.id);
        vf && vf.invoke('fire', ['unload', e]);
    },

    /**
     * 全屏右出浮层提交按钮
     */
    '@{submit}<click>'(e) {
        let me = this;
        let { cntId, callback } = me.updater.get();
        let submitBtn = Vframe.get(`${cntId}_footer_submit`);
        submitBtn.invoke('showLoading');

        Vframe.get(cntId).invoke('check').then(result => {
            submitBtn.invoke('hideLoading');

            let errorNode = $('#' + cntId + '_footer_error');
            if (result.ok) {
                errorNode.html('');
                me['@{close}<click>']();

                if (callback) {
                    callback(result.data || {});
                }
            } else {
                if (result.msg) {
                    errorNode.html(`<i class="mc-iconfont @index.less:error-icon">&#xe727;</i>${result.msg}`);
                } else {
                    errorNode.html('');
                }
            }
        });
    },

    '@{close}<click>'(e) {
        // e.stopPropagation();
        $('#' + this.id).trigger('dlg_close');
    },

    '$[mx-dialog-modal-quick]<click>'(e) {
        let id = $(e.target).attr('mx-dialog-modal-quick');
        let quicks = $(`#${this.id} .@index.less:quick`);
        quicks.removeClass('@index.less:quick-cur');

        let node = $(`[mx-dialog-quick=${id}]`);
        $(e.eventTarget).addClass('@index.less:quick-cur');

        let { cntId } = this.updater.get();
        let wrapper = $(`#${cntId}`);
        wrapper.scrollTop(wrapper.scrollTop() + node.offset().top - wrapper.offset().top);
    },

    '$doc<keyup>'(e) {
        if (e.keyCode == 27) { //esc
            let dlg = CacheList[CacheList.length - 1];
            if (dlg == this && dlg.updater.get('closable')) {
                let node = $('#' + dlg.id);
                node.trigger('dlg_close');
            }
        }
    },
    '$win<resize>'(e) {
        let me = this;
        if (me['@{resize.timer}']) {
            clearTimeout(me['@{resize.timer}']);
        }

        me['@{resize.timer}'] = setTimeout(me.wrapAsync(() => {
            me['@{sync.style}']();
        }), 200);
    }
}, {
    '@{dialog.show}'(view, options) {
        // vfDialogId自定义当前dialog id
        let id = options.vfDialogId || Magix.guid('dlg_');
        if (options.mask) {
            let mask = $('<div class="@index.less:dialog-backdrop" id="mask_' + id + '" />');
            mask.css({
                zIndex: DialogZIndex - 1
            })
            $(document.body).append(mask);
        }

        let wrapperId = 'wrapper_' + id,
            wrapperZIndex = DialogZIndex;
        let { width, left, top } = options;
        // 全屏右出浮层不需要圆角
        let wrapper = $(`<div mx-view class="@index.less:dialog-wrapper" 
                id="${wrapperId}" style="z-index:${wrapperZIndex}">
                <div class="@index.less:dialog ${options.full ? '@index.less:full' : ''} ${options.dialogClass || ''}" id="${id}" 
                    style="top:${top}px; left:${left}px; width:${width}px;"></div>
            </div>`);
        wrapper.css(options.posFrom);
        $(document.body).append(wrapper);

        // 禁止body滚动
        // 有滚动条的时候，加上右padding，防止页面抖动
        let scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
        if (scrollbarWidth > 0) {
            document.body.style.paddingRight = `${scrollbarWidth}px`;
        }
        document.body.style.overflowY = 'hidden';

        wrapper.css({
            overflowY: options.modal ? 'hidden' : 'auto'
        });

        let vf = view.owner.mountVframe(id, '@moduleId', options);
        let node = $('#' + id);
        let suspend;
        return node.on('dlg_close', () => {
            if (node.data('closed')) {
                return;
            }
            node.trigger({
                type: 'beforeClose',
                closeFn: () => {
                    if (!node.data('closing') && !suspend) {
                        let resume = () => {
                            node.data('closing', 1);

                            $('#wrapper_' + id).css(options.posFrom);
                            $('#mask_' + id).removeClass('@index.less:backdrop-out');

                            setTimeout(() => {
                                node.trigger('close');

                                // 不重复关闭
                                node.data('closed', 1);

                                if (view.owner) {
                                    view.owner.unmountVframe(id);
                                }
                                $('#wrapper_' + id).remove();
                                $('#mask_' + id).remove();

                                // 有浮层展开的情况下，body都不可滚动
                                if (CacheList.length == 0) {
                                    document.body.style.paddingRight = '';
                                    document.body.style.overflowY = '';
                                }
                            }, Duration);
                        };
                        let e = {
                            prevent() {
                                suspend = 1;
                            },
                            resolve() {
                                e.p = 1;
                                suspend = 0;
                                resume();
                            },
                            reject() {
                                e.p = 1;
                                suspend = 0;
                            }
                        };
                        vf.invoke('@{notify.main.view.unload}', [e]);
                        if (!suspend && !e.p) {
                            resume();
                        }
                    }
                }
            });
        });
    },

    /**
     * 系统提示
     * 快捷写法：
     * this.alert(title, content, enterCallback, dialogOptions)
     *    title: '标题',
     *    content: '内容',
     *    enterCallback: '点击确认按钮的回调',
     *    dialogOptions: { //浮层样式覆盖
     *       width:'宽度，默认320',
     *       height:'高度',
     *       btns: 'true or false，是否有按钮，默认true',
     *       modal: 'true（禁止滚动） or false（允许滚动），溢出是否允许滚动，默认false',
     *       mask: 'true or false，是否有遮罩，默认false',
     *       closable: 'true or false，是否有右上角关闭按钮，默认false',
     *       left: '最终定位相对于屏幕左侧，默认居中',
     *       top: '最终定位相对于屏幕高侧，默认居中',
     *       type: 展示类型：highlight：品牌色图标强调提示（默认），error：红色错误类型提示,warn：黄色警告类型提示;pass：绿色通过类型提示
     *    }
     *
     * 同this.confirm的api：this.alert(viewOptions, dialogOptions);
     * viewOptions: {
     *       title: '标题',
     *       content: '内容',
     *       enterText: '自定义确定按钮文案，默认确定',
     *       cancelText: '自定义取消按钮文案，默认取消',
     *       enterCallback: '确定按钮响应事件',
     *       cancelCallback: '取消按钮响应事件'
     * }
     * dialogOptions: { //浮层样式覆盖
     *       width:'宽度',
     *       height:'高度',
     *       modal: 'true（禁止滚动） or false（允许滚动），溢出是否允许滚动，默认false',
     *       mask: 'true or false，是否有遮罩，默认false',
     *       closable: 'true or false，是否有右上角关闭按钮，默认false',
     *       left: '最终定位相对于屏幕左侧',
     *       top: '最终定位相对于屏幕高侧',
     *       type: 展示类型：highlight：品牌色图标强调提示（默认），error：红色错误类型提示,warn：黄色警告类型提示;pass：绿色通过类型提示
     * }
     */
    alert() {
        if ($.isPlainObject(arguments[0])) {
            // alert(viewOptions, dialogOptions)
            return this.confirm(Magix.mix({
                cancel: false // 无取消按钮
            }, arguments[0]), arguments[1]);
        } else {
            // alert(title, content, enterCallback, dialogOptions)
            let dialogOptions = arguments[3] || {};
            return this.confirm({
                title: arguments[0],
                content: arguments[1],
                enter: dialogOptions.btns,
                enterCallback: arguments[2],
                cancel: false
            }, dialogOptions);
        }
    },

    /**
     * this.confirm(viewOptions, dialogOptions);
     *    viewOptions: {
     *       title: '标题',
     *       content: '内容',
     *       enter: true or false，默认true
     *       enterText: '自定义确定按钮文案，默认确定',
     *       enterCallback: '确定按钮响应事件',
     *       cancel: true or false，默认true
     *       cancelText: '自定义取消按钮文案，默认取消',
     *       cancelCallback: '取消按钮响应事件'
     *    }
     *    dialogOptions: { //浮层样式覆盖
     *       width:'宽度',
     *       height:'高度',
     *       modal: 'true（禁止滚动） or false（允许滚动），溢出是否允许滚动，默认false',
     *       mask: 'true or false，是否有遮罩，默认false',
     *       closable: 'true or false，是否有右上角关闭按钮，默认false',
     *       left: '最终定位相对于屏幕左侧',
     *       top: '最终定位相对于屏幕高侧',
     *       type: 展示类型：highlight：品牌色图标强调提示（默认），error：红色错误类型提示,warn：黄色警告类型提示;pass：绿色通过类型提示
     *    }
     */
    confirm(viewOptions, dialogOptions) {
        dialogOptions = dialogOptions || {};
        Magix.mix(viewOptions, {
            title: viewOptions.title || I18n['dialog.title'],
            content: viewOptions.content || '',
            enter: viewOptions.enter + '' !== 'false',
            enterText: viewOptions.enterText || I18n['dialog.submit'],
            cancel: viewOptions.cancel + '' !== 'false',
            cancelText: viewOptions.cancelText || I18n['dialog.cancel'],
            spm: viewOptions.spm || this.id,
        });

        return this.mxDialog('@./confirm', viewOptions, Magix.mix({
            width: 320,
            emptyClosable: true, //点击空白区域是否允许关闭浮层
            closable: false, // 无右上角关闭按钮（可关闭时点击空白处关闭浮层）
            mask: false
        }, dialogOptions));
    },
    /**
     * 弹出登录框，规范登录框的弹出样式
     * 宽度350，高度400, 淘宝登录框要求至少400，https://yuque.antfin-inc.com/up/login-doc/rgfgka
     * 登陆框点击空白处不可关闭，所有closable: false，自定义一个关闭按钮
     * 
     * 历史配置：mxLoginView(viewPath, viewOptions)
     * viewPath：自定义弹出框view
     * viewOptions：传入参数
     * 
     * 当前配置：mxLoginView(viewOptions)
     * viewOptions.bizCode：产品线定义，bizCode包装登陆框逻辑
     * viewOptions：其他参数
     */
    mxLoginView(viewPath, viewOptions = {}) {
        if ($.isPlainObject(viewPath) || !viewPath) {
            // viewOptions.bizCode配置
            viewOptions = viewPath;
            viewPath = '@./login-iframe';
        }

        // 判断设置：是否为移动端
        let width = window.innerWidth;
        if (document.documentElement && document.documentElement.clientWidth) {
            width = document.documentElement.clientWidth;
        } else if (document.body && document.body.clientWidth) {
            width = document.body.clientWidth;
        } else if (screen.width) {
            width = screen.width;
        }
        if (width > 768) {
            // pc
            // 内容宽350，border2，内部边距8，为了不影响二维码展示
            // 高400，内部边距8
            let gap = 8;
            return this.mxDialog('@./login', {
                loginViewPath: viewPath,
                loginViewData: viewOptions
            }, {
                width: 350 + 2 + gap * 2,
                height: 400 + 2 + gap * 2,
                closable: false
            });
        } else {
            let wirelessFn = (loginBizMap) => {
                let bizCode = viewOptions.bizCode;
                let info = loginBizMap[bizCode] || loginBizMap.def;

                // 淘宝登陆url
                //    css_style：为主站那边给定的样式约定值
                let redirectURL = '';
                if (info.fullRedirectURL) {
                    // 全路径
                    redirectURL = encodeURIComponent(info.fullRedirectURL);
                } else if (!info.redirectURL) {
                    // 未配置重定向地址，跳转回当前页面
                    redirectURL = encodeURIComponent(window.location.href);
                } else {
                    let { params: routeParams } = Magix.Router.parse();
                    redirectURL = encodeURIComponent(Magix.toUrl(window.location.origin + info.redirectURL, routeParams));
                };
                let params = [
                    `redirectURL=${redirectURL}` // 登录成功回跳页面
                ].concat(info.params || []);
                window.location.href = 'https://login.m.taobao.com/login.htm?' + params.join('&');
            }

            // 移动：直接跳转登录页
            $.getJSON('//g.alicdn.com/mm/bp-source/lib/login2.json', (loginBizMap) => {
                wirelessFn(loginBizMap);
            }).fail((data, status, xhr) => {
                // 异常情况下重定向回当前页面
                wirelessFn({
                    def: {
                        params: [
                            'css_style=zszwsite_mm'
                        ],
                        fullRedirectURL: '',
                        redirectURL: ''
                    }
                })
            });
        }
    },
    /**
     * 全屏右出浮层
     * this.mxModal(viewPath[string], viewOptions[object], dialogOptions[object])
     *      viewPath: 'dialog view路径'
     *      viewOptions: {
     *          传入dialog的数据，挂载当前dialog实体
     *      }
     *      dialogOptions: { 浮层样式覆盖
     *          width:'宽度，默认600',
     *          mask: 'true or false，是否有遮罩',
     *          closable: 'true or false，是否有右上角关闭按钮'
     *          header: {
     *              title: '标题',
     *              tip: '提示信息'
     *          },
     *          footer: {
     *              enter: 'true or false，是否需要确定按钮',
     *              enterText: '确定按钮文案',
     *              cancel: 'true or false，是否需要取消按钮',
     *              cancelText: '取消按钮文案'
     *          }
     * 
     *          ==========================================
     *          无效参数：
     *          height:'高度固定全屏',
     *          left: '固定为doc.width - width',
     *          top: '固定为0',
     *          modal: '固定为false，禁止滚动',
     *      }
     */
    mxModal(view, viewOptions, dialogOptions) {
        dialogOptions = dialogOptions || {}
        return this.mxDialog(view, viewOptions, Magix.mix({
            closable: true,
            mask: true
        }, Magix.mix(dialogOptions, {
            full: true,
            dialogHeader: Magix.mix({
                title: '',
                tip: '',
                iconTip: ''
            }, dialogOptions.header || {}),
            dialogFooter: Magix.mix({
                enter: true, // 默认有按钮
                enterText: I18n['dialog.submit'],
                cancel: true,
                cancelText: I18n['dialog.cancel'],
                textAlign: GetCssVar('--mx-dialog-text-align', 'left'),
            }, dialogOptions.footer || {}),
            modal: false,
            height: window.innerHeight,
            placement: 'right',
            card: (dialogOptions.card + '' !== 'false')
        })));
    },


    /**
     * this.mxDialog(viewPath[string], viewOptions[object], dialogOptions[object])
     *    viewPath: 'dialog view路径'
     *    viewOptions: {
     *        传入dialog的数据，挂载当前dialog实体
     *    }, 
     *    dialogOptions: { //浮层样式覆盖
     *        width:'宽度',
     *        height:'高度',
     *        modal: 'true（禁止滚动） or false（允许滚动），溢出是否允许滚动，默认false',
     *        mask: 'true or false，是否有遮罩，默认true',
     *        closable: 'true or false，是否有右上角关闭按钮，默认true',
     *        left: '最终定位相对于屏幕左侧，默认居中',
     *        top: '最终定位相对于屏幕高侧，默认居中',
     *        target: 指定节点，相对该节点下中对齐
     *        offset: 指定节点时微量偏移
     *    }
     */
    mxDialog(view, viewOptions, dialogOptions) {
        let me = this;
        let dlg;
        let beforeCloseCallback,
            afterCloseCallback;

        let output = {
            beforeClose(fn) {
                // 关闭浮层前调用
                // return true 关闭
                // return false 不关闭浮层
                beforeCloseCallback = fn;
            },
            close() {
                if (dlg) {
                    dlg.trigger('dlg_close');
                }
            },
            afterClose(fn) {
                // 关闭浮层后调用
                afterCloseCallback = fn;
            }
        };

        let dOptions = {
            view: view
        };
        seajs.use(view, me.wrapAsync(V => {
            // ！！去掉这个限制，例如同一个view可能同时弹出多个alert
            // 同一个view只保留一个
            // let key = '$dlg_' + view;
            // if (me[key]) {
            //     return;
            // }
            // me[key] = 1;

            // 优先级：
            // 外部传入的（dialogOptions） > view本身配置的（vDialogOptions） > 默认（dOptions）

            // view本身配置的
            // 兼容es module
            let vDialogOptions = V.__esModule ? (V.default.dialogOptions || {}) : (V.dialogOptions || {});

            // 外部传入的
            dialogOptions = dialogOptions || {};

            // 浮层出现动画位置：
            //     center：居中（从上到下）
            //     right：右侧（从右到左）
            let placement = dialogOptions.placement || vDialogOptions.placement || 'center';
            let width = dialogOptions.width || vDialogOptions.width || 400,
                height = dialogOptions.height || vDialogOptions.height || 260;

            let left, top, posFrom, posTo;
            let clientWidth = document.documentElement.clientWidth,
                clientHeight = document.documentElement.clientHeight;
            let target = dialogOptions.target || vDialogOptions.target;
            if (!target) {
                switch (placement) {
                    case 'center':
                        left = (clientWidth - width) / 2;
                        top = Math.max((clientHeight - height) / 2, 0);
                        posFrom = {
                            opacity: 0,
                            top: '-50px'
                        }
                        posTo = {
                            opacity: 1,
                            top: 0
                        }
                        break;
                    case 'right':
                        left = clientWidth - width;
                        top = 0;
                        posFrom = {
                            opacity: 0,
                            top: 0,
                            left: clientWidth
                        }
                        posTo = {
                            opacity: 1,
                            top: 0,
                            left: 0
                        }
                        break;
                }
            } else {
                // 指定节点
                target = $(target);
                let customOffset = dialogOptions.offset || vDialogOptions.offset || {};
                customOffset.top = +customOffset.top || 0;
                customOffset.left = +customOffset.left || 0;
                let offset = target.offset();
                top = offset.top + target.outerHeight() + 10 - $(window).scrollTop() + customOffset.top;
                left = offset.left - (width - target.outerWidth()) / 2 + customOffset.left;
                posFrom = {
                    opacity: 0,
                    top: '-50px'
                }
                posTo = {
                    opacity: 1,
                    top: 0
                }
            }

            Magix.mix(dOptions, {
                mask: true,
                modal: false,
                width,
                closable: true,
                left,
                top,
                posFrom,
                posTo,
                dialogHeader: Magix.mix({
                    title: '',
                    tip: '',
                    iconTip: ''
                }, dialogOptions.header || vDialogOptions.header || {}),
                dialogFooter: Magix.mix({
                    enter: false, // mxDialog默认无按钮
                    enterText: I18n['dialog.submit'],
                    cancel: false, // mxDialog默认无按钮
                    cancelText: I18n['dialog.cancel'],
                    textAlign: GetCssVar('--mx-dialog-text-align', 'left'),
                }, dialogOptions.footer || vDialogOptions.footer || {}),
            }, vDialogOptions, dialogOptions);

            // 指定高度的情况下，高度相对可视位置进行修正
            if (dOptions.top + dOptions.height > clientHeight) {
                // 8 减去border的影响
                dOptions.top = Math.max(clientHeight - dOptions.height - 8, 0);
            }

            // 数据
            Magix.mix(dOptions, viewOptions);
            dOptions.dialog = output;
            dlg = me['@{dialog.show}'](me, dOptions);

            dlg.on('beforeClose', (event) => {
                if (!beforeCloseCallback) {
                    event.closeFn();
                } else {
                    beforeCloseCallback().then(() => {
                        event.closeFn();
                    })
                }
            })

            dlg.on('close', () => {
                // delete me[key];
                if (afterCloseCallback) {
                    afterCloseCallback();
                }
            });
        }));

        return output;
    },
    mxCloseAllDialogs() {
        CacheList.forEach(view => {
            let dlg = $('#' + view.id);
            if (dlg) {
                dlg.trigger('dlg_close');
            }
        })
    }
});