import Magix from 'magix5'
import View from 'magix5-site/view'

export default View.extend({
  assign(props) {
    this.set({ props })
  },
  tmpl: '@:index.html',
  render() {
    this.digest({
      user: {
        name: 'Jack',
      },
    })
  },
})
