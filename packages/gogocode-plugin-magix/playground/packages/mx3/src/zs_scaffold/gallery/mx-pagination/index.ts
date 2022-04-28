/*md5:75cbe4a37b679ae4866d8b74efeadae8*/
/**
 * 分页组件
 */
import Magix from 'magix';
import * as $ from '$';
import * as View from '../mx-util/view';
import * as I18n from '../mx-medusa/util';
const DefaultSizes = [10, 20, 30, 40];
Magix.applyStyle('@index.less');

export default View.extend({
    tmpl: '@index.html',
    init(ops) {
        this.assign(ops);
    },
    assign(ops) {
        let that = this;
        that.updater.snapshot();

        // 可选翻页数
        let sizes = [];
        try {
            sizes = JSON.parse(ops.sizes);
        } catch (e) {
            sizes = ops.sizes || [];
        }
        if (!sizes || !sizes.length) { sizes = DefaultSizes; };

        // 带文案
        let sizeStrs = sizes.map(size => {
            return {
                text: `${size}条/页`,
                value: size,
            };
        })

        // 当前第几页
        // 优先级page > offset
        let page,
            size = +ops.size || 40,
            offset = +ops.offset;
        if (ops.page) {
            page = ops.page;
        } else if (offset) {
            page = parseInt(offset / size) + 1;
        } else {
            page = 1;
        }

        // 显示模式，不同主题下不同设置
        //    square 方形
        //    circle 圆形
        let mode = that['@{get.css.var}']('--mx-pagination-mode', 'square');
        if (['square', 'circle'].indexOf(mode) < 0) {
            mode = 'square';
        };

        let align = that['@{get.css.var}']('--mx-pagination-align', 'left');
        let alignRight = (align == 'right');

        // 是否显示详细汇总信息
        let hideDetailTotal = false;

        // 是否显示简易汇总信息
        let hideTotal = false;

        // 是否显示快捷跳转
        let hideJump = false;

        // 仅能顺序翻页
        let inOrder = false;

        if (ops.simplify + '' === 'true') {
            // 仅显示翻页器版
            hideDetailTotal = true;
            hideTotal = false;
            hideJump = false;
            inOrder = false;
        } else if (ops.mini + '' === 'true') {
            // 顺序翻页版本
            hideDetailTotal = true;
            hideTotal = false;
            hideJump = true;
            inOrder = true;
        }

        if (ops.hasOwnProperty('hideDetailTotal')) {
            // 默认false
            hideDetailTotal = ops.hideDetailTotal + '' === 'true';
        }

        if (ops.hasOwnProperty('hideTotal')) {
            // 默认false
            hideTotal = ops.hideTotal + '' === 'true';
        }

        if (ops.hasOwnProperty('hideJump')) {
            // 默认false
            hideJump = ops.hideJump + '' === 'true'
        } else if (ops.hasOwnProperty('jump')) {
            // 兼容历史api jump（默认true）
            hideJump = ops.jump + '' === 'false';
        }

        // 是否可切换分页数，默认true
        let sizesChange = ops.sizesChange + '' !== 'false';

        that.updater.set({
            alignRight,
            mode,
            hideDetailTotal,
            hideTotal,
            hideJump,
            inOrder,
            sizesChange,
            total: (ops.total | 0) || 0, //总数
            page, // 当前页数，从1开始
            size, // 当前分页数
            sizes, //可选分页数
            sizeStrs,
            step: ops.step || 5, //页码过多时，中间显示多少条页码
        });

        // altered是否有变化 true：有变化
        let altered = that.updater.altered();
        return altered;
    },
    render() {
        let that = this;
        let data = that.updater.get();
        let total = data.total;
        let page = data.page | 0;
        let pages = Math.ceil((data.total || 1) / data.size);
        if (page > pages) {
            page = pages;
        }

        let step = data.step | 0;
        let middle = step / 2 | 0;
        let start = Math.max(1, page - middle);
        let end = Math.min(pages, start + step - 1);
        start = Math.max(1, end - step + 1);
        let offset;
        if (start <= 2) { //=2 +1  =1  +2
            offset = 3 - start;
            if (end + offset < pages) {
                end += offset;
            }
        }
        if (end + 2 > pages) {
            offset = 2 - (pages - end);
            if ((start - offset) > 1) {
                start -= offset;
            }
        }
        if (start == 3) {
            start -= 1;
        }
        if (end + 2 == pages) {
            end += 1;
        }
        let offsetStart = (page - 1) * data.size + 1;
        let offsetEnd = Math.min(data.total, page * data.size);

        if (total == 0) {
            offsetStart = offsetEnd = 0;
        }

        let tipOffset = I18n['pager.offset'].replace('{min}', `${offsetStart}`).replace('{max}', `${offsetEnd}`),
            tipTotal = I18n['pager.total'].replace('{total}', `${total}`),
            tipPer = I18n['pager.per.page'],
            tipUnit = I18n['pager.unit'],
            tipJumpTo = I18n['pager.jump.to'],
            tipJumpUnit = I18n['pager.jump.unit'];

        // 跳转，下一页
        let next = page + 1;
        if (next > pages) {
            next = pages;
        }

        that.updater.digest({
            offsetStart,
            offsetEnd,
            pages,
            page,
            start,
            end,
            next,
            tipOffset,
            tipTotal,
            tipPer,
            tipUnit,
            tipJumpTo,
            tipJumpUnit
        });
    },
    '@{fire.event}'() {
        let that = this;
        let node = $('#' + that.id);
        let { page, size } = that.updater.get();
        let offset = (page - 1) * size;
        node.trigger({
            type: 'change',
            page,
            size,
            offset
        });
    },
    '@{to.page}<click>'(e) {
        e.preventDefault();
        this.updater.set(e.params);
        this.render();
        this['@{fire.event}']();
    },
    '@{change.size}<change>'(e) {
        e.stopPropagation();
        this.updater.set({ size: e.value });
        this.render();
        this['@{fire.event}']();
    },
    '@{stop}<change,focusin,focusout>'(e) {
        e.stopPropagation();
    },
    '@{jump}<click>'(e) {
        e.stopPropagation();
        var i = $(`#${this.id}_jump_input`);
        let page = +(i.val());
        if (!Number.isInteger(page)) {
            return;
        }
        this.updater.set({ page });
        this.render();
        this['@{fire.event}']();
    },
    '@{prevent}<click>'(e) {
        e.preventDefault();
    }
});

