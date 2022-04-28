/*md5:2dcf3a4940f2e749a196a75b75259e93*/
/**
 * 包装新版万象组件 展示位小icon
 * https://yuque.antfin-inc.com/nue/everywhere/gdb60g
 * https://aone.alibaba-inc.com/req/27332509
 */
import Magix from 'magix';
import * as $ from '$';
import Base from './base';
Magix.applyStyle('@icon.less');

export default Base.extend({
    tmpl: '@icon.html',
    init(extra) {
        this.assign(extra);
        this.observeLocation({
            path: true
        });
    },
    assign(extra) {
        let that = this;
        // 固定刷新
        let defaultSourceId = extra.defaultSourceId;
        let sourceMap = extra.sourceMap || {},
            sourceList = [];
        for (let path in sourceMap) {
            sourceList.push({
                id: sourceMap[path],
                hash: Magix.parseUrl(path)
            })
        }

        that.updater.set({
            content: $(`#${that.id}`).html(),
            outer: (extra.outer + '' !== 'false'), // 外链还是开浮层，默认外链
            outerUrl: 'https://everyhelp.taobao.com/screen/home.htm',
            params: extra.params || {},
            box: (extra.box + '' === 'true'),
            defaultSourceId, // 默认sourceId
            sourceMap,
            sourceList
        })

        // 固定刷新
        return true;
    },

    render() {
        let { params, outerUrl } = this.updater.get();
        let sourceId = this.getCurSourceId();
        params.instanceId = sourceId;
        this.updater.digest({
            url: Magix.toUrl(outerUrl, params),
            sourceId
        })
    }
});