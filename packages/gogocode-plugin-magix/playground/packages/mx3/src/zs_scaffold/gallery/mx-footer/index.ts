/*md5:46fc9913f6f3bd57d140f138f042f7ab*/
/**
 * 版权信息：https://yuque.antfin-inc.com/fe-p2/sg5kfn/gxm1ua
 */
import Magix from 'magix';
import * as $ from '$'
import * as View from '../mx-util/view';
Magix.applyStyle('@index.less');

export default View.extend({
    tmpl: '@index.html',
    init(extra) {
        this.updater.snapshot();
        this.assign(extra);
    },
    assign(extra) {
        let that = this;
        that.updater.snapshot();

        // 宽度范围修正
        let width = extra.width || 1000;
        let maxWidth = window.innerWidth;
        if (+width > maxWidth) {
            width = maxWidth;
        }

        // 简易模式
        let simple = (extra.mode === 'simple');

        // 对齐方式，默认居中对齐
        let textAlign = extra.textAlign || 'center';

        this.updater.set({
            bizCode: extra.bizCode,
            type: extra.type,
            needProducts: (extra.products + '' === 'true'),// 是否需要产品线信息
            simple,
            width,
            textAlign
        });

        // altered是否有变化 true：有变化
        let altered = that.updater.altered();
        return altered;
    },
    render() {
        let that = this;

        // 设备信息
        let renderFn = (data) => {
            let { type, bizCode, needProducts, simple } = that.updater.get();
            let devInfo = that['@{get.dev.info}']();
            let href = window.location.href;
            // 上方
            //      products：上方竖版关联外链（默认复用顶部header的，如果有单独bizCode定义的则用bizCode定义的）
            //      qrcode 妈妈二维码
            //      qncode 千牛二维码
            // 下方
            //      bottoms 下方横版的外链数据
            let { bottoms, domains, bizCodes } = data.footer;
            for (let k in domains) {
                // reg=true：需要校验域名
                // reg=false：直接匹配
                let reg = new RegExp(`${k}\.(com|net|cn)`, 'i');
                if (!type && domains[k].reg && reg.test(href)) {
                    type = k;
                }
            };

            // 指定产品线信息 or 域名匹配信息
            let configs = bizCodes[bizCode] || domains[type] || domains['alimama'];

            // 产品线信息
            let products = [];
            if (needProducts) {
                let ps = (configs.products && configs.products.length) ? configs.products : data.products;
                ps.forEach(g => {
                    g.seconds.forEach(s => {
                        if (!s.text) {
                            s.text = g.text;
                        }
                    })
                    products = products.concat(g.seconds);
                })
                products.forEach(p => {
                    // 无线默认收起子产品详情
                    p.show = (devInfo.pad || devInfo.phone) ? false : true;
                })
            }

            let { links = [], copyrights = [] } = configs.bottoms || domains['alimama'].bottoms;
            // 必须显示的信息：copyrights 版权信息 + 备案信息
            copyrights.forEach(i => {
                i.forEach(j => {
                    j.required = true;
                });
            });
            // 1. 无线：只显示版权信息
            // 2. 非无线：简易模式显示必要信息；非简易模式都显示
            if (devInfo.phone) {
                bottoms = copyrights;
            } else {
                // 相关链接信息，第一行信息必显示
                bottoms[0] = bottoms[0].concat(links);
                bottoms[0].forEach(i => {
                    i.required = true;
                });
                bottoms = bottoms.concat(copyrights);
                if (!simple) {
                    bottoms.forEach(i => {
                        i.forEach(j => {
                            j.required = true;
                        });
                    });
                }
            }

            let qrcodes = [];
            ['qrcode', 'qncode'].forEach(key => {
                let q = configs[key] || data.footer[key];
                if (q && q.img) {
                    qrcodes.push(q);
                }
            })

            that.updater.digest({
                logo: configs.logo,
                products,
                qrcodes,
                bottoms,
                devInfo
            });
        }

        $.getJSON('//g.alicdn.com/mm/bp-source/lib/products.json', (data) => {
            renderFn(data);
        }).fail((data, status, xhr) => {
            // 异常情况
            renderFn({});
        });
    },

    /**
     * 无线展开收起，同一时间只允许展开一个
     */
    'toggle<click>'(e) {
        let { products } = this.updater.get();
        let index = e.params.index;
        for (let i = 0; i < products.length; i++) {
            if (index == i) {
                products[i].show = !products[i].show;
            } else {
                products[i].show = false;
            }
        }
        this.updater.digest({
            products
        })
    }
});
