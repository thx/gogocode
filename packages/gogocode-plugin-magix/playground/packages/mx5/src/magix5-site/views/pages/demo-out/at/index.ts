import Magix from 'magix5'
import View from 'magix5-site/view'

export default View.extend({
  tmpl: '@:index.html',
  render() {
    this.updater.get()
    this.updater.set({
      name: 1,
    })
    this.updater.digest({})
  },
})
