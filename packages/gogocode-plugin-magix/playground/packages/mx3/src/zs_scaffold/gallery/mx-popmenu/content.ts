/*md5:b2c859da67ece2120968c3e9cc9ad2c5*/
import Magix from 'magix';
Magix.applyStyle('@content.less');

export default Magix.View.extend({
    tmpl: '@content.html',
    init(e) {
        this.viewOptions = e;

        let data = e.data || {};
        this.updater.set({
            menus: data.menus,
            spm: data.spm || ''
        })
    },
    render() {
        this.updater.digest({});
    },
    'submit<click>'(e) {
        let viewOptions = this.viewOptions;
        if (viewOptions.submit) {
            viewOptions.submit(e.params.value);
        }
    }
});