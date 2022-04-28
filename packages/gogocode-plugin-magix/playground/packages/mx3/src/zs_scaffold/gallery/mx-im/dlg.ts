/*md5:84fbabdf0a49f2e2e798fce33d67645b*/
import Magix from 'magix';
import * as View from '../mx-util/view';

export default View.extend({
    tmpl: '@dlg.html',
    init(extra) {
        this.viewOptions = extra;
        this.updater.set(extra.data);
    },
    render() {
        this.updater.digest();
    }
});