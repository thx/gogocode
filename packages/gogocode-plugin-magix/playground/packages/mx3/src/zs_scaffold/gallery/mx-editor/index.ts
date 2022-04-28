/*md5:cdd716c349aae9e5c570b554e73af81d*/
/**
 * 通过样式控制节点显示隐藏而不是直接节点有没有
 * 同时触发keyup和fucosout的时候，一个执行了可能导致input节点没有，而另一个获取到undefined
 */
import Magix from 'magix';
import * as $ from '$';
import * as View from '../mx-util/view';
import * as Form from '../mx-form/index';
import * as Validator from '../mx-form/validator';
const MxEditorPlaceholder = '${content}';
Magix.applyStyle('@index.less');

export default View.extend({
    tmpl: '@index.html',
    mixins: [Form, Validator],
    init(extra) {
        let that = this;
        that.assign(extra);

        that.on('destroy', () => {
            clearTimeout(that['@{out.timer}']);
        })
    },
    assign(extra) {
        let that = this;
        that.updater.snapshot();

        //你可以在这里对数据data进行加工,然后通过set方法放入到updater中
        let rules = extra.rules || {},
            content = extra.content,
            tmpl = extra.tmpl || MxEditorPlaceholder;
        that['@{old.content}'] = content;

        // width: auto / 100% / 100
        let width = isNaN(extra.width) ? (extra.width || '80px') : (extra.width + 'px');

        // 兼容老api small
        let size = extra.size || ((extra.small + '' === 'true') ? 'small' : 'normal');
        if (['small', 'normal'].indexOf(size) < 0) {
            size = 'normal';
        }

        that.updater.set({
            tmpl,
            dis: tmpl.replace(MxEditorPlaceholder, content),
            content,
            rules,
            size,
            width,
            editing: false
        });
        that['@{owner.node}'] = $('#' + that.id);
        that['@{owner.node}'].val(content);

        let altered = this.updater.altered();
        return altered;
    },
    render() {
        this.updater.digest();
    },
    '@{show}<click>'(e) {
        e.preventDefault();
        this.updater.digest({
            editing: true
        })
        $(`#${this.id}_input input`).focus();
    },
    '@{out}<keyup>'(e) {
        let that = this;
        let valid = that.isValid();

        if ((e.keyCode == 13) && valid) {
            let val = e.target.value;
            let tmpl = that.updater.get('tmpl');
            that.updater.digest({
                editing: false,
                dis: tmpl.replace(MxEditorPlaceholder, val),
                content: val
            })

            // 只触发一次trigger，此处不外抛事件
            // let val = that.updater.get('content');
            // if (that['@{old.content}'] != val) {
            //     $('#' + that.id).trigger({
            //         type: 'edit',
            //         editText: val
            //     })
            // }
        }
    },

    '@{out}<focusout>'(e) {
        e.stopPropagation();
        let that = this;

        let valid = that.isValid();
        if (!valid) {
            return;
        }

        let val = e.target.value;
        let { tmpl, content } = that.updater.get();
        that.updater.digest({
            editing: false,
            dis: tmpl.replace(MxEditorPlaceholder, val),
            content: val
        })

        // 只触发一次trigger
        if (that['@{old.content}'] != content) {
            // 双向绑定
            that['@{owner.node}'].val(that['@{old.content}'] = content).trigger({
                type: 'change',
                editText: content
            });

            // 兼容老的事件处理
            $('#' + that.id).trigger({
                type: 'edit',
                editText: content
            })
        }
    },

    '@{stop}<change,focusin>'(e) {
        e.stopPropagation();
    },
});