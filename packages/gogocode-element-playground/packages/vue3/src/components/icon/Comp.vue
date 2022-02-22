<template>
  <div>
    <p>迁移：{{ name }}</p>
    <p>Vue版本：{{ version }}</p>
    <el-button type="primary" :icon="ElIconSearch">Search</el-button>
    <el-icon><el-icon-coffee /></el-icon>
  </div>
</template>

<script>
import { version } from 'vue';
import { Search as ElIconSearch, Coffee as ElIconCoffee } from '@element-plus/icons'

export default {
  name: 'icon',
  props: {
    msg: String,
  },
  data() {
    return {
      name: 'icon',
      version: version,
      ElIconCoffee,
    };
  },
  components: {
    ElIconSearch,
    ElIconCoffee
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1 {
  color: #64b587;
}
</style>
