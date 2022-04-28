/*md5:7a9faae743aebd2fb6e8b243c75f5cec*/
import Magix from 'magix';
import * as $ from '$';
import * as Base from './base';
const Tmpl = '@mask.html';
const Duration = 250;

export = Magix.mix({
    '@{loading.build}'(configs) {
        let me = this;
        let maskId = me.id + '_loading';
        configs = configs || {};

        let data = {
            viewId: maskId
        };
        let element = configs.sizzle ? $(configs.sizzle) : null;
        if (element && element.length) {
            // 相对于某个模块遮罩：默认白色遮罩 + 无提示文案
            Magix.mix(data, {
                top: element.offset().top,
                left: element.offset().left,
                width: element.outerWidth(),
                height: element.outerHeight(),
                content: configs.content,
                dark: (configs.dark + '' === 'true'),
            })
        } else {
            // 全屏遮罩：默认默认深底色 + 有提示文案
            Magix.mix(data, {
                full: true,
                content: configs.content || '加载中...',
                dark: (configs.dark + '' !== 'false'),
            });
        }

        let node = $('#' + maskId);
        if (node && node.length) {
            // 每次重新计算node样式
            node.remove();
        }

        let tmpl = $.isFunction(Tmpl) ? Tmpl(data, me.id) : Tmpl;
        $(document.body).append(tmpl);
        return $('#' + maskId);
    },
    showLoading(configs) {
        let me = this;
        me['@{clear.timers}']();

        let node = me['@{loading.build}'](configs);
        node.css({
            display: 'table'
        });
        this['@{show.timer}'] = setTimeout(() => {
            node.css({
                opacity: 1
            });
        }, Duration)
    },
}, Base)
