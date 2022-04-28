import ProjectView from '../view';
import Magix5 from 'magix5';

const Router = Magix5.Router;

export default ProjectView.extend({
    tmpl: '@:./empty.html',
    init: function () {
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
