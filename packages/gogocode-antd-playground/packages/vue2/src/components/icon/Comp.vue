<template>
  <div>
    <a-button type="primary" icon="search" @click="open">
      Search
    </a-button>
    <p>这是一个icon<a-icon type="step-backward" /></p>
  </div>
</template>
<script>
export default {
  methods: {
    open(){
      this.$notification.open({
        message: 'Notification Title',
        description: 'This is the content of the notification. This is the content of the notification. This is the content of the notification.',
        onClick: () => {
          console.log('Notification Clicked!');
        },
      });
    }
  },
}
</script>