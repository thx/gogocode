/*md5:a31c38eda85da234e27015c917c01faf*/
/**
 * mx-table使用，不再维护，集成到mx-stickytable中
 */
let $ = require('$');
let Magix = require('magix');
Magix.applyStyle('@sub.less');

module.exports = {
    ctor() {
        // &#xe653; 收起
        // &#xe652; 展开

        let me = this;
        me['@{sub.toggle.store}'] = {};
        let ready = e => {
            let state = me['@{sub.toggle.store}'];
            let context = $('#' + (e.id || me.id));
            let trigger = context.find('[sub-toggle]');

            trigger.each((idx, item) => {
                let toggleName = $(item).attr('sub-toggle');

                // 默认状态
                let expand = (/^true$/i).test($(item).attr('data-expand'));
                if (expand && !state[toggleName]) {
                    state[toggleName] = {
                        expand: true
                    }
                }
                let object = state[toggleName];
                me.sync((object && object.expand), item, toggleName);
            });
        };
        me.on('rendered', ready);
        me.on('domready', ready);
    },
    sync(expand, item, toggleName) {
        let me = this;
        let context = $('#' + me.id);
        $(item).addClass('@sub.less:sub-wrapper');

        if (expand) {
            // 收起
            $(item).html('<i class="mc-iconfont @sub.less:sub-expand">&#xe653;</i>');
            context.find('[sub-toggle-parent=' + toggleName + ']').removeClass('hide');
        } else {
            // 展开
            $(item).html('<i class="mc-iconfont @sub.less:sub-close">&#xe652;</i>');
            context.find('[sub-toggle-parent=' + toggleName + ']').addClass('hide');
        }
    },
    '$[sub-toggle]<click>'(e) {
        let me = this;
        let context = $('#' + me.id);
        let item = $(e.eventTarget);
        let toggleName = item.attr('sub-toggle');
        let object = me['@{sub.toggle.store}'][toggleName];
        if (!object) {
            object = me['@{sub.toggle.store}'][toggleName] = {};
        }

        object.expand = !object.expand;
        me.sync(object.expand, item, toggleName);
        $(document).trigger('tableresize');
    }
};