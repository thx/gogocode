import Magix from 'magix5';

Magix.applyStyle('@:./index.less');
const Router = Magix.Router;

import View from '../../../../../view';

const components = { a: 'component-a', b: 'component-b' };

export default View.extend({
    tmpl: '@:./index.html',
    init() {
        this.observeLocation({ path: false, params: ['curr'] });
    },
    assign(extra) {
        this.set(extra);
    },
    async render() {
        const {
            params: { curr },
        } = Router.parse();
        const path = components[curr] || components.a;
        await this.digest({ path });
    },
    'change<click>'(e) {
        const {
            params: { curr },
        } = e;
        Router.to({
            curr,
        });
    },
});
