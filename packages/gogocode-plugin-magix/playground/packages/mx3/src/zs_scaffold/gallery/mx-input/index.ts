/*md5:97e1d0bc4aee5f841914a7896a7c9036*/
/**
 * 涉及规范 https://aone.alibaba-inc.com/req/33590073
 */
import Magix from 'magix';
import * as $ from '$';
import * as View from '../mx-util/view';
Magix.applyStyle('@index.less');

export default View.extend({
    tmpl: '@index.html',
    init(extra) {
        this.assign(extra);
    },
    assign(extra) {
        // 当前数据截快照
        this.updater.snapshot();

        // 输入框
        let type = 'text';

        // 字符数，此处仅做样式，不处理校验逻辑，实际校验位mx-form
        let maxlength = +extra.maxlength || 0;

        // 输入框的值
        let value = extra.value || '';

        // 前缀
        let prefix = extra.prefix || '', prefixes = [];
        switch (prefix) {
            case 'search':
            case 'money':
            case 'user':
                prefixes.push(prefix);
                break;

            default:
                if (extra.search + '' === 'true') {
                    // 兼容历史api
                    prefixes.push('search');
                };
                if (prefix) {
                    // 自定义提示
                    prefixes.push(prefix);
                };
                break;
        }

        // 后缀
        let suffix = extra.suffix || '', suffixes = [];
        switch (suffix) {
            case 'password':
                type = 'password'; // 密码输入框
                suffixes.push(suffix);
                break;

            case 'delete':
                suffixes.push(suffix);
                break;

            default:
                if (extra.showDelete + '' === 'true') {
                    // 兼容历史api
                    suffixes.push('delete');
                };
                if (suffix) {
                    // 自定义提示
                    suffixes.push(suffix);
                };
                break;
        }

        // 兼容老api small
        let size = extra.size || ((extra.small + '' === 'true') ? 'small' : 'normal');
        if (['small', 'normal', 'large'].indexOf(size) < 0) {
            size = 'normal';
        }

        // 搜索类型，默认两个字符位置
        let searchWidth = extra.searchWidth || 'calc(var(--mx-trigger-h-gap, 8px) * 2 + var(--mx-trigger-arrow-size, 18px) + var(--mx-trigger-font-size, 12px) * 2 + 2px)';
        let searchList = extra.searchList || [];
        let searchValue = (extra.searchValue === null || extra.searchValue === undefined) ? (searchList[0] ? searchList[0].value : '') : extra.searchValue;

        this.updater.set({
            type,
            value,
            placeholder: extra.placeholder || '请输入',
            autocomplete: extra.autocomplete || 'off',
            maxlength,
            searchWidth,
            searchList,
            searchValue,
            prefixes,
            suffixes,
            size,
        });

        this['@{owner.node}'] = $(`#${this.id}`);
        this['@{owner.node}'].val(value);

        // altered是否有变化 true：有变化
        let altered = this.updater.altered();
        return altered;
    },

    render() {
        this.updater.digest();
    },

    /**
     * 清空输入内容
     */
    '@{clear}<click>'(e) {
        e.preventDefault();
        e.stopPropagation();

        // 清空选中项
        // input值被动修改时不会触发change
        // 需要手动触发
        this.updater.digest({ value: '' })
        this['@{fire}'](true);
    },

    '@{togglePassword}<click>'(e) {
        e.stopPropagation();
        let { type } = this.updater.get();
        this.updater.digest({
            type: (type == 'password') ? 'text' : 'password',
        })

        // 触发扩散动画
        // let node = $(`#${this.id}_input`);
        // node.focus();
    },

    '@{changeSearchType}<change>'(e) {
        e.stopPropagation();
        this.updater.digest({ searchValue: e.value });
        this['@{fire}']();
    },

    /**
     * 双向绑定处理
     * 阻止默认keyup，focusout，统一对外输出change事件
     */
    '@{fire}<change,keyup,focusout>'(e) {
        let oldValue = this.updater.get('value');
        let node = $(`#${this.id}_input`);
        let value = node.val();
        if (oldValue !== value) {
            this.updater.digest({ value });
            this['@{fire}']();
        }
    },

    '@{fire}<click>'(e) {
        e.stopPropagation();
        let node = $(`#${this.id}_input`);
        let value = node.val();
        this.updater.digest({ value });
        this['@{fire}']();
    },

    '@{fire}'(clear) {
        let { value, searchList, searchValue } = this.updater.get();
        let d = { value };
        if (searchList.length > 0) {
            Magix.mix(d, { searchValue });
        }
        this['@{owner.node}'].val(value).trigger({
            type: 'change',
            ...d,
        });

        if (clear) {
            // 清楚事件
            this['@{owner.node}'].trigger({
                type: 'clear',
                ...d,
            });
        }
    }
});
