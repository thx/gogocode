import Magix from 'magix5'
import View from 'magix5-site/view'

export default View.extend({
  tmpl: '@index.html',
  render() {
    this.updater.digest({})
  },
})
