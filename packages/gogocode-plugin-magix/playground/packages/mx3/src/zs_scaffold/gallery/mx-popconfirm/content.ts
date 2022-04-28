/*md5:b7148a3347afe8710d505835a6732900*/
import Magix from 'magix';
Magix.applyStyle('@../mx-popover/index.less');

export default Magix.View.extend({
    tmpl: '@content.html',
    init(e) {
        this.viewOptions = e;

        let data = e.data || {};
        this.updater.set({
            content: data.content || ''
        })
    },
    render() {
        this.updater.digest({});
    },
    'submit<click>'(e) {
        let viewOptions = this.viewOptions;
        if (viewOptions.submit) {
            viewOptions.submit();
        }
    },
    'cancel<click>'(e) {
        let viewOptions = this.viewOptions;
        if (viewOptions.cancel) {
            viewOptions.cancel();
        }
    }
});