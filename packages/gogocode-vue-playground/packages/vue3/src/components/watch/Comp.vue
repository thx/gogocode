<template>
  <div>
    <p>迁移：{{ name }}</p>
    <p>Vue版本：{{ version }}</p>
    <button v-on:click="add">Add</button>
    <button v-on:click="remove">Remove</button>
    <ul>
      <li v-for="(item,index) in items" v-bind:key="index">{{ item }}</li>
    </ul>
  </div>
</template>

<script>
import { version } from 'vue';
/* 迁移指南: https://v3.cn.vuejs.org/guide/migration/watch.html */
export default {
  name: 'Watch on Arrays',
  props: {
    msg: String,
  },
  data() {
    return {
      name: 'Watch on Arrays',
      version: version,
      items: [1, 2, 3, 4, 5],
    };
  },
  methods: {
    randomIndex: function () {
      return Math.floor(Math.random() * this.items.length);
    },
    add: function () {
      this.items.push(this.randomIndex());
    },
    remove: function () {
      this.items.splice(this.randomIndex(), 1);
    },
  },
  watch: {
	//如何知道items是数组类型？
    items: {
      handler(val, oldVal) {
        console.log('items list changed');
      },
      deep: true,
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
