import Magix from 'magix';
import View from 'zs_scaffold/view';

export default View.extend({
    tmpl: '@index.html',
    render() {
        this.updater.digest({
            user: {
                name: 'Jack'
            }
        });
    },
});
