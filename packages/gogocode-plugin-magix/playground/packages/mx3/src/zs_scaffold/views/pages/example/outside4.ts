

import Magix from 'magix';
import View from 'zs_scaffold/view';

export default View.extend({
    tmpl: '@outside.html',
    render() {
        this.updater.digest({
            tip: '该页面：包含吊头吊尾的单独页面，不映射到导航上'
        });
    }
});
