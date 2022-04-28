/*md5:b8933086b3de04a16d6922f67af712da*/
/**
 * 导航功能
 * 设计规范：https://done.alibaba-inc.com/file/4fS9MVfQ8r3g/yGGGiUSmHB1SrTTl/preview?aid=B9C48BFB-D87D-412C-94AA-0B5154888713
 */
import Magix, { Vframe } from 'magix';
import * as $ from '$';
import * as View from '../mx-util/view';
import * as Dialog from '../mx-dialog/index';
Magix.applyStyle('@index.less');

export default View.extend({
    tmpl: '@index.html',
    mixins: [Dialog],
    init(ops) {
        let that = this;
        that.assign(ops);

        that.on('destroy', () => {
            ['@{dealy.show.timer}', '@{dealy.hide.timer}', '@{show.bottom.timer}'].forEach(timer => {
                if (that[timer]) {
                    clearTimeout(that[timer]);
                }
            })
        });
    },
    assign(ops) {
        let that = this;

        // 当前数据截快照
        that.updater.snapshot();

        // 容器内使用场景
        let wrapperId = ops.wrapper || '';
        let wrapper = wrapperId ? $('#' + wrapperId) : $(window);

        // 导航样式mode
        // common：白底色版本（对应老参数配置dark=false）
        // dark：深底色版本
        // his：历史样式（对应老参数配置dark=true）
        let mode = 'common';
        if (ops.hasOwnProperty('mode')) {
            mode = ops.mode;
        } else {
            if (ops.dark + '' !== 'false') {
                // 老版导航样式 历史配置参数 dark true/false
                // 为了兼容历史场景的使用，没有dark参数也是老版组件样式
                mode = 'his';
            }
        }

        // 设备信息：无线pc兼容
        let devInfo = that['@{get.dev.info}']();

        //是否需要顶部外链信息，pc默认是true，无线端不显示
        let originLinks = ops.links + '' !== 'false';
        let links = devInfo.pc ? originLinks : false;

        // 根据现实模式进行参数修正
        let login = (ops.login + '' !== 'false'); //是否需要显示登录信息，默认是true
        let height,
            width = +ops.width,
            colorBg, colorText;
        switch (mode) {
            case 'his':
                // 历史使用方式兼容
                // 黑底色版无论是否显示外链高度固定
                links = true;
                login = false;
                height = 88;
                if (!width) {
                    width = wrapper.outerWidth() - 120;
                }
                break;

            default:
                // common / dark
                // 无线端隐藏顶部产品线信息，收起到右侧抽屉
                height = 100;
                if (!links) {
                    height -= 50;
                }

                colorBg = ops.colorBg;
                colorText = ops.colorText;
                break;
        }

        // 色值计算
        let color = ops.color || this['@{get.css.var}']('--color-brand');
        let result = this['@{color.to.rgb}'](color);
        let colorOpacity = `rgba(${result.r}, ${result.g}, ${result.b}, 0.1)`;

        // 默认不选中任何一个导航，表示选中的一级导航
        // 如果默认为某个二级导航，订正选中态为一级的
        let valueKey = ops.valueKey || 'value',
            textKey = ops.textKey || 'text',
            linkKey = ops.linkKey || 'link',
            outerKey = ops.outerKey || 'outer'; // 默认true

        let cur = ops.cur || '';
        let parent = '', child = '';
        let navs = ops.navs || [];
        navs.forEach(nav => {
            if (nav[valueKey] == cur) {
                // 选中的是一级菜单
                parent = nav[valueKey];
                child = '';
            }

            let allLinks = nav.subs && nav.subs.length > 0;
            if (nav.subs && nav.subs.length > 0) {
                let indexArr = [], // 保持顺序
                    pId = `${that.id}_all`,
                    groupMap = {},
                    hasTitle = false, // 是否有标题
                    hasInfo = false; // 分组信息
                nav.subs.forEach(sub => {
                    // 是否全部为链接类型
                    allLinks = allLinks && !!sub[linkKey];

                    // 选中的是二级菜单
                    if (sub[valueKey] == cur) {
                        parent = nav[valueKey];
                        child = sub[valueKey];
                    }

                    // 分组信息
                    let gId = (sub.group || pId) + '';
                    groupMap[gId] = groupMap[gId] || {
                        title: sub.group || '',
                        subs: []
                    };
                    groupMap[gId].subs.push(sub);
                    if (indexArr.indexOf(gId) < 0) {
                        // 保证顺序
                        indexArr.push(gId);
                    }

                    // 是否有分组标题
                    hasTitle = hasTitle || !!sub.group;

                    // 右侧详情说明
                    hasInfo = hasInfo || !$.isEmptyObject(sub.info);
                });

                nav.groups = [];
                for (let i = 0; i < indexArr.length; i++) {
                    nav.groups.push(groupMap[indexArr[i]]);
                }

                // 有详情：全屏
                // 无详情：有几列显示几列 24 + 100
                Magix.mix(nav, {
                    hasTitle,
                    hasInfo,
                    groupWidth: hasInfo ? Math.min(document.documentElement.clientWidth, window.innerWidth) : (124 * nav.groups.length + 2),
                })
            }

            // 子选项全为外链时，点击一级菜单默认跳转第一个外链
            nav[linkKey] = nav[linkKey] || (allLinks ? nav.subs[0][linkKey] : '');

            // 移动端加icon，取后两个字
            nav.bottomText = nav[textKey].slice(-2);
            nav.icon = nav.icon || '<i class="mc-iconfont">&#xe724;</i>';
        })

        // 无线端底部菜单计算，最多显示6个
        let bottomNavs = navs.slice(0, 6);

        that.updater.set({
            wrapperId,
            width,
            height,
            logoNav: ops.logoNav || navs[0],
            navs,
            valueKey,
            textKey,
            linkKey,
            outerKey,
            linkFn: (item) => {
                let t = ` href=${item[linkKey]} `;
                if (item[outerKey] + '' !== 'false') {
                    // 默认true 外链打开
                    t += ' target=_blank ';
                }
                return t;
            },
            parent,
            child,
            mode,
            color,
            colorOpacity,
            colorBg,
            colorText,
            login,
            bizCode: ops.bizCode || '',  //项目bizCode
            loginView: ops.loginView || '',  //登录页面
            user: ops.user || '',
            logoutUrl: ops.logoutUrl || '',  //退出接口
            links,
            originLinks,
            bottomNavs,
            styles: `top: ${(links ? 50 : 0)}px;`,
            logo: ops.logo,
            ceiling: (ops.ceiling + '' !== 'false'), //是否需要吸顶功能，默认是true,
            rightCeilingShow: (ops.rightCeilingShow + '' === 'true'), // 右侧view是否默认不显示，吸顶时显示
            rightView: ops.rightView || '',  //右侧自定义view
            rightViewData: ops.rightViewData || {},
            devInfo
        });

        // 关闭popover
        navs.forEach(nav => {
            let popNode = document.querySelector(`[data-pop="${that.id}_${nav[valueKey]}"]`);
            if (popNode && popNode.id) {
                let popVf = Vframe.get(popNode.id);
                if (popVf) { popVf.invoke('hide'); };
            }
        })

        that['@{wrapper}'] = wrapper;
        that['@{owner.node}'] = $('#' + that.id);

        // altered是否有变化
        // true：有变化
        let altered = that.updater.altered();
        return altered;
    },

    render() {
        let that = this;
        let renderFn = (data) => {
            that.updater.digest(Magix.mix({
                fixed: false,
                bottomNavShow: true
            }, data));

            let { wrapperId, links, ceiling, devInfo } = that.updater.get();
            if (ceiling) {
                let wrapper = that['@{wrapper}'];
                let scrollFn = () => {
                    let others = $(`#${that.id} .@index.less:others`);
                    let otherHeight = 0;
                    if (others.length > 0) {
                        otherHeight = others.outerHeight()
                    }
                    let scrollTop = wrapper.scrollTop();
                    let styles = [
                        'width: 100%',
                        'left: 0'
                    ];
                    if (wrapperId) {
                        // 容器内使用场景
                        styles.push(
                            'position: absolute',
                            'top: ' + scrollTop + 'px'
                        )
                    } else {
                        // 相对window定位
                        styles.push(
                            'position: fixed',
                            'top: 0'
                        )
                    }
                    if (scrollTop > otherHeight) {
                        that.updater.digest({
                            fixed: true,
                            styles: styles.join(';')
                        })
                    } else {
                        that.updater.digest({
                            fixed: false,
                            styles: `top: ${(links ? 50 : 0)}px;`
                        })
                    }
                }
                if (!that['@{init.header.scroll}']) {
                    that['@{init.header.scroll}'] = true;
                    wrapper.on('scroll.header', scrollFn);
                    that.on('destroy', () => {
                        wrapper.off('scroll.header', scrollFn);
                    });
                }
                scrollFn();
            }

            if (!that['@{init.bottom.scroll}'] && (devInfo.phone || devInfo.pad)) {
                let wrapper = that['@{wrapper}'];
                let bottomScrollFn = () => {
                    // 滚动时底部导航隐藏，滚动结束再显示
                    clearTimeout(that['@{show.bottom.timer}']);
                    that['@{show.bottom.timer}'] = setTimeout(() => {
                        that.updater.digest({
                            bottomNavShow: true
                        })
                    }, 100)
                    that.updater.digest({
                        bottomNavShow: false
                    })
                }
                that['@{init.bottom.scroll}'] = true;
                wrapper.on('scroll.bottom', bottomScrollFn);
                that.on('destroy', () => {
                    wrapper.off('scroll.bottom', bottomScrollFn);
                })
            }
        }

        $.getJSON('//g.alicdn.com/mm/bp-source/lib/products.json', ({ logos = {}, products }) => {
            let d = {
                list: products.map(item => {
                    // popover的提示内容
                    item.tip = `${item.seconds.map(second => `
                        <dl class="@index.less:title-subs">
                            ${second.text ? ('<dt>' + second.text + '</dt>') : ''}
                            ${second.thirds.map(third => `
                                <dd><a href="${third.link}" target="_blank" rel="noopener noreferrer">${third.text}</a></dd>
                            `).join('')}
                        </dl>
                    `).join('')}`;

                    return item;
                })
            }
            let { bizCode, mode } = that.updater.get();
            if (bizCode && (logos[`${bizCode}_${mode}`] || logos[bizCode])) {
                // 内置logo
                Magix.mix(d, {
                    logo: logos[`${bizCode}_${mode}`] || logos[bizCode]
                })
            }
            renderFn(d);
        }).fail((data, status, xhr) => {
            // 异常情况下不显示顶部信息
            renderFn({
                links: false
            })
        });
    },

    /**
     * bizCode：各产品bizCode，用于包装登陆框逻辑
     * loginView：已废弃，用bizCode替换，根据bizCode项目包装登陆框逻辑（历史逻辑依然兼容）
     */
    'showLogin<click>'(e) {
        let { bizCode, loginView } = this.updater.get();
        if (!bizCode) {
            // 兼容历史逻辑，打开自定义的登陆浮层
            this.mxLoginView(loginView);
        } else {
            this.mxLoginView({
                bizCode
            });
        }
    },

    /**
     * 处理顶部外链hover样式
     */
    'toggleHover<focusin,focusout>'(e) {
        $(e.eventTarget).attr('data-hover', e.type == 'focusin');
    },

    /**
     * 切换一级菜单
     */
    'changeNav<click>'(e) {
        let that = this;
        let { valueKey, linkKey } = that.updater.get();
        let nav = e.params.nav,
            sub = {};

        // 1：无二级
        //     1-1：本身外链  --  页面上a标签直接打开了不会进入该方法
        //     1-2：本身对应一个页面  --  处理：跳转对应页面
        // 2：有二级
        //     2-1：全部外链  --  处理：不需响应
        //     2-2：有本页打开内容  --  处理：跳转第一个本页打开的内容
        if (!nav.subs || !nav.subs.length) {
            // 无二级
        } else {
            // 有二级
            let subs = nav.subs || [];
            let allOuts = true;
            for (let i = 0; i < subs.length; i++) {
                if (!subs[i][linkKey]) {
                    sub = subs[i];
                    allOuts = false;
                    break;
                }
            }
            if (allOuts) {
                return;
            }
        }

        // 选中的一二级
        that.updater.digest({
            parent: nav[valueKey] || '',
            child: sub[valueKey] || ''
        });

        // 点击时关闭popover
        let popNode = document.querySelector(`[data-pop="${that.id}_${nav[valueKey]}"]`);
        if (popNode && popNode.id) {
            let popVf = Vframe.get(popNode.id);
            if (popVf) { popVf.invoke('hide'); };
        }

        that['@{owner.node}'].trigger({
            type: 'navchange',
            nav: $.isEmptyObject(sub) ? nav : sub
        })
    },

    'changeSub<click>'(e) {
        let that = this;
        let { valueKey } = that.updater.get();
        let { nav, sub } = e.params;

        // 选中的一二级
        that.updater.digest({
            parent: nav[valueKey],
            child: sub[valueKey]
        });

        // 点击时关闭popover
        let popVf = Vframe.get(`${that.id}_${nav[valueKey]}`);
        if (popVf) {
            popVf.invoke('hide');
        }

        that['@{owner.node}'].trigger({
            type: 'navchange',
            nav: sub
        })
    },

    'showDrawer<click>'(e) {
        let that = this;
        let { list, spm, login, user, bizCode, loginView } = that.updater.get();
        let dlg = that.mxModal('@./drawer', {
            data: { list, spm, login, user, bizCode, loginView }
        }, {
            width: 300,
            footer: {
                enter: false,
                cancel: false
            },
            card: false
        });
        // 待定，刘海屏幕的适配
        // const liuhaiHeight = window.screen.availHeight - window.screen.availWidth * 16 / 9 // 刘海屏高度
        // const height = liuhaiHeight > 0 ? window.innerHeight + liuhaiHeight : window.innerHeight
        // console.log(liuhaiHeight)
        // console.log(dlg)

        that.updater.digest({
            bottomNavShow: false
        });
        dlg.afterClose(e => {
            that.updater.digest({
                bottomNavShow: true
            })
        })
    }
});
