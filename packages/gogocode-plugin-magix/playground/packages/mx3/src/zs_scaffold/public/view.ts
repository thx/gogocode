/*md5:613b28e69b6b02c650b928037db65d7c*/
/**
 * 每次项目各自的通用方法定义
 * 具体页面继承该View
 * 包括挂在在view上的接口管理的fetch，save
 */
import Magix, { Router } from 'magix';
import * as $ from '$';
import * as Chartx from '../chartpark/index';
import FormatFn from './format';
import Dayjs from './dayjs'
import dayjsExtends from './@ali/dayjs-extend'; // dayjs 扩展包
// 扩展 dayjs 支持的方法
for (const dayjsExtend of dayjsExtends) {
    Dayjs.extend(dayjsExtend)
}
$(document).on('navslidend', () => {
    // const Chartx 
    if (Chartx.__esModule) {
        Chartx.default.resize();
    } else {
        Chartx.resize();
    }
});
$(window).on('resize', () => {
    if (Chartx.__esModule) {
        Chartx.default.resize();
    } else {
        Chartx.resize();
    }
});

//@ts-ignore
export default Magix.View.extend({
    getChartOptions(id) {
        return $.extend(true, {}, Chartx.__esModule ? Chartx.default.getOptions(id) : Chartx.getOptions(id));
    },

    /**
    * 筛选更新条件，组件入参双向绑定，只需要更新翻页数
    * 
    * dropdown：
    * <mx-dropdown.bd class="w160 mr10" 
    *    list="{{@list}}" 
    *    selected="{{:params.selected}}" 
    *    mx-change="mxChangeFilter()" />
    * 
    * 翻页：
    * <mx-pagination 
    *    total="{{=count}}" 
    *    size="{{:params.pageSize}}" 
    *    offset="{{:params.offset}}"
    *    mx-change="mxChangeFilter()" />
    * 
    * 单个搜索框时，若有多个搜索框，需要自己额外处理提交参数
    * <mx-search 
    *    list="{{@searchList}}" 
    *    search-key="{{:params.searchKey}}" 
    *    search-value="{{:params.searchValue}}" 
    *    mx-search="mxChangeFilter()" />
    */
    'mxChangeFilter<change,search>'(e) {
        this.mxChangeFilter({
            offset: 0
        })
    },

    /**
     * 列表通用：翻页
     */
    'mxChangePage<change>'(e) {
        this.mxChangeFilter({
            offset: e.offset,
            pageSize: e.size,
        })
    },

    mxChangeFilter(extra) {
        let params = { ...this.updater.get('params') };
        Magix.mix(params, extra);
        for (let k in params) {
            let v = params[k];
            if (v instanceof Array || v instanceof Object) {
                // 数组 or 对象
                params[k] = JSON.stringify(v);
            }
        }
        Router.to(params);
    },

    /**
     * 列表通用：克隆params并结合hash上的参数值返回新的对象(方法本身不会改变params)
     */
    mxGetParams() {
        let loc = Router.parse();
        let params = { ...this.updater.get('params') };
        let careKeys = Object.keys(params);
        careKeys.forEach(k => {
            let locValue = loc.get(k);
            if (locValue !== '') {
                let v = '';
                try {
                    v = JSON.parse(locValue);
                } catch (error) {
                    v = locValue;
                }
                params[k] = v;
            }
        })
        return params;
    },

    /**
     * 通用处理params到接口提交参数
     */
    mxSetParams() {
        let params = { ...this.updater.get('params') };

        // 数据切换翻页到1
        Magix.mix(params, {
            page: 1,
        });

        // 多key搜索处理
        if (params.searchKey) {
            Magix.mix(params, {
                [params.searchKey]: params.searchValue || ''
            });
        }
        ['searchKey', 'searchValue'].forEach(k => {
            delete params[k];
        });

        return params;
    },

    mxGetComponentsMap(list) {
        let map = {};
        let walk = it => {
            for (let e of it) {
                map[e.code] = e;
                if (e.subComponentList) {
                    walk(e.subComponentList);
                }
            }
        };
        walk(list);
        return map;
    }
}).merge({
    ctor() {
        this.updater.set({
            FormatFn,
            Dayjs
        });
    }
})
