import ProjectView from '../view';
import Magix5 from 'magix5';

Magix5.applyStyle('@:./default.less');

import { getNavList } from '../menu';

const Router = Magix5.Router;

export default ProjectView.extend({
    tmpl: '@:./default.html',
    init: function () {
        const navlist = getNavList();
        this.set({ navlist });
        this.observeLocation({ path: true });
    },
    assign(extra) {
        this.set(extra);
    },
    async render() {
        const { path } = Router.parse();

        await this.digest({
            path,
        });
    },
});
