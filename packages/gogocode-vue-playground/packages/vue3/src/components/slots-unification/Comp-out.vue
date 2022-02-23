<template>
  <div>
    <p>迁移：{{ name }}</p>
    <p>Vue版本：{{ version }}</p>
    <ScopedSlots>
      <template v-slot:header>
        <div>slot: header</div>
      </template>
      <div>slot: default</div>
      <template v-slot:footer>
        <div>slot: footer</div>
      </template>
      <template v-slot:body>
        <div>
          <template v-slot:templateBody> </template>
        </div>
      </template>
      <template v-slot:body>
        <template v-slot:templateBody>
          <div></div>
        </template>
      </template>
    </ScopedSlots>
  </div>
</template>

<script>
import { version } from 'vue'
import ScopedSlots from './ScopedSlots.vue'
/* 迁移指南: https://v3.cn.vuejs.org/guide/migration/slots-unification.html */
export default {
  name: '插槽统一',
  props: {
    msg: String,
  },
  components: {
    ScopedSlots,
  },
  data() {
    return {
      name: '插槽统一',
      version: version,
    }
  },
}
</script>

<style scoped>
h1 {
  color: #64b587;
}
</style>
