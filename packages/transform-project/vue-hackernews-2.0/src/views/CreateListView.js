import * as Vue from 'vue'
import ItemList from './ItemList.vue'

const camelize = (str) => str.charAt(0).toUpperCase() + str.slice(1)

// This is a factory function for dynamically creating root-level list views,
// since they share most of the logic except for the type of items to display.
// They are essentially higher order components wrapping ItemList.vue.
export default function createListView(type) {
  return {
    name: `${type}-stories-view`,

    asyncData({ store }) {
      return store.dispatch('FETCH_LIST_DATA', { type })
    },

    title: camelize(type),

    render() {
      return Vue.h(ItemList, plantRenderPara({ props: { type } }))
    },
  }
}
function plantRenderPara(params) {
  const transProps = {
    staticClass: 'class',
    staticStyle: 'style',
    on: '',
    domProps: '',
    props: '',
    attrs: '',
  }
  function obj2arr(obj) {
    return typeof obj == 'string'
      ? [obj]
      : Object.keys(obj).map((pk, index) => {
          return { [pk]: Object.values(obj)[index] }
        })
  }
  let result = {}
  for (let key in params) {
    if (transProps[key] == null) {
      if (typeof params[key] == 'object') {
        result[key] = obj2arr(params[key])
      } else {
        result[key] = params[key]
      }
    }
  }
  for (let key in params) {
    if (transProps[key] === '') {
      if (typeof params[key] == 'object') {
        Object.assign(result, { ...params[key] })
      } else {
        result[key] = params[key]
      }
    }
  }
  for (let key in params) {
    if (transProps[key]) {
      result[transProps[key]] = result[transProps[key]] || []
      result[transProps[key]] = result[transProps[key]].concat(
        obj2arr(params[key])
      )
    }
  }
  return result
}
