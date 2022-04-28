/*md5:917145cc0bdf68eaebaf41b8212c91ec*/
import Magix from 'magix';
import Base from './index';
Magix.applyStyle('@../mx-effects/pipeline.less');

export default Base.extend({
    tmpl: '@pipeline.html',
    render() {
        let { list } = this.updater.get();
        let len = list.length;
        let pd = parseInt(50 / len); //间隔
        this.updater.digest({
            len,
            pd
        });
    }
});