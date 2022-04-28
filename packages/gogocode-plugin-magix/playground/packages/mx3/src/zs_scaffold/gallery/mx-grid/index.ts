/*md5:f07e3a236d105309c773705be636c055*/
/**
 * 卡片吸顶
 */
import Magix from 'magix';
import * as $ from '$';
import * as View from '../mx-util/view';
Magix.applyStyle('@index.less');

export default View.extend({
    init(extra) {
        let that = this;
        let owner = $(`#${that.id}`);
        let node = owner.find('[mx-grid-sticky="outer"]');
        if (node[0]) {
            let placeholder = $(node[0]);
            let child = placeholder.children('[mx-grid-sticky="inner"]');
            placeholder.outerHeight(child.outerHeight());

            let watchScroll = () => {
                let width = placeholder.outerWidth();
                let scrollTop = $(window).scrollTop();
                let offset = placeholder.offset();
                let top = offset.top;

                if (scrollTop > top) {
                    if (!that['@{grid.sticky.state}']) {
                        that['@{grid.sticky.state}'] = true;
                        child.addClass('@index.less:fixed');
                        child.css({
                            paddingLeft: offset.left,
                            paddingRight: $(window).width() - offset.left - width,
                        })
                    }
                } else {
                    if (that['@{grid.sticky.state}']) {
                        that['@{grid.sticky.state}'] = false;
                        child.removeClass('@index.less:fixed');
                        child.css({
                            paddingLeft: 0,
                            paddingRight: 0,
                        })
                    }
                }
            }

            let stickyName = `scroll.grid.sticky${that.id}`;
            that.on('destroy', () => {
                $(window).off(stickyName);
            });
            $(window).off(stickyName, watchScroll).on(stickyName, watchScroll);
            watchScroll();
        }

        that.assign(extra);
    },
    assign(extra) {
        return true;
    }
});