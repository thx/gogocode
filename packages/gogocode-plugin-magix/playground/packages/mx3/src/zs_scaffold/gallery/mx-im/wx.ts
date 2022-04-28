/*md5:42c8adefc684e165f6fbdb725ac25d4f*/
/**
 * 包装新版万象组件
 * https://yuque.antfin-inc.com/nue/everywhere/gdb60g
 */
import Magix from 'magix';
import Base from './base';

export default Base.extend({
    init(extra) {
        let that = this;
        that.assign(extra);
        that.observeLocation({
            path: true
        });
        that.on('destroy', () => {
            if (that.loopTimer) {
                clearTimeout(that.loopTimer);
            }
        })
    },
    assign(extra) {
        let that = this;
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
            defaultSourceId, // 默认sourceId
            sourceMap,
            sourceList
        })

        // 固定刷新
        return true;
    },

    render() {
        let that = this;
        let sourceId = that.getCurSourceId();
        that.updater.set({
            sourceId
        })

        if (window.EVERYWHERE_ENTRY && window.EW) {
            EW.refresh({
                instanceId: sourceId
            });
        } else {
            seajs.use('//g.alicdn.com/everywhere/everywhere-entry/index.js', () => {
                EVERYWHERE_ENTRY.init().then(EW => {
                    EW.init({
                        instanceId: sourceId
                    });
                });
            })
        }
    }
});