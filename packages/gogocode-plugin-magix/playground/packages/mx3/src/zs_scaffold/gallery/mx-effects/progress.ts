/*md5:d838aa8febbcc978129f9ffdb7db016a*/
/**
 * 进度条
 * 1. 条形（支持两边对比）  
 * 2. 渐变条形
 * 3. 刻度型
 * 4. 圆形
 * 
 * 文档只透出1，2，4两种类型
 * 3迁移至mx-effects.degree
 */
import Magix from 'magix';
import * as $ from '$';
import * as View from '../mx-util/view';
Magix.applyStyle('@progress.less');

export default View.extend({
    tmpl: '@progress.html',
    init(e) {
        this.assign(e);
    },
    assign(e) {
        let that = this;
        that.updater.snapshot();

        let num = +e.num || 0;
        let s = num + '';
        let i = s.indexOf('.');

        // 最多保留两位小数
        i = (i >= 0) ? s.slice(i + 1).length : 0;
        if (i > 2) { i = 2; };

        // 0 ~ 100
        if (num < 0) { num = 0; };
        if (num > 100) { num = 100; };

        let type = e.type || 'line';
        let placement = (e.textPlacement || 'top');
        let width;
        let degree = 0,
            baseOpacity = +e.baseOpacity || 0.08,
            border = +e.border || 8,
            colorBg = e.colorBg || '#f0f0f0', // 背景颜色
            color = e.color || '',
            colorGradient = e.colorGradient || '',
            colorVs = e.colorVs || '',
            colorList = [],
            color1, color2, // 渐变色
            circle1, circle2; // 圆环数据

        let brandColor = that['@{get.css.var}']('--color-brand', '#385ACC');
        switch (type) {
            case 'degree':
                // 刻度型，刻度取整
                color = color || brandColor;
                degree = Math.round(num / 10);
                break;

            case 'circle':
                // 圆形
                width = +e.width || 120;
                color = color || brandColor;

                // 半径，计算周长
                let r = (width - border) / 2;
                circle1 = Math.PI * r * 2;

                // 展示长度
                circle2 = (num / 100) * circle1;

                // 渐变色组
                let len = (e.colorList || []).length;
                let gap = Math.floor(100 / (len - 1));
                colorList = (e.colorList || []).map((c, i) => {
                    return {
                        color: c,
                        offset: (i == len - 1) ? 100 : (i * gap)
                    }
                })
                break;

            case 'gradient':
                // 渐变，未自定义颜色时适用品牌色
                width = +e.width || 200;
                color = color || brandColor;
                if (color) {
                    let result = that['@{color.to.rgb}'](color);
                    color1 = `rgba(${result.r}, ${result.g}, ${result.b}, 0.4)`;
                    color2 = `rgba(${result.r}, ${result.g}, ${result.b}, 0.2)`;
                }
                break;

            case 'line':
                width = +e.width || 200;
                break;
        }

        that.updater.set({
            placement,
            originNum: num,
            num: num.toFixed(i) + '%',
            numRemain: (100 - num).toFixed(i) + '%',
            colorBg,
            color,
            colorGradient,
            colorVs,
            colorList,
            color1,
            color2,
            circle1,
            circle2,
            type,
            text: (e.text + '' !== 'false'),  //是否显示文案
            vs: (e.vs + '' === 'true'), // 是否左右对比
            degree,
            baseOpacity: +baseOpacity,
            width: +width,
            border: +border,
            gradient: (type == 'gradient')
        });

        // altered是否有变化 true：有变化
        let altered = this.updater.altered();
        return altered;
    },
    render() {
        this.updater.digest();
    }
});