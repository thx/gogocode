<template>
  <button @click="say" :theme="theme">{{ title }}</button>
</template>
<script>
//https://shentuzhigang.blog.csdn.net/article/details/105174620

function sayHi() {
  alert('hi ');
}
import { inject } from 'vue'
export default {
  name: 'PropsThis',
  data() {
    return {
      title: 'say hi',
    };
  },
  props: {
    say: {
      type: Function,
      default: () => {
        console.log('vue3 this', this);
        inject('title', 'title is aaa')
        sayHi();
      },
    },
    theme: {
      type: String,
      default: () => {
        console.log('this', this);
        inject('theme', 'theme-is-aaa')
      },
    },
  },
};
</script>
