import Magix5, { Router } from 'magix5';
import View from '../view';

export default View.extend({
    header: 'content-header',
    key: 'page',
    init() {
        this.observeLocation({ path: false, params: this.key });
    },
    assign(extra) {
        this.set(extra);
    },
    async render() {
        const data = this.getData();

        const renderMark = Magix5.mark(this, 'render');
        await this.digest({ data });

        if (renderMark) {
            this.scroll(this.header);
        }
    },
    getData() {
        const { menu, dataMap, isGroup = false } = this.get();
        const { params } = Router.parse();
        const page =
            params[this.key] ||
            (isGroup === true ? menu[0].children[0].link : menu[0].link);
        return dataMap[page];
    },
});
