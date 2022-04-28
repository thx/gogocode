/*md5:7808c1e56a6f463cc2772ae8ded013ea*/
/**
 * 提示公告组件
 * 交互规范见 https://done.alibaba-inc.com/file/BfeHD00VvQXv/MJYOC6696E9S7ql8/preview
 */
import Magix from 'magix';
import * as View from '../mx-util/view';
Magix.applyStyle('@notice.less');

export default View.extend({
    tmpl: '@notice.html',
    init(extra) {
        let color = extra.color,
            border = (extra.border + '' === 'true'),  // 默认无边框 false
            radius = (extra.radius + '' === 'true'),  // 默认无圆角 false
            icon = (extra.icon + '' !== 'false'),  // 默认有提示icon true
            closable = (extra.closable + '' === 'true'),// 默认无关闭按钮 false
            type = extra.type || 'highlight',
            textAlign = extra.textAlign || 'left';  // 默认左对齐

        let styles = [];
        if (border) {
            // 有边框的情况下一定有圆角
            radius = true;
            styles.push(
                'border-width: 1px',
                'border-style: solid'
            )
        }
        if (radius) {
            styles.push('border-radius: var(--border-radius)');
        }

        // 优先级自定义色值color > 预置类型type
        let colorBg, colorBorder, colorIcon, colorText, iconText = '&#xe728;';
        if (!color) {
            // 未自定义颜色的时候
            let key;
            switch (type) {
                case 'highlight':
                    key = '--color-brand';
                    iconText = '&#xe728;';
                    break;
                case 'error':
                    key = '--color-red';
                    iconText = '&#xe727;';
                    break;
                case 'warn':
                    key = '--color-warn';
                    iconText = '&#xe72a;';
                    break;
                case 'pass':
                    key = '--color-green';
                    iconText = '&#xe729;';
                    break;
            }
            color = this['@{get.css.var}'](key, '#385ACC');
        }
        if (color) {
            // 主体颜色，背景加透明度
            let result = this['@{color.to.rgb}'](color);
            colorBg = `rgba(${result.r}, ${result.g}, ${result.b}, 0.1)`;
            colorBorder = color;
            colorIcon = color;
        }
        colorBg = extra.colorBg || colorBg;
        colorBorder = extra.colorBorder || colorBorder;
        colorIcon = extra.colorIcon || colorIcon;
        colorText = extra.colorText || '#666';
        iconText = extra.iconText || `<i class="mc-iconfont" style="color: ${colorIcon};">${iconText}</i>`
        styles.push(
            'background-color:' + colorBg,
            'border-color:' + colorBorder,
            'color:' + colorText,
            'text-align:' + textAlign
        )
        let el = document.getElementById(this.id) || {}
        this.updater.set({
            show: true,
            content: extra.content || el.innerHTML || '提示内容',
            styles: styles.join(';'),
            closable,
            colorIcon,
            img: extra.img,
            icon,
            iconText
        })
    },

    render() {
        this.updater.digest();
    },
    'close<click>'(event) {
        this.updater.digest({
            show: false
        })
    }
});
