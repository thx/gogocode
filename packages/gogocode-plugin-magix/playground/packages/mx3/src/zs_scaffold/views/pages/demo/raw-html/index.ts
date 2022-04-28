import Magix from 'magix';
import View from 'zs_scaffold/view';

export default View.extend({
    tmpl: '@index.html',
    render() {
        const rawHTML = `<span style="color:red;font-size:20px;">123</span>`;
        this.updater.digest({
            rawHTML,
        });
    },
});
