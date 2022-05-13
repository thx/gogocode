import Magix from 'magix';
import View from 'zs_scaffold/view';

export default View.extend({
    tmpl: '@index.html',
    render() {
        this.updater.set({
            name: 1,
        })
        this.updater.digest({});
        alert(document.getElementById('sync-to-async').innerHTML)
    },
});
