/*md5:a9065287f02fa7bfba20b23c50ea62e1*/
let $ = require('$');
let Win = $(window);
let Doc = $(document);
let IsW3C = window.getComputedStyle;
let ClearSelection = (t) => {
    if ((t = window.getSelection)) {
        t().removeAllRanges();
    } else if ((t = window.document.selection)) {
        if (t.empty) t.empty();
        else t = null;
    }
};
let DragPrevent = (e) => {
    e.preventDefault();
};
let DragMoveEvent = 'mousemove touchmove';
let DragEndEvent = 'mouseup touchend';
let DragPreventEvent = 'keydown mousewheel DOMMouseScroll';

module.exports = {
    ctor() {
        let me = this;
        me.on('destroy', () => {
            me['@{dd&drag.end}']();
        });
    },
    '@{dd&drag.end}' (e) {
        let me = this;
        let info = me['@{dd&drag.object}'];
        if (info) {
            delete me['@{dd&drag.object}'];
            Doc.off(DragMoveEvent, me['@{dd&move.proxy}'])
                .off(DragEndEvent, me['@{dd&stop.proxy}'])
                .off(DragPreventEvent, DragPrevent);
            Win.off('blur', me['@{dd&stop.proxy}']);
            let node = info['@{dd&node}'];
            let stop = info['@{dd&stop}'];
            let iStop = info['@{dd&stop.is.function}'];
            $(node).off('losecapture', me['@{dd&stop.proxy}']);
            if (node.setCapture) node.releaseCapture();
            if (iStop) {
                stop(e);
            }
        }
    },
    dragdrop(node, moveCallback, endCallback) {
        let me = this;
        me['@{dd&drag.end}']();
        if (node) {
            ClearSelection();
            if (node.setCapture) {
                node.setCapture();
            }
            me['@{dd&drag.object}'] = {
                '@{dd&stop}': endCallback,
                '@{dd&node}': node,
                '@{dd&stop.is.function}': $.isFunction(endCallback)
            };
            let moveIsFunction = $.isFunction(moveCallback);
            me['@{dd&stop.proxy}'] = e => {
                me['@{dd&drag.end}'](e);
            };
            me['@{dd&move.proxy}'] = e => {
                if (moveIsFunction) {
                    moveCallback(e);
                }
            };
            Doc.on(DragMoveEvent, me['@{dd&move.proxy}'])
                .on(DragEndEvent, me['@{dd&stop.proxy}'])
                .on(DragPreventEvent, DragPrevent);
            Win.on('blur', me['@{dd&stop.proxy}']);
            $(node).on('losecapture', me['@{dd&stop.proxy}']);
        }
    },
    fromPoint(x, y) {
        let node = null;
        if (document.elementFromPoint) {
            if (!DragPrevent['@{dd&fixed}'] && IsW3C) {
                DragPrevent['@{dd&fixed}'] = true;
                DragPrevent['@{dd&add.scroll}'] = document.elementFromPoint(-1, -1) !== null;
            }
            if (DragPrevent['@{dd&add.scroll}']) {
                x += Win.scrollLeft();
                y += Win.scrollTop();
            }
            node = document.elementFromPoint(x, y);
            while (node && node.nodeType == 3) node = node.parentNode;
        }
        return node;
    },
    clear: ClearSelection
};