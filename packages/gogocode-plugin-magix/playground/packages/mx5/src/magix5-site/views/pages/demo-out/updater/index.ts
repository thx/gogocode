import Magix from 'magix5'
import View from 'magix5-site/view'

export default View.extend({
  assign(props) {
    this.set({ props })
  },
  tmpl: '@:index.html',
  render() {
    const rawHTML = `<span style="color:red;font-size:20px;">123</span>`
    this.updater.get()
    this.updater.set({
      name: 1,
    })
    this.updater.digest({})
  },
})
