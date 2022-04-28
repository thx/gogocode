/*md5:ec15aa45a659c4fbc4dd36c9eba47566*/
/**
 *  流程步骤展示组件
 */
import Magix, { Router } from 'magix';
import * as $ from '$'
import * as View from '../mx-util/view';
Magix.applyStyle('@index.less');

export default View.extend({
    tmpl: '@dis.html',
    init(extra) {
        let that = this;

        that.observeLocation(['stepIndex', 'subStepIndex']);
        that.owner.oncreated = () => {
            if (!that.$init) {

                // 每次重新render之后
                // 所有子view加载完成后
                that.subScroll();

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
            originStepInfos: extra.stepInfos || [] //所有的步骤信息
        })

        // altered是否有变化 true：有变化
        let altered = this.updater.altered();
        return altered;
    },
    render() {
        let that = this;

        // trigger oncreated，子组件的渲染不scroll
        that.$init = null;
        let stepInfos = $.extend(true, [], that.updater.get('originStepInfos'));

        let locParams = Router.parse().params;
        // 主步骤信息从1开始
        let curStepIndex = +(locParams.stepIndex || 1);

        // 子步骤：
        // -1：在主导航上
        // >0：1，2，3
        let curSubStepIndex = +locParams.subStepIndex || -1;

        stepInfos.forEach((step, i) => {
            let stepIndex = i + 1;
            step.index = stepIndex;
            step.subs = (step.subs || []).map((sub, si) => {
                sub.index = (si + 1);
                return sub;
            });
        })

        if (!that.$inited) {
            that.$inited = 1;

            // 首次渲染
            that.updater.digest({
                stepInfos,
                curStepIndex,
                curSubStepIndex,
            });
        } else {
            // locationChange，只更新数据不digest，避免子view重新渲染
            // 直接操作dom改变样式
            that.updater.set({
                curStepIndex,
                curSubStepIndex,
            });

            let { stepLineHeight } = that.updater.get();
            let steps = $(`#${that.id} .@index.less:main-step`);
            for (let i = 0; i < steps.length; i++) {
                let step = $(steps[i]);
                if (i + 1 == curStepIndex) {
                    // 当前步骤
                    step.addClass('@index.less:step-current');
                    step.find('.@index.less:step').removeClass('@index.less:on');
                    step.find('.@index.less:step[data-sub="' + curSubStepIndex + '"]').addClass('@index.less:on');
                    step.find('.@index.less:pbg').css({
                        display: 'block',
                        opacity: 1,
                        top: (curSubStepIndex == -1) ? 0 : (curSubStepIndex * stepLineHeight)
                    })
                } else {
                    step.removeClass('@index.less:step-current');
                    step.find('.@index.less:step').removeClass('@index.less:on');
                    step.find('.@index.less:pbg').css({
                        display: 'none',
                        opacity: 0
                    })
                }
            }

            that.subScroll();
        }
    },

    /**
     * 滚动到当前子view的位置
     */
    subScroll() {
        let { curStepIndex, curSubStepIndex } = this.updater.get();
        let i = curStepIndex,
            j = (curSubStepIndex == -1) ? 1 : curSubStepIndex;

        let subContent = $(`#${this.id} [data-sub="${this.id}_sub_${i}_${j}"]`);
        let top = subContent.offset().top - 50;
        try {
            window.scrollTo({ top, behavior: 'smooth' });
        } catch (error) {
            $(window).scrollTop(top);
        }
    },

    'nav<click>'(e) {
        let params = e.params;
        let stepIndex = params.stepIndex,
            subStepIndex = params.subStepIndex || -1;
        Router.to({
            stepIndex,
            subStepIndex
        });
    },

    '$win<scroll>'() {
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
    }
});