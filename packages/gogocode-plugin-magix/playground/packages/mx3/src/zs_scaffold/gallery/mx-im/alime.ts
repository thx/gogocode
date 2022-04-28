/*md5:ab1c3b3dea47ac4d50b2d48f5d519a42*/
/**
 * 阿里小蜜接入手册：https://yuque.antfin-inc.com/alime/tg3n3k/dsyxto
 * 相关内容：https://aone.alibaba-inc.com/req/24814910
 */
import Magix from 'magix';
import * as $ from '$';
import Base from './base';

export default Base.extend({
    init(extra) {
        this.assign(extra);
        this.observeLocation({
            path: true
        });

        this.on('destroy', () => {
            this['@{hide}']();
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

        let configs = $.extend(true, {}, extra);
        ['defaultSourceId', 'sourceMap'].forEach(key => {
            delete configs[key];
        })

        that.updater.set({
            content: $(`#${that.id}`).html(),
            outer: (extra.outer + '' !== 'false'), // 外链还是开浮层，默认外链
            outerUrl: 'https://ai.alimebot.taobao.com/intl/index.htm',
            params: extra.params || {},
            box: (extra.box + '' === 'true'),
            zIndex: extra.zIndex || 999999,
            defaultSourceId, // 默认sourceId
            sourceMap,
            sourceList,
            configs
        })

        // 固定刷新
        return true;
    },
    render() {
        let { params, outerUrl } = this.updater.get();
        let sourceId = this.getCurSourceId();
        params.from = sourceId;
        this.updater.set({
            url: Magix.toUrl(outerUrl, params),
            sourceId
        })
        this['@{show}']();
    },

    '@{show}'() {
        this['@{hide}']();

        let showFn = () => {
            let { configs, sourceId, zIndex } = this.updater.get();
            if (!sourceId) {
                console.error('请配置from');
                return;
            }
            Magix.mix(configs, {
                from: sourceId,
                'z-index': zIndex
            })
            if ($.isEmptyObject(configs.position)) {
                configs.position = {
                    bottom: 40,
                    right: 40
                }
            }
            let ad = new AlicareDialog(configs);
            ad.onRendered(ui => {
                const { layout, config } = ui;
                layout.addEventListener(
                    'click',
                    e => {
                        // 发送点击埋点
                        if (window.goldlog && window.goldlog.spm_ab && window.goldlog.record) {
                            window.goldlog.record('/alimama_bp.4.1', 'CLK', `req_type=act&act_type=${config.from}`, 'POST')
                        }
                    },
                    false
                );
            });
        }

        if (window.AlicareDialog) {
            showFn();
        } else {
            seajs.use('//g.alicdn.com/alime/dialog/alicare-dialog.js', () => {
                showFn();
            })
        }
    },
    /**
     * 小蜜暂未提供销毁方法，目前的方案只能删除节点
     */
    '@{hide}'() {
        let alime = document.getElementById('J_xiaomi_dialog');
        if (alime) {
            document.body.removeChild(alime);
        }
    }
});