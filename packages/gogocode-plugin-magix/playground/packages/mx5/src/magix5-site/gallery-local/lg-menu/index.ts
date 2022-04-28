import Magix5 from 'magix5';
import View from '../../view';
Magix5.applyStyle('@:./index.less');
const Router = Magix5.Router;

interface IMenuItem {
    text?: string;
    link?: string;
    children?: IMenuItem[];
}

interface IProps {
    key: string;
    path: string;
    group?: boolean;
    menu: IMenuItem[];
}

export default View.extend({
    tmpl: '@:./index.html',
    init(extra: IProps) {
        const { key } = extra;
        key && this.observeLocation({ path: false, params: key });
    },
    assign(extra: IProps) {
        const { path, key, group = false, menu } = extra;
        this.set({
            menu,
            path,
            key,
            group,
        });
    },
    async render() {
        const { key, menu, group } = this.get();
        const { params } = Router.parse();
        const active =
            params[key] ||
            (group == 'true' ? menu[0].children[0].link : menu[0].link);
        await this.digest({ active });
    },
    'navigate<click>'(e) {
        const key = this.get('key');
        const {
            params: { link },
        } = e;
        Router.to({
            [key]: link,
        });

        const owner = this.owner;
        Magix5.dispatch(owner.root, 'navigate', {
            link,
        });
    },
});
