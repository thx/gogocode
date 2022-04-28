/*md5:84c0aee1d241497233b697557b9b393d*/
/**
 *  流程步骤组件：
 *  stepIndex定义：当前步骤，从1开始
 */
import Magix, { Router, Vframe } from 'magix';
import * as $ from '$';
import * as View from '../mx-util/view';

export default View.extend({
    init(extra) {
        this.assign(extra);
        this.observeLocation(['stepIndex']);
    },
    assign(extra) {
        // 当前数据截快照
        this.updater.snapshot();

        // 垂直方案时左右侧的预留宽度：gapWidth，leftWidth，rightWidth
        this.updater.set({
            gapWidth: 16,
            wrapperId: extra.wrapper,
            leftWidth: +extra.leftWidth || 160,
            rightWidth: +extra.rightWidth || 260,
            viewHeight: window.innerHeight,
            alreadyStep: +extra.alreadyStep || 1,
            fixStep: extra.fixStep || {}, // 固定展示的view
            originStepInfos: extra.stepInfos || [] //所有的步骤信息
        })

        // altered是否有变化 true：有变化
        let altered = this.updater.altered();
        return altered;
    },
    render() {
        let that = this;

        let updater = that.updater;
        let alreadyStep = +updater.get('alreadyStep');
        let stepInfos = $.extend(true, [], updater.get('originStepInfos'));

        let locParams = Router.parse().params;
        // 主步骤信息从1开始
        let curStepIndex = +(locParams.stepIndex || 1);
        if (curStepIndex > alreadyStep) {
            alreadyStep = curStepIndex;
        }

        let defPrevTip = '返回上一步',
            defNextTip = '下一步';
        stepInfos.forEach((step, i) => {
            let stepIndex = i + 1;
            step.index = stepIndex;

            // <= 当前步骤是否锁定，是否可展开
            step.locked = (step.locked + '' === 'true') || (stepIndex > alreadyStep);

            // 当前步骤
            step.current = (stepIndex == curStepIndex);

            // 默认用序号
            step.icon = step.icon || `<span class="fontsize-16">${step.index}</span>`;

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
                // 自定义btn
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
                // 历史配置，只有上一步下一步
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

            if (step.sideView || step.sideTip) {
                step.sideWrapper = '@./tip';
                step.sideData = {
                    view: step.sideView || '', // 自定义侧边view
                    title: step.sideTitle || '', // 标题
                    content: step.sideTip || '', // 简单提示文案
                    info: step.sideData || {} // 默认传入侧边的数据
                }
            }
        })
        that.updater.digest({
            alreadyStep,
            stepInfos,
            curStepInfo: stepInfos[curStepIndex - 1],
            curStepIndex
        });
    },

    showMsg(msg) {
        let errorNode = $(`#${this.id}_error`);
        if (!msg) {
            errorNode.html('');
        } else {
            errorNode.html(`<i class="mc-iconfont" style="position: absolute; top: 0; left: 0; font-size: 16px; width: 20px; height: 20px; line-height: 20px;">&#xe727;</i>${msg}`);
        }
    },

    /**
     * 自定义按钮逻辑
     */
    'custom<click>'(e) {
        let that = this;
        let { btn } = e.params;
        if (btn.check) {
            that.checkSubs().then((data) => {
                if (btn.callback) {
                    btn.callback(data);
                }
            })
        } else {
            // 不需要调用子viewcheck
            if (btn.callback) {
                btn.callback();
            }
        }
    },

    /**
     * 下一步
     */
    'next<click>'(e) {
        let that = this;
        let { btn } = e.params;

        that.checkSubs().then((data) => {
            // 下一步
            if (btn.callback) {
                // 兼容历史写法
                btn.callback(data).then(remainParams => {
                    that.next(remainParams);
                })
            } else {
                that.next({});
            }
        })
    },

    checkSubs() {
        let that = this;
        return new Promise(resolve => {
            // 先校验能否提交
            let { curStepIndex, fixStep } = that.updater.get();

            // 当前展开步骤
            let vf = Vframe.get($(`[data-sub="${that.id}_sub_${curStepIndex}"]`)[0].id);
            let models = [vf.invoke('check')];
            if (fixStep.view) {
                let fixVf = Vframe.get($(`[data-sub="${that.id}_sub_fix"]`)[0].id);
                models.push(fixVf.invoke('check'));
            }

            Promise.all(models).then(results => {
                let ok = true,
                    msgs = [],
                    remain = {};

                results.forEach((r, i) => {
                    ok = ok && r.ok;
                    if (!r.ok && r.msg) {
                        msgs.push(r.msg);
                    }
                    Magix.mix(remain, (r.remain || {}));
                })

                if (ok) {
                    that.showMsg('');
                    resolve(remain);
                } else {
                    that.showMsg(msgs.join('；'));
                }
            });
        })
    },

    next(remainParams) {
        let { curStepIndex } = this.updater.get();
        remainParams.stepIndex = +curStepIndex + 1;
        Router.to(remainParams);
    },


    /**
     * 返回上一步
     */
    'prev<click>'(e) {
        let { curStepIndex } = this.updater.get();
        this.nav(+curStepIndex - 1);
    },

    /**
     * 直接定位到某一步骤
     */
    'nav<click>'(e) {
        this.nav(+e.params.stepIndex);
    },

    nav(stepIndex) {
        let curStepIndex = +this.updater.get('curStepIndex');
        if (curStepIndex > stepIndex) {
            // 返回之前的步骤时，判断当前步骤的返回上一步操作有没有什么提示信息
            let { stepInfos } = this.updater.get();
            let btns = stepInfos[curStepIndex - 1].btns;
            let prev = {
                prepare: null
            };
            for (let i = 0; i < btns.length; i++) {
                if (btns[i].type == 'prev') {
                    prev = btns[i];
                    break;
                }
            }
            if (prev.prepare) {
                prev.prepare().then(() => {
                    Router.to({ stepIndex });
                })
            } else {
                Router.to({ stepIndex });
            }
        } else {
            Router.to({ stepIndex });
        }
    }
});

