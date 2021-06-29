<template>
  <button @click="say">{{title}}</button>
</template>
<script>
//https://shentuzhigang.blog.csdn.net/article/details/105174620

function sayHi() {
  alert('hi ');
}

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
        console.log('this', this );
        sayHi();
      },
    },
  },
};
</script>
