/*md5:44b14c943a5838abe0db3f69dcea38a5*/
let Magix = require('magix');
let DD = require('../mx-dragdrop/index');
let Runner = require('../mx-util/runner');
let $ = require('$');
Magix.applyStyle('@index.less');
let BarId = Magix.guid('dbar_');
let PointerId = Magix.guid('pt_');
let Win = $(window);
let Doc = $(document);
let LEFT = 1;
let TOP = 2;
let RIGHT = 4;
let BOTTOM = 8;
let SCROLL_OFFSET = 20;
let SCROLL_STEP = 7;
let SCROLL_INTERVAL = 30;
let HORIZONAL = 1;
let VERTICAL = 2;
let HANDV = HORIZONAL | VERTICAL;
let UI = {
    '@{bar.create}' () {
        let node = $('#' + BarId);
        if (!node.length) {
            $('<div class="@index.less:bar" id="' + BarId + '"/>').appendTo('body');
        }
    },
    '@{drag.start}' (info) {
        if (info.child) {
            $(info.child).css({
                opacity: 0.4
            });
            this['@{bar.create}']();
        }
    },
    '@{drag.end}' (info) {
        if (info && info.child) {
            $(info.child).css({
                opacity: 1
            });
        }
        this['@{bar.hide}']();
        this['@{pointer.hide}']();
    },
    '@{bar.hide}' () {
        $('#' + BarId).css({
            left: -1e5
        });
    },
    '@{bar.move}' (info, v) {
        let node = $('#' + BarId);
        let hasFound = false;
        if (info.anchor & VERTICAL) {
            if (v & TOP) {
                node.css({
                    height: 2,
                    width: info.bound.width,
                    top: info.bound.y - 1,
                    left: info.bound.x
                });
                hasFound = true;
            } else if (v & BOTTOM) {
                node.css({
                    height: 2,
                    width: info.bound.width,
                    top: info.bound.y + info.bound.height - 1,
                    left: info.bound.x
                });
                hasFound = true;
            }
        }
        if (!hasFound && info.anchor & HORIZONAL) {
            if (v & LEFT) {
                node.css({
                    height: info.bound.height,
                    width: 2,
                    top: info.bound.y,
                    left: info.bound.x - 1
                });
            } else if (v & RIGHT) {
                node.css({
                    height: info.bound.height,
                    width: 2,
                    top: info.bound.y,
                    left: info.bound.x + info.bound.width - 1
                });
            }
        }
    },
    '@{pos.changed}' (info) {
        let me = this;
        if (info.atPlace && info.child != info.hover) {
            if (info.anchor == HANDV) {
                if (info['@{side.changed}']) {
                    me['@{bar.move}'](info, info.side);
                }
            } else if (info['@{pos.changed}']) {
                me['@{bar.move}'](info, info.position);
            }
            me['@{pointer.change}'](true);
        } else {
            me['@{bar.hide}']();
            me['@{pointer.change}']();
        }
    },
    '@{pointer.update}' (e) {
        let node = $('#' + PointerId);
        if (!node.length) {
            node = $('<div class="@index.less:pointer" id="' + PointerId + '"/>');
            node.appendTo('body');
        }
        let x = Math.max(0, Math.min(e.pageX + 10, Doc.width() - node.width()));
        let y = Math.max(0, Math.min(e.pageY + 18, Doc.height() - node.height()));
        node.css({
            left: x,
            top: y,
            display: 'block'
        });
    },
    '@{pointer.change}' (state) {
        let node = $('#' + PointerId);
        if (state) {
            node.addClass('@index.less:ok');
        } else {
            node.removeClass('@index.less:ok');
        }
    },
    '@{pointer.hide}' () {
        $('#' + PointerId).hide();
    }
};
module.exports = Magix.View.extend({
    mixins: [DD],
    init(extra) {
        let me = this;
        let oNode = $('#' + me.id);
        oNode.on('mousedown', extra.selector, e => {
            e.preventDefault();
            me['@{drag.start}'](e);
        });
        me.on('destroy', () => {
            oNode.off('mousedown');
        });
        me['@{owner.node}'] = oNode;
        let zones = [oNode.get(0)];
        if (extra.drops) {
            zones = zones.concat(extra.drops.split(','));
        }
        me['@{zone.ids}'] = zones;
        let hor = (extra.horizonal + '') === 'true';
        let ver = (extra.vertical + '') === 'true';
        if (!hor && !ver) {
            ver = true;
        }
        let anchor = 0;
        if (hor) {
            anchor |= HORIZONAL;
        }
        if (ver) {
            anchor |= VERTICAL;
        }
        me['@{anchor.direction}'] = anchor;
        let sort = true;
        if (Magix.has(extra, 'sort')) {
            sort = (extra.sort + '') === 'true';
        }
        me['@{sort.ctrl}'] = sort;

        me.on('destroy', () => {
            $('#' + BarId).remove();
            $('#' + PointerId).remove();
        })
    },
    '@{findZone}' (node) {
        let me = this;
        let zones = me['@{zone.ids}'];
        for (let zone of zones) {
            if (Magix.inside(node, zone)) {
                return Magix.node(zone);
            }
        }
        return null;
    },
    '@{findDirectChild}' (node, zone) {
        let me = this,
            result = null;
        if (!zone) {
            zone = me['@{findZone}'](node);
        }
        if (!me['@{sort.ctrl}'] && me['@{drag.start.node}']) {
            return {
                child: me['@{drag.start.node}'],
                zone: zone
            };
        }
        while (zone != node) {
            if (node.parentNode == zone) {
                result = node;
                break;
            } else {
                node = node.parentNode;
            }
        }
        if (zone && !zone.firstChild && !result) {
            result = zone;
        }
        if (result) {
            if (result.getAttribute('ds-draggable') === 'false') {
                result = null;
            }
        }
        return {
            child: result,
            zone: zone
        };
    },
    '@{findPosition}' (nb, evt) {
        let position = 0,
            side = 0,
            toLeft = -1,
            toTop = -1,
            toRight = -1,
            toBottom = -1,
            hasNearest = false;
        if (evt.pageX >= nb.x &&
            evt.pageX <= nb.x + nb.width &&
            evt.pageY >= nb.y &&
            evt.pageY <= nb.y + nb.height) {
            position = position | ((evt.pageX <= nb.x + nb.width / 2) ? LEFT : RIGHT);
            toLeft = evt.pageX - nb.x;
            toRight = nb.x + nb.width - evt.pageX;
            position = position | ((evt.pageY <= nb.y + nb.height / 2) ? TOP : BOTTOM);
            toTop = evt.pageY - nb.y;
            toBottom = nb.y + nb.height - evt.pageY;
            hasNearest = true;
        }
        if (hasNearest) {
            var temp = Math.min(toLeft, toTop, toRight, toBottom);
            if (temp > -1) {
                if (temp == toLeft) {
                    side = LEFT;
                } else if (temp == toTop) {
                    side = TOP;
                } else if (temp == toRight) {
                    side = RIGHT;
                } else if (temp == toBottom) {
                    side = BOTTOM;
                }
            }
        }
        let me = this;
        let info = me['@{hover.info}'];
        if (info) {
            if (info.zone === info.hover) {
                position = TOP;
                side = LEFT;
            }
        }
        return {
            position: position,
            atPlace: hasNearest,
            side: side
        };
    },
    '@{drag.start}' (e) {
        if (e.which === 1) {
            let me = this;
            let info = me['@{findDirectChild}'](e.target);
            if (info.child) {
                me['@{drag.start.node}'] = info.child;
                me['@{drag.start.zone}'] = info.zone;
                me['@{owner.node}'].trigger({
                    type: 'dragbegin',
                    dragNode: info.child,
                    dragZone: info.zone
                });
                UI['@{drag.start}'](info);
                me.dragdrop(info.zone, e => {
                    me['@{drag.move}'](e);
                }, e => {
                    me['@{drag.end}'](e);
                });
            }
        }
    },
    '@{checkPosition}' (bound, e, info) {
        let me = this;
        let p = me['@{findPosition}'](bound, e);
        let sideChanage = p.side != me['@{last.side}'],
            positionChange = p.position != me['@{last.position}'];
        if (sideChanage || positionChange) {
            me['@{last.side}'] = p.side;
            me['@{last.position}'] = p.position;
            info['@{side.changed}'] = sideChanage;
            info['@{pos.changed}'] = positionChange;
            info.side = p.side;
            info.position = p.position;
            info.atPlace = p.atPlace;
            info.anchor = me['@{anchor.direction}'];
            UI['@{pos.changed}'](info);
        }
    },
    '@{drag.move}' (e) {
        let current = DD.fromPoint(e.clientX, e.clientY);
        let me = this;
        UI['@{pointer.update}'](e);
        me['@{move.event}'] = e;
        me['@{has.moved}'] = true;
        me['@{start.zone.scroll}']();
        me['@{start.win.scroll}']();
        if (me['@{zone.start.scrolling}'] || me['@{win.start.scrolling}'] || !current) {
            delete me['@{last.hover.node}'];
            delete me['@{last.side}'];
            delete me['@{last.position}'];
            return;
        }
        if (me['@{last.hover.node}'] != current) {
            if (current.id === BarId) return; //
            me['@{last.hover.node}'] = current;
            delete me['@{last.side}'];
            let zone = me['@{findZone}'](current);
            if (zone) {
                if (zone != me['@{last.zone}']) {
                    me['@{last.zone}'] = zone;
                    me['@{owner.node}'].trigger({
                        type: 'enterzone',
                        zone: zone,
                        changePointer: UI['@{pointer.change}']
                    });
                }
                let info = me['@{findDirectChild}'](current, zone);
                if (!info.child) return;
                let n = $(info.child);
                let offset = n.offset();
                let bound = {
                    x: offset.left,
                    y: offset.top,
                    width: n.outerWidth(),
                    height: n.outerHeight()
                };
                n = $(info.zone);
                offset = n.offset();
                me['@{last.zone.bound}'] = {
                    x: offset.left,
                    y: offset.top,
                    scrollX: n.prop('scrollLeft'),
                    scrollY: n.prop('scrollTop'),
                    maxWidth: n.prop('scrollWidth'),
                    maxHeight: n.prop('scrollHeight'),
                    width: n.width(),
                    height: n.height()
                };
                me['@{checkPosition}'](me['@{last.hover.node.bound}'] = bound, e, me['@{hover.info}'] = {
                    child: me['@{drag.start.node}'],
                    bound,
                    zone: info.zone,
                    hover: info.child
                });
            } else if (me['@{last.zone}']) {
                me['@{owner.node}'].trigger({
                    type: 'leavezone',
                    zone: me['@{last.zone}'],
                    changePointer: UI['@{pointer.change}']
                });
                delete me['@{last.zone}'];
            }
        } else if (me['@{last.hover.node.bound}'] &&
            Magix.inside(current, me['@{hover.info}'].zone)) {
            me['@{checkPosition}'](me['@{last.hover.node.bound}'], e, me['@{hover.info}']);
        } else {
            delete me['@{last.side}'];
            delete me['@{last.position}'];
            if (me['@{sort.ctrl}']) {
                UI['@{bar.hide}']();
                UI['@{pointer.change}']();
            }
        }
    },
    '@{drag.end}' () {
        let me = this;
        me['@{stop.zone.scroll}']();
        me['@{stop.win.scroll}']();
        UI['@{drag.end}']({
            child: me['@{drag.start.node}']
        });
        let position = me['@{last.position}'],
            side = me['@{last.side}'],
            move = me['@{has.moved}'],
            info = me['@{hover.info}'],
            dragNode = me['@{drag.start.node}'];
        if (move) {
            if (position || side) {
                let zone = info.zone;
                let a = me['@{anchor.direction}'];
                let v = a === HANDV ? side : position;
                if (((a & HORIZONAL) && (LEFT & v)) || ((TOP & v) && (a & VERTICAL))) {
                    if (info.hover == zone) {
                        zone.appendChild(dragNode);
                    } else {
                        zone.insertBefore(dragNode, info.hover);
                    }
                } else if (((BOTTOM & v) && (a & VERTICAL)) ||
                    ((RIGHT & v) && (a & HORIZONAL))) {
                    let next = info.hover.nextSibling;
                    while (next && next.nodeType != 1) {
                        next = next.nextSibling;
                    }
                    zone.insertBefore(dragNode, next);
                    if (!next) { //如果是最后一个，则滚动
                        zone.scrollTop = zone.scrollHeight;
                    }
                }
            }
        }
        if (info) {
            me['@{owner.node}'].trigger({
                type: 'dragfinish',
                moved: move,
                dragNode: dragNode,
                dragZone: me['@{drag.start.zone}'],
                dropNode: info.hover,
                dropZone: info.zone,
                outZone: !me['@{last.zone}']
            });
        }
        delete me['@{drag.start.node}'];
        delete me['@{drag.start.zone}'];
        delete me['@{last.hover.node}'];
        delete me['@{hover.info}'];
        delete me['@{last.hover.node.bound}'];
        delete me['@{last.position}'];
        delete me['@{last.side}'];
        delete me['@{move.event}'];
        delete me['@{win.start.scrolling}'];
        delete me['@{last.zone}'];
        delete me['@{last.zone.bound}'];
        delete me['@{zone.start.scrolling}'];
        delete me['@{has.moved}'];
    },
    '@{start.zone.scroll}' () {
        let me = this;
        if (!me['@{fn.zone.scroll}']) {
            me['@{fn.zone.scroll}'] = () => {
                let zoneBound = me['@{last.zone.bound}'];
                if (zoneBound) {
                    let zone = me['@{hover.info}'].zone;
                    let tx = 0,
                        ty = 0,
                        e = me['@{move.event}'];
                    if (e.pageX > zoneBound.x &&
                        e.pageY > zoneBound.y &&
                        e.pageX < zoneBound.x + zoneBound.width &&
                        e.pageY < zoneBound.y + zoneBound.height) {
                        if (e.pageX - zoneBound.x < SCROLL_OFFSET && zoneBound.scrollX > 0) {
                            tx = -Math.min(SCROLL_STEP, zoneBound.scrollX);
                        } else if (zoneBound.x + zoneBound.width - e.pageX < SCROLL_OFFSET &&
                            zoneBound.scrollX + zoneBound.width < zoneBound.maxWidth) {
                            tx = Math.min(SCROLL_STEP, zoneBound.maxWidth - zoneBound.scrollX - zoneBound.width);
                        }
                        if (e.pageY - zoneBound.y < SCROLL_OFFSET && zoneBound.scrollY > 0) {
                            ty = -Math.min(SCROLL_STEP, zoneBound.scrollY);
                        } else if (zoneBound.y + zoneBound.height - e.pageY < SCROLL_OFFSET &&
                            zoneBound.scrollY + zoneBound.height < zoneBound.maxHeight) {
                            ty = Math.min(SCROLL_STEP, zoneBound.maxHeight - zoneBound.scrollY - zoneBound.height);
                        }
                        if (tx || ty) {
                            me['@{zone.start.scrolling}'] = true;
                            me['@{prevent.win.scroll}'] = true;
                            zone.scrollTop += ty;
                            zone.scrollLeft += tx;
                            zoneBound.scrollX += tx;
                            zoneBound.scrollY += ty;
                            delete me['@{has.moved}'];
                            UI['@{bar.hide}']();
                            UI['@{pointer.change}']();
                        } else {
                            delete me['@{zone.start.scrolling}'];
                            delete me['@{prevent.win.scroll}'];
                        }
                    } else {
                        delete me['@{zone.start.scrolling}'];
                        delete me['@{prevent.win.scroll}'];
                    }
                }
            };
            Runner['@{task.add}'](SCROLL_INTERVAL, me['@{fn.zone.scroll}']);
        }
    },
    '@{start.win.scroll}' () {
        let me = this;
        if (!me['@{fn.win.scroll}']) {
            me['@{fn.win.scroll}'] = () => {
                if (me['@{prevent.win.scroll}']) return;
                let tx = 0,
                    ty = 0,
                    e = me['@{move.event}'];
                let scrollTop = Win.scrollTop();
                let winHeight = Win.height();
                let maxHeight = Doc.height();
                let maxWidth = Doc.width();
                let winWidth = Win.width();
                let scrollLeft = Win.scrollLeft();
                if (e.pageX - scrollLeft < SCROLL_OFFSET &&
                    scrollLeft > 0) {
                    tx = -Math.min(SCROLL_STEP, scrollLeft);
                } else if (scrollLeft + winWidth - e.pageX < SCROLL_OFFSET &&
                    scrollLeft + winWidth < maxWidth) {
                    tx = Math.min(SCROLL_STEP, maxWidth - winWidth - scrollLeft);
                }
                if (e.pageY - scrollTop < SCROLL_OFFSET &&
                    scrollTop > 0) {
                    ty = -Math.min(SCROLL_STEP, scrollTop);
                } else if (scrollTop + winHeight - e.pageY < SCROLL_OFFSET &&
                    scrollTop + winHeight < maxHeight) {
                    ty = Math.min(SCROLL_STEP, maxHeight - winHeight - scrollTop);
                }
                if (tx || ty) {
                    me['@{win.start.scrolling}'] = true;
                    e.pageX += tx;
                    e.pageY += ty;
                    window.scrollBy(tx, ty);
                    delete me['@{has.moved}'];
                    UI['@{bar.hide}']();
                    UI['@{pointer.update}'](e);
                    UI['@{pointer.change}']();
                } else {
                    delete me['@{win.start.scrolling}'];
                }
            };
            Runner['@{task.add}'](SCROLL_INTERVAL, me['@{fn.win.scroll}']);
        }
    },
    '@{stop.zone.scroll}' () {
        let me = this;
        if (me['@{fn.zone.scroll}']) {
            Runner['@{task.remove}'](me['@{fn.zone.scroll}']);
            delete me['@{fn.zone.scroll}'];
            delete me['@{prevent.win.scroll}'];
        }
    },
    '@{stop.win.scroll}' () {
        let me = this;
        if (me['@{fn.win.scroll}']) {
            Runner['@{task.remove}'](me['@{fn.win.scroll}']);
            delete me['@{fn.win.scroll}'];
        }
    }
});