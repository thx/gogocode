/*md5:d2d3e529716ce9062d3fcbdf70ebdd4e*/
let Magix = require('magix');
let $ = require('$');
Magix.applyStyle('@index.less');
let barId = Magix.guid('mx_topbar_');
let Vframe = Magix.Vframe;
let timer, interval;
let percent = 100;
let Topbar = {
    '@{show}' () {
        clearTimeout(timer);
        let bar = $('#' + barId);
        if (!bar.length) {
            $('body').append(`<div class="@index.less:bar" id="${barId}"></div>`);
            interval = setInterval(Topbar['@{porgress}'], 300);
        }
    },
    '@{porgress}' () {
        let bar = $('#' + barId);
        if (bar.length) {
            if (percent > 15) {
                percent -= (3 + Math.random() * 5);
            } else if (percent > 4) {
                percent -= (1 + Math.random());
            }
            bar.css({
                transform: `translate3d(-${percent}%,0px,0px)`
            });
        }
    },
    '@{hide}' () {
        setTimeout(() => {
            clearInterval(interval);
            let bar = $('#' + barId);
            if (bar.length) {
                bar.css({
                    transform: `translate3d(0,0px,0px)`
                });
                timer = setTimeout(() => {
                    percent = 100;
                    bar.remove();
                }, 400);
            }
        }, 0);
    }
};
module.exports = Magix.View.extend({
    init(extra) {
        Magix.Router.on('changed', e => {
            if (e.path) {
                Topbar['@{show}']();
            }
        });
        let resume = vf => {
            vf.off('created', Topbar['@{hide}']);
            vf.on('created', Topbar['@{hide}']);
        };

        let watch = e => {
            if (e.vframe.id == extra.id) {
                resume(e.vframe);
            }
        };
        Vframe.on('add', watch);
        let vf = Vframe.get(extra.id);
        if (vf) {
            resume(vf);
        }
    },
    render() {
        Topbar['@{show}']();
    }
});