/*md5:823bacdda00ce6d4408403cb10594079*/
/**
 *  流程步骤组件：
 *  stepIndex定义：当前步骤，从1开始
 * 
 *  subStepIndex定义
 *     -1：不停留在具体的子view上
 *     >0：具体某一个子步骤
 */
import Magix, { Router, Vframe } from 'magix';
import * as $ from '$';
import * as View from '../mx-util/view';
Magix.applyStyle('@index.less');

export default View.extend({
    tmpl: '@index.html',
    init(extra) {
        let that = this;

        that.observeLocation(['stepIndex', 'subStepIndex']);
        that.owner.oncreated = () => {
            if (!that.$init) {

                // 每次重新render之后
                // 所有子view加载完成后
                that.subScroll(true);

                // 子组件的mount不需要重新scroll
                that.$init = 1;
            }
        };
        that.ondestroy = () => {
            that.owner.off('created');
        };

        that.assign(extra);
    },
    assign(extra) {
        // 当前数据截快照
        this.updater.snapshot();

        this.updater.set({
            gapWidth: 16,
            stepLineHeight: 46,
            leftWidth: +extra.leftWidth || 160,
            rightWidth: +extra.rightWidth || 260,
            viewHeight: window.innerHeight,
            alreadyStep: extra.alreadyStep || 1,
            originStepInfos: extra.stepInfos || [], //所有的步骤信息
            preventRepeatClick: extra.preventRepeatClick + '' === 'true', // 是否禁止重复点击
        });

        // altered是否有变化 true：有变化
        let altered = this.updater.altered();
        return altered;
    },
    render() {
        let that = this;

        // trigger oncreated，子组件的渲染不scroll
        that.$init = null;

        let alreadyStep = +that.updater.get('alreadyStep');
        let stepInfos = $.extend(true, [], that.updater.get('originStepInfos'));

        let locParams = Router.parse().params;
        // 主步骤信息从1开始
        let curStepIndex = +(locParams.stepIndex || 1);
        if (curStepIndex > alreadyStep) {
            alreadyStep = curStepIndex;
        }

        // 子步骤：
        // -1：在主导航上
        // >0：1，2，3
        let curSubStepIndex = +locParams.subStepIndex || -1;

        let defPrevTip = '返回上一步',
            defNextTip = '下一步';
        stepInfos.forEach((step, i) => {
            let stepIndex = i + 1;
            step.index = stepIndex;

            // visibleSubLen可见子view个数，有的可能不可见
            // hide：导航上及中间操作区域都不显示
            // subHide：不在侧边导航上显示，中间操作区域可见
            let visibleSubLen = 0;
            step.subs = (step.subs || []).map((sub, si) => {
                if (!sub.hide && !sub.subHide) {
                    visibleSubLen++;
                }

                Magix.mix(sub, {
                    index: si + 1,
                    visibleIndex: visibleSubLen,
                    toggle: sub.toggle + '' === 'true', // 是否可展开收起
                    toggleState: sub.toggleState + '' !== 'false', // 默认展开收起状态
                })

                return sub;
            });
            step.showSubs = (visibleSubLen > 1);
            step = that.wrapSide(step);

            // 1. 显示配置当前步骤不可操作
            // 2. <= 当前步骤 展开子列表
            step.locked = (step.locked + '' === 'true') || (stepIndex > alreadyStep);

            // 修正子步骤信息
            if ((stepIndex == curStepIndex) && ((curSubStepIndex > step.subs.length) || (step.subs.length == 1))) {
                curSubStepIndex = -1;
            }

            // 历史配置：
            //      prevTip：返回上一步文案
            //      nextTip：下一步文案
            //      nextFn：(remain) => {  // 下一步callback
            //          // 页面参数并集 remain
            //          // 操作完成之后，提交下一步
            //          return new Promise(resolve => {
            //          })
            //      } 
            // 新配置，全部自定义按钮
            //      btns = [{
            //          text: '显示文案', 
            //          type: 'next', //prev前一步，next后一步
            //          brand: true, //是否为品牌色按钮，默认为false
            //          check: true, // true/false，提交时是否需要调用子view的check方法
            //          callback: (params) => {
            //              // 回调方法，check == true的情况下，
            //          }
            //      }]
            let btns = [];
            if (step.hasOwnProperty('btns')) {
                btns = step.btns || [];
                btns.forEach(btn => {
                    if (btn.type == 'prev') {
                        // 返回上一步
                        btn.text = btn.text || defPrevTip;
                        btn.fn = 'prev';
                    } else if (btn.type == 'next') {
                        // 下一步（默认品牌色）
                        btn.text = btn.text || defNextTip;
                        btn.fn = 'next';
                        btn.brand = (btn.brand + '' !== 'false');
                    } else {
                        btn.fn = 'custom';
                    }
                })
            } else {
                let prevTip = '';
                if ((stepIndex > 1) && (!stepInfos[i - 1].locked)) {
                    // 1. 第一步没有返回上一步
                    // 2. 上一步被锁定的情况下没有返回上一步
                    // 3. 自定义trigger的情况
                    prevTip = step.prevTip || defPrevTip;
                }
                if (prevTip) {
                    // 返回上一步可见的情况下
                    btns.push({
                        type: 'prev',
                        text: prevTip,
                        fn: 'prev'
                    })
                }

                let nextTip = '';
                if (stepIndex < stepInfos.length) {
                    // 1. 最后一步没有下一步
                    // 2. 自定义trigger的情况
                    nextTip = step.nextTip || defNextTip;
                }
                if (nextTip) {
                    // 下一步可见
                    btns.push({
                        type: 'next',
                        text: nextTip,
                        brand: true,
                        fn: 'next',
                        callback: step.nextFn
                    })
                }
            }
            step.btns = btns;
        })

        let diffParams = Router.diff().params;
        if (!diffParams.stepIndex && diffParams.subStepIndex) {
            // 只修改了 subStepIndex 的场景
            // 不digest 直接操作dom 跳转到子模块位置
            let { stepLineHeight } = that.updater.get();

            that.updater.set({
                curSubStepIndex,
            });
            let onClass = '@index.less:on';
            let cur = $('#' + that.id + ' .@index.less:step-current');
            cur.find('.@index.less:step').removeClass(onClass);
            let sub = cur.find('.@index.less:step[data-sub="' + curSubStepIndex + '"]');
            sub.addClass(onClass);
            let visibleIndex = +sub.attr('data-visible-sub');
            cur.find('.@index.less:pbg').css({
                top: (curSubStepIndex == -1) ? 0 : (visibleIndex * stepLineHeight)
            })

            that.subScroll();
        } else {
            if (diffParams.stepIndex) {
                // 步骤切换时跳转到顶部
                $(window).scrollTop(0);
            }

            // 步骤切换了重新mount子view
            that.updater.digest({
                alreadyStep,
                stepInfos,
                curStepInfo: stepInfos[curStepIndex - 1],
                curStepIndex,
                curSubStepIndex,
            });
        }
    },

    wrapSide(step) {
        let rightWidth = +this.updater.get('rightWidth');

        let sideWrapper = null,
            sideData = {},
            hasSide = false;

        if (step.sideView || step.sideTip) {
            sideWrapper = '@./tip';
            sideData = {
                view: step.sideView || '', // 自定义侧边view
                title: step.sideTitle || '', // 标题
                content: step.sideTip || '', // 简单提示文案
                info: step.sideData || {} // 默认传入侧边的数据
            }
            hasSide = true;
        }
        step.sideWrapper = sideWrapper;
        step.sideData = sideData;
        step.hasSide = hasSide;
        step.rightWidth = hasSide ? rightWidth : 0;
        return step;
    },

    /**
     * 返回上一步
     */
    'prev<click>'(e) {
        let { curStepIndex } = this.updater.get();
        Router.to({
            stepIndex: (+curStepIndex - 1),
            subStepIndex: -1
        });
    },

    checkSubs() {
        let that = this;
        return new Promise(resolve => {
            let { curStepInfo } = that.updater.get();
            let subs = curStepInfo.subs;
            let models = subs.map(sub => {
                let vf = Vframe.get($(`[data-sub="${that.id}_sub_${sub.index}"]`)[0].id);
                return vf.invoke('check');
            });
            Promise.all(models).then(results => {
                let ok = true,
                    msgs = [],
                    remain = {};

                results.forEach((r: { ok: true, msg: '', remain: {} }, i) => {
                    ok = ok && r.ok;
                    if (!r.ok) {
                        msgs.push({
                            label: subs[i].label,
                            msg: r.msg || ''
                        })
                    }

                    // 同名数据合并
                    let rr = r.remain || {};
                    for (let k in rr) {
                        if (remain.hasOwnProperty(k)) {
                            if (Array.isArray(rr[k]) && Array.isArray(remain[k])) {
                                remain[k] = remain[k].concat(rr[k]);
                            } else if ($.isPlainObject(rr[k]) && $.isPlainObject(remain[k])) {
                                Magix.mix(remain[k], rr[k]);
                            } else {
                                remain[k] = rr[k];
                            }
                        } else {
                            remain[k] = rr[k];
                        }
                    }
                });

                resolve({
                    ok,
                    msg: `${msgs.map(m => `${m.label ? (m.label + '：') : ''}${m.msg}`).join('；')}`,
                    remain,
                })
            });
        })
    },

    /**
     * 展开收起子模块
     */
    'toggleSub<click>'(e) {
        let { curStepInfo } = this.updater.get(),
            subIndex = e.params.subIndex;

        Magix.mix(curStepInfo.subs[subIndex], {
            toggleState: !curStepInfo.subs[subIndex].toggleState,
        })
        // mx-main组件内仅做dom操作，防止子view重复digest
        this.updater.set({
            curStepInfo,
        });

        let sub = curStepInfo.subs[subIndex];
        let target = $(e.eventTarget);
        target.html(sub.toggleState ? '收起设置<i class="mc-iconfont @index.less:title-right-toggle">&#xe6b8;</i>' : '展开设置<i class="mc-iconfont @index.less:title-right-toggle">&#xe6b9;</i>');
        let subContent = $(`#${this.id} [data-sub="${this.id}_sub_${sub.index}"]`);
        subContent[sub.toggleState ? 'show' : 'hide']();
        this.winScroll();
    },

    /**
     * 下一步：先校验能否提交
     */
    async 'next<click>'(e) {
        let that = this;
        let { btn } = e.params;

        if (that.updater.get('preventRepeatClick')) {
            // 防止重复点击
            let btnVf;
            try { btnVf = Vframe.get(e.eventTarget.id); } catch (error) { };
            if (btn.disabled) { return; }

            btn.disabled = true;
            if (btnVf) { btnVf.invoke('showLoading'); };

            let result = await that.checkSubs();
            if (result.ok) {
                that.showMsg('');

                // 下一步
                if (btn.callback) {
                    btn.callback(result.remain).then(remainParams => {
                        btn.disabled = false;
                        if (btnVf) { btnVf.invoke('hideLoading'); };
                        that.next(remainParams || {});
                    }, reason => {
                        that.showMsg(reason || '');
                        btn.disabled = false;
                        if (btnVf) { btnVf.invoke('hideLoading'); };
                    })
                } else {
                    btn.disabled = false;
                    if (btnVf) { btnVf.invoke('hideLoading'); };
                    that.next({});
                }
            } else {
                that.showMsg(result.msg);
                btn.disabled = false;
                if (btnVf) { btnVf.invoke('hideLoading'); };
            }
        } else {
            let result = await that.checkSubs();
            if (result.ok) {
                that.showMsg('');

                // 下一步
                if (btn.callback) {
                    btn.callback(result.remain).then(remainParams => {
                        that.next(remainParams || {});
                    }, reason => {
                        that.showMsg(reason || '');
                    })
                } else {
                    that.next({});
                }
            } else {
                that.showMsg(result.msg);
            }
        }
    },

    /**
   * 自定义按钮逻辑
   */
    async 'custom<click>'(e) {
        let that = this;
        let { btn } = e.params;

        if (that.updater.get('preventRepeatClick')) {
            // 防止重复点击
            let btnVf;
            try { btnVf = Vframe.get(e.eventTarget.id); } catch (error) { };
            if (btn.disabled) { return; }

            btn.disabled = true;
            if (btnVf) { btnVf.invoke('showLoading'); };

            let customNext = (remain) => {
                // 有callback
                let bc = btn.callback && btn.callback(remain);
                if (bc && bc.then) {
                    bc.then(() => {
                        btn.disabled = false;
                        if (btnVf) { btnVf.invoke('hideLoading'); };
                    }, reason => {
                        that.showMsg(reason || '');
                        btn.disabled = false;
                        if (btnVf) { btnVf.invoke('hideLoading'); };
                    });
                } else {
                    btn.disabled = false;
                    if (btnVf) { btnVf.invoke('hideLoading'); };
                }
            }

            if (btn.check) {
                // 需要调用子viewcheck
                let result = await that.checkSubs();
                if (result.ok) {
                    that.showMsg('');
                    customNext(result.remian);
                } else {
                    that.showMsg(result.msg);
                    btn.disabled = false;
                    if (btnVf) { btnVf.invoke('hideLoading'); };
                }
            } else {
                // 不需要调用子viewcheck
                customNext({});
            }
        } else {
            if (btn.check) {
                // 需要调用子viewcheck
                let result = await that.checkSubs();
                if (result.ok) {
                    that.showMsg('');

                    // 有callback
                    if (btn.callback) {
                        btn.callback(result.remain);
                    }
                } else {
                    that.showMsg(result.msg);
                }
            } else {
                // 不需要调用子viewcheck
                if (btn.callback) {
                    btn.callback();
                }
            }
        }
    },

    next(remainParams) {
        let that = this;
        let { curStepIndex } = that.updater.get();
        remainParams.stepIndex = +curStepIndex + 1;
        remainParams.subStepIndex = -1;
        Router.to(remainParams);
    },

    showMsg(msg) {
        let errorNode = $(`#${this.id}_error`);
        if (!msg) {
            errorNode.html('');
        } else {
            errorNode.html(`<i class="mc-iconfont @index.less:error-icon">&#xe727;</i>${msg}`);
        }
    },

    /**
     * 滚动到当前子view的位置
     */
    subScroll(ignoreSmooth) {
        let that = this;
        let curSubStepIndex = +that.updater.get('curSubStepIndex');
        let top;
        if (curSubStepIndex > 0) {
            let subContent = $(`#${that.id} [data-sub="${that.id}_sub_${curSubStepIndex}"]`);
            top = subContent.offset().top - 50;
        } else {
            top = 0;
        }
        try {
            if (!ignoreSmooth) {
                window.scrollTo({ top, behavior: 'smooth' });
            } else {
                $(window).scrollTop(top);
            }
        } catch (error) {
            $(window).scrollTop(top);
        }
    },

    winScroll() {
        let that = this;
        let context = $('#' + that.id);
        let content = context.find('.@index.less:main-content');
        if (!content.length) {
            return;
        }
        let nav = context.find('.@index.less:main-nav');
        let scrollTop = $(window).scrollTop();
        let contentTop = content.offset().top;
        if (scrollTop > contentTop) {
            nav.css({
                position: 'fixed'
            })
        } else {
            nav.css({
                position: 'absolute'
            })
        }

        let side = context.find('.@index.less:content-side');
        if (side.length) {
            let sideTop = content.offset().top;
            let { gapWidth } = that.updater.get();
            if (scrollTop > (sideTop + gapWidth)) {
                side.css({
                    position: 'fixed',
                    top: 0
                })
            } else {
                side.css({
                    position: 'absolute',
                    top: `${gapWidth}px`
                })
            }
        }
    },

    '$win<scroll>'() {
        this.winScroll();
    },

    '$win<resize>'() {
        let that = this;
        let winHeight = window.innerHeight
        that.updater.set({
            viewHeight: winHeight
        })
        let context = $('#' + that.id);
        let content = context.find('.@index.less:main-content');
        content.css({
            minHeight: winHeight
        })
    },

    'nav<click>'(e) {
        let params = e.params;
        let stepIndex = params.stepIndex,
            subStepIndex = params.subStepIndex || -1;
        Router.to({
            stepIndex,
            subStepIndex
        });
    }
});