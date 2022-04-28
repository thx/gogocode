import Magix from 'magix';
import View from 'zs_scaffold/view';

export default View.extend({
    tmpl: '@header.html',
    render() {
        this.updater.digest();
    }
});