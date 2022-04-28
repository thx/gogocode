/*md5:d2b98797af92242152113e3f4a98d2fb*/
var Magix = require('magix');
Magix.applyStyle('@login.less');

module.exports = Magix.View.extend({
    tmpl: '@login.html',
    init(extra) {
        this.updater.set({
            path: extra.loginViewPath,
            data: extra.loginViewData
        })

        this['@{dialog}'] = extra.dialog;
        this['@{fn.calcel.callback}'] = extra.cancelCallback;
    },
    render() {
        this.updater.digest();
    },
    '@{cancel}<click>' () {
        var me = this;
        me['@{dialog}'].close();
        if (me['@{fn.calcel.callback}']) {
            Magix.toTry(me['@{fn.calcel.callback}']);
        }
    }
});