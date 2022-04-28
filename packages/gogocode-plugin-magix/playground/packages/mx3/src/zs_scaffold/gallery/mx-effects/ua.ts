/*md5:45cb7013358067513d7deda578ac910d*/
let Magix = require('magix');
let $ = require('$');
Magix.applyStyle('@ua.less');

module.exports = Magix.View.extend({
    tmpl: '@ua.html',
    init(extra) {
        this.assign(extra);
    },
    assign(extra) {
        this.updater.snapshot();

        this.updater.set(extra);

        let altered = this.updater.altered();
        return altered;
    },
    render() {
        let that = this;
        let explorer = navigator.userAgent.toLocaleLowerCase();
        let config = {
            show: false,
        };
        if (explorer.indexOf('chrome') > -1) {
            let ver = 0;
            try {
                let expr = /(chrome)\/([\w.]+)/;
                let matches = expr.exec(explorer);
                ver = +matches[2].split('.')[0];
            } catch (error) {

            }
            if (ver < 73) {
                Magix.mix(config, {
                    show: true,
                    title: 'Chrome升级提示',
                    tip: '系统检测到您当前的Chrome浏览器不是高级版本，为了产品功能更好的性能及体验，请下载高级版。'
                })
            }
        } else {
            Magix.mix(config, {
                show: true,
                title: '建议您使用Chorme浏览器',
                tip: '系统检测到您当前使用的不是Chrome浏览器，为了您能体验到更好的产品性能及体验，建议您切换为Chorme浏览器。'
            })
        }

        that.updater.digest(config);
    },
    'close<click>'(e) {
        this.updater.digest({
            show: false
        })

        $(`#${this.id}`).trigger($.Event('hide', {
            forever: e.params.forever
        }));
    }
});