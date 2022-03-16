<template>
  <a-button type="primary" @click="open">
    <template #icon><SearchOutlined /></template>
    Search
  </a-button>
  <p>这是一个icon<StepBackwardOutlined /></p>
</template>
<script>
import { SearchOutlined,StepBackwardOutlined } from '@ant-design/icons-vue';
export default {
  components: {
    SearchOutlined,
    StepBackwardOutlined
  },
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
};
</script>