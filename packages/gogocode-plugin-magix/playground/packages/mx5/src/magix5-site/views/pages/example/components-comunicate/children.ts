import Magix from 'magix5';
Magix.applyStyle('@:./children.less');
import View from '../../../../view';

interface IProps {
    name: string;
    disabled: boolean;
}

export default View.extend({
    tmpl: '@:./children.html',
    init() {},
    assign(extra: IProps) {
        const { name, disabled } = extra;
        this.set({
            name,
            disabled,
        });
    },
    async render() {
        await this.digest();
    },
    'handleClick<click>'() {
        const owner = this.owner;
        const node = owner.root;
        Magix.dispatch(node, 'change');
    },
});
