import Magix5 from 'magix5'
import View from 'magix5-site/view'

export default View.extend({
  assign(props) {
    this.set({ props })
  },
  tmpl: '@:index.html',
  render() {
    this.digest({})

    const event = {
      type: 'change',
      haha: 's',
    }

    Magix5.dispatch(this['@:{owner.node}'].val(0)[0], event.type, event)

    Magix5.dispatch(this['@:{owner.node}'].val(0)[0], 'change')

    let event2 = {
      type: 'change',
      value: '',
    }

    Magix5.dispatch(this['@:{owner.node}'].val(0)[0], event2.type, event2)

    Magix5.dispatch($(this.root)[0], 'change', {
      item: {
        name: '',
      },
    })
  },
})
