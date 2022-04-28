/*md5:7a328e142ea14765e979ca6007c6e5a2*/
import Magix from 'magix';
import * as $ from '$';
import * as View from '../mx-util/view';
import * as DD from '../mx-dragdrop/index';
Magix.applyStyle('@index.less');
const DefaultSize = 280;

export default View.extend({
    tmpl: '@range.html',
    mixins: [DD],
    init(ops) {
        let me = this;
        let oNode = $('#' + me.id);
        me.assign(ops);
        let click = (e) => {
            if (me['@{temp.hold.event}'] || me['@{ui.disabled}']) {
                return;
            }
            let offset = oNode.offset();
            let vars = me['@{get.ui.vars}']();
            let pos = -1;
            if (me['@{vertical}']) {
                pos = vars.rMax - e.pageY + offset.top;
            } else {
                pos = e.pageX - offset.left;
            }
            let p = (pos - vars.half) / vars.max;
            let v = me['@{get.fixed.value}'](p);
            let start = +me['@{start}'];
            let end = +me['@{end}'];
            let syncLeft = Math.abs(start - v) < Math.abs(end - v);
            if (syncLeft) {
                me['@{sync.left}'](v);
                me['@{start}'] = v;
                me['@{fire.event}']();
                Magix.node('left_' + me.id).focus();
            } else {
                me['@{sync.right}'](v);
                me['@{end}'] = v;
                me['@{fire.event}']();
                Magix.node('right_' + me.id).focus();
            }
        };
        oNode.on('click', click);
        me.on('destroy', () => {
            oNode.off('click', click);
        });
        me['@{owner.node}'] = oNode;
    },
    assign(ops) {
        let me = this;
        me['@{width}'] = +ops.width || DefaultSize;
        me['@{height}'] = +ops.height || DefaultSize;
        me['@{min}'] = +ops.min || 0;
        me['@{max}'] = +ops.max || 100;
        me['@{step}'] = +ops.step || 1;
        me['@{tip}'] = ops.tip || '';

        // mx-disabled作为属性，动态更新不会触发view改变，兼容历史配置，建议使用disabled
        me['@{ui.disabled}'] = (ops.disabled + '' === 'true') || $('#' + me.id)[0].hasAttribute('mx-disabled');

        // 垂直方向显示
        me['@{vertical}'] = (ops.vertical + '') === 'true';

        // 保留正常位数
        let s = (ops.step || 1) + '';
        let i = s.indexOf('.');
        if (i >= 0) {
            i = s.slice(i + 1).length;
        } else {
            i = 0;
        }
        me['@{tail.length}'] = i;

        // selected：选中值，数组or逗号分隔，双向绑定，返回值也是入参是什么出参是什么
        // value：逗号分隔，出参value=[start, end]坑了，待下线
        // 双向绑定的参数
        let selected = ops.selected,
            value = ops.value;
        if (selected) {
            if ($.isArray(selected)) {
                // 保留双向绑定的数据格式
                me['@{bak.type}'] = 'array';
            } else {
                // 逗号分隔
                selected = (selected + '').split(',');
                me['@{bak.type}'] = 'string';
            }

            me['@{start}'] = +selected[0] || 0;
            me['@{end}'] = +selected[1] || 0;
        } else if (value) {
            // 逗号分隔
            me['@{bak.type}'] = 'string';
            value = (value + '').split(',');
            me['@{start}'] = +value[0] || 0;
            me['@{end}'] = +value[1] || 0;
        } else {
            // 默认双向绑定为数组
            me['@{bak.type}'] = 'array';

            // 默认0到中间值
            me['@{start}'] = me['@{min}'];
            me['@{end}'] = (me['@{min}'] + me['@{max}']) / 2;
        };
        // 范围修正
        ['start', 'end'].forEach(key => {
            if (me[`@{${key}}`] > me['@{max}']) {
                me[`@{${key}}`] = me['@{max}'];
            } else if (me[`@{${key}}`] < me['@{min}']) {
                me[`@{${key}}`] = me['@{min}'];
            }
            me[`@{${key}}`] = me['@{get.fixed.value}']((me[`@{${key}}`] - me['@{min}']) / (me['@{max}'] - me['@{min}']));
        })

        // 刻度点
        let dots = (ops.dots || []).map(v => {
            v = +v;
            let diff = me['@{max}'] - me['@{min}'];
            return {
                value: v.toFixed(me['@{tail.length}']),
                percent: (v - me['@{min}']) / diff * 100
            }
        });
        if ((dots.length == 0) && (ops.showDot + '') === 'true') {
            // showDot：显示刻度点，根据step计算
            let step = me['@{step}'];
            let diff = me['@{max}'] - me['@{min}'];

            let i = 1;
            while (me['@{min}'] + step * i < me['@{max}']) {
                dots.push({
                    value: (me['@{min}'] + step * i).toFixed(me['@{tail.length}']),
                    percent: step * i / diff * 100
                });
                i++;
            }

            // 根据step均分的点，可计算可见点位置，进行重叠纠正
            me['@{show.dots.reset}'] = true;
        }
        me['@{show.dots}'] = dots;

        return true;
    },
    render() {
        let me = this;

        // 状态回置
        me['@{temp.hold.event}'] = false;

        let dots = me['@{show.dots}'],
            dotReset = me['@{show.dots.reset}'],
            tail = me['@{tail.length}'],
            width = me['@{width}'],
            height = me['@{height}'],
            vertical = me['@{vertical}'];

        me.updater.digest({
            dots,
            dotReset,
            min: me['@{min}'].toFixed(tail),
            max: me['@{max}'].toFixed(tail),
            width,
            height,
            vertical
        });

        // 水平方向，纠正显示点的文案
        let gap = dots.length;
        if (gap > 0 && dotReset && !vertical) {
            let dotTextNodes = $(`#${me.id} .@index.less:dot-text`);
            let gw = (gap > 0) ? width / gap : width,
                dw = dotTextNodes.outerWidth();
            let ml = 0 - dw / 2;
            // 间隔几个显示文案
            let gi = Math.ceil(dw / gw);
            for (let i = 0; i < dotTextNodes.length; i++) {
                let textNode = $(dotTextNodes[i]);
                let display = ((i + 1) % gi === 0) ? 'inline-block' : 'none';
                if (i + 1 == dotTextNodes.length) {
                    // 最后一个节点
                    if (dots[i].percent / 100 * width + dw >= width) {
                        display = 'none';
                    }
                }

                textNode.css({
                    marginLeft: ml,
                    display
                })
            }
        }
        me.val([me['@{start}'], me['@{end}']]);
    },
    '@{get.ui.vars}'() {
        let me = this;
        let rail = me['@{owner.node}'].find('.@index.less:rail');
        let tracker = me['@{owner.node}'].find('.@index.less:tracker');
        let iLeft = $('#left_' + me.id);
        let iRight = $('#right_' + me.id);
        let rMax = me['@{vertical}'] ? rail.height() : rail.width();
        let half = iLeft.outerWidth() / 2;
        let max = rMax - half * 2;
        return {
            rail,
            iLeftL: $('#leftl_' + me.id),
            iRightL: $('#rightl_' + me.id),
            tracker,
            iLeft,
            iRight,
            left: parseInt(iLeft.css(me['@{vertical}'] ? 'bottom' : 'left'), 10),
            right: parseInt(iRight.css(me['@{vertical}'] ? 'bottom' : 'left'), 10),
            rMax,
            max,
            half
        };
    },
    '@{sync.left}'(v) {
        let me = this;
        v = +v;
        let max = me['@{max}'],
            min = me['@{min}'];
        if (v > max) {
            v = max;
        } else if (v < min) {
            v = min;
        }

        let leftPercent = (v - min) / (max - min);
        // 修正后的值
        v = me['@{get.fixed.value}'](leftPercent);
        // 更正
        leftPercent = (v - min) / (max - min);

        let vars = me['@{get.ui.vars}']();
        let node = vars.iLeftL;
        node.html(v + (me['@{tip}'] ? ('<span class="@index.less:unit">' + me['@{tip}'] + '</span>') : ''));

        // let l = vars.rMax * leftPercent;
        if (me['@{vertical}']) {
            let pHalf = node.height() / 2;
            // if (l - pHalf < 0) {
            //     l = 0;
            // } else if (l + pHalf > vars.rMax) {
            //     l = vars.rMax - 2 * pHalf;
            // } else {
            //     l -= pHalf;
            // }
            node.css({
                'bottom': `${leftPercent * 100}%`,
                'margin-bottom': `${(0 - pHalf)}px`
            });
            vars.iLeft.css('bottom', `${leftPercent * 100}%`);
            vars.tracker.css('bottom', `${leftPercent * 100}%`);
        } else {
            let pHalf = node.width() / 2;
            // if (l < pHalf) {
            //     l = 0;
            // } else if (l + pHalf > vars.rMax) {
            //     l = vars.rMax - 2 * pHalf;
            // } else {
            //     l -= pHalf;
            // }
            node.css({
                'left': `${leftPercent * 100}%`,
                'margin-left': `${(0 - pHalf)}px`
            });
            vars.iLeft.css('left', `${leftPercent * 100}%`);
            vars.tracker.css('left', `${leftPercent * 100}%`);
        }

        return v;
    },
    '@{sync.right}'(v) {
        let me = this;
        v = +v;
        let max = me['@{max}'],
            min = me['@{min}'];
        if (v > max) {
            v = max;
        } else if (v < min) {
            v = min;
        }

        let rightPercent = (v - min) / (max - min);
        // 修正后的值
        v = me['@{get.fixed.value}'](rightPercent);
        // 更正
        rightPercent = (v - min) / (max - min);

        let vars = me['@{get.ui.vars}']();
        let node = vars.iRightL;
        node.html(v + (me['@{tip}'] ? ('<span class="@index.less:unit">' + me['@{tip}'] + '</span>') : ''));

        // let l = vars.rMax * rightPercent;
        if (me['@{vertical}']) {
            let pHalf = node.height() / 2;
            // if (l - pHalf < 0) {
            //     l = 0;
            // } else if (l + pHalf > vars.rMax) {
            //     l = vars.rMax - 2 * pHalf;
            // } else {
            //     l -= pHalf;
            // }
            node.css({
                'bottom': `${rightPercent * 100}%`,
                'margin-bottom': `${(0 - pHalf)}px`
            });
            vars.iRight.css('bottom', `${rightPercent * 100}%`);
            vars.tracker.css('top', `${(100 - rightPercent * 100)}%`);
        } else {
            let pHalf = node.width() / 2;
            // if (l < pHalf) {
            //     l = 0;
            // } else if (l + pHalf > vars.rMax) {
            //     l = vars.rMax - 2 * pHalf;
            // } else {
            //     l -= pHalf;
            // }
            node.css({
                'left': `${rightPercent * 100}%`,
                'margin-left': `${(0 - pHalf)}px`
            });
            vars.iRight.css('left', `${rightPercent * 100}%`);
            vars.tracker.css('right', `${(100 - rightPercent * 100)}%`);
        }

        return v;
    },
    val(v) {
        let me = this;
        if (v) {
            let av = (v + '').split(',');
            let start = +av[0] || 0;
            let end = +av[1] || 0;
            if (start > end) {
                [start, end] = [end, start];
            }
            if (me['@{bak.type}'] == 'array') {
                // 数组
                me['@{owner.node}'].val([start, end]);
            } else {
                // 逗号分隔
                me['@{owner.node}'].val(`${start},${end}`);
            }

            start = me['@{sync.left}'](start);
            end = me['@{sync.right}'](end);
            if (me['@{start}'] != start || me['@{end}'] != end) {
                me['@{start}'] = start;
                me['@{end}'] = end;
                me['@{fire.event}']();
            }
        }
        return [+me['@{start}'], +me['@{end}']];
    },
    '@{get.fixed.value}'(p) {
        let me = this;
        let max = me['@{max}'],
            min = me['@{min}'],
            step = me['@{step}'],
            v;
        if (p === 0) {
            v = min;
        } else if (p === 1) {
            v = max;
        } else {
            v = Math.round((max - min) * p / step) * step + min;
        }
        return v.toFixed(me['@{tail.length}']);
    },
    '@{fire.event}'() {
        let me = this;
        let start = (+me['@{start}']).toFixed(me['@{tail.length}']),
            end = (+me['@{end}']).toFixed(me['@{tail.length}']);

        let value = (me['@{bak.type}'] == 'array') ? [start, end] : `${start},${end}`;
        this['@{owner.node}'].val(value).trigger({
            type: 'change',
            selected: value,
            value: [start, end], // 历史返回格式，待下线
            start,
            end
        });
    },
    '@{check.and.fire}'(start, end) {
        let me = this;
        if (start != me['@{start}'] ||
            end != me['@{end}']) {
            me['@{start}'] = start;
            me['@{end}'] = end;
            me['@{fire.event}']();
        }
    },
    '@{drag}<mousedown>'(e) {
        let me = this;
        if (me['@{ui.disabled}']) {
            return;
        }
        let current = $(e.eventTarget);
        let size = current.outerWidth();
        let min = 0; //最小
        let max = -1;
        if (me['@{vertical}']) {
            max = current.parent().height() - size;
        } else {
            max = current.parent().width() - size;
        }
        let currentValue = parseInt(current.css(me['@{vertical}'] ? 'bottom' : 'left'), 10);
        let dragStartValue = me['@{start}'];
        let dragEndValue = me['@{end}'];
        me['@{dragging}'] = 1;
        me.dragdrop(e.eventTarget, (ex) => {
            DD.clear();
            let newValue = -1;
            if (me['@{vertical}']) {
                newValue = currentValue + e.pageY - ex.pageY;
            } else {
                newValue = currentValue + ex.pageX - e.pageX;
            }
            if (newValue < min) newValue = min;
            else if (newValue > max) newValue = max;
            let p = newValue / max;
            let v = me['@{get.fixed.value}'](p);
            let nv = +v;
            if (e.params.end) {
                let start = +me['@{start}'];
                if (nv >= start) {
                    if (me['@{start}'] != dragStartValue) {
                        dragStartValue = me['@{sync.left}'](start);
                    }
                    dragEndValue = me['@{sync.right}'](v);
                    Magix.node('right_' + me.id).focus();
                } else {
                    if (me['@{start}'] != dragEndValue) {
                        dragEndValue = me['@{sync.right}'](start);
                    }
                    dragStartValue = me['@{sync.left}'](v);
                    Magix.node('left_' + me.id).focus();
                }
            } else {
                let end = +me['@{end}'];
                if (nv <= end) {
                    if (me['@{end}'] != dragEndValue) {
                        dragEndValue = me['@{sync.right}'](end);
                    }
                    dragStartValue = me['@{sync.left}'](v);
                    Magix.node('left_' + me.id).focus();
                } else {
                    if (me['@{end}'] != dragStartValue) {
                        dragStartValue = me['@{sync.left}'](end);
                    }
                    dragEndValue = me['@{sync.right}'](v);
                    Magix.node('right_' + me.id).focus();
                }
            }
        }, () => {
            me['@{check.and.fire}'](dragStartValue, dragEndValue);
            me['@{temp.hold.event}'] = true;
            setTimeout(me.wrapAsync(() => {
                delete me['@{temp.hold.event}'];
            }), 20);
            delete me['@{dragging}'];
        });
    },
    '@{move.by.keyboard}<keydown>'(e) {
        let me = this,
            step = me['@{step}'],
            move;
        if (me['@{dragging}']) return;
        if (e.keyCode == 37 || e.keyCode == 40) { //decrement
            e.preventDefault();
            step = -step;
            move = true;
        } else if (e.keyCode == 39 || e.keyCode == 38) { //increment
            e.preventDefault();
            move = true;
        }
        if (move) {
            let srcStartValue = me['@{start}'];
            let startValue = +srcStartValue;
            let srcEndValue = me['@{end}'];
            let endValue = +srcEndValue;
            let {
                start
            } = e.params;
            if (start) {
                startValue += step;
            } else {
                endValue += step;
            }
            if (startValue > endValue) {
                if (start) {
                    Magix.node('right_' + me.id).focus();
                } else {
                    Magix.node('left_' + me.id).focus();
                }
                if (endValue != +srcStartValue) {
                    srcStartValue = me['@{sync.left}'](endValue);
                }
                if (startValue != +srcEndValue) {
                    srcEndValue = me['@{sync.right}'](startValue);
                }
            } else {
                if (start) {
                    srcStartValue = me['@{sync.left}'](startValue);
                } else {
                    srcEndValue = me['@{sync.right}'](endValue);
                }
            }
            me['@{check.and.fire}'](srcStartValue, srcEndValue);
        }
    },
    '@{prevent}<contextmenu>'(e) {
        e.preventDefault();
    }
});


