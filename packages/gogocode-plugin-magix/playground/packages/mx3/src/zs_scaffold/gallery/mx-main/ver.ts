/*md5:659828846003336dc6936a754a55edf7*/
import Magix from 'magix';
import * as $ from '$';
import Base from './steps';
Magix.applyStyle('@index.less');

export default Base.extend({
    tmpl: '@ver.html',
    render() {
        let that = this;
        Base.prototype.render.call(that);

        let context = $('#' + that.id);
        let content = context.find('.@index.less:main-content');
        if (!content.length) {
            return;
        }

        let { wrapperId } = that.updater.get();
        let wrapper = wrapperId ? $('#' + wrapperId) : $(window);
        let scrollFn = () => {
            let nav = context.find('.@index.less:main-nav');
            let scrollTop = $(window).scrollTop();
            let contentTop = content.offset().top;
            if ((scrollTop > contentTop) && !wrapperId) {
                // 相对于window定位
                nav.css({
                    position: 'fixed'
                })
            } else {
                nav.css({
                    position: 'absolute'
                })
            }

            let side = context.find('.@index.less:content-side');
            if (side.length) {
                let sideTop = content.offset().top;
                let { gapWidth } = that.updater.get();
                if ((scrollTop > (sideTop + gapWidth)) && !wrapperId) {
                    side.css({
                        position: 'fixed',
                        top: 0
                    })
                } else {
                    side.css({
                        position: 'absolute',
                        top: `${gapWidth}px`
                    })
                }
            }
        }
        if (!that.$init) {
            that.$init = 1;
            wrapper.on('scroll', scrollFn);
            that.on('destroy', () => {
                wrapper.off('scroll', scrollFn);
            })
        }
        scrollFn();
    },
    '$win<resize>'() {
        let that = this;
        let winHeight = window.innerHeight
        that.updater.set({
            viewHeight: winHeight
        })
        let context = $('#' + that.id);
        let content = context.find('.@index.less:main-content');
        content.css({
            minHeight: winHeight
        })
    },
})