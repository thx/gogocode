/*md5:696eee5b85165636cb3df13168ffb182*/
import Magix from 'magix';
import * as $ from '$';
Magix.applyStyle('@card.less');

export default Magix.View.extend({
    tmpl: '@card-inner.html',
    init(e) {
        this.assign(e);
    },
    assign(e) {
        let that = this;
        that.updater.snapshot();

        that.updater.set({
            item: e.item,
            innerData: e.innerData,
            spm: e.spm
        });
        that['@{owner.node}'] = $(`#${that.id}`);

        let altered = that.updater.altered();
        return altered;
    },
    render() {
        this.updater.digest();
    },
    '@{btn.select}<click>'(e) {
        e.preventDefault();
        e.stopPropagation();
        this['@{owner.node}'].trigger({
            type: 'select',
            item: e.params.item,
            btn: e.params.btn
        });
    }
});