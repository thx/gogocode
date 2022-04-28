/*md5:1f1926ae462bdf1555aa267424634a00*/
/**
 * hover上移卡片
 * 1. 支持大小尺寸
 * 2. 支持配置图片、说明、链接、指标等等
 * 3. 支持配置每行展现次数，支持轮播 or 平铺
 */
import Magix from 'magix';
import * as $ from '$';
import * as View from '../mx-util/view';
Magix.applyStyle('@card.less');

export default View.extend({
    tmpl: '@card.html',
    init(extra) {
        this.updater.snapshot();
        this.assign(extra);
    },
    assign(extra) {
        let that = this;
        // 当前数据截快照
        that.updater.snapshot();

        // mode定义
        // 1. carousel-common-list：大卡片图文链接轮播
        // 2. flat-common-list：大卡片图文链接平铺
        // 3. carousel-small-list：小卡片图文链接轮播
        // 4. flat-small-list：小卡片图文链接平铺
        // 5. carousel-common-quota：大卡片图文指标轮播
        // 6. flat-common-quota：大卡片图文指标平铺
        // 7. carousel-icon-list：icon图文卡片轮播
        // 8. flat-icon-list：icon图文卡片平铺
        // 9. carousel-logo-list：logo图文卡片轮播
        // 10. flat-logo-list：logo图文卡片平铺
        // 11. carousel-btns-list：多按钮图文卡片轮播
        // 12. flat-btns-list：多按钮图文卡片平铺
        // 13. carousel-links-list：多外链图文卡片轮播
        // 14. flat-links-list：多外链图文卡片平铺
        // 15. carousel-hover-list：hover背景色图文卡片轮播
        // 16. flat-hover-list：hover背景色图文卡片平铺
        let mode = extra.mode || 'carousel-common-list';
        let wrapperClasses = 'names@card.less';
        let wrapperClass = wrapperClasses[mode];

        let lineNumber = +extra.lineNumber || 3, //每行卡片个数
            titleLineNumber = extra.titleLineNumber, // 标题行数，非默认不补充，走样式的默认值
            tipLineNumber = extra.tipLineNumber, // 说明行数，非默认不补充，走样式的默认值
            autoplay = (extra.autoplay + '' !== 'false'), //轮播情况下是否自动轮播，默认自动轮播
            interval = extra.interval || 5000, // 轮播情况下，播放间隔，单位毫秒
            textAlign = extra.textAlign || 'left',
            imgHeight = extra.imgHeight,  //图片高度
            dotVars = Magix.mix({
                '--mx-carousel-trigger-gap': '0px'
            }, extra.dotVars || {}),
            list = extra.list || [];

        // 移动兼容处理：移动端每行只显示一个
        let devInfo = that['@{get.dev.info}']();
        if (devInfo && !devInfo.pc) {
            // 移动端每行一个
            lineNumber = 1;
        }

        // 是否轮播
        let carousel = (mode.indexOf('carousel') > -1);

        // 是否为指标显示
        let quota = (mode.indexOf('quota') > -1);

        let groups = [];
        let hasBtn = true,  // 是否有按钮
            hasIcon = true; // 是否有icon
        for (var i = 0, len = list.length; i < len; i += lineNumber) {
            groups.push({
                list: list.slice(i, i + lineNumber).map(item => {
                    hasBtn = hasBtn && item.btn;
                    hasIcon = hasIcon && item.icon;
                    return item;
                })
            });
        }

        // 是否整个卡片可点
        // 多按钮，多链接类型，整个卡片不响应点击
        let cardClick = !(
            mode == 'carousel-btns-list' ||
            mode == 'flat-btns-list' ||
            mode == 'carousel-links-list' ||
            mode == 'flat-links-list'
        );

        that.updater.set({
            mode,
            imgHeight,
            hasBtn,
            hasIcon,
            wrapperClass,
            groups,
            dotVars,
            lineNumber,
            titleLineNumber,
            tipLineNumber,
            autoplay,
            interval,
            carousel,
            innerData: {
                cardClick,
                textAlign,
                quota
            }
        });
        that['@{owner.node}'] = $(`#${that.id}`);

        let altered = that.updater.altered();
        return altered;
    },
    render() {
        this.updater.digest();
    },

    '@{select}<click>'(e) {
        this['@{owner.node}'].trigger({
            type: 'select',
            item: e.params.item
        });
    },

    /**
     * carousel-btns-list,flat-btns-list
     * 多按钮类型，点击按钮选中
     */
    '@{btn.select}<select>'(e) {
        this['@{owner.node}'].trigger({
            type: 'select',
            item: e.item,
            btn: e.btn
        });
    }
});