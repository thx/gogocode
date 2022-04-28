import Magix, { Router } from 'magix';
import View from 'zs_scaffold/view';

export default View.extend({
    tmpl: '@empty.html',
    init() {
        this.observeLocation({
            path: true
        });
    },
    render() {
        window.scrollTo(0, 0);

        let path = Router.parse().path;
        let routes = Magix.config('routes');
        let { viewPath, viewData } = routes[path] || {};
        this.updater.digest({
            viewPath,
            viewData,
        });
    }
});