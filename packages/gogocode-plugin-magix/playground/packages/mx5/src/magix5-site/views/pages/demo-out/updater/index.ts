import Magix from 'magix5'
import View from 'magix5-site/view'

export default View.extend({
  tmpl: '@index.html',
  render() {
    const rawHTML = `<span style="color:red;font-size:20px;">123</span>`
    this.get()
    this.set({
      name: 1,
    })
    this.digest({})
  },
})
