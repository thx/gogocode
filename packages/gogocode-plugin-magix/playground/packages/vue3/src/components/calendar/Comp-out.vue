<template>
  <div>
    <el-calendar>
      <template v-slot:dateCell="{ date, data }">
        <p :class="data.isSelected ? 'is-selected' : ''">
          {{ data.day.split('-').slice(1).join('-') }}
          {{ data.isSelected ? '✔️' : '' }}
        </p>
      </template>
    </el-calendar>
    <el-calendar
      :range="
        ['2019-03-04', '2019-03-24'].map((d) => dayjs(d, 'YYYY-MM-DD').toDate())
      "
    ></el-calendar>
  </div>
</template>

<script>
import * as dayjs from 'dayjs'
import * as Vue from 'vue'
export default {
  data() {
    return {
      name: 'calendar',
      version: Vue.version,
      dayjs,
    }
  },
  name: 'calendar',
  props: {
    msg: String,
  },
}
</script>

<style scoped>
h1 {
  color: #64b587;
}
.is-selected {
  color: #1989fa;
}
</style>
