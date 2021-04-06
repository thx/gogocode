const code = 
`
import * as View from 'test/view';
import moment from 'moment';
import * as Magix from 'magix';
import { useContext, rest } from '@as/mdw-hk';

Magix.applyStyle('@test.less')

module.exports = View.extend({
    tmpl: '@test.html',
    mixins: [moment],
    init(extra) {

        this.updater.set({
            viewId: this.id,
            ...extra
        })
        this.observeLocation(['start', 'end']);
    },
    async render() {
        await this.fetchData();
        const loc = Magix.Router.parse();
        this.updater.digest(loc);
    },
    locationChange() {
        this.render()
    },

    async fetchData() {
        try {
            const params = { name: '1' };
            const result = await this.requester['test_get'](params)
            let list = result.pagelist || []
            let total = result.total || 0

            this.updater.digest({ list, total })

        } catch (e) {
            alert({
                type: 'error',
                content: e.message
            });
        }
    },
    'changePage<change>'({ page, size }) {
        Magix.Router.to({ page, pageSize: size })
    },
    forM() {
        const array = [1, 2, 3, 4, 5];
        for (let i = 0; i < array.length; i++) {
            const element = array[i];
            console.log(element);
        }
    },
    ifM() {
        let a = 1;
        if (a > 1) {
            console.log(a);
        }
        else if (a == 1) {
            console.log(a);
        }
        else {
            console.log(a);
        }
    },
    switchM() {
        let a = 1;
        switch (a) {
            case 1:
                console.log(1);
                break;
            case 2:
                console.log(2);
                break;
            default:
                console.log('default');
        }


    }
})
`;
module.exports = code;