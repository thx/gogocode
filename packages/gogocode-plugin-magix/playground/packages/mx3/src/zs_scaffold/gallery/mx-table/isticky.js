/*md5:d725a12e3136d27b215fc4c05a323428*/
let Magix = require('magix');
let $ = require('$');
module.exports = Magix.View.extend({
    init(extra) {
        let me = this;

        let inmain;
        if (extra.stickyWrapper) {
            inmain = $('#' + extra.stickyWrapper);
            me['@{layout.header.height}'] = $('#app_header').height() || 50;
        } else {
            inmain = $(window);
            me['@{layout.header.height}'] = 0;
        }
        let watchInmainScroll = () => {
            me['@{sync.pos}'](inmain);
        };
        me.on('destroy', () => {
            inmain.off('scroll', watchInmainScroll);
        });
        inmain.on('scroll', watchInmainScroll);
        me['@{layout.inmain}'] = inmain;
        me['@{owner.node}'] = $('#' + me.id);
    },
    render() {
        let me = this;
        me['@{sync.vars}']();
        me['@{sync.height}']();
        me['@{sync.pos}'](me['@{layout.inmain}']);
    },
    '@{sync.height}' () {
        let me = this;
        let thead = me['@{thead.node}'];
        let ghost = me['@{ghost.node}'];
        let height = thead.height();
        if (height != me['@{thead.height}']) {
            ghost.css({
                height: height,
                display: 'none'
            });
            me['@{thead.height}'] = height;
        }
    },
    '@{sync.vars}' () {
        let me = this;
        let thead = $('#' + me.id).find('thead');
        let ghostId = 'ph_' + me.id;
        let ghost = $('#' + ghostId);
        if (!ghost.length) {
            ghost = $('<caption />').insertBefore(thead).attr('id', ghostId);
        }

        me['@{ghost.node}'] = ghost;
        me['@{thead.node}'] = thead;
    },
    '@{get.pos.info}' () {
        let me = this;
        let now = $.now();
        if (!me['@{ctrl.last.info}'] || me['@{ctrl.last.info}'] + 3000 < now) {
            me['@{ctrl.last.info}'] = now;
            let owner = me['@{owner.node}'];
            let top1, height;
            if (me['@{layout.header.height}']) {
                top1 = owner.offset().top + me['@{layout.inmain}'].scrollTop() - me['@{layout.header.height}'];
            } else {
                top1 = owner.offset().top;
            }
            height = owner.height();
            let tfoot = owner.find('tfoot');
            let tfh = 0;
            if (tfoot.length) {
                tfh = tfoot.height();
            }
            return (me['@{temp.info}'] = {
                min: top1,
                max: top1 + height - me['@{thead.height}'] - tfh
            });
        }
        return me['@{temp.info}'];
    },
    '@{sync.pos}' (node) {
        let me = this;
        let top = node.scrollTop();
        let info = me['@{get.pos.info}']();
        let pi = me['@{pos.info}'];
        if (top > info.min && top < info.max) {
            me['@{pos.info}'] = 's';
            me['@{ghost.node}'].css({
                display: 'block'
            })
            me['@{thead.node}'].css({
                position: 'absolute',
                top: top - info.min
            });
        } else if (pi != 'i') {
            me['@{pos.info}'] = 'i';
            me['@{ghost.node}'].css({
                display: 'none'
            })
            me['@{thead.node}'].css({
                position: 'initial',
                top: 'auto'
            });
        }
    }
});