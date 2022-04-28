/*md5:389d1a858b02617c9116bc95617ad675*/
import Magix from 'magix';
import * as $ from '$';
import * as View from '../mx-util/view';
const DotWrapperClass = 'names@index.less[type-h-line-in-center,type-h-line-in-left,type-h-line-in-right,type-h-line-out-center,type-v-line-in-center,type-v-line-in-left,type-v-line-in-right,type-v-line-out-center,type-h-dot-in-center,type-h-dot-in-left,type-h-dot-in-right,type-h-dot-out-center,type-v-dot-in-center,type-v-dot-in-left,type-v-dot-in-right,type-v-dot-out-center]';
Magix.applyStyle('@index.less');

export default View.extend({
    init(extra) {
        this.assign(extra);

        this.on('destroy', () => {
            this['@{stop.auto.play}']();

            if (this['@{mousewheel.delay.timer}']) {
                clearTimeout(this['@{mousewheel.delay.timer}']);
            }

            if (this['@{transition.end.timer}']) {
                clearTimeout(this['@{transition.end.timer}']);
            }
        });
    },

    assign(extra) {
        let that = this;
        // 留取当前数据快照
        that.updater.snapshot();

        let node = $('#' + that.id);
        that['@{owner.node}'] = node;
        that['@{extra.info}'] = extra;

        // 是否是垂直方向   
        let vertical = (extra.vertical + '') === 'true';

        // 轮播点css变量
        // 整个轮播点区域可定义变量
        let dotWrapperStyles = '';
        let dotVars = extra.dotVars || {};
        for (let k in dotVars) {
            dotWrapperStyles += `${k}:${dotVars[k]};`;
        }

        // 每帧支持配置单独的轮播点样式
        let dotWrapperStyleList = [];
        let dotVarsList = extra.dotVarsList || [];
        dotVarsList.forEach(dvs => {
            let dws = '';
            for (let k in dvs) {
                dws += `${k}:${dvs[k]};`;
            }
            dotWrapperStyleList.push(dws);
        })

        // 内置轮播点样式
        let dotWrapperClass = DotWrapperClass[`type-${(vertical ? 'v' : 'h')}-${(extra.dotType || 'dot-in-center')}`];

        that.updater.set({
            mode: extra.mode || 'carousel', //carousel跑马灯，fade渐显渐隐
            width: extra.width || $(node).width() || 400,
            height: extra.height || $(node).height() || 200,
            active: extra.active || 0, // 当前第几帧动画
            interval: (extra.interval | 0) || 3000, // 播放暂停间隔，单位毫秒
            autoplay: (extra.autoplay + '') === 'true',  // 是否自动播放
            dots: (extra.dots + '') !== 'false', // 是否显示轮播点，默认显示
            dotWrapperClass,
            dotWrapperStyleList,
            dotWrapperStyles,
            dotClass: extra.dotClass || '', //自定义轮播点样式，在点上
            triggers: (extra.triggers + '') === 'true', // 是否显示轮播点，默认不显示
            vertical,
            mousewheel: extra.mousewheel + '' === 'true', // 垂直播放时是否支持鼠标滚动事件，默认不支持
            timing: extra.timing || 'ease-in-out', // transition-timing-function: linear|ease|ease-in|ease-out|ease-in-out|cubic-bezier(n,n,n,n);
            duration: extra.duration || '.5s', // 动画持续时间
            devInfo: that['@{get.dev.info}'](), // 设备信息
            triggerHook: extra.triggerHook
        })

        if (extra.prevTrigger) {
            // 自定义上一页trigger
            $('#' + extra.prevTrigger).off('click').on('click', () => {
                that['@{trigger}'](-1);
            })
        }
        if (extra.nextTrigger) {
            // 自定义下一页trigger
            $('#' + extra.nextTrigger).off('click').on('click', () => {
                that['@{trigger}'](1);
            })
        }

        // 节点刷新则重置状态
        that['@{animating}'] = false;

        // 重新设置数据之后判断是否有变化，true：有变化  false：无变化
        // let altered = this.updater.altered();
        // return altered;
        // 动态添加节点了，固定重新计算
        return true;
    },

    render() {
        let that = this;
        let { devInfo, triggers, width, height, dots, active, autoplay, vertical } = that.updater.get();
        let node = that['@{owner.node}'];

        // 只过滤出当前view的节点
        let inView = (sizzle) => {
            let s, ss = node.find(sizzle);
            for (let i = 0; i < ss.length; i++) {
                let sn = $(ss[i]).closest('[mx-view*="mx-carousel/index"]');
                if (sn[0] === node[0]) {
                    s = $(ss[i]);
                    break;
                }
            }

            return s;
        }

        that['@{panels.wrapper}'] = inView('[data-carousel="true"]');
        that['@{panels.inner}'] = inView('[data-carousel-inner="true"]');

        that['@{panels.node}'] = [];
        let ps = node.find('[data-carousel-panel="true"]');
        for (let i = 0; i < ps.length; i++) {
            let sn = $(ps[i]).closest('[mx-view*="mx-carousel/index"]');
            if (sn[0] === node[0]) {
                that['@{panels.node}'].push(ps[i]);
            }
        }
        let len = that['@{panels.node}'].length;

        // 修正active
        if (active < 0) {
            active = 0;
        } else if (active > len - 1) {
            active = len - 1;
        }
        that.updater.set({ active, len });

        if (!devInfo.pc) {
            // https://www.swiper.com.cn/api/autoplay/16.html
            // 移动端：引用移动端轮播组件 Swiper
            // 1. 不支持垂直滚动 vertical
            // 2. 不支持左右切换箭头 triggers
            seajs.use([
                '//g.alicdn.com/mm/bp-source/lib/swiper-bundle.min.js',
                '//g.alicdn.com/mm/bp-source/lib/swiper-bundle.min.css'
            ], () => {
                that['@{panels.wrapper}'].css({ width, height });

                // 可轮播时，Swiper配置
                if (len > 1) {
                    let configs = {
                        slidesPerView: 'auto',
                        centeredSlides: true // active slide会居中
                    }

                    // 垂直轮播
                    if (vertical) { Magix.mix(configs, { direction: 'vertical' }); };

                    // 自动播放
                    if (autoplay) { Magix.mix(configs, { autoplay: { delay: 5000, stopOnLastSlide: false, disableOnInteraction: true } }); };

                    // 底部操作点
                    if (dots) {
                        let { dotWrapperClass, dotWrapperStyleList, dotWrapperStyles, dotClass } = that.updater.get();
                        that['@{panels.wrapper}'].after(`<div class="swiper-pagination @index.less:dots ${dotWrapperClass}" style="${(dotWrapperStyleList[active] || dotWrapperStyles)}"></div>`);
                        Magix.mix(configs, {
                            pagination: {
                                el: `#${that.id} .swiper-pagination`,
                                bulletClass: `@index.less:dot ${dotClass}`,
                                bulletActiveClass: '@index.less:active',
                            }
                        })
                    }

                    // 销毁重建
                    if (that['@{wireless.swiper}']) {
                        that['@{wireless.swiper}'].destroy();
                    }
                    that['@{wireless.swiper}'] = new Swiper(`#${that.id} .swiper-container`, configs);
                }
            })
        } else {
            // 可轮播时
            if (len > 1) {
                if (triggers) {
                    // 左右轮播点
                    that['@{panels.wrapper}'].append(`
                        <i data-trigger="-1" class="@index.less:triggers @index.less:triggers-left mc-iconfont">&#xe61e;</i>
                        <i data-trigger="1" class="@index.less:triggers @index.less:triggers-right mc-iconfont">&#xe61e;</i>
                    `);
                }
                if (dots) {
                    // 底部操作点
                    let { dotWrapperClass, dotWrapperStyleList, dotWrapperStyles, dotClass } = that.updater.get();
                    let dotInner = '';
                    for (let i = 0; i < len; i++) {
                        dotInner += `<span data-dot="${i}" class="@index.less:dot ${dotClass}"></span>`;
                    }
                    that['@{panels.wrapper}'].after(`<div class="@index.less:dots ${dotWrapperClass}" style="${(dotWrapperStyleList[active] || dotWrapperStyles)}">${dotInner}</div>`);
                }
            }

            that['@{dots.node}'] = node.find('.@index.less:dot');

            // 初始化样式
            that['@{update.stage.size}']();

            // 初始化位置
            that['@{to.panel}'](active, true);

            // 大于一帧时可自动播放
            if (autoplay && (len > 1)) {
                that['@{start.auto.play}']();
                that['@{owner.node}'].hover(() => {
                    that['@{stop.auto.play}']();
                }, () => {
                    that['@{over.timer}'] = setTimeout(that.wrapAsync(that['@{start.auto.play}'], that), 50);
                });
            }
        }
    },

    '@{update.stage.size}'() {
        let that = this;
        let { width, height, mode, vertical, len } = that.updater.get();

        let panelNodes = that['@{panels.node}'];
        switch (mode) {
            case 'carousel':
                // 跑马灯
                for (let i = 0; i < len; i++) {
                    let style = {
                        position: 'absolute',
                        width,
                        height
                    }
                    if (vertical) {
                        // 垂直方向
                        Magix.mix(style, {
                            top: height * i,
                            left: 0
                        })
                    } else {
                        // 水平方向
                        Magix.mix(style, {
                            top: 0,
                            left: width * i
                        })
                    }
                    $(panelNodes[i]).css(style);
                }
                break;

            case 'fade':
                // 渐显渐隐
                for (let i = 0; i < len; i++) {
                    $(panelNodes[i]).css({
                        position: 'absolute',
                        opacity: 0,
                        top: 0,
                        left: 0,
                        width,
                        height
                    });
                }
                break;
        }

        if (vertical) {
            that['@{panels.inner}'].height(len * height).width(width);
        } else {
            that['@{panels.inner}'].width(len * width).height(height);
        }
        that['@{panels.wrapper}'].width(width).height(height);
    },

    /**
     * 1. 跑马灯的顺序切换
     * 2. 渐显渐隐
     */
    '@{to.panel}'(index, immediate) {
        let that = this;
        if (that['@{animating}']) {
            return;
        }

        index = +index;
        let { mode, duration, timing, width, height, vertical, len, triggerHook } = that.updater.get();
        let dt = (+(duration + '').replace('s', '')) * 1000;
        let panelNodes = that['@{panels.node}'];
        let cName = '@index.less:active';
        let oldActive = +that.updater.get('active');
        let active = ((index >= len) ? 0 : ((index < 0) ? (len - 1) : index));

        let toPanel = () => {
            if (!immediate) {
                // 防止快速重复点击
                that['@{animating}'] = true;
            }

            // 高亮对应的节点
            that.updater.set({ active });

            // 同一帧重复点击不会触发动画，回置到非动画态
            if ((oldActive == active) && that['@{animating}']) {
                that['@{animating}'] = false;
            }

            // 底部操作点，每帧可能轮播点样式不同
            that['@{dots.node}'].removeClass(cName).eq(active).addClass(cName);
            let { dotWrapperStyleList, dotWrapperStyles } = that.updater.get();
            let dotWrapper = that['@{dots.node}'].parent('.@index.less:dots');
            dotWrapper.attr('style', dotWrapperStyleList[active] || dotWrapperStyles);

            switch (mode) {
                case 'carousel':
                    // 平滑轮播时需要调整位置
                    if (oldActive == 0 && index == -1) {
                        // 从第一帧到最后一帧
                        $(panelNodes[len - 1]).css(vertical ? { top: 0 - height } : { left: 0 - width });
                    } else if (oldActive == len - 1 && index == len) {
                        // 从最后一帧到第一帧
                        $(panelNodes[0]).css(vertical ? { top: height * len } : { left: width * len });
                    }
                    let style = {
                        transform: `translate3d(${vertical ? `0,${(0 - index * height)}px` : `${(0 - index * width)}px,0`},0)`,
                        transition: `transform ${duration} ${timing}`
                    };
                    if (immediate) {
                        delete style.transition;
                    }
                    let cnt = that['@{panels.inner}'];
                    cnt.css(style);
                    that['@{transition.end.timer}'] = setTimeout(() => {
                        // 动画完成之后再纠正
                        for (let i = 0; i < len; i++) {
                            $(panelNodes[i]).css(vertical ? { top: height * i } : { left: width * i });
                        }
                        cnt.css({
                            transition: '',
                            transform: `translate3d(${vertical ? `0,${(0 - active * height)}px` : `${(0 - active * width)}px,0`},0)`
                        });

                        that['@{animating}'] = false;
                    }, dt);
                    break;

                case 'fade':
                    // fade顺序不会改变，直接纠正
                    // 最后一帧往后回到第一帧
                    // 第一帧往前到最后一帧
                    // 当前帧挪到最上方
                    for (let i = 0; i < len; i++) {
                        $(panelNodes[i]).css((i == active) ? {
                            opacity: 1,
                            transition: `opacity ${duration} ${timing}`,
                            zIndex: 3
                        } : {
                            opacity: 0,
                            zIndex: 2
                        });
                    }

                    that['@{transition.end.timer}'] = setTimeout(() => {
                        that['@{animating}'] = false;
                    }, dt);
                    break;
            }

            that['@{owner.node}'].val(active);
            if (!immediate) {
                // 通知变化
                that['@{owner.node}'].trigger($.Event('change', {
                    active
                }));
            }
        }

        if (triggerHook) {
            triggerHook(oldActive, active).then(() => {
                toPanel();
            }, () => {
                console.log('error');
            })
        } else {
            toPanel();
        }
    },

    '@{start.auto.play}'() {
        let that = this;
        that['@{stop.auto.play}']();

        // interval  轮播间隔时间
        // duration  轮播动画时间
        let { interval, duration } = that.updater.get();
        let dt = +(duration + '').replace('s', '');
        that['@{play.task}'] = setInterval(() => {
            let { active } = that.updater.get();
            that['@{to.panel}'](++active);
        }, interval + dt * 1000);
    },

    '@{stop.auto.play}'() {
        let that = this;
        if (that['@{over.timer}']) {
            clearTimeout(that['@{over.timer}']);
        }
        if (that['@{play.task}']) {
            clearInterval(that['@{play.task}']);
        }
    },

    /**
     * 轮播点
     */
    '$[data-dot]<click>'(e) {
        e.preventDefault();

        let that = this;
        let index = +$(e.target).attr('data-dot');
        if (index == that.updater.get('active')) {
            return;
        }

        that['@{to.panel}'](index);
    },

    /**
     * 左右切换
     */
    '$[data-trigger]<click>'(e) {
        e.preventDefault();

        let offset = $(e.target).attr('data-trigger');
        this['@{trigger}'](offset);
    },

    /**
     * 垂直滚动版本支持鼠标滚动事件
     */
    '$[data-carousel]<mousewheel>'(e) {
        let that = this;
        if (that['@{mousewheel.delay.timer}']) {
            clearTimeout(that['@{mousewheel.delay.timer}']);
        }

        that['@{mousewheel.delay.timer}'] = setTimeout(that.wrapAsync(() => {
            let { vertical, mousewheel } = that.updater.get();
            if (vertical && mousewheel) {
                let wheelDelta = e.originalEvent ? e.originalEvent.wheelDelta : 0;
                if (wheelDelta < 0) {
                    // 向下
                    that['@{trigger}'](1);
                } else if (wheelDelta > 0) {
                    // 向上
                    that['@{trigger}'](-1);
                }
            }
        }), 100);
    },

    '@{trigger}'(offset) {
        let { active, len } = this.updater.get();

        // 大于一帧才可轮播
        if (len > 1) {
            active = (+active) + (+offset);
            this['@{to.panel}'](active);
        }
    },

    '$win<resize>'(e) {
        this['@{resize}']();
    },

    '$doc<htmlchanged>'(e) {
        let that = this;
        if (that.owner && (that.owner.pId == e.vId)) {
            that['@{resize}']();
        }
    },

    '$doc<navslidend>'(e) {
        this['@{resize}']();
    },

    '@{resize}'() {
        let that = this;
        let { devInfo } = that.updater.get();
        if (!devInfo.pc) {
            return;
        }

        let { active } = that.updater.get();
        let extra = that['@{extra.info}'];
        let node = that['@{owner.node}'];
        that.updater.set({
            width: extra.width || $(node).width() || 400,
            height: extra.height || $(node).height() || 200
        })
        that['@{update.stage.size}']();
        that['@{to.panel}'](active, true);
    },

    /**
     * 外部调用，下一帧
     */
    next() {
        this['@{trigger}'](1);
    },

    /**
     * 外部调用，上一帧
     */
    prev() {
        this['@{trigger}'](-1);
    },

    /**
     * 外部调用，直接跳转
     */
    to(index) {
        this['@{to.panel}'](index);
    }
});