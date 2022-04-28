import Magix, { Router } from 'magix';
import View from 'zs_scaffold/view';

export default View.extend({
    tmpl: '@default.html',
    init() {
        this.observeLocation({
            path: true
        });
    },
    async render() {
        window.scrollTo(0, 0);

        let { menus, routes } = Magix.config('zs_scaffold.menu');
        this.updater.digest({
            path: Router.parse().path,
            menus,
            routes,
            headerInfos: {
                rightView: '@./partials/header'
            },
        });

        this.openDialogs();
    },
    /**
     * 首次进入首页（只谈一次）
     * * 大促活动，先判断是否有权限（权限是首页的配置模块，只在首页展示）
     */
    openDialogs() {
        let that = this;

        let { all, path } = that.updater.get();
        if (path == '/home/index') {
            // 其他只在首页弹出一次
            if (that.$init) {
                return;
            }
            that.$init = true;

            // 所有子view加载完成再弹
            // 10次后默认完成
            let maxRetry = 10;
            let show = () => {
                if (that.$loopTimer) {
                    clearTimeout(that.$loopTimer);
                }
                if (that.$created) {
                    //通用站内信
                    that.autoShow(`${that.id}_common_topbar`).then(() => {
                        //通用跨bp红包+活动+运营推送弹框
                        return that.autoShow(`${all.bizCode}_common_banners`);
                    }).then(() => {
                        console.log('complete');
                    });
                } else {
                    maxRetry--;
                    if (!maxRetry) {
                        that.$created = true;
                    }
                    that.$loopTimer = setTimeout(() => {
                        show();
                    }, 1000)
                }
            }
            show();
        }
    },

    autoShow(key) {
        let vf = Magix.Vframe.get(key);
        if (vf) {
            let p = vf.invoke('autoShow');
            if (p && p.then) {
                return p;
            }
            return Promise.resolve();
        }
        return Promise.resolve();
    },
});