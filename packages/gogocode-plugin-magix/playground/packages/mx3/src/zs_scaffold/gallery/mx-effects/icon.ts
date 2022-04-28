/*md5:804939a1f2794380d03ac12849c4fcd4*/
/**
 * 打标组件
 */
import Magix from 'magix';
import * as $ from '$';
import * as View from '../mx-util/view';
Magix.applyStyle('@icon.less');

export default View.extend({
    tmpl: '@icon.html',
    init(extra) {
        this.assign(extra);
    },
    assign(extra) {
        let that = this;

        // 当前数据截快照
        that.updater.snapshot();

        // 优先级自定义色值color > 预置类型type
        let color = extra.color,
            colorText,
            mode = extra.mode || that['@{get.css.var}']('--mx-tag-mode', 'solid'),
            type = extra.type || 'common';

        if (!color) {
            // 未自定义颜色的时候
            switch (type) {
                case 'common':
                    switch (mode) {
                        case 'solid': // 实心
                            color = '#cccccc';
                            colorText = '#ffffff';
                            break;

                        case 'hollow': // 空心
                            color = '#cccccc';
                            colorText = '#999999';
                            break;

                        case 'opacity':
                            color = '#666666';
                            break;
                    }
                    break;

                case 'highlight':
                    color = that['@{get.css.var}']('--color-brand');
                    break;

                case 'error':
                    color = that['@{get.css.var}']('--color-red');
                    break;

                case 'warn':
                    color = that['@{get.css.var}']('--color-warn');
                    break;

                case 'pass':
                    color = that['@{get.css.var}']('--color-green');
                    break;
            }
        }

        let styles = [];
        switch (mode) {
            case 'solid': // 实心
                styles.push(
                    `background-color: ${color}`,
                    `border: 1px solid ${color}`,
                    `color: ${(extra.colorText || colorText || '#ffffff')}`
                )
                break;

            case 'hollow': // 空心
                styles.push(
                    `background-color: transparent`,
                    `border: 1px solid ${color}`,
                    `color: ${(extra.colorText || colorText || color)}`
                )
                break;

            case 'opacity':
                let result = this['@{color.to.rgb}'](color);
                styles.push(
                    `background-color: rgba(${result.r}, ${result.g}, ${result.b}, 0.1)`,
                    `border: 0 none`,
                    `color: ${(extra.colorText || colorText || color)}`
                )
                break;
        }
        this.updater.set({
            content: extra.content || '打标',
            styles: styles.join(';'),
            tipWidth: extra.tipWidth || 200,
            tipPlacement: extra.tipPlacement || 'bottom',
            tipAlign: extra.tipAlign || 'center',
            tipView: extra.tipView,
            tipData: extra.tipData || {},
            tip: extra.tip || ''
        })

        let altered = this.updater.altered();
        return altered;
    },
    render() {
        this.updater.digest();

        // 处理scale之后的空白
        let tag = document.querySelector(`#${this.id} .mx-tag`);
        let tagName = document.querySelector(`#${this.id} .mx-tag-name`);
        let boundClient = tagName.getBoundingClientRect();
        let boundClientWidth = boundClient.width;
        if (boundClientWidth == 0) {
            // 隐藏的时候，宽度为0
            let cloneTag = $(`#${this.id}`).clone();
            cloneTag.css({
                position: 'absolute',
                visibility: 'hidden',
                opacity: 0,
                display: 'block'
            })
            $(document.body).append(cloneTag);
            let cloneTagName = cloneTag.find('.mx-tag-name')[0];
            let cloneBoundClient = cloneTagName.getBoundingClientRect();
            boundClientWidth = cloneBoundClient.width;
            cloneTag.remove();
        }
        if (boundClientWidth > 0) {
            tag.style.width = Math.floor(boundClientWidth + 10) + 'px';
        }
    }
});
