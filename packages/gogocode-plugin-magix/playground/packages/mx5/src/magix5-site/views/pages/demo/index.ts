import Magix from 'magix5';
import View from 'magix5-site/view';

export default View.extend({
    tmpl: '@:./index.html',
    init() {
        this.observeLocation(['view', 'useTransformedFile']);
    },
    render() {
        const loc = Magix.Router.parse().params
        const view = loc.view
        const useTransformedFile = loc.useTransformedFile === 'true'
        this.digest({
            view,
            useTransformedFile
        });
    }
});