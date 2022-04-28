/*md5:b0da4b6197a5c440b77fcc1a7a18d972*/
import Magix from 'magix';
import * as View from '../mx-util/view';
Magix.applyStyle('@result.less');

export default View.extend({
    tmpl: '@result.html',
    init(extra) {
        this.assign(extra);
    },
    assign(extra) {
        let that = this;
        that.updater.snapshot();

        // 默认品牌按钮
        let color = 'var(--color-brand)', icon = '&#xe728;';
        switch (extra.type) {
            case 'error':
                color = 'var(--color-red)';
                icon = '&#xe727;';
                break;
            case 'warn':
                color = 'var(--color-warn)';
                icon = '&#xe72a;';
                break;
            case 'pass':
                color = 'var(--color-green)';
                icon = '&#xe729;';
                break;
        }

        // btns = [{
        //     text: '显示文案', 
        //     brand: true, //是否为品牌色按钮，默认为false
        //     link: '外链地址',
        //     outer: true
        //     callback: (params) => {
        //         // 回调方法，check == true的情况下，
        //     }
        // }]
        let btns = [];
        (extra.btns || []).forEach(btn => {
            if (btn.text) {
                Magix.mix(btn, {
                    outer: btn.outer + '' !== 'false' // 默认外链打开
                })
                btns.push(btn);
            }
        })

        this.updater.set({
            icon,
            color,
            img: extra.img,
            content: extra.content,
            tip: extra.tip,
            btns
        });

        // altered是否有变化 true：有变化
        let altered = that.updater.altered();
        return altered;
    },
    render() {
        this.updater.digest();
    },
    '@{click}<click>'(e) {
        let { index } = e.params;
        let { btns } = this.updater.get();
        let btn = btns[index];
        if (btn && btn.callback) {
            btn.callback();
        }
    }
});
