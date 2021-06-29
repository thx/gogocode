<template></template>
<script>
import * as Vue from 'vue'

Vue.component('button-counter', {
  data() {
    return {
      count: 0,
    }
  },
  template: `
    <button @click="count++">
      Clicked {{ count }} times.
    </button>
  `,
})

export default {
  name: 'VNodeTemp',
  props: {
    level: {
      require: true,
      type: Number,
    },
  },
  render() {
    return Vue.h(
      Vue.resolveComponent('button-counter'),
      plantRenderPara({
        staticClass: 'button',
        staticStyle: { color: '#34495E' },
        attrs: { id: 'submit' },
        domProps: { innerHTML: 'innerHTML' },
        on: { click: submitForm },
        key: 'submit-button',
      })
    )
  },
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
</script>
