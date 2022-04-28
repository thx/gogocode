/*md5:c18cad46ffe23c45bdb7504956a4b74e*/
let Magix = require('magix');

module.exports = Magix.View.extend({
    tmpl: '@base.html',
    init(extra){
        let content = extra.content || '标题';
        let tip = extra.tip || '';
        this.updater.set({
            content,
            tip
        })
    },
    render() {
        this.updater.digest();
    }
});