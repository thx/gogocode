
import View from 'zs_scaffold/view';

export default View.extend({
    tmpl: '@outside.html',
    render() {
        this.updater.digest({
            tip: '一级菜单和左侧菜单显示与当前菜单完全一致'
        });
    }
});
