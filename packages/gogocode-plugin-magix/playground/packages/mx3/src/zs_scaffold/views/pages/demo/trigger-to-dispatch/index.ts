import Magix from 'magix';
import View from 'zs_scaffold/view';

export default View.extend({
    tmpl: '@index.html',
    render() {
        this.updater.digest({});

        const event = {
            type: 'change',
            haha: 's'
        }

        this['@{owner.node}'].val(0).trigger(event);

        this['@{owner.node}'].val(0).trigger('change');

        let event2 = $.Event({
            type: 'change',
            value: ''
        });

        this['@{owner.node}'].val(0).trigger(event2);

        $(this.root).trigger({
            type: 'change',
            item: {
                name: ''
            }
        })
    },
});
