/*md5:f9560c2deb633cdb6695105bd0774ce7*/
/**
 * 包装老版万象组件
 * https://yuque.antfin-inc.com/wanxiang/technology/description
 */
import Magix from 'magix';
import * as $ from '$'
import * as View from '../mx-util/view';
let Router = Magix.Router;

export default View.extend({
    init(extra) {
        let that = this;
        that.observeLocation({
            path: true
        });

        let bizCode = extra.bizCode;
        let bottom = extra.bottom || 0;
        let defaultSourceId = +extra.defaultSourceId;

        let sourceMap = extra.sourceMap || {},
            sourceList = [];
        for (let path in sourceMap) {
            sourceList.push({
                id: sourceMap[path],
                hash: Magix.parseUrl(path)
            })
        }

        that.updater.set({
            bizCode,
            bottom: +bottom,
            defaultSourceId, // 默认sourceId
            sourceMap,
            sourceList
        })

        let sourceId = that.getCurSourceId();
        that.updater.set({
            sourceId
        })

        seajs.use('//g.alicdn.com/crm/anywhere/0.4.5/lib/include', () => {
            window.awAsyncInit = () => {
                window.AW.init({
                    isHidden: true,
                    bizCode: bizCode,
                    sourceId: sourceId,
                    logoWidth: 40, //非必传：指定象仔logo大小
                    onRendered: () => {
                        that.reloc();
                        // window.AW.show();
                    }
                });
            }
        })

        that.on('destroy', () => {
            if (that.loopTimer) {
                clearTimeout(that.loopTimer);
            }
        })
    },

    assign() {
        // 固定刷新
        return true;
    },

    getCurSourceId() {
        let { sourceList, defaultSourceId } = this.updater.get();
        let loc = Router.parse();
        let path = loc.path;
        let params = loc.params;

        let cur = {};
        for (let i = 0; i < sourceList.length; i++) {
            let hash = sourceList[i].hash;
            // 比较路径
            let equal = (hash.path == path);

            // 比较参数：当前参数包含配置参数即匹配中
            for (let key in hash.params) {
                equal = equal && (hash.params[key] == params[key]);
            }

            if (equal) {
                cur = sourceList[i];
                break;
            }
        }
        return $.isEmptyObject(cur) ? defaultSourceId : cur.id;
    },

    render() {
        let that = this;

        // 刷新万象知识库
        let renderFn = () => {
            if (that.loopTimer) {
                clearTimeout(that.loopTimer);
            }
            if (window.AW) {
                let { sourceId: oldSourceId, bizCode } = that.updater.get();
                let sourceId = that.getCurSourceId();
                if ((sourceId + '') !== (oldSourceId + '')) {
                    window.AW.refresh({
                        bizCode,
                        sourceId
                    });
                    that.updater.set({
                        sourceId
                    })
                }
            } else {
                that.loopTimer = setTimeout(renderFn, 25);
            }
        }
        renderFn();
    },

    reloc: function () {
        let that = this;
        let { bottom } = that.updater.get();
        if (window.AW) {
            let winHeight = window.innerHeight;
            window.AW.moveTo(winHeight - bottom - 200);
        }
    },

    '$win<resize>'() {
        this.reloc();
    }
});