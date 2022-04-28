/*md5:883b36c817adca61300173404a28c9fe*/
import Magix from 'magix';
import * as $ from '$';
Magix.applyStyle('@index.less');
const MxGuideWidth = 320;
const MxGuideDirSize = 34;
const MxGuideDirLine = 48;
const MxGuideDirGap = 6;
const MxGuideHideDuration = 200;
const MxGuideZIndex = 9999999;
const Tmpl = '@index.html';

export = {
    ctor() {
        this.on('destroy', () => {
            this['@{mxguide.delete}']();
        });
    },

    '@{mxguide.delete}'() {
        // 删除节点
        let { viewId, cur, list } = this['@{mxguide.data}'] || {};
        if (viewId) {
            let node = $(`#${viewId}`);
            if (node && node.length) {
                // 通知外部关闭引导
                node.trigger($.Event('cancel', {
                    index: +cur
                }));
                node.remove();
            }

            [`${viewId}_dir`, `${viewId}_mask`].forEach(key => {
                let extra = $(`#${key}`);
                if (extra && extra.length) {
                    extra.remove();
                }
            });
        }

        // 模块显示时需要高亮节点，取消额外样式影响
        list = list || [];
        for (let i = 0; i < list.length; i++) {
            $(list[i].sizzle).removeClass('@index.less:sizzle');
        }
    },

    '@{mxguide.init}'({ viewId, len, mode, scrollWrapper }) {
        let node = $(`#${viewId}`);
        if (!node || !node.length) {
            // 追加到body
            $(document.body).append(`<div id="${viewId}" class="${(len > 1) ? '@index.less:big-wrapper' : '@index.less:wrapper'}" style="z-index: ${(MxGuideZIndex + 3)}; width: ${MxGuideWidth}px;"></div>`);
            $(document.body).append(`<div id="${viewId}_dir" class="@index.less:dir" style="z-index: ${(MxGuideZIndex + 2)}; width: ${MxGuideDirSize}px; height: ${MxGuideDirSize}px;"><div class="@index.less:dir-line"></div><div class="@index.less:dir-icon"></div></div>`);

            // 是否为模块引导（包含蒙层）
            if (mode == 'module') {
                $(document.body).append(`<div id="${viewId}_mask" class="@index.less:mask" style="z-index: ${MxGuideZIndex}"></div>`);
            }

            if (scrollWrapper && scrollWrapper.length) {
                let watchScroll = () => {
                    let pos = this['@{get.guide.pos}']();
                    $(`#${viewId}`).css({ top: pos.nt, left: pos.nl });
                    $(`#${viewId}_dir`).css({ top: pos.dnt, left: pos.dnl });
                }
                $(`#${viewId}`).on('cancel', () => {
                    scrollWrapper.off('scroll.guides', watchScroll);
                });
                scrollWrapper.off('scroll.guides', watchScroll).on('scroll.guides', watchScroll);
            }
        }
    },

    '@{get.guide.pos}'() {
        let data = this['@{mxguide.data}'];
        let { list, cur, viewId } = data;
        let node = $(`#${viewId}`);
        let sizzle = $(list[cur].sizzle);
        let { top, left } = sizzle.offset(),
            sWidth = sizzle.outerWidth(),
            sHeight = sizzle.outerHeight(),
            nWidth = node.outerWidth(),
            nHeight = node.outerHeight();
        if (list[cur].offset) {
            top += (+list[cur].offset.top || 0);
            left += (+list[cur].offset.left || 0);
        }
        let nt = top, nl = left,
            dnt = top, dnl = left;
        let placement = list[cur].placement;
        switch (placement) {
            case 'left':
                nt += (sHeight - nHeight) / 2;
                nl -= (nWidth + MxGuideDirLine);
                dnt += (sHeight - MxGuideDirSize) / 2;
                dnl -= (MxGuideDirSize - MxGuideDirGap);
                break;

            case 'right':
                nt += (sHeight - nHeight) / 2;
                nl += sWidth + MxGuideDirLine;
                dnt += (sHeight - MxGuideDirSize) / 2;
                dnl += sWidth - MxGuideDirGap;
                break;

            case 'top':
                nt -= (nHeight + MxGuideDirLine);
                nl += (sWidth - nWidth) / 2;
                dnt -= (MxGuideDirSize - MxGuideDirGap);
                dnl += (sWidth - MxGuideDirSize) / 2;
                break;

            default:
                placement = 'bottom';
                nt += sHeight + MxGuideDirLine;
                nl += (sWidth - nWidth) / 2;
                dnt += sHeight - MxGuideDirGap;
                dnl += (sWidth - MxGuideDirSize) / 2;
                break;
        }
        return {
            nt, nl, dnt, dnl
        }
    },

    '@{set.guide.pos}'(init) {
        let data = this['@{mxguide.data}'];
        let { list, cur, viewId, ignoreScroll, mode, scrollWrapper } = data;
        let node = $(`#${viewId}`),
            dirNode = $(`#${viewId}_dir`),
            sizzle = $(list[cur].sizzle);
        // 先设置内容，设置了内容才知道内容高度
        node.html(Tmpl(data, this.id));

        // 设置定位
        let pos = this['@{get.guide.pos}']();

        // 模块引导，高亮出当前节点
        if (mode == 'module') {
            for (let i = 0; i < list.length; i++) {
                $(list[i].sizzle).removeClass('@index.less:sizzle');
            }
            sizzle.addClass('@index.less:sizzle');
            sizzle.css({ zIndex: MxGuideZIndex + 1 });
        }

        let placement = list[cur].placement;
        if (init) {
            // 首次直接显示
            node.css({ top: pos.nt, left: pos.nl });
            dirNode.css({ top: pos.dnt, left: pos.dnl });
            dirNode.attr('data-placement', placement);
        } else {
            // 切换动画
            node.animate({
                top: pos.nt,
                left: pos.nl,
            }, MxGuideHideDuration * 2);

            dirNode.animate({
                opacity: 0,
            }, MxGuideHideDuration, () => {
                dirNode.attr('data-placement', `anim-${placement}`);
                dirNode.css({ top: pos.dnt, left: pos.dnl });
                dirNode.animate({
                    opacity: 1,
                }, MxGuideHideDuration);

                // 如果不在可视范围内则滚动到可视范围内
                if (scrollWrapper && scrollWrapper[0] && sizzle[0].scrollIntoView) {
                    let { top: wt, right: wr, bottom: wb, left: wl, } = scrollWrapper[0].getBoundingClientRect();
                    let { top: st, right: sr, bottom: sb, left: sl, } = sizzle[0].getBoundingClientRect();
                    if (st > wb || sl > wr || sr < wl || sb < wt) {
                        sizzle[0].scrollIntoView({
                            behavior: 'smooth'
                        });
                    }
                } else {
                    let vw = window.innerWidth || document.documentElement.clientWidth;
                    let vh = window.innerHeight || document.documentElement.clientHeight;
                    let { top: t, right: r, bottom: b, left: l, } = node[0].getBoundingClientRect();
                    if (!ignoreScroll && (t < 0 || l < 0 || r > vw || b > vh) && node[0].scrollIntoView) {
                        node[0].scrollIntoView({
                            behavior: 'smooth'
                        });
                    }
                }
            });
        }
    },

    '@{mxguide.prev}<click>'(e) {
        let { cur } = this['@{mxguide.data}'];
        Magix.mix(this['@{mxguide.data}'], {
            cur: +cur - 1,
        });
        this['@{set.guide.pos}']();
    },

    '@{mxguide.next}<click>'(e) {
        let { cur } = this['@{mxguide.data}'];
        Magix.mix(this['@{mxguide.data}'], {
            cur: +cur + 1,
        });
        this['@{set.guide.pos}']();
    },

    '@{mxguide.cancel}<click>'(e) {
        let that = this;
        let { viewId } = that['@{mxguide.data}'];
        let node = $(`#${viewId}`),
            dirNode = $(`#${viewId}_dir`);
        dirNode.animate({ opacity: 0 }, MxGuideHideDuration);
        node.animate({
            opacity: 0,
        }, MxGuideHideDuration, () => {
            that['@{mxguide.delete}']();
        });
    },

    showMxGuides(configs) {
        let guideId = `${this.id}_mx_guide`;

        // 过滤找不到的节点
        let list = configs.list || [];
        for (let i = 0; i < list.length; i++) {
            let sizzle = $(list[i].sizzle);
            if (!sizzle || !sizzle.length) {
                list.splice(i--);
            }
        };
        if (!list.length) {
            // 无有效引导步骤
            return;
        }

        this['@{mxguide.data}'] = {
            spm: configs.spm || ((this.owner && this.owner.path) ? 'gostr=/alimama_bp.4.1;locaid=d' + this.owner.path.replace(/\//g, '_') : ''),
            spmc: configs.spmc || ((this.owner && this.owner.path) ? ('c' + this.owner.path.replace(/\//g, '_')) : ''),
            mode: configs.mode || 'point',
            ignoreScroll: configs.ignoreScroll + '' === 'true',
            scrollWrapper: configs.scrollWrapper ? $(configs.scrollWrapper) : null,
            width: MxGuideWidth,
            viewId: guideId,
            len: list.length,
            list,
            cur: 0,
        }
        this['@{mxguide.init}'](this['@{mxguide.data}']);
        this['@{set.guide.pos}'](true);

        return $(`#${guideId}`);
    },
};