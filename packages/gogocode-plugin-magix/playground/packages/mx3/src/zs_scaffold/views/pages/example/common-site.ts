
import Magix from 'magix';
import View from 'zs_scaffold/view';

export default View.extend({
    tmpl: '@common-site.html',
    render() {
        this.updater.digest();
    }
});
