import Magix from 'magix';
import View from 'zs_scaffold/view';

export default View.extend({
    tmpl: '@index.html',
    init() {
        this.observeLocation(['view']);
    },
    render() {
        const loc = Magix.Router.parse().params
        const view = loc.view
        this.updater.digest({
            view
        });
    }
});