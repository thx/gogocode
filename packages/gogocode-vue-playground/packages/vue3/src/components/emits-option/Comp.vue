<template>
  <div>
    <p>迁移：{{ name }}</p>
    <p>Vue版本：{{ version }}</p>

    <div>
      <p>{{ text }}</p>
      <p v-html="htmlText"></p>
      <p>
        {{ comMethod }}
      </p>
      <Child v-on:click="emitAccepted"></Child>
      <p style="width: 400px">
        It is highly recommended that you document all of the events emitted by each of your
        components using emits. This is especially important because of the removal of the .native
        modifier. Any listeners for events that aren't declared with emits will now be included in
        the component's $attrs, which by default will be bound to the component's root node. #
      </p>
      <p style="width: 400px">
        解释：
        在vue3中，未经emits声明的所有时间，将会绑定到该组件的根节点的attr属性中，这样如果子组件定义了同名时间事件，
        父组件的事件也会被触发;
        <br />
		<br />
        在vue2中，默认情况下，传递给带有 v-on 的组件的事件监听器只有通过 this.$emit 才能触发。
        要将原生 DOM 监听器添加到子组件的根元素中，可以使用 .native 修饰符: <br/>
		{{nativeHtml}}
        <br />
		<br />
		在vue3中，v-on 的 .native 修饰符已被移除。同时，新增的 emits 选项允许子组件定义真正会被触发的事件。
		<br />
		<br />
		删除 .native 修饰符的所有实例。
		<br />
		确保所有组件都使用 emits 选项记录其事件。
      </p>
    </div>
  </div>
</template>

<script>
import { version } from 'vue';
import Child from './Child';
/* 迁移指南: https://v3.cn.vuejs.org/guide/migration/emits-option.html */
export default {
  name: 'emits Option',
  props: {
    msg: String,
  },
  emits: ['accepted'],
  data() {
    return {
      name: 'emits Option',
      nativeHtml: `<my-component v-on:close="handleComponentEvent" v-on:click.native="handleNativeClickEvent">`,
      version: version,
    };
  },
  components: {
    Child,
  },
  methods: {
    emitAccepted() {
      alert('child ok clicked');
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1 {
  color: #64b587;
}
</style>
