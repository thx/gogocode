import Magix from 'magix5';

Magix.applyStyle('@:./index.less');

import View from '../../../../view';

export default View.extend({
    tmpl: '@:./index.html',
    init() {},
    assign(extra) {
        this.set(extra);
    },
    async render() {
        await this.digest();
    },
});
