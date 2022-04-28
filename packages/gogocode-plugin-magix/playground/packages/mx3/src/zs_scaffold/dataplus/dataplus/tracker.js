/*md5:7e133e97672fb80ae4095285ec65737f*/
import Magix from 'magix'
const projectName = Magix.config('projectName')
let Router = Magix.Router
let Tracker = {
    send: function (e) {
        let loc = Router.parse();
        let spm_ab = window.goldlog && window.goldlog.spm_ab || [];
        let spma = spm_ab[0]
        let spmb = spm_ab[1]
        let user = Magix.config(projectName + '.user') || {}
        let userId = user.loginUser && user.loginUser.userId || user.custId || user.userId || user.empId
        //没有stack的不上报
        //测试环境不上报
        if (!e.stack) {
            return;
        }
        let sendData = [
            'site=' + projectName,
            'path=' + loc.path,
            'params=' + JSON.stringify(loc.params),
            'userId=' + userId,
            'message=' + e.message,
            'url=' + location.href,
            'spma=' + spma,
            'spmb=' + spmb,
            'stack=' + e.stack.substr(0, 250).replace(/\r|\n/g, ',')
        ];
        if (window.goldlog && window.goldlog.record) {
            window.goldlog.record('/alimama_bp.2.2', 'OTHER', sendData.join('&'), 'GET')
        }
    }
};
module.exports = Tracker;
