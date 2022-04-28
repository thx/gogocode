/*md5:8fd0ffd794ad0c83823d4cc78222d71f*/
import Magix, { Vframe } from 'magix';
import * as $ from '$'
import Base from '../mx-popover/base';
import * as Monitor from '../mx-util/monitor';
Magix.applyStyle('@../mx-popover/index.less');

export default Base.extend({
    assign(extra) {
        let me = this;
        Monitor['@{setup}']();

        let { showDelay, classNames } = me.updater.get('constants');
        let oNode = $('#' + me.id);
        me['@{owner.node}'] = oNode;

        // trigger方式，click，hover，默认click
        me['@{trigger.type}'] = extra.triggerType || 'hover';
        let showFn = () => {
            clearTimeout(me['@{dealy.hide.timer}']);
            me['@{dealy.show.timer}'] = setTimeout(me.wrapAsync(() => {
                me['@{show}'](); //等待内容显示
            }), showDelay);
        }

        let place = extra.place || 'bc';
        switch (me['@{trigger.type}']) {
            case 'click':
                oNode.click(showFn);
                break;

            case 'hover':
                oNode.hover(showFn, () => {
                    me['@{delay.hide}']();
                });
                break;

            case 'contextmenu':
                // 右键显示的位置固定
                // bl，居中对齐
                place = 'bl';
                me['@{pos.offset}'] = {
                    top: 0 - oNode.height() / 2 - 10,
                    left: oNode.width() / 2,
                }
                oNode.contextmenu((e) => {
                    e.preventDefault();
                    showFn();
                });
                break;
        }

        let map = {
            t: 'top',
            l: 'left',
            r: 'right',
            b: 'bottom',
            c: 'center'
        }
        let places = place.split('');
        let placement = map[places[0]],
            align = map[places[1]];
        me['@{pos.placement}'] = placement;
        me['@{pos.align}'] = align;
        me['@{pos.class}'] = classNames[[placement, align].join('-')] + ' @../mx-popover/index.less:popover @../mx-popover/index.less:width-transform mx-shadow';

        me['@{pos.init}'] = false;
        me['@{pos.cal}'] = false;
        me['@{pos.show}'] = false;
        me['@{scroll.wrapper}'] = extra.scrollWrapper;

        me['@{menus}'] = extra.menus || [];
        me['@{width}'] = extra.width ? (extra.width + 'px') : 'auto';

        // 复用popover，左对齐
        me['@{text.align}'] = 'left';

        me.on('destroy', () => {
            if (me['@{dealy.show.timer}']) {
                clearTimeout(me['@{dealy.show.timer}']);
            }
            if (me['@{dealy.hide.timer}']) {
                clearTimeout(me['@{dealy.hide.timer}']);
            }
            $('#popover_' + me.id).remove();

            Monitor['@{remove}'](me);
            Monitor['@{teardown}']();
        });

        // 固定刷新
        return true;
    },
    render() {
        this.updater.digest();
    },
    '@{init}'() {
        let me = this;
        let { spm } = me.updater.get();
        let posClass = me['@{pos.class}'],
            posWidth = me['@{width}'],
            vId = me.id,
            view = '@./content',
            viewData = {
                menus: me['@{menus}'],
                spm
            };

        let popId = `popover_${vId}`;
        let popBd = $(`#${popId}`);
        if (!popBd.length) {
            $(document.body).append(`<div mx-view class="@../mx-popover/index.less:popover-hide ${posClass}" id="${popId}"
                style="width: ${posWidth};"></div>`);
        }

        // 先实例化，绑定事件，再加载对应的view
        let vf = me.owner.mountVframe(popId, '');
        vf.on('created', () => {
            let popNode = me['@{setPos}']();
            popNode.removeClass('@../mx-popover/index.less:popover-hide');

            let triggerType = me['@{trigger.type}'];
            if (triggerType == 'hover') {
                popNode.hover(() => {
                    clearTimeout(me['@{dealy.hide.timer}']);
                }, () => {
                    me['@{delay.hide}']();
                });
            }
        });
        vf.mountView(view, {
            data: viewData,
            submit: (selected) => {
                me['@{hide}']();
                me['@{owner.node}'].trigger({
                    type: 'change',
                    selected: selected
                });
            }
        })
    },
    '@{inside}'(node) {
        return Magix.inside(node, this.id) || Magix.inside(node, 'popover_' + this.id);
    },
    '@{show}'() {
        let me = this;
        clearTimeout(me['@{dealy.show.timer}']);
        if (!me['@{pos.init}']) {
            me['@{pos.init}'] = true;
            me['@{init}']();
        }
        if (me['@{pos.show}']) {
            return;
        }
        me['@{pos.show}'] = true;
        // 每次show时都重新定位
        let popNode = me['@{setPos}']();
        popNode.addClass('@../mx-popover/index.less:show-out');
        Monitor['@{add}'](me);
    },
    '@{delay.hide}'() {
        let me = this;

        clearTimeout(me['@{dealy.show.timer}']);
        clearTimeout(me['@{dealy.hide.timer}']);
        let { hideDelay } = me.updater.get('constants');
        me['@{dealy.hide.timer}'] = setTimeout(me.wrapAsync(() => {
            me['@{hide}']();
        }), hideDelay);
        Monitor['@{remove}'](me);
    },
    '@{hide}'() {
        let me = this;

        clearTimeout(me['@{dealy.hide.timer}']);
        if (!me['@{pos.show}']) {
            return;
        }
        me['@{pos.show}'] = false;
        let popNode = $('#popover_' + me.id);
        popNode.removeClass('@../mx-popover/index.less:show-out');
        Monitor['@{remove}'](me);
    }
});