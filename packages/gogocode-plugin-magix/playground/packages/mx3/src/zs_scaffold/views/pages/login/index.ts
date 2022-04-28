/**
 * 登陆框申请说明：https://thx.github.io/magix-gallery/#!/all/pro/login
 */
import Magix from 'magix';
import View from 'zs_scaffold/view';

let Router = Magix.Router;
Magix.applyStyle('@index.less');

export default View.extend({
    tmpl: '@index.html',
    render() {
        let { all: { bizCode }, user } = this.updater.get();
        this.updater.digest({
            data: {
                bizCode,
                logoutUrl: `/api/member/logout.action?bizCode=${bizCode}`,  // 由于各bp逻辑不一致，登出接口各自配置，必填
                userObj: user || {}
            }
        });
    }
});