
import Magix from 'magix';
import View from 'zs_scaffold/view';

export default View.extend({
    tmpl: '@outside.html',
    render() {
        this.updater.digest({
            tip: '该页面：一级菜单与当前菜单完全一致，左侧菜单自定义'
        });
    }
});
