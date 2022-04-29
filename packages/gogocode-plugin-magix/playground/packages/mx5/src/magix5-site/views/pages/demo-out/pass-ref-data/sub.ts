import Magix from 'magix5'
import View from 'magix5-site/view'

export default View.extend({
  assign(props) {
    this.set(props)
  },
  tmpl: '@:sub.html',
  init(props) {},
  render() {
    this.digest({})
  },
})
