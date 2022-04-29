import Magix from 'magix5'
import View from 'magix5-site/view'
import HiMixin from './mixin'

export default View.extend({
  assign(props) {
    this.set({ props })
  },
  tmpl: '@:index.html',
  mixins: [HiMixin],
  render() {
    this.digest({
      user: {
        name: 'Jack',
      },
    })
  },
  'hi<click>'() {
    this.sayHi()
  },
}).merge(...[HiMixin])
