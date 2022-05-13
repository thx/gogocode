import Magix from 'magix5'
import View from 'magix5-site/view'

export default View.extend({
  assign(props) {
    this.set({ props })
  },
  tmpl: '@:index.html',
  render() {
    this.set({
      name: 1,
    })
    this.digest({})
    alert(document.getElementById('sync-to-async').innerHTML)
  },
})
