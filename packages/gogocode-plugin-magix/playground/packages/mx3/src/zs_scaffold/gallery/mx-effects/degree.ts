/*md5:6c9d65d4476ebbc8078b59e7b90c9ff1*/
/**
 * 刻度型进度比例
 */
import Magix from 'magix';
import * as View from '../mx-util/view';
Magix.applyStyle('@progress.less');

export default View.extend({
    tmpl: '@progress.html',
    init(e) {
        this.updater.snapshot();
        this.assign(e);
    },
    assign(e) {
        let that = this;
        let altered = that.updater.altered();

        let count = +e.count || 10;

        let num = +e.num || 0;
        let s = num + '';
        let i = s.indexOf('.');
        if (i >= 0) {
            i = s.slice(i + 1).length;
        } else {
            i = 0;
        }
        // 最多保留两位小数
        if (i > 2) {
            i = 2;
        }

        if (num < 0) {
            num = 0;
        }

        if (num > 100) {
            num = 100;
        }

        let degree = Math.round(num * count / 100),
            baseOpacity = e.baseOpacity || 0.08,
            type = e.type || 'highlight',
            color = e.color || '';

        if (!color) {
            // 优先级 color > type
            // 未自定义颜色的时候
            switch (type) {
                case 'highlight':
                    color = 'var(--color-brand)';
                    break;
                case 'error':
                    color = 'var(--color-red)';
                    break;
                case 'warn':
                    color = 'var(--color-warn)';
                    break;
                case 'pass':
                    color = 'var(--color-green)';
                    break;
            }
        }

        that.updater.set({
            viewId: that.id,
            originNum: num,
            num: num.toFixed(i) + '%',
            color,
            type: 'degree', //复用progress的模板，type定义不对等
            degree,
            count,
            baseOpacity: +baseOpacity
        });

        if (!altered) {
            altered = that.updater.altered();
        }
        if (altered) {
            that.updater.snapshot();
            return true;
        }
        return false;
    },
    render() {
        this.updater.digest();
    }
});