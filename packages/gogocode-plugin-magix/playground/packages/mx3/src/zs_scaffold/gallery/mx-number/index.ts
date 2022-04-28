/*md5:11e7a8fa43a8d3a860aa3e699a9e9a6f*/
/**
 * 数字动画
 * 数据始终从下往上滚动 https://aone.alibaba-inc.com/req/33862458
 */
import Magix from 'magix';
import * as $ from '$';
import * as View from '../mx-util/view';
Magix.applyStyle('@index.less');

export default View.extend({
    tmpl: '@index.html',
    init(extra) {
        let that = this;
        that.on('destroy', () => {
            if (that['@{delay.show.timer}']) {
                clearTimeout(that['@{delay.show.timer}']);
            }
        });

        that.assign(extra);
    },

    assign(extra) {
        // 当前数据截快照
        this.updater.snapshot();

        // 默认行高1.5倍
        let fontSize = +extra.fontSize || 32;
        let lineHeight = +extra.lineHeight || (fontSize * 1.5);
        let color = extra.color || '#333333';

        // 动画（毫秒）
        let delay = +extra.delay || 400,
            duration = +extra.duration || 400;

        // 单个数字延迟多久开始动画，支持负数
        let numberDelay = +extra.numberDelay || 0;

        let num = extra.num || 0;
        let reg = /^[0-9]*$/, count = -1;

        let arr = (num + '').split('').map(i => {
            let isNumber = reg.test(i), inum = 0;
            if (isNumber) {
                count++;
                inum = Math.abs(count * numberDelay);
            }

            return {
                isNumber,
                numberDelay: inum,
                num: isNumber ? (+i) : i,
            };
        });

        if (numberDelay < 0) {
            let nds = 0 - count * numberDelay
            delay = delay - nds;
            arr.forEach(item => {
                if (item.isNumber) {
                    item.numberDelay = nds - item.numberDelay;
                }
            })
        }
        if (delay < 0) {
            delay = 0;
        }

        this.updater.set({
            color,
            fontSize,
            lineHeight,
            arr,
            delay,
            duration
        });

        // altered是否有变化 true：有变化
        let altered = this.updater.altered();
        return altered;
    },

    render() {
        let that = this;
        let { inited } = that.updater.get();
        if (inited) {
            // 非首次渲染，节点已存在，直接动画
            that.show({
                aimBase: 50 // 保证动画始终从下往上
            });
        } else {
            // 首次：先渲染初始化数字
            that.updater.digest();

            // 再开始动画
            that.show({
                aimBase: 0,
                inited: true
            })
        }
    },

    show(d) {
        let that = this;
        let { delay } = that.updater.get();

        if (that['@{delay.show.timer}']) {
            clearTimeout(that['@{delay.show.timer}']);
        }
        that['@{delay.show.timer}'] = setTimeout(() => {
            that.updater.digest({
                ...d,
                aim: true
            });

            let lines = $(`#${that.id} [data-number="true"]`);
            lines.off('transitionend.number').on('transitionend.number', () => {
                that.updater.digest({
                    aimBase: 0,
                    aim: false,
                })
            })
        }, delay)
    }
});

