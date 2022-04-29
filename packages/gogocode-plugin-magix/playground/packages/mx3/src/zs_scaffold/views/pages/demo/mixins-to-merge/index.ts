import Magix from 'magix';
import View from 'zs_scaffold/view';
import HiMixin from './mixin'

export default View.extend({
    tmpl: '@index.html',
    mixins: [HiMixin],
    render() {
        this.updater.digest({
            user: {
                name: 'Jack'
            }
        });
    },
    'hi<click>'() {
        this.sayHi()
    }
})
