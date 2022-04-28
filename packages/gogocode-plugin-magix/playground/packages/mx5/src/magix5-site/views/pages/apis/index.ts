import Magix5 from 'magix5';

Magix5.applyStyle('@:./index.less');

const Router = Magix5.Router;

import View from '../../../view';
import data from './data.js.js';
import transform from './transform';

const blackList = [
    'HTMLElementOrEventTarget',
    'TExtendPropertyDescriptor',
    'ExtendPropertyDescriptor',
    'ExtendStaticPropertyDescriptor',
    'VframeStaticEvent',
    'TriggerEventDescriptor',
    'RouterParseParts',
    'RoutesConfig',
]; // 黑名单

export default View.extend({
    tmpl: '@:./index.html',
    init() {
        this.observeLocation({ path: false, params: ['page', 'hash'] });
    },
    assign(extra) {
        const { name, menu, menuMap, searchMap } = transform(data, blackList);
        this.set({ name, menu, extra, menuMap, searchMap });
    },
    async render() {
        const menuMap = this.get('menuMap');
        const { params } = Router.parse();
        const { page, curr } = params;
        const active = (page && menuMap.get(page)) || 0;
        await this.digest({ active, curr });

        // scroll to header
        if (!curr) {
            this.scroll('apis-content-header');
        } else {
            this.scroll(`${page}_${curr}`);
        }
    },
    async 'change<click>'(e) {
        const { page } = e.params;
        Router.to({ page: page, curr: '' });
    },
    'to<click>'(e: Magix5.MagixKeyboardEvent) {
        let { target } = e.params;
        this.scroll(target);

        target = target.split('_')[1];
        Router.to({ curr: target });
        this.digest({
            curr: target,
        });
    },
});
